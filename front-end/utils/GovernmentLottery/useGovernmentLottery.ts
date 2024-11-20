import { Contract, ethers } from "ethers";
import getSigner from "../getSigner";
import json from "./.json";
import { get } from "http";
import useWeb3 from '@hooks/useWeb3';
import {WildcardDealerMetadata } from '@interfaces/contract';
import getBalance from '../getBalance';
import useLotteryTicket from '@utils/LotteryTicket/useLotteryTicket';

// Constants and configuration
export const CONTRACT_CONFIG = {
    ADDRESS: "xxx",
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

      async buyers  (number : number) : Promise<string> {
        try{
            const contract = await this.getContractInstance();
            const address = await contract.buyers(number);
            return address;
        }
        catch(error){
            console.error("Error buyers", error);
            throw error;
        }
    
    
    },

    async getTicket(address:string) : Promise< number[]> { 
        try{
            const contract = await this.getContractInstance();
            const ticket = await contract.getTicket(address);
            return ticket;
        }
        catch(error){
            console.error("Error getTicket", error);
            throw error;
        }   

    },

    async LotteryTicket () : Promise< string> {
        try{
            const contract = await this.getContractInstance();
            const address = await contract.LotteryTicket();
            return address;
        }
        catch(error){
            console.error("Error LotteryTicket", error);
            throw error;
        }
    },


    async buy (ticketNumber : number ,ticketAmount : number) {



        try {

          const contract = await this.getContractInstance();
          const lotteryTicket = await this.LotteryTicket();
          useLotteryTicket.setContractAddress(lotteryTicket);
          const price = await useLotteryTicket.getListingPrice();


          const accounts = await window.ethereum.request({ method: 'eth_accounts' });
          const userAddress = accounts[0];
          
          const balance = await window.ethereum.request({
            method: 'eth_getBalance',
            params: [userAddress, 'latest'],
          });
          
          // Check if user balance is enough
      if (balance < price* ticketAmount / 10 ** 18) {
        alert("You do not have enough money to complete this transaction.");

        throw new Error('Insufficient balance to buy the lottery ticket.');
      }

      const tx = await contract.buy(ticketNumber,ticketAmount, {
        from: userAddress,
        value: price,
      });

      console.log('Lottery ticket purchased successfully:', tx);

        }

        catch(error){
            console.error("Error buying ticket", error);
            throw error;
        }
        
    }

};


export default contractUtils;