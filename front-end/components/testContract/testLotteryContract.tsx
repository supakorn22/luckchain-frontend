// components/ContractInteraction.tsx

import React, { useState } from 'react';
import useTestContract from '@utils/governanceLotteryContract/uesGovernanceLotteryContract';
import useWeb3 from '@hooks/useWeb3';

const TestLotteryContract: React.FC = () => {

    const { accounts } = useWeb3();  // Assuming useWeb3() provides the accounts
    const buyerAddress = accounts[0]?.address; // Use the first account address as buyer address



    // State for contract data and input value
    const [contractData, setContractData] = useState<string | null>(null);

    const [inputValueBuyer_to_lotteries1, setInputValueBuyer_to_lotteries1] = useState<string | "">(""); // Input value for storing
    const [inputValueBuyer_to_lotteries2, setInputValueBuyer_to_lotteries2] = useState<number | 0>(0); // Input value for storing
    const [isLoading, setIsLoading] = useState(false);
    const [inputValueBuyLotter1, setInputValueBuyLotter1] = useState<number | 0>(0);
    const [inputValueChangeAddress1, setInputValueChangeAddress1] = useState<string | "">("");
    const [currentContractAddress, setCurrentContractAddress] = useState<string | "">(useTestContract.contractAddress);
    const [inputValueDeploy1, setInputValueDeploy1] = useState<number>(0);
    const [inputValueDeploy2, setInputValueDeploy2] = useState<number>(0);



    // Function to interact with the contract
    const handleBuyer_to_lotteries = async () => {
        setIsLoading(true);
        try {
            const txHash = await useTestContract.buyer_to_lotteries(inputValueBuyer_to_lotteries1, inputValueBuyer_to_lotteries2); // Store value
            setContractData(`Transaction successful. Hash:${txHash}`);
        } catch (error) {
            console.error("Error interacting with contract:", error);
            if (error instanceof Error) {
                setContractData(`Error: ${error.message}`);
            } else {
                setContractData('An unknown error occurred.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleGetAllLottery = async () => {
        setIsLoading(true);
        try {
            const txHash = await useTestContract.getUserAllLottery(buyerAddress);
            setContractData(`Transaction successful. Hash:${txHash}`);
        } catch (error) {
            console.error("Error interacting with contract:", error);
            if (error instanceof Error) {
                setContractData(`Error: ${error.message}`);
            } else {
                setContractData('An unknown error occurred.');
            }
        } finally {
            setIsLoading(false);
        }
    };


    const handleGetMetadata = async () => {
        setIsLoading(true);
        try {
            const txHash = await useTestContract.getMetaData();
            console.log(txHash);
            setContractData(`Transaction successful. Hash:${txHash}`);
        } catch (error) {
            console.error("Error interacting with contract:", error);
            if (error instanceof Error) {
                setContractData(`Error: ${error.message}`);
            } else {
                setContractData('An unknown error occurred.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handelStartLottery = async () => {
        setIsLoading(true);
        try {
            const txHash = await useTestContract.startLottery();
            console.log(txHash);
            setContractData(`Transaction successful. Hash:${txHash}`);
        } catch (error) {
            console.error("Error interacting with contract:", error);
            if (error instanceof Error) {
                setContractData(`Error: ${error.message}`);
            } else {
                setContractData('An unknown error occurred.');
            }
        } finally {
            setIsLoading(false);
        }

    }

    const handleBuyLottery = async () => {
        setIsLoading(true);
        try {
            const txHash = await useTestContract.buyLottery(String(inputValueBuyLotter1));
            console.log(txHash);
            setContractData(`Transaction successful. Hash:${txHash}`);
        } catch (error) {
            console.error("Error interacting with contract:", error);
            if (error instanceof Error) {
                setContractData(`Error: ${error.message}`);
            } else {
                setContractData('An unknown error occurred.');
            }
        } finally {
            setIsLoading(false);
        }

    }

    const handleLotteryAddress = async () => {
        useTestContract.setContractAddress(inputValueChangeAddress1);
        setCurrentContractAddress(inputValueChangeAddress1);
        console.log("Contract address changed to:", inputValueChangeAddress1);

    }

    const handleGetContractAddress = async () => {
        console.log("Current contract address:", useTestContract.contractAddress);
    }

    const handleDeploy = async () => {
        setIsLoading(true);
        try {
            const randomAddress = process.env.NEXT_PUBLIC_RANDOM_ADDRESS || "";
            const deployAddress = await useTestContract.deploy(randomAddress, inputValueDeploy1, inputValueDeploy2)
            setCurrentContractAddress(deployAddress);

        }
        catch (error) {
            console.error("Error deploying contract:", error);
            if (error instanceof Error) {
                setContractData(`Error: ${error.message}`);
            } else {
                setContractData('An unknown error occurred.');
            }
        } finally {
            setIsLoading(false);
        }

    }

    return (
        <div className="flex flex-col justify-evenly h-screen pt-24 px-4 md:px-8 md:pt-8 lg:px-16 space-y-2">



            {/* Input and Button for changing contract address */}
            <div className="space-y-4 border border-gray-400 p-4 rounded">
                <h3 className="font-bold text-lg">Contract Address</h3>
                <p className="bg-gray-100 p-2 border border-gray-300 rounded text-black w-full">
                    {currentContractAddress || "No address set"}
                </p>
                <input
                    type="text"
                    value={inputValueChangeAddress1}
                    onChange={(e) => setInputValueChangeAddress1(e.target.value)}
                    className="p-2 border border-gray-300 rounded text-black w-full"
                    placeholder="Enter new contract address"
                />
                <div className="flex space-x-4">
                    <button
                        onClick={handleLotteryAddress}
                        className="bg-blue-500 text-white py-2 px-4 rounded w-full"
                        disabled={isLoading || inputValueChangeAddress1 === ""}
                    >
                        {isLoading ? 'Loading...' : 'Change Address'}
                    </button>
                    <button
                        onClick={handleGetContractAddress}
                        className="bg-blue-500 text-white py-2 px-4 rounded w-full"
                    >
                        Get Contract Address
                    </button>
                </div>
            </div>

            {/* Input and Button for deploying contract */}
            <div className="space-y-4 border border-gray-400 p-4 rounded">
                <h3 className="font-bold text-lg">Deploy Contract</h3>
                <input
                    type="number"
                    value={inputValueDeploy1}
                    onChange={(e) => setInputValueDeploy1(Number(e.target.value))}
                    className="p-2 border border-gray-300 rounded text-black w-full"
                    placeholder="Enter lottery number"
                />
                <input
                    type="number"
                    value={inputValueDeploy2}
                    onChange={(e) => setInputValueDeploy2(Number(e.target.value))}
                    className="p-2 border border-gray-300 rounded text-black w-full"
                    placeholder="Enter lottery number"
                />
                <button
                    onClick={handleDeploy}
                    className="bg-blue-500 text-white py-2 px-4 rounded w-full"
                    disabled={isLoading}
                >
                    {isLoading ? 'Loading...' : 'Deploy Contract'}
                </button>
            </div>


            {/* Input and Button for storing data */}
            <div className="space-y-4 border border-gray-400 p-4 rounded">
                <h3 className="font-bold text-lg">Get a lottery</h3>
                <input
                    type="text"
                    value={inputValueBuyer_to_lotteries1}
                    onChange={(e) => setInputValueBuyer_to_lotteries1(e.target.value)}
                    className="p-2 border border-gray-300 rounded text-black w-full"
                    placeholder="Enter address"
                />
                <input
                    type="number"
                    value={inputValueBuyer_to_lotteries2}
                    onChange={(e) => setInputValueBuyer_to_lotteries2(Number(e.target.value))}
                    className="p-2 border border-gray-300 rounded text-black w-full"
                    placeholder="Enter lottery number"
                />
                <button
                    onClick={handleBuyer_to_lotteries}
                    className="bg-blue-500 text-white py-2 px-4 rounded w-full"
                    disabled={isLoading || (inputValueBuyer_to_lotteries1 === "" && inputValueBuyer_to_lotteries2 === 0)}
                >
                    {isLoading ? 'Loading...' : 'Get Lottery'}
                </button>
            </div>

            {/* Buttons for other actions */}
            <div className="grid grid-cols-1 gap-4 border border-gray-400 p-4 rounded">
                <h3 className="font-bold text-lg">Actions</h3>
                <button
                    onClick={handleGetAllLottery}
                    className="bg-blue-500 text-white py-2 px-4 rounded w-full"
                    disabled={isLoading}
                >
                    {isLoading ? 'Loading...' : 'Get All Lottery'}
                </button>
                <button
                    onClick={handleGetMetadata}
                    className="bg-blue-500 text-white py-2 px-4 rounded w-full"
                    disabled={isLoading}
                >
                    {isLoading ? 'Loading...' : 'Get Metadata'}
                </button>
                <button
                    onClick={handelStartLottery}
                    className="bg-blue-500 text-white py-2 px-4 rounded w-full"
                    disabled={isLoading}
                >
                    {isLoading ? 'Loading...' : 'Start Lottery'}
                </button>
            </div>

            {/* Input and Button for buying a lottery */}
            <div className="space-y-4 border border-gray-400 p-4 rounded">
                <h3 className="font-bold text-lg">Buy Lottery</h3>
                <input
                    type="number"
                    value={inputValueBuyLotter1}
                    onChange={(e) => setInputValueBuyLotter1(Number(e.target.value))}
                    className="p-2 border border-gray-300 rounded text-black w-full"
                    placeholder="Enter lottery number"
                />
                <button
                    onClick={handleBuyLottery}
                    className="bg-blue-500 text-white py-2 px-4 rounded w-full"
                    disabled={isLoading}
                >
                    {isLoading ? 'Loading...' : 'Buy Lottery'}
                </button>
            </div>

            {/* Display contract data */}

            <div className="border border-gray-400 p-4 rounded text-white">
                <h3 className="font-bold text-lg mb-2">Contract Response:</h3>
                <pre className="bg-gray-800 p-4 rounded text-white min-h-[200px] max-h-[400px] overflow-y-auto whitespace-pre-wrap">
                    {contractData}
                </pre>
            </div>

        </div>

    );
};

export { TestLotteryContract };
