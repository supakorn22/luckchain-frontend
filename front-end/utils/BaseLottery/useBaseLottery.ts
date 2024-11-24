import { Contract, ethers } from "ethers";
import getSigner from "../getSigner";
import json from "./.json";
import { get } from "http";
import useWeb3 from '@hooks/useWeb3';
import getBalance from '../getBalance';
import useExactMatchDealerLottery from '@utils/ExactMatchDealerLottery/useExactMatchDealerLottery'
import useCustomDigitsDealerLottery from '@utils/CustomDigitsDealerLottery/useCustomDigitsDealerLottery';
import useLotteryTicket from '@utils/LotteryTicket/useLotteryTicket';
import useGovernmentLottery from '@utils/GovernmentLottery/useGovernmentLottery';
import { start } from "repl";
import { use } from "react";

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

  async getAmount(buyers: string, ticketNumber: Number): Promise<number> {
    try {
      const contract = await this.getContractInstance();
      const amount = await contract.getAmount(buyers, ticketNumber);
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
      const accounts = await window.ethereum.request({ method: 'eth_accounts' });
      const userAddress = accounts[0];

      const ticketNumbers = await contract.getTickets(userAddress);

      if (ticketNumbers.length == 0) {
        return [];
      }

      const lotteryTicketAddress = await contract.lotteryTicket();
      useLotteryTicket.setContractAddress(lotteryTicketAddress);


      const contractAddress = this.contractAddress;
      const lotteryType = Number(await contract.lotteryType());
      const isCustomDigits = lotteryType ==0 ? false :  await this.checkDealer();
      const digits = Number(await useLotteryTicket.digits());
      const ticketPrices = Number(await useLotteryTicket.getListingPrice());
      const baseLottery = this.contractAddress
      let contractMetadatat = await this.metadata();
      let targetDigits = undefined;
      if (lotteryType == 1) {
        useExactMatchDealerLottery.setContractAddress(this.contractAddress);
        const governanceLotteryAddress = await useExactMatchDealerLottery.governmentLottery();
        useGovernmentLottery.setContractAddress(governanceLotteryAddress);
        const governmentMetadata = await useGovernmentLottery.metadata();
        if (governmentMetadata.status == 3)
          contractMetadatat.winningNumber = governmentMetadata.winningNumber;
        contractMetadatat.winningNumberValid = governmentMetadata.winningNumberValid;

        if (isCustomDigits) {
          useCustomDigitsDealerLottery.setContractAddress(this.contractAddress);
          targetDigits = await useCustomDigitsDealerLottery.targetDigits();
        }
      }

      const contractMetadata = contractMetadatat;

      

      for (const ticketNumberN of ticketNumbers) {
        const ticketNumber = Number(ticketNumberN);
        const amount = Number(await contract.getAmount(userAddress, ticketNumber));
        buyedTickets.push({ contractAddress, lotteryType, isCustomDigits, digits, amount, ticketPrices, ticketNumber, baseLottery, targetDigits, contractMetadata });
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

  async buy(ticketNumber: number, ticketAmount: number): Promise<void> {


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
  async start(): Promise<void> {
    try {
      const contract = await this.getContractInstance();
      await contract.start();
    }
    catch (error) {
      console.error("Error start", error);
      throw error;
    }
  },
  async end(): Promise<void> {
    try {
      const contract = await this.getContractInstance();
      await contract.end();
    }
    catch (error) {
      console.error("Error end", error);
      throw error;
    }
  },
  async payPrize(): Promise<void> {
    try {
      const contract = await this.getContractInstance();
      await contract.payPrize();
    }
    catch (error) {
      console.error("Error payPrize", error);
      throw error;
    }
  },
  async archive(): Promise<void> {
    try {
      const contract = await this.getContractInstance();
      await contract.archive();
    }
    catch (error) {
      console.error("Error archive", error);
      throw error;
    }
  },
  async owner(): Promise<string> {
    try {
      const contract = await this.getContractInstance();
      const owner = await contract.owner();
      return owner;
    }
    catch (error) {
      console.error("Error owner", error);
      throw error;
    }
  }

};


export default contractUtils;