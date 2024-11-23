import { Contract, ethers } from "ethers";
import getSigner from "../getSigner";
import json from "./.json";
import { get } from "http";
import useWeb3 from '@hooks/useWeb3';
import getBalance from '../getBalance';
import useExactMatchDealerLottery from '@utils/ExactMatchDealerLottery/useExactMatchDealerLottery'
import useCustomDigitsDealerLottery from '@utils/CustomDigitsDealerLottery/useCustomDigitsDealerLottery';
import useLotteryTicket from '@utils/LotteryTicket/useLotteryTicket';

// Constants and configuration
export const CONTRACT_CONFIG = {
  ADDRESS: "xxx",
  ABI: json.abi,
  BYTECODE: json.bytecode
};

const contractUtils = {

  contractAddress: CONTRACT_CONFIG.ADDRESS,


  async getContractInstance() {
    const signer = await getSigner();
    if (!signer) throw new Error("Signer not found");
    return new ethers.Contract(this.contractAddress, CONTRACT_CONFIG.ABI, signer);
  },

  setContractAddress(newAddress: string) {
    if (ethers.isAddress(newAddress)) {
      this.contractAddress = newAddress;
    } else {
      throw new Error("Invalid address");
    }
  },


  // cant deploy
  // async deploy(governanceLotteryAddress: string, prizeWildcards: boolean[], tickerPrice: number, prizeAmount: number): Promise<string> {
  //   try {
  //     const signer = await getSigner();
  //     const factory = new ethers.ContractFactory(CONTRACT_CONFIG.ABI, CONTRACT_CONFIG.BYTECODE, signer);
  //     const contract = await factory.deploy(governanceLotteryAddress, prizeWildcards, tickerPrice, prizeAmount);
  //     await contract.waitForDeployment();
  //     const deployAddress = await contract.getAddress();
  //     this.setContractAddress(deployAddress);
  //     return deployAddress;

  //   } catch (error) {
  //     console.error("Error deploying contract:", error);
  //     throw error;
  //   }

  // },

  async buyers(number: number): Promise<string> {
    try {
      const contract = await this.getContractInstance();
      const address = await contract.buyers(number);
      return address;
    }
    catch (error) {
      console.error("Error buyers", error);
      throw error;
    }
  },

  async getTickets(address: string): Promise<number[]> {
    try {
      const contract = await this.getContractInstance();
      const ticket = await contract.getTickets(address);
      const numberList = ticket.map((bigNum: any) => Number(bigNum));
      return numberList;
    }
    catch (error) {
      console.error("Error getTicket", error);
      throw error;
    }

  },

  async getAmount(): Promise<number> {
    try {
      const contract = await this.getContractInstance();
      const amount = await contract.getAmount();
      return Number(amount);
    }
    catch (error) {
      console.error("Error getAmount", error);
      throw error;
    }
  },

  async metadata(): Promise<ContractMetadata> {
    try {
      const contract = await this.getContractInstance();
      const metadata = await contract.metadata();
      return {
        status: Number(metadata[0]),
        winningNumber: Number(metadata[1]),
        winnigPrize: Number(metadata[2]),
        winningNumberValid: metadata[3]
      } as ContractMetadata;
    }
    catch (error) {
      console.error("Error metadata", error);
      throw error;
    }
  },


  async checkDealer(): Promise<boolean> {
    try {
      try {
        useCustomDigitsDealerLottery.setContractAddress(this.contractAddress);
        await useCustomDigitsDealerLottery.targetDigit(0);
        return true
      }
      catch (error) {
        return false
      }
    }
    catch (error) {
      console.error("Error checkDealer", error);
      throw error;
    }
  },

  async getAllBuyedTickets(): Promise<BuyedTicket[]> {
    try {
      let buyedTickets: BuyedTicket[] = [];

      const contract = await this.getContractInstance();


      const ticketNumbers = await contract.getTickets();

      const lotteryTicketAddress = await contract.lotteryTicket();
      useLotteryTicket.setContractAddress(lotteryTicketAddress);

      let amouns: number[] = [];

      const contractAddress = this.contractAddress;
      const lotteryType = await contract.lotteryType();
      const isCustomDigits = await this.checkDealer();
      const digits = await useLotteryTicket.digits();
      const ticketPrices = await useLotteryTicket.getListingPrice();
      const baseLottery = this.contractAddress
      const contractMetadata = await contract.metadata();
      let targetDigits = undefined;
      if (isCustomDigits) {
        targetDigits = await useCustomDigitsDealerLottery.targetDigits();
      }

      for (const ticketNumber of ticketNumbers) {
        const amount = await contract.getAmount(ticketNumber);
        buyedTickets.push({ contractAddress,lotteryType, isCustomDigits, digits, amount, ticketPrices, ticketNumber, baseLottery, targetDigits, contractMetadata });
      }

      return buyedTickets;
    }
    catch (error) {
      console.error("Error getTicket", error);
      throw error;
    }

  },

  async LotteryTicket(): Promise<string> {
    try {
      const contract = await this.getContractInstance();
      const address = await contract.lotteryTicket();
      return address;
    }
    catch (error) {
      console.error("Error LotteryTicket", error);
      throw error;
    }
  },

  async buy(ticketNumber: number, ticketAmount: number):Promise<void> {


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

      const sumPrice = price * ticketAmount
      // Check if user balance is enough
      if (balance < sumPrice / 10 ** 18) {
        alert("You do not have enough money to complete this transaction.");

        throw new Error('Insufficient balance to buy the lottery ticket.');
      }

      const tx = await contract.buy(ticketNumber, ticketAmount, {
        from: userAddress,
        value: sumPrice,
      });

      console.log('Lottery ticket purchased successfully:', tx);
      alert('Lottery ticket purchased successfully:');

    }

    catch (error) {
      console.error("Error buying ticket", error);
      throw error;
    }

  },


};


export default contractUtils;