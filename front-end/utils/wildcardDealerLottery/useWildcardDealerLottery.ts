import { Contract, ethers } from "ethers";
import getSigner from "../getSigner";
import CONTRACT_ABI from "./ABI.json";
import { get } from "http";
import useWeb3 from '@hooks/useWeb3';
import { LotteriesMetadata,wildcardDealerLottery } from '@interfaces/contract';
import getBalance from '../getBalance';

// Constants and configuration
export const CONTRACT_CONFIG = {
  ADDRESS: "0x0E80397d98eaA57944cF291Da6121Fd12bd41EbB",
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

    async getGovernanceLotteryAddress() : Promise<string> {

        try{
            const contract = await this.getContractInstance();
            const governanceAddress = await contract.governance();
            return governanceAddress

        }
        catch(error){
            console.error("Error getting governance address:", error);
            throw error;
        }

    },

    async getMetaData(): Promise<wildcardDealerLottery> {
        try {
          // Call the metadata function from the contract
          const contract = await this.getContractInstance();
    
          const metadata = await contract.metadata(); // This returns a promise that resolves with the contract metadata
    
          // Format the data (if necessary)
          return {
            tickerPrice: Number(metadata.tickerPrice),
            prizeAmount: Number(metadata.prizeAmount),
            balance: Number(metadata.balance),
          };
        } catch (error) {
          console.error("Error fetching contract metadata:", error);
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

    async getPrizeWildcard (digit:number) : Promise<boolean> {
            try{
                if(digit < 0 || digit > 5){
                    throw new Error("Invalid digit")
                }
                const contract = await this.getContractInstance();
                const prize = await contract.prize(digit);
                return prize
            }
            catch(error){
                console.error("Error getting prize wildcard:", error);
                throw error;
            }
    },
    
    async getUserAllLottery(buyerAddress: string): Promise<string[]> {
        try {
          const contract = await this.getContractInstance();
    
          // Call the mapping function on the smart contract
          let lotteries: (number[])[] = await contract.getCustomerLottery(buyerAddress);
    
          
          let formattedLotteries: string[] = lotteries.map((lottery) => {
            return lottery.join('').padStart(6, '0');
        });
    
          console.log(formattedLotteries);
    
          return formattedLotteries;
        } catch (error) {
          console.error("Error fetching buyer's lottery:", error);
          throw error;
        }
    
      },
    
      async payPrize() {
        try {
          const contract = await this.getContractInstance();
    
          await contract.payPrize();
    
    
        } catch (error) {
          console.error("Error pay price", error);
          throw error;
        }
    
      },
    


}



export default contractUtils;