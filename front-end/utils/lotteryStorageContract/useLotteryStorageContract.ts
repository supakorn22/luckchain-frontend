import { Contract, ethers } from "ethers";
import getSigner from "../getSigner";
import CONTRACT_ABI from "./ABI.json";
import { get } from "http";
import useWeb3 from '@hooks/useWeb3';
import {GovernanceLottery,WildcardDealerLottery} from '@interfaces/contract';
import getBalance from '../getBalance';

// Constants and configuration
export const CONTRACT_CONFIG = {
  ADDRESS: process.env.NEXT_PUBLIC_CONTRACT3_ADDRESS  || "",
  ABI: CONTRACT_ABI,
  BYTECODE: process.env.NEXT_PUBLIC_CONTRACT3_BYTECODE || "",
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
    async deploy(randomContractAddress: string,tickerPrice :number,prizeAmount :number) : Promise<string> {
        try {
          const signer = await getSigner();
          const factory = new ethers.ContractFactory(CONTRACT_CONFIG.ABI, CONTRACT_CONFIG.BYTECODE, signer);
          const contract = await factory.deploy(randomContractAddress,tickerPrice,prizeAmount);
          await contract.waitForDeployment();
          const deployAddress =  await contract.getAddress();
          this.setContractAddress(deployAddress);
          return deployAddress;
    
        } catch (error) {
          console.error("Error deploying contract:", error);
          throw error;
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



    async searchGovernanceByPriceRange(minPrice: number, maxPrice: number): Promise<GovernanceLottery[]> {

        try{
            const contract = await this.getContractInstance();
            const governanceLottery = await contract.searchGovernanceByPriceRange(minPrice,maxPrice);
            return governanceLottery

        }
        catch(error){
            console.error("Error search governance lottery by price:", error);
            throw error;
        }

    },

    async searchGovernanceByRewardRange(minReward: number, maxReward: number): Promise<GovernanceLottery[]> {

        try{
            const contract = await this.getContractInstance();
            const governanceLottery = await contract.searchGovernanceByRewardRange(minReward,maxReward);
            return governanceLottery

        }
        catch(error){
            console.error("Error search governance lottery by reward:", error);
            throw error;
        }

    },

    async searchWildcardDealerByPriceRange(minPrice: number, maxPrice: number): Promise<WildcardDealerLottery[]> {

        try{
            const contract = await this.getContractInstance();
            const governanceLottery = await contract.searchWildcardDealerByPriceRange(minPrice,maxPrice);
            return governanceLottery

        }
        catch(error){
            console.error("Error search wildcard dealer lottery by price:", error);
            throw error;
        }

    },
    async searchWildcardDealerByRewardRange(minReward: number, maxReward: number): Promise<WildcardDealerLottery[]> {

        try{
            const contract = await this.getContractInstance();
            const governanceLottery = await contract.searchWildcardDealerByRewardRange(minReward,maxReward);
            return governanceLottery

        }
        catch(error){
            console.error("Error search wildcard dealer lottery by reward:", error);
            throw error;
        }

    },
    async searchWildcardDealerByWildcard(prizeWildcards:boolean[]): Promise<WildcardDealerLottery[]> {

        try{
            const contract = await this.getContractInstance();
            const governanceLottery = await contract.searchWildcardDealerByWildcard(prizeWildcards);
            return governanceLottery

        }
        catch(error){
            console.error("Error search wildcard dealer lottery by reward:", error);
            throw error;
        }

    },


    async setOwner(newOwner: string) {
        try {
            const contract = await this.getContractInstance();
            await contract.setOwner(newOwner);
        } catch (error) {
            console.error("Error setting owner:", error);
            throw error;
        }
    },

    async appendGovernanceLottery(tickerPrice : number, prizeAmount: number,contractAddress : string,owner : string) {
            try {
                const contract = await this.getContractInstance();
                await contract.appendGovernanceLottery(tickerPrice,prizeAmount,contractAddress,owner);
            } catch (error) {
                console.error("Error appending governance lottery:", error);
                throw error;
            }


    },
    async appendWildcardDealerLottery(tickerPrice : number, prizeAmount: number,contractAddress : string,owner : string,editor :string,prizeWildcards : boolean[]) {
        try {
            const contract = await this.getContractInstance();
            await contract.appendWildcardDealerLottery(tickerPrice,prizeAmount,contractAddress,owner,editor,prizeWildcards);
        } catch (error) {
            console.error("Error appending wildcard dealer lottery:", error);
            throw error;
        }
    },
}

export default contractUtils;