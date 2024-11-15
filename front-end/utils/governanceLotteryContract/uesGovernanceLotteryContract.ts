import { Contract, ethers } from "ethers";
import getSigner from "../getSigner";
import CONTRACT_ABI from "./ABI.json";
import { get } from "http";
import useWeb3 from '@hooks/useWeb3';
import { LotteriesMetadata } from '@interfaces/contract';
import getBalance from '../getBalance';


// Constants and configuration
export const CONTRACT_CONFIG = {
  ADDRESS: process.env.NEXT_PUBLIC_CONTRACT1 || "",
  ABI: CONTRACT_ABI,
};



// Contract utility functions
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

  async buyer_to_lotteries(buyerAddress: string, lotteryNumber: number): Promise<string> {
    try {
      const contract = await this.getContractInstance();

      // Call the mapping function on the smart contract
      let lottery = await contract.buyer_to_lotteries(buyerAddress, lotteryNumber);
      lottery = lottery.toString().padStart(6, '0');  // Ensure the lottery number has 6 characters with leading zeros if needed
      console.log(lottery);
      return lottery;
    } catch (error) {
      console.error("Error fetching buyer's lottery:", error);
      throw error;
    }
  },

  async findUserAllLottery(buyerAddress: string): Promise<string[]> {
    const lotteries: string[] = [];
    let lotteryNumber = 0;

    while (true) {
      try {
        const lottery = await this.buyer_to_lotteries(buyerAddress, lotteryNumber);
        lotteries.push(String(lottery));
        lotteryNumber++;
      } catch (error) {
        if (lotteryNumber === 0) {
          console.error("Error: User has no lotteries or invalid address.");
          throw new Error("User has no lotteries or invalid address.");
        }
        break; // Stop the loop if no more lotteries are found or an error occurs after the first attempt.
      }
    }

    return lotteries;
  },

  async getUserAllLottery(buyerAddress: string): Promise<string[]> {
    try {
      const contract = await this.getContractInstance();

      // Call the mapping function on the smart contract
      let lotteries: string[] = await contract.getCustomerLottery(buyerAddress);

      lotteries = lotteries.map(lottery => lottery.toString().padStart(6, '0'));

      console.log(lotteries);

      return lotteries;
    } catch (error) {
      console.error("Error fetching buyer's lottery:", error);
      throw error;
    }

  },




  async getMetaData(): Promise<LotteriesMetadata> {
    try {
      // Call the metadata function from the contract
      const contract = await this.getContractInstance();

      const metadata = await contract.metadata(); // This returns a promise that resolves with the contract metadata

      // Format the data (if necessary)
      return {
        tickerPrice: Number(metadata.tickerPrice),
        prizeAmount: Number(metadata.prizeAmount),
        prizeNumber: Number(metadata.prizeNumber),
        status: Number(metadata.status),
        balance: Number(metadata.balance),
      };
    } catch (error) {
      console.error("Error fetching contract metadata:", error);
      throw error;
    }

  },

  async startLottery() {
    try {

      const contract = await this.getContractInstance();

      await contract.startLottery();


    } catch (error) {
      console.error("Error start lottery", error);
      throw error;
    }

  },

  async endLottery() {
    try {

      const contract = await this.getContractInstance();

      await contract.endLottery();


    } catch (error) {
      console.error("Error end lottery", error);
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

  async archiveLottery() {
    try {
      const contract = await this.getContractInstance();

      await contract.archiveLottery();


    } catch (error) {
      console.error("Error archive lottery", error);
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

      // Step 4: Send the transaction to buy the lottery ticket
      const tx = await contract.buyLottery(lotteryNumber, {
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




};



export default contractUtils;