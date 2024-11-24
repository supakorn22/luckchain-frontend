import { Contract, ethers } from "ethers";
import getSigner from "../getSigner";
import json from "./.json";
import { get } from "http";
import useWeb3 from '@hooks/useWeb3';
import getBalance from '../getBalance';
import { promises } from "dns";
import useGovernmentLottery from '@utils/GovernmentLottery/useGovernmentLottery';
import useExactMatchDealerLottery from '@utils/ExactMatchDealerLottery/useExactMatchDealerLottery'
import useCustomDigitsDealerLottery from '@utils/CustomDigitsDealerLottery/useCustomDigitsDealerLottery';
import useLotteryTicket from '@utils/LotteryTicket/useLotteryTicket';
import useBaseLottery from '@utils/BaseLottery/useBaseLottery';
import { use } from "react";

// Constants and configuration
export const CONTRACT_CONFIG = {
    ADDRESS: process.env.NEXT_PUBLIC_LotteryRegistry_ADDRESS || "0x471b9e9f7779D86e7367b936F7E0A2Dc7BAfD2e3",
    ABI: json.abi,
    BYTECODE: json.bytecode,
    RandomSubscriberAddress: process.env.NEXT_PUBLIC_RandomSubscriber_ADDRESS || "0x722d2B77039052d3f314AcF01C144B3078135A83"
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

    async deploy(): Promise<string> {
        try {
            const signer = await getSigner();
            const factory = new ethers.ContractFactory(CONTRACT_CONFIG.ABI, CONTRACT_CONFIG.BYTECODE, signer);
            const contract = await factory.deploy();
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

    async lotteries(type: number, index: number): Promise<[string, string, boolean]> {

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





    // async getLastGovernmentNotactiveAddress() {

    //     try {

    //         let i = 0;
    //         let addressList: string[] = [];
    //         const contract = await this.getContractInstance();

    //         for (; 1; i++) {
    //             const result = await contract.lotteries(0, i + 1);
    //             if (result[2] == false) {
    //                 break;
    //             }
    //             addressList[i] = result[0];
    //         }

    //         useGovernmentLottery.setContractAddress(addressList[i - 1])
    //         let metadata = await useGovernmentLottery.metadata()

    //         if (metadata[0] >= 3) {
    //             return addressList[i - 1]
    //         }

    //         return addressList[i - 2]




    //     }
    //     catch (error) {
    //         console.error("Error getLastGovernmentAddress", error);
    //         throw error;
    //     }
    // },





    // async getAllGovernmentLottery(): Promise<LotteryGovernmentTicket[]> {

    //     try {
    //         let i = 0;
    //         let addressList: string[] = [];
    //         const contract = await this.getContractInstance();
    //         let lotteryGovernmentTicket: LotteryGovernmentTicket[] = [];

    //         for (; 1; i++) {
    //             const result = await contract.lotteries(0, i + 1);
    //             if (result[2] == false) {
    //                 break;
    //             }
    //             addressList[i] = result[0];
    //         }

    //         const accounts = await window.ethereum.request({ method: 'eth_accounts' });
    //         const userAddress = accounts[0];

    //         for (const address of addressList) {
    //             useGovernmentLottery.setContractAddress(address)

    //             const metadata = await useGovernmentLottery.metadata()

    //             if (metadata[0] == 0)
    //                 break;

    //             const winNumber = metadata[1]
    //             const prize = metadata[2]
    //             const tickets = await useGovernmentLottery.getTickets(userAddress)

    //             for (const ticket of tickets) {
    //                 const amount = await useGovernmentLottery.getAmount(userAddress, ticket);
    //                 const isWinningTicket = metadata[0] >= 3 && ticket == winNumber;

    //                 // Check if the winning ticket is already stored in localStorage
    //                 const storedWinningTicket = localStorage.getItem('winTicket');
    //                 if (isWinningTicket && storedWinningTicket !== ticket.toString()) {
    //                     localStorage.setItem('winTicket', ticket.toString()); // Store the winning ticket number
    //                     alert(`Congratulations! Your winning ticket number is ${ticket}!`);
    //                 }

    //                 lotteryGovernmentTicket.push({
    //                     ticketNumber: ticket,
    //                     prize: prize,
    //                     status: metadata[0] >= 3 ? (isWinningTicket ? 'win' : 'lose') : 'process',
    //                     amount: amount
    //                 });
    //             }
    //         }


    //         return lotteryGovernmentTicket;

    //     }
    //     catch (error) {
    //         console.error("Error getAllGovernmentLottery", error);
    //         throw error;
    //     }


    // },

    async getData(): Promise<LotteryRegistrySrotage> {
        try {
            const contract = await this.getContractInstance();
            const owner = await contract.owner();


            let governmentLotterys: GovernmentLotteryFullMetadata[] = []
            let wildcardDealerLotterys: (CustomDigitsDealerLotteryFullMetadata | ExactMatchDealerLotteryFullMetadata)[] = [];

            //get governmentLotterys
            for (let i = 1; 1; i++) {
                const governmentLottery = await contract.lotteries(0, i);
                if (governmentLottery[2] == false) {
                    break;
                }
                useGovernmentLottery.setContractAddress(governmentLottery[0]);
                governmentLotterys.push(await useGovernmentLottery.getFullMetadata());
            }

            //get wildcardDealerLotterys
            for (let i = 1; 1; i++) {
                const dealerLottery = await contract.lotteries(1, i);
                if (dealerLottery[2] == false) {
                    break;
                }

                useBaseLottery.setContractAddress(dealerLottery[0]);
                if (await useBaseLottery.checkDealer()) {
                    useCustomDigitsDealerLottery.setContractAddress(dealerLottery[0]);
                    wildcardDealerLotterys.push(await useCustomDigitsDealerLottery.getFullMetadata());
                }
                else {
                    useExactMatchDealerLottery.setContractAddress(dealerLottery[0]);
                    wildcardDealerLotterys.push(await useExactMatchDealerLottery.getFullMetadata());
                }
                // try{
                //     useCustomDigitsDealerLottery.setContractAddress(governmentLottery[0]);
                //     wildcardDealerLotterys.push(await useCustomDigitsDealerLottery.getFullMetadata());
                // }
                // catch(error){
                //     useExactMatchDealerLottery.setContractAddress(governmentLottery[0]);
                //     wildcardDealerLotterys.push(await useExactMatchDealerLottery.getFullMetadata());
                // }
            }

            return { owner, governmentLotterys, wildcardDealerLotterys };
        }
        catch (error) {
            console.error("Error getData", error);
            throw error;
        }

    },

    async getGovernmentData(): Promise<GovernmentLotteryFullMetadata[]> {
        try {
            const contract = await this.getContractInstance();
            let governmentLotterys: GovernmentLotteryFullMetadata[] = []
            for (let i = 1; 1; i++) {
                const governmentLottery = await contract.lotteries(0, i);
                if (governmentLottery[2] == false) {
                    break;
                }
                useGovernmentLottery.setContractAddress(governmentLottery[0]);
                governmentLotterys.push(await useGovernmentLottery.getFullMetadata());
            }
            return governmentLotterys;
        }
        catch (error) {
            console.error("Error getGovernmentData", error);
            throw error;
        }
    },
    // (randomContractAddress : string,winningPrize :number,tickerPrice : number,digits:number = 6,maxSet:number = 999999 )
    async addGovernmentLottery(winningPrize: number, tickerPrice: number, digits: number = 6, maxSet: number = 999999, randomContractAddress?: string) {
        if (!randomContractAddress) {
            randomContractAddress = CONTRACT_CONFIG.RandomSubscriberAddress;
        }

        alert('You need to confirm the transaction in your wallet 4 times.');
        const [contractAddress, ticketAddress] = await useGovernmentLottery.fullDeploy(randomContractAddress, winningPrize, tickerPrice, digits, maxSet)

        await this.add(contractAddress, ticketAddress);

    },

    async addWildcardDealerLottery(governmentLotteryAddress: string, winningPrize: number, targetDigits: number[], ticketPrice: number, maxSet: number = 999999) {
        alert('You need to confirm the transaction in your wallet 4 times.');
        const [contractAddress, ticketAddress] = await useCustomDigitsDealerLottery.fullDeploy(governmentLotteryAddress, winningPrize, targetDigits, ticketPrice, maxSet)
        await this.add(contractAddress, ticketAddress);
    },

    async addExactMatchDealerLottery(governmentLotteryAddress: string, winningPrize: number, ticketPrice: number, maxSet: number = 999999) {
        alert('You need to confirm the transaction in your wallet 4 times.');
        const [contractAddress, ticketAddress] = await useExactMatchDealerLottery.fullDeploy(governmentLotteryAddress, winningPrize, ticketPrice, maxSet)
        await this.add(contractAddress, ticketAddress);
    },

    async getAllUserLottery(): Promise<getAllUserLottery> {
        try {
            let governmentLotterys: BuyedTicket[] = [];
            let dealerLotterys: BuyedTicket[] = [];

            const contract = await this.getContractInstance();





            //get governmentLotterys
            for (let i = 1; 1; i++) {
                const governmentLottery = await contract.lotteries(0, i);
                if (governmentLottery[2] == false) {
                    break;
                }
                
                useBaseLottery.setContractAddress(governmentLottery[0]);
                const buyyedLottey = await useBaseLottery.getAllBuyedTickets();
                governmentLotterys = governmentLotterys.concat(buyyedLottey);

            }

            //get governmentLotterys
            for (let i = 1; 1; i++) {

                const dealerLottery = await contract.lotteries(1, i);
                if (dealerLottery[2] == false) {
                    break;
                }
                

                useBaseLottery.setContractAddress(dealerLottery[0]);
                const dealerBuyedLottey = await useBaseLottery.getAllBuyedTickets();
                dealerLotterys = dealerLotterys.concat(dealerBuyedLottey);
            }




            return { governmentLotterys, dealerLotterys };
        }
        catch (error) {
            console.error("Error getAllUserLottery", error);
            throw error;
        }
    },

    async getLastGovernmentLottery(): Promise<GovernmentLotteryFullMetadata> {
        try {

            const contract = await this.getContractInstance();
            let letGovernmentLotterysAddress: string = "";
            for (let i = 1; 1; i++) {
                const governmentLottery = await contract.lotteries(0, i);
                if (governmentLottery[2] == false) {
                    break;
                }
                letGovernmentLotterysAddress = governmentLottery[0];
            }

            const governmentLotterysAddress = letGovernmentLotterysAddress;
            useGovernmentLottery.setContractAddress(governmentLotterysAddress);
            return await useGovernmentLottery.getFullMetadata();
            // const lastAddress = await this.getLastGovernmentAddress();
            // useGovernmentLottery.setContractAddress(lastAddress);
            // const metadata = await useGovernmentLottery.getFullMetadata();
            // return metadata;
        } catch (error) {
            console.error("Error getLastGovernmentLottery", error);
            throw error;
        }
    },

    async addExactMatchLottery(  governmentLotteryAddress: string, winningPrize: number, ticketPrice: number, maxSet: number = 999999) {
        alert('You need to confirm the transaction in your wallet 4 times.');
        const [contractAddress, ticketAddress] = await useExactMatchDealerLottery.fullDeploy(governmentLotteryAddress, winningPrize, ticketPrice, maxSet)
        await this.add(contractAddress, ticketAddress);
    },

    async addCustomDigitsLottery(governmentLotteryAddress: string, winningPrize: number, targetDigits: number[], ticketPrice: number, maxSet: number = 999999) {
        alert('You need to confirm the transaction in your wallet 4 times.');
        const [contractAddress, ticketAddress] = await useCustomDigitsDealerLottery.fullDeploy(governmentLotteryAddress, winningPrize, targetDigits, ticketPrice, maxSet)
        await this.add(contractAddress, ticketAddress);
    },





};

function isCustomDigitsDealerLottery(
    lottery: CustomDigitsDealerLotteryFullMetadata | ExactMatchDealerLotteryFullMetadata
): lottery is CustomDigitsDealerLotteryFullMetadata {
    return 'targetDigits' in lottery;
}

export default contractUtils;
export { isCustomDigitsDealerLottery }