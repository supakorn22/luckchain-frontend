import { Contract, ethers } from "ethers";
import getSigner from "../getSigner";
import json from "./.json";
import { get } from "http";
import useWeb3 from '@hooks/useWeb3';
import getBalance from '../getBalance';
import useLotteryTicket from '@utils/LotteryTicket/useLotteryTicket';
import useGovernmentLottery from '@utils/GovernmentLottery/useGovernmentLottery';

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
      return new ethers.Contract(this.contractAddress, CONTRACT_CONFIG.ABI, signer);
    },

    setContractAddress(newAddress : string) {
        if (ethers.isAddress(newAddress)) {
          this.contractAddress = newAddress;
        } else {
          throw new Error("Invalid address");
        }
    },

    async targetDigit(index : number) : Promise<number> {
        try{
            const contract = await this.getContractInstance();
            const digits = await contract.targetDigits(index);
            return Number(digits);
        }
        catch(error){
            console.error("Error getting target digits:", error);
            throw error;
        }
    },


    async deploy(governmentLotteryAddress: string,lotteryTicketAddress: string ,winningPrize :number,targetDigits :number [] ) : Promise<string> {
        try {
          const signer = await getSigner();
          const factory = new ethers.ContractFactory(CONTRACT_CONFIG.ABI, CONTRACT_CONFIG.BYTECODE, signer);
          const contract = await factory.deploy(governmentLotteryAddress,lotteryTicketAddress,winningPrize,targetDigits);
          await contract.waitForDeployment();
          const deployAddress =  await contract.getAddress();
          this.setContractAddress(deployAddress);
          return deployAddress;
    
        } catch (error) {
          console.error("Error deploying contract:", error);
          throw error;
        }
    
      },

      async sell(governmentLotteryAddress : string,winningPrize :number,targetDigits :number [] ,ticketPrize :number)  {

        try {
        const countDigits = targetDigits.length;

        const ticketAddress = await useLotteryTicket.deploy(9999999,ticketPrize,countDigits);  
        
        const   address= await this.deploy(governmentLotteryAddress,ticketAddress,winningPrize,targetDigits);

        useLotteryTicket.setContractAddress(ticketAddress);

        useLotteryTicket.setMinter(address);
        }
        catch(error){
            console.error("Error selling:", error);
            throw error;
        }

      },
      async targetDigits() : Promise<number[]> {
        try{

          const contract = await this.getContractInstance();
          const lotteryTicket = await contract.lotteryTicket();
          const digits = Number(lotteryTicket.digits);
          let targetDigits = [];

          for (let i = 0; i < digits; i++) {
              targetDigits[i] = Number(await contract.targetDigits(i));
          }
          return targetDigits;
        }
        catch(error){
            console.error("Error getting target digits:", error);
            throw error;
        }

      },
      async getFullMetadata() :Promise<CustomDigitsDealerLotteryFullMetadata> {
        try {
        const contractAddress = this.contractAddress;
        const contract = await this.getContractInstance();
        const lotteryTicket = await contract.lotteryTicket();
        useLotteryTicket.setContractAddress(lotteryTicket);
        const lottery = await useLotteryTicket.getFullMetadata();
        const checkFund = Number(await contract.checkFund());
        const governmentLottery = await contract.governmentLottery();
        const lotteryType = Number(await contract.lotteryType());
        const metadata = await contract.metadata();
        const status = Number(metadata[0]);
        
        const owner = await contract.owner();
        const digits = Number(lotteryTicket.digits);


       
        useGovernmentLottery.setContractAddress(governmentLottery);
        const governmentMetadata = await useGovernmentLottery.metadata();
       

        const winingNumber = Number(governmentMetadata.winningNumber);
        const winnigPrize = Number(metadata[2])
        const winningNumberValid = governmentMetadata.winningNumberValid;

        let targetDigits = [];

        for (let i = 0; i < digits; i++) {
            targetDigits[i] = Number(await contract.targetDigits(i));
        }

        return { contractAddress,lottery, checkFund,governmentLottery, lotteryTicket, lotteryType, status, winingNumber, winnigPrize, winningNumberValid, owner, targetDigits };
        } catch (error) {
        console.error("Error getting metadata", error);
        throw error;
        }
        },

        async fullDeploy(governmentLotteryAddress : string,winningPrize :number,targetDigits :number [] ,ticketPrice :number,maxSet:number = 999999 ) : Promise<[string,string]> {

          try{
            const digits = targetDigits.length;

            // deploy ticket
            const ticketAddress = await useLotteryTicket.deploy(maxSet,ticketPrice,digits)
            console.log('delpoy ticket:',ticketAddress)
            // deploy contract
            const deployAddress = await this.deploy(governmentLotteryAddress,ticketAddress,winningPrize,targetDigits);
            console.log('deploy contract:',deployAddress)
            
            // set ticket minter
            await useLotteryTicket.setMinter(deployAddress)
            console.log('set minter')
    
            return [deployAddress,ticketAddress];
    
          }
          catch(error){
            console.error("Error deploying contract:", error);
            throw error;
          }
    
        }
    };

export default contractUtils;