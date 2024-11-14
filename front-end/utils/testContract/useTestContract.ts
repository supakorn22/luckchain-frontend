
import { ethers } from "ethers";
import getSigner from "../getSigner";
import CONTRACT_ABI from "./ABI.json";

// Constants and configuration
export const CONTRACT_CONFIG = {
  ADDRESS: "0x45c2eB1b5809A44918910Ff042C677e96c49423d",
  ABI: CONTRACT_ABI,
};

// Contract utility functions
const contractUtils = {
  async getContractInstance() {
    const signer = await getSigner();
    if (!signer) throw new Error("Signer not found");
    return new ethers.Contract(CONTRACT_CONFIG.ADDRESS, CONTRACT_CONFIG.ABI, signer);
  },

  async store(value: number) {
    try {
      const contract = await this.getContractInstance();
      const tx = await contract.store(value);
      console.log("Transaction hash:", tx.hash);
      await tx.wait();
      console.log("Transaction mined");
      return tx.hash; // Return the transaction hash
    } catch (error) {
      console.error("Error storing value:", error);
      throw error;
    }
  },

  async retrieve() {
    try {
      const contract = await this.getContractInstance();
      const result = await contract.retrieve();
      console.log("Retrieved value:", result.toString());
      return result.toString(); // Return the result as a string
    } catch (error) {
      console.error("Error retrieving value:", error);
      throw error;
    }
  },
};

export default contractUtils;
