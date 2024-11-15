

import React, { useState } from 'react';
import useWildcardContract from '@utils/wildcardDealerLottery/useWildcardDealerLottery';
import useWeb3 from '@hooks/useWeb3';


const TestWildcardContract: React.FC = () => {
    const { accounts } = useWeb3();
    const userAddress = accounts[0]?.address;

    const [isLoading, setIsLoading] = useState(false);

    const [contractData, setContractData] = useState<string | null>(null);

    const [inputValueChangeAddress1, setInputValueChangeAddress1] = useState<string | "">("");
    const [currentContractAddress, setCurrentContractAddress] = useState<string | "">(useWildcardContract.contractAddress);

    const [inputValueDeploy1, setInputValueDeploy1] = useState<string | "">("");
    const [inputValueDeploy2, setInputValueDeploy2] = useState<string | "">("");
    const [inputValueDeploy3, setInputValueDeploy3] = useState<number | 0>(0);
    const [inputValueDeploy4, setInputValueDeploy4] = useState<number | 0>(0);

    const [inputValueGetPrizeWildcard1, setInputValueGetPrizeWildcard1] = useState<number>(0);

    const [inputValueBuyLotter1, setInputValueBuyLotter1] = useState<string | "">("");

    const handleLotteryAddress = async () => {
        useWildcardContract.setContractAddress(inputValueChangeAddress1);
        setCurrentContractAddress(inputValueChangeAddress1);
        console.log("Contract address changed to:", inputValueChangeAddress1);

    }


    const handleGetContractAddress = async () => {
        console.log("Current contract address:", useWildcardContract.contractAddress);
    }

    const handleDeploy = async () => {
        setIsLoading(true);
        try {
            const prizeWildcards: boolean[] = inputValueDeploy2.split("").map((char) => char === "1");
            
            const deployAddress = await useWildcardContract.deploy(inputValueDeploy1,prizeWildcards, inputValueDeploy3, inputValueDeploy4)
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

    const handleGetGovernanceLotteryAddress = async () => {
        try {
            const txHash = await useWildcardContract.getGovernanceLotteryAddress();
            setContractData(String(txHash));
        }
        catch (error) {
            console.error("Error getting governance lottery address:", error);
            if (error instanceof Error) {
                setContractData(`Error: ${error.message}`);
            } else {
                setContractData('An unknown error occurred.');
            }
        }

    }

    const handleGetMetadata = async () => {
        try {
            const metadata = await useWildcardContract.getMetaData();
            setContractData(JSON.stringify(metadata));
        }
        catch (error) {
            console.error("Error getting metadata:", error);
            if (error instanceof Error) {
                setContractData(`Error: ${error.message}`);
            } else {
                setContractData('An unknown error occurred.');
            }
        }
    }

    const handleGetOwner = async () => {
        try {
            const owner = await useWildcardContract.getOwner();
            setContractData(owner);
        }
        catch (error) {
            console.error("Error getting owner:", error);
            if (error instanceof Error) {
                setContractData(`Error: ${error.message}`);
            } else {
                setContractData('An unknown error occurred.');
            }
        }
    }
    
    const handleGetPrizeWildcard = async () => {
        try {
            const prizeWildcards = await useWildcardContract.getPrizeWildcard(inputValueGetPrizeWildcard1);
            setContractData(String(prizeWildcards));
        }
        catch (error) {
            console.error("Error getting prize wildcards:", error);
            if (error instanceof Error) {
                setContractData(`Error: ${error.message}`);
            } else {
                setContractData('An unknown error occurred.');
            }
        }
    }

    const handleGetAllLottery = async () => {
        setIsLoading(true);
        try {
            const txHash = await useWildcardContract.getUserAllLottery(userAddress);
            setContractData(String(txHash));
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

    const handleBuyLottery = async () => {
        setIsLoading(true);
        try {
            const txHash = await useWildcardContract.buyLottery(String(inputValueBuyLotter1));
            console.log(txHash);
            setContractData(String(txHash));
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
                    type="text"
                    value={inputValueDeploy1}
                    onChange={(e) => setInputValueDeploy1(e.target.value)}
                    className="p-2 border border-gray-300 rounded text-black w-full"
                    placeholder="Enter governance lottery address"
                />
                <input
                    type="text"
                    value={inputValueDeploy2}
                    onChange={(e) => setInputValueDeploy2(e.target.value)}
                    className="p-2 border border-gray-300 rounded text-black w-full"
                    placeholder="Enter prize wildcards"
                />
                <input
                    type="number"
                    value={inputValueDeploy3}
                    onChange={(e) => setInputValueDeploy3(parseInt(e.target.value))}
                    className="p-2 border border-gray-300 rounded text-black w-full"
                    placeholder="Enter ticket price"
                />
                <input
                    type="number"
                    value={inputValueDeploy4}
                    onChange={(e) => setInputValueDeploy4(parseInt(e.target.value))}
                    className="p-2 border border-gray-300 rounded text-black w-full"
                    placeholder="Enter prize amount"
                />
                <button
                    onClick={handleDeploy}
                    className="bg-blue-500 text-white py-2 px-4 rounded w-full"
                    disabled={isLoading || inputValueDeploy1 === "" || inputValueDeploy2 === "" || inputValueDeploy3 === 0 || inputValueDeploy4 === 0}
                >
                    {isLoading ? 'Loading...' : 'Deploy Contract'}
                </button>
            </div>



            {/* Buttons for other actions */}
            <div className="space-y-4 border border-gray-400 p-4 rounded">
                <button
                    onClick={handleGetGovernanceLotteryAddress}
                    className="bg-blue-500 text-white py-2 px-4 rounded w-full"
                    disabled={isLoading}
                >
                     {isLoading ? 'Loading...' : 'Get Governance Lottery Address'}
                </button>
                <button
                    onClick={handleGetMetadata}
                    className="bg-blue-500 text-white py-2 px-4 rounded w-full"
                    disabled={isLoading}
                >
                     {isLoading ? 'Loading...' : 'Get Metadata'}
                </button>
                <button
                    onClick={handleGetOwner}
                    className="bg-blue-500 text-white py-2 px-4 rounded w-full"
                    disabled={isLoading}
                >
                     {isLoading ? 'Loading...' : 'Get Owner'}
                </button>
                <button
                    onClick={handleGetAllLottery}
                    className="bg-blue-500 text-white py-2 px-4 rounded w-full"
                    disabled={isLoading}
                >
                     {isLoading ? 'Loading...' : 'Get All Lottery'}
                </button>
            </div>

            {/* Input and Button for getting prize wildcard */}
            <div className="space-y-4 border border-gray-400 p-4 rounded">
                <h3 className="font-bold text-lg">Get Prize Wildcard</h3>
                <input
                    type="number"
                    value={inputValueGetPrizeWildcard1}
                    onChange={(e) => setInputValueGetPrizeWildcard1(parseInt(e.target.value))}
                    className="p-2 border border-gray-300 rounded text-black w-full"
                    placeholder="Enter prize wildcard index"
                />
                <button
                    onClick={handleGetPrizeWildcard}
                    className="bg-blue-500 text-white py-2 px-4 rounded w-full"
                    disabled={isLoading || inputValueGetPrizeWildcard1 === 0}
                >
                    {isLoading ? 'Loading...' : 'Get Prize Wildcard'}
                </button>
            </div>

            {/* Input and Button for buying lottery */}
            <div className="space-y-4 border border-gray-400 p-4 rounded">
                <h3 className="font-bold text-lg">Buy Lottery</h3>
                <input
                    type="number"
                    value={inputValueBuyLotter1}
                    onChange={(e) => setInputValueBuyLotter1(e.target.value)}
                    className="p-2 border border-gray-300 rounded text-black w-full"
                    placeholder="Enter lottery number"
                />
                <button
                    onClick={handleBuyLottery}
                    className="bg-blue-500 text-white py-2 px-4 rounded w-full"
                    disabled={isLoading || inputValueBuyLotter1.length !== 6}
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
}

export { TestWildcardContract };