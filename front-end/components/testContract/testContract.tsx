// components/ContractInteraction.tsx

import React, { useState } from 'react';
import useTestContract from '@utils/testContract/useTestContract';
import useWeb3 from '@hooks/useWeb3';

const ContractInteraction: React.FC = () => {

  // State for contract data and input value
  const [contractData, setContractData] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState<number | "">(""); // Input value for storing
  const [isLoading, setIsLoading] = useState(false);

  // Function to interact with the contract
  const handleStoreInteraction = async () => {
    setIsLoading(true);
    try {
      const txHash = await useTestContract.store(inputValue as number); // Store value
      setContractData(`Transaction successful. Hash: ${txHash}`);
    } catch (error) {
      console.error("Error interacting with contract:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRetrieveInteraction = async () => {
    setIsLoading(true);
    try {
      const data = await useTestContract.retrieve(); // Retrieve stored value
      setContractData(`Retrieved value: ${data}`);
    } catch (error) {
      console.error("Error interacting with contract:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-evenly h-screen pt-24 px-4 md:px-8 md:pt-8 lg:px-16">

      {/* Input and Button for store */}
      <input
        type="number"
        value={inputValue}
        onChange={(e) => setInputValue(Number(e.target.value))}
        className="mt-4 p-2 border border-gray-300 rounded text-black"
        placeholder="Enter number to store"
      />
      <button
        onClick={handleStoreInteraction}
        className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
        disabled={isLoading || inputValue === ""}
      >
        {isLoading ? 'Loading...' : 'Store Value'}
      </button>

      {/* Button to retrieve stored value */}
      <button
        onClick={handleRetrieveInteraction}
        className="mt-4 bg-green-500 text-white py-2 px-4 rounded"
        disabled={isLoading}
      >
        {isLoading ? 'Loading...' : 'Retrieve Value'}
      </button>

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
