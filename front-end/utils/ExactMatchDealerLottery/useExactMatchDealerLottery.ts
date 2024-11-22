import { Contract, ethers } from "ethers";
import getSigner from "../getSigner";
import json from "./.json";
import { get } from "http";
import useWeb3 from '@hooks/useWeb3';
import getBalance from '../getBalance';
import useLotteryTicket from '@utils/LotteryTicket/useLotteryTicket';
import LotteryRegistry from '@utils/LotteryRegistry/useLotteryRegistry';



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

    async deploy(governmentLotteryAddress : string,lotteryTicketAddress: string ,winningPrize :number ) : Promise<string> {
        try {
          const signer = await getSigner();
          const factory = new ethers.ContractFactory(CONTRACT_CONFIG.ABI, CONTRACT_CONFIG.BYTECODE, signer);
          const contract = await factory.deploy(governmentLotteryAddress,lotteryTicketAddress,winningPrize);
          await contract.waitForDeployment();
          const deployAddress =  await contract.getAddress();
          this.setContractAddress(deployAddress);
          return deployAddress;
    
        } catch (error) {
          console.error("Error deploying contract:", error);
          throw error;
        }
    
      },

    async sell(governmentLotteryAddress : string,winningPrize :number,tickerPrice : number ) {

      try {
        
        alert('accept metamask 4 time to finish')

        const ticketAddress = await useLotteryTicket.deploy(999999,tickerPrice,6)
        const deployAddress = await this.deploy(governmentLotteryAddress,ticketAddress,winningPrize);
        this.setContractAddress(deployAddress);
        const contractAddress = deployAddress;
        useLotteryTicket.setContractAddress(ticketAddress)

        await useLotteryTicket.setMinter(contractAddress)


        await LotteryRegistry.add(deployAddress,ticketAddress)

        console.log('done sell exac',contractAddress)


      } catch (error) {
        console.error("Error deploying contract:", error);
        throw error;
      }



    },

    async getFullMetadata(): Promise<ExactMatchDealerLotteryFullMetadata>  {
      try{
        const contract = await this.getContractInstance();
        const lotteryTicket = await contract.lotteryTicket();
        useLotteryTicket.setContractAddress(lotteryTicket);
        const lottery = await useLotteryTicket.getFullMetadata();
        const checkFund = Number(await contract.checkFund());
        const lotteryType = Number(await contract.lotteryType());
        const metadata = await contract.metadata();
        const status = metadata[0];
        const winingNumber = Number(metadata[1]);
        const winnigPrize = Number(metadata[2]);
        const winningNumberValid = metadata[3];
        const owner = await contract.owner();
        return {lottery,checkFund,lotteryTicket,lotteryType,status,winingNumber,winnigPrize,winningNumberValid,owner};
      }
      catch(error){
        console.error("Error getting metadata", error);
        throw error;
      }
    }
  


};
export default contractUtils;