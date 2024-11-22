
import { FC } from 'react';
import useLotteryRegistry from '@utils/LotteryRegistry/useLotteryRegistry';
import useGovernmentLottery from '@utils/GovernmentLottery/useGovernmentLottery';
import useExactMatchDealerLottery from '@utils/ExactMatchDealerLottery/useExactMatchDealerLottery'
import useCustomDigitsDealerLottery from '@utils/CustomDigitsDealerLottery/useCustomDigitsDealerLottery';
import useLotteryTicket   from '@utils/LotteryTicket/useLotteryTicket';

const BuyLottery: FC = () => {


    const handleTest = async () => {

        // useGovernmentLottery.setContractAddress("0x8eA27F3A15E03668D93519574989B8043AB61EAc")
        // const address = useGovernmentLottery.contractAddress;
        // console.log(address);
        // const metadata = await useGovernmentLottery.metadata();
        // console.log(metadata);

        // try{
        //     const reslt = await useLotteryRegistry.getLastGovernmentAddress();
        //     console.log(reslt);
        // }
        // catch(error){
        //     console.error("Error queryById", error);
        //     throw error;
        // }

        // try{
        //     const reslt = await useLotteryRegistry.getAllGovernmentLottery();
        //     console.log(reslt);
        // }
        // catch(error){
        //     console.error("Error queryById", error);
        //     throw error;
        // }



    //     try{
    //         const reslt = await useExactMatchDealerLottery.sell('0x146913E0062143F5d61b82F3c10E1f01dB322164',1000,1000);
    //         // console.log(reslt);
    //     }
    //     catch(error){
    //         console.error("Error queryById", error);
    //         throw error;
    //     }
        
    // }

    
           try{
            useLotteryRegistry.setContractAddress("0x471b9e9f7779D86e7367b936F7E0A2Dc7BAfD2e3")
            const reslt = await useLotteryRegistry.getData();
            console.log(reslt);

            // useLotteryTicket.setContractAddress("0xC00a1E5656FF70ff0eC87C0ed0bdc101e2394FAf")
            // const reslt = await useLotteryTicket.getFullMetadata();
            // console.log(reslt);

            // useGovernmentLottery.setContractAddress("0x146913E0062143F5d61b82F3c10E1f01dB322164")
            // const reslt1 = await useGovernmentLottery.getFullMetadata();
            // console.log(reslt1);

            // useCustomDigitsDealerLottery.setContractAddress("0xBE35E60cF76E5e11F8dC4b65eDC4780644db860F")
            // const reslt2 = await useCustomDigitsDealerLottery.getFullMetadata();
            // console.log(reslt2);

            // useExactMatchDealerLottery.setContractAddress("0x6123E6b26e01F5F72758eD562FC0265A2b92319c")
            // const reslt3 = await useExactMatchDealerLottery.getFullMetadata();
            // console.log(reslt3);

        }
        catch(error){
            console.error("Error queryById", error);
            throw error;
        }
        
    }



    return (
        <div>
            
            <button onClick={handleTest} className='text-black'>Test</button>


        </div>
    )
}

export {BuyLottery};