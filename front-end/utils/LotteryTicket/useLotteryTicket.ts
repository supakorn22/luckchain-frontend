import { Contract, ethers } from "ethers";
import getSigner from "../getSigner";
import json from "./.json";
import { get } from "http";
import useWeb3 from '@hooks/useWeb3';
import getBalance from '../getBalance';


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

  async deploy(maxSet: number, fallbackTicketPrice: number, digits: number): Promise<string> {
    try {
      const signer = await getSigner();
      const factory = new ethers.ContractFactory(CONTRACT_CONFIG.ABI, CONTRACT_CONFIG.BYTECODE, signer);
      const contract = await factory.deploy(maxSet, fallbackTicketPrice, digits);
      await contract.waitForDeployment();
      const deployAddress = await contract.getAddress();
      this.setContractAddress(deployAddress);
      return deployAddress;

    } catch (error) {
      console.error("Error deploying contract:", error);
      throw error;
    }

  },

  async getListingPrice(): Promise<number> {
    try {
      const contract = await this.getContractInstance();
      const listingPrice = await contract.getListingPrice();
      return Number(listingPrice);
    }
    catch (error) {
      console.error("Error getting listing price:", error);
      throw error;
    }

  },

  async setMinter(address: string) {
    try {
      const contract = await this.getContractInstance();
      await contract.setMinter(address);
    }
    catch (error) {
      console.error("Error setting minter:", error);
      throw error;
    }

  },
  async digits(): Promise<number> {
    try {
      const contract = await this.getContractInstance();
      const digits = await contract.digits();
      return Number(digits);
    }
    catch (error) {
      console.error("Error getting digits:", error);
      throw error;
    }

  },


  async getFullMetadata(): Promise<LotteryTicketFullMetadata> {
    try {
      const contract = await this.getContractInstance();
      const digits = Number(await contract.digits());
      const fallbackTicketPrice = Number(await contract.fallbackTicketPrice());
      const getListingPrice = Number(await contract.getListingPrice());
      const MAX_TICKET_NUMBER = Number(await contract.MAX_TICKET_NUMBER());
      const maxSet = await Number(contract.maxSet());
      const minter = await contract.minter();
      const owner = await contract.owner();
      return { digits, fallbackTicketPrice, getListingPrice, MAX_TICKET_NUMBER, maxSet, minter, owner };
    }
    catch (error) {
      console.error("Error getting metadata", error);
      throw error;
    }

  }

}

export default contractUtils;