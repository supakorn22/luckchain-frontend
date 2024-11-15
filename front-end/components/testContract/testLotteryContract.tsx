// components/ContractInteraction.tsx

import React, { useState } from 'react';
import useTestContract from '@utils/governanceLotteryContract/uesGovernanceLotteryContract';
import useWeb3 from '@hooks/useWeb3';

const ContractInteraction: React.FC = () => {

    const { accounts } = useWeb3();  // Assuming useWeb3() provides the accounts
    const buyerAddress = accounts[0]?.address; // Use the first account address as buyer address



    // State for contract data and input value
    const [contractData, setContractData] = useState<string | null>(null);

    const [inputValueBuyer_to_lotteries1, setInputValueBuyer_to_lotteries1] = useState<string | "">(""); // Input value for storing
    const [inputValueBuyer_to_lotteries2, setInputValueBuyer_to_lotteries2] = useState<number | 0>(0); // Input value for storing
    const [isLoading, setIsLoading] = useState(false);
    const [inputValueBuyLotter1, setInputValueBuyLotter1] = useState<number | 0>(0);

    // Function to interact with the contract
    const handleBuyer_to_lotteries = async () => {
        setIsLoading(true);
        try {
            const txHash = await useTestContract.buyer_to_lotteries(inputValueBuyer_to_lotteries1, inputValueBuyer_to_lotteries2); // Store value
            setContractData(`Transaction successful. Hash:${txHash}`);
        } catch (error) {
            console.error("Error interacting with contract:", error);
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
        } finally {
            setIsLoading(false);
        }

    }


    return (
        <div className="flex flex-col justify-evenly h-screen pt-24 px-4 md:px-8 md:pt-8 lg:px-16">

            {/* Input and Button for store */}
            <div className="space-y-4">
                <input
                    type="text"
                    value={inputValueBuyer_to_lotteries1}
                    onChange={(e) => setInputValueBuyer_to_lotteries1(e.target.value)}
                    className="mt-4 p-2 border border-gray-300 rounded text-black"
                    placeholder="Enter address "
                />
                <input
                    type="number"
                    value={inputValueBuyer_to_lotteries2}
                    onChange={(e) => setInputValueBuyer_to_lotteries2(Number(e.target.value))}
                    className="mt-4 p-2 border border-gray-300 rounded text-black"
                    placeholder="Enter lottery number"
                />



                <button
                    onClick={handleBuyer_to_lotteries}
                    className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
                    disabled={isLoading || inputValueBuyer_to_lotteries1 === "" && inputValueBuyer_to_lotteries2 === 0}
                >
                    {isLoading ? 'Loading...' : 'get lottery'}
                </button>
            </div>


            <div className="space-y-4">

                <button
                    onClick={handleGetAllLottery}
                    className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
                    disabled={isLoading}
                >
                    {isLoading ? 'Loading...' : 'get all lottery'}
                </button>

            </div>



            <div className="space-y-4">

                <button
                    onClick={handleGetMetadata}
                    className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
                    disabled={isLoading}
                >
                    {isLoading ? 'Loading...' : 'get metadata'}
                </button>

            </div>



            <div className="space-y-4">

                <button
                    onClick={handelStartLottery}
                    className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
                    disabled={isLoading}
                >
                    {isLoading ? 'Loading...' : 'start lottery'}
                </button>

            </div>



            <div className="space-y-4">
                <input
                    type="number"
                    value={inputValueBuyLotter1}
                    onChange={(e) => setInputValueBuyLotter1(Number(e.target.value))}
                    className="mt-4 p-2 border border-gray-300 rounded text-black"
                    placeholder="Enter lottery number"
                />
                <button
                    onClick={handleBuyLottery}
                    className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
                    disabled={isLoading}
                >
                    {isLoading ? 'Loading...' : 'buy lottery'}
                </button>

            </div>

            {/* Display contract data */}
            {contractData && (
                <div className="mt-4 text-white">
                    <h3>Contract Response:</h3>
                    <pre>{contractData}</pre>
                </div>
            )}
        </div>





    );
};

export default ContractInteraction;
