

import React, { useState } from 'react';
import useWildcardContract from '@utils/wildcardDealerLottery/useWildcardDealerLottery';
import useWeb3 from '@hooks/useWeb3';


const TestWildcardContract: React.FC = () => {

    const [isLoading, setIsLoading] = useState(false);


    const [inputValueChangeAddress1, setInputValueChangeAddress1] = useState<string | "">("");
    const [currentContractAddress, setCurrentContractAddress] = useState<string | "">(useWildcardContract.contractAddress);

    const handleLotteryAddress = async () => {
        useWildcardContract.setContractAddress(inputValueChangeAddress1);
        setCurrentContractAddress(inputValueChangeAddress1);
        console.log("Contract address changed to:", inputValueChangeAddress1);

    }


    const handleGetContractAddress = async () => {
        console.log("Current contract address:", useWildcardContract.contractAddress);
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



        </div>
    );
}

export { TestWildcardContract };