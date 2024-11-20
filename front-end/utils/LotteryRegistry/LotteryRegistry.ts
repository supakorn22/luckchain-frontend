import { Contract, ethers } from "ethers";
import getSigner from "../getSigner";
import json from "./.json";
import { get } from "http";
import useWeb3 from '@hooks/useWeb3';
import {WildcardDealerMetadata } from '@interfaces/contract';
import getBalance from '../getBalance';
import { promises } from "dns";

// Constants and configuration
export const CONTRACT_CONFIG = {
    ADDRESS:  process.env.NEXT_PUBLIC_LotteryRegistry_ADDRESS ||"0x9f04b4747e6C3dbC5a9Cad023668160390E49DAA",
    ABI: json.abi,
    BYTECODE : json.bytecode
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

    async deploy(governanceLotteryAddress: string,prizeWildcards: boolean [],tickerPrice :number,prizeAmount :number) : Promise<string> {
        try {
          const signer = await getSigner();
          const factory = new ethers.ContractFactory(CONTRACT_CONFIG.ABI, CONTRACT_CONFIG.BYTECODE, signer);
          const contract = await factory.deploy(governanceLotteryAddress,prizeWildcards,tickerPrice,prizeAmount);
          await contract.waitForDeployment();
          const deployAddress =  await contract.getAddress();
          this.setContractAddress(deployAddress);
          return deployAddress;
    
        } catch (error) {
          console.error("Error deploying contract:", error);
          throw error;
        }
    
      },

    async add(lotteryBase: string,lotteryTicket : string ){

        try{
            const contract = await this.getContractInstance();
        await contract.add(lotteryBase,lotteryTicket);

        }
        catch(error){
            console.error("Error add lottery", error);
            throw error;
        }

    },


    async queryByWinningPrize(lotteryType:boolean,minWinning :number =0,maxWinning:number = 100000000000) {
            
            try{
                const contract = await this.getContractInstance();
                const result = await contract.queryByWinningPrize(lotteryType,minWinning,maxWinning);
                return result;
            }
            catch(error){
                console.error("Error queryByWinningPrize", error);
                throw error;
            }
    },



};