import { ethers } from "ethers";
import getSigner from "../getSigner";
import CONTRACT_ABI from "./ABI.json";

// Constants and configuration
export const CONTRACT_CONFIG = {
  ADDRESS: "0x7C06b5533CE4F7546D3d906d82cbCAfE4F906d1e",
  ABI: CONTRACT_ABI,
};



// Contract utility functions
const contractUtils = {
    async getContractInstance() {
      const signer = await getSigner();
      if (!signer) throw new Error("Signer not found");
      return new ethers.Contract(CONTRACT_CONFIG.ADDRESS, CONTRACT_CONFIG.ABI, signer);
    },
  

  };
  
  export default contractUtils;