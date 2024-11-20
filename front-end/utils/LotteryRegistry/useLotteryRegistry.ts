import { Contract, ethers } from "ethers";
import getSigner from "../getSigner";
import json from "./.json";
import { get } from "http";
import useWeb3 from '@hooks/useWeb3';
import { WildcardDealerMetadata } from '@interfaces/contract';
import getBalance from '../getBalance';
import { promises } from "dns";
import useGovernmentLottery from '@utils/GovernmentLottery/useGovernmentLottery';



// Constants and configuration
export const CONTRACT_CONFIG = {
    ADDRESS: process.env.NEXT_PUBLIC_LotteryRegistry_ADDRESS || "0x471b9e9f7779D86e7367b936F7E0A2Dc7BAfD2e3",
    ABI: json.abi,
    BYTECODE: json.bytecode
};

const contractUtils = {

    contractAddress: CONTRACT_CONFIG.ADDRESS,


    async getContractInstance() {
        const signer = await getSigner();
        if (!signer) throw new Error("Signer not found");
        return new ethers.Contract(CONTRACT_CONFIG.ADDRESS, CONTRACT_CONFIG.ABI, signer);
    },

    setContractAddress(newAddress: string) {
        if (ethers.isAddress(newAddress)) {
            this.contractAddress = newAddress;
        } else {
            throw new Error("Invalid address");
        }
    },

    async deploy(governanceLotteryAddress: string, prizeWildcards: boolean[], tickerPrice: number, prizeAmount: number): Promise<string> {
        try {
            const signer = await getSigner();
            const factory = new ethers.ContractFactory(CONTRACT_CONFIG.ABI, CONTRACT_CONFIG.BYTECODE, signer);
            const contract = await factory.deploy(governanceLotteryAddress, prizeWildcards, tickerPrice, prizeAmount);
            await contract.waitForDeployment();
            const deployAddress = await contract.getAddress();
            this.setContractAddress(deployAddress);
            return deployAddress;

        } catch (error) {
            console.error("Error deploying contract:", error);
            throw error;
        }

    },

    async add(lotteryBase: string, lotteryTicket: string) {

        try {
            const contract = await this.getContractInstance();
            await contract.add(lotteryBase, lotteryTicket);

        }
        catch (error) {
            console.error("Error add lottery", error);
            throw error;
        }

    },


    async queryByWinningPrize(lotteryType: boolean, minWinning: number = 0, maxWinning: number = 100000000000) {

        try {
            const contract = await this.getContractInstance();
            const result = await contract.queryByWinningPrize(lotteryType, minWinning, maxWinning);
            return result;
        }
        catch (error) {
            console.error("Error queryByWinningPrize", error);
            throw error;
        }
    },

    async queryById(type: number, id: number) {

        try {
            const contract = await this.getContractInstance();
            const result = await
                contract.queryById(type, id);
            return result;
        }
        catch (error) {
            console.error("Error queryById", error);
            throw error;
        }
    },

    async lotteries(type: number, index: number) {

        try {
            const contract = await this.getContractInstance();
            const result = await contract.lotteries(type, index);
            return result;
        }
        catch (error) {
            console.error("Error lotteries", error);
            throw error;
        }
    },

    async getLastGovernmentMetadata() {

        try {
            const lastAddress = await this.getLastGovernmentAddress();
            useGovernmentLottery.setContractAddress(lastAddress)
            const metadata = await useGovernmentLottery.metadata()
            return metadata

        }
        catch (error) {
            console.error("Error getLastGovernmentStatus", error);
            throw error;
        }

    },


    async getLastGovernmentAddress() {

        try {

            let i = 0;
            let addressList: string[] = [];
            const contract = await this.getContractInstance();

            for (; 1; i++) {
                const result = await contract.lotteries(0, i + 1);
                if (result[2] == false) {
                    break;
                }
                addressList[i] = result[0];
            }
            return addressList[i - 1]
        }
        catch (error) {
            console.error("Error getLastGovernmentAddress", error);
            throw error;
        }
    },





    async getLastGovernmentNotactiveAddress() {

        try {

            let i = 0;
            let addressList: string[] = [];
            const contract = await this.getContractInstance();

            for (; 1; i++) {
                const result = await contract.lotteries(0, i + 1);
                if (result[2] == false) {
                    break;
                }
                addressList[i] = result[0];
            }

            useGovernmentLottery.setContractAddress(addressList[i - 1])
            let metadata = await useGovernmentLottery.metadata()

            if (metadata[0] >= 3) {
                return addressList[i - 1]
            }

            return addressList[i - 2]




        }
        catch (error) {
            console.error("Error getLastGovernmentAddress", error);
            throw error;
        }
    },





    async getAllGovernmentLottery(): Promise<LotteryGovernmentTicket[]> {

        try {
            let i = 0;
            let addressList: string[] = [];
            const contract = await this.getContractInstance();
            let lotteryGovernmentTicket: LotteryGovernmentTicket[] = [];

            for (; 1; i++) {
                const result = await contract.lotteries(0, i + 1);
                if (result[2] == false) {
                    break;
                }
                addressList[i] = result[0];
            }

            const accounts = await window.ethereum.request({ method: 'eth_accounts' });
            const userAddress = accounts[0];

            for (const address of addressList) {
                useGovernmentLottery.setContractAddress(address)

                const metadata = await useGovernmentLottery.metadata()

                if (metadata[0] == 0)
                    break;

                const winNumber = metadata[1]
                const prize = metadata[2]
                const tickets = await useGovernmentLottery.getTickets(userAddress)

                for (const ticket of tickets) {
                    const amount = await useGovernmentLottery.getAmount(userAddress, ticket);
                    const isWinningTicket = metadata[0] >= 3 && ticket == winNumber;
                
                    // Check if the winning ticket is already stored in localStorage
                    const storedWinningTicket = localStorage.getItem('winTicket');
                    if (isWinningTicket && storedWinningTicket !== ticket.toString()) {
                        localStorage.setItem('winTicket', ticket.toString()); // Store the winning ticket number
                        alert(`Congratulations! Your winning ticket number is ${ticket}!`);
                    }
                
                    lotteryGovernmentTicket.push({
                        ticketNumber: ticket,
                        prize: prize,
                        status: metadata[0] >= 3 ? (isWinningTicket ? 'win' : 'lose') : 'process',
                        amount: amount
                    });
                }
            }


            return lotteryGovernmentTicket;

        }
        catch (error) {
            console.error("Error getAllGovernmentLottery", error);
            throw error;
        }


    }






};

export default contractUtils;