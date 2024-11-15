import { Contract, ethers } from "ethers";
import getSigner from "../getSigner";
import CONTRACT_ABI from "./ABI.json";
import { get } from "http";
import useWeb3 from '@hooks/useWeb3';
import {WildcardDealerMetadata } from '@interfaces/contract';
import getBalance from '../getBalance';

// Constants and configuration
export const CONTRACT_CONFIG = {
  ADDRESS: process.env.NEXT_PUBLIC_CONTRACT2_ADDRESS  || "",
  ABI: CONTRACT_ABI,
  BYTECODE: process.env.NEXT_PUBLIC_CONTRACT2_BYTECODE || "",
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

    async getMetaData(): Promise<WildcardDealerMetadata> {
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

      async getLotteryPrice(): Promise<number> {
        const metadata = await this.getMetaData();
        const price = metadata.tickerPrice;
        return price
      },

      async buyLottery(lotteryNumber: string) {

        if (lotteryNumber.length !== 6) {
          throw new Error('Invalid lottery number. It must have 6 digits.');
        }



        try {
          // Step 1: Get the contract instance
          const contract = await this.getContractInstance();
    
          // Step 2: Retrieve the lottery price
          const price = await this.getLotteryPrice();
    
          // Step 3: Ensure the user has enough balance or ETH to buy the ticket
          const accounts = await window.ethereum.request({ method: 'eth_accounts' });
          const userAddress = accounts[0];
    
          const balance = await window.ethereum.request({
            method: 'eth_getBalance',
            params: [userAddress, 'latest'],
          });
    
    
    
          // Check if user balance is enough
          if (balance < price / 10 ** 18) {
            throw new Error('Insufficient balance to buy the lottery ticket.');
          }
          

          const lotteryNumberFormated = lotteryNumber.split('').map(Number);

          // Step 4: Send the transaction to buy the lottery ticket
          const tx = await contract.buyLottery(lotteryNumberFormated, {
            from: userAddress,
            value: price,
          });
    
          console.log('Lottery ticket purchased successfully:', tx);
          return tx;
    
        } catch (error) {
          console.error('Error purchasing lottery ticket:', error);
          throw error;
        }
      }
    
    


}



export default contractUtils;