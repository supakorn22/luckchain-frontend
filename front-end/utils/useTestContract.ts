// utils/constants.ts

import { ethers } from "ethers";
import  getSigner  from "./getSigner";

export const CONTRACT_ADDRESS = "0x45c2eB1b5809A44918910Ff042C677e96c49423d";
export const CONTRACT_ABI = [
    {
		"inputs": [
			{
				"internalType": "uint256",
				"name": "num",
				"type": "uint256"
			}
		],
		"name": "store",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "retrieve",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];




// Function to interact with the contract
export default async function useContract(action: string, value?: number) {
  const signer = await getSigner();
  if (signer) {
    const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

    try {
      if (action === "store" && value !== undefined) {
        // Call store function (state-changing transaction)
        const tx = await contract.store(value);
        console.log("Transaction hash:", tx.hash);
        await tx.wait();
        console.log("Transaction mined");
        return tx.hash; // Return the transaction hash
      } else if (action === "retrieve") {
        // Call retrieve function (view function)
        const result = await contract.retrieve();
        console.log("Retrieved value:", result.toString()); // Return the result as a string
        return result.toString();
      }
    } catch (error) {
      console.error("Error interacting with contract:", error);
    }
  }
}