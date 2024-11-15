import { Contract, ethers } from "ethers";
import getSigner from "../getSigner";
import CONTRACT_ABI from "./ABI.json";
import { get } from "http";
import useWeb3 from '@hooks/useWeb3';
import {GovernanceLottery,WildcardDealerLottery} from '@interfaces/contract';
import getBalance from '../getBalance';

// Constants and configuration
export const CONTRACT_CONFIG = {
  ADDRESS: process.env.NEXT_PUBLIC_CONTRACT3 || "",
  ABI: CONTRACT_ABI,
};

const contractUtils = {

    contractAddress: CONTRACT_CONFIG.ADDRESS,
  
  
    async getContractInstance() {
      const signer = await getSigner();
      if (!signer) throw new Error("Signer not found");
      return new ethers.Contract(CONTRACT_CONFIG.ADDRESS, CONTRACT_CONFIG.ABI, signer);
    },
  
    setContractAddress(newAddress : string) {
      if (ethers.isAddress(newAddress)) {
        this.contractAddress = newAddress;
      } else {
        throw new Error("Invalid address");
      }
    },

    async getCurrentRound(): Promise<number> {
        try {
          const contract = await this.getContractInstance();
          const round = await contract.currentRound();
            return round;
        }
        catch(error){
            console.error("Error getting current round:", error);
            throw error;
        }
    }, 
    async getOwner() : Promise<string> {

        try{
            const contract = await this.getContractInstance();
            const owner = await contract.owner();
            return owner

        }
        catch(error){
            console.error("Error getting owner address:", error);
            throw error;
        }

    },
    // async searchGovernanceByPriceRange(minPrice: number, maxPrice: number): Promise<GovernanceLottery[]> {


    // },
}

export default contractUtils;