
import { FC } from 'react';
import LotteryRegistry from '@utils/LotteryRegistry/useLotteryRegistry';
import useGovernmentLottery from '@utils/GovernmentLottery/useGovernmentLottery';
import useExactMatchDealerLottery from '@utils/ExactMatchDealerLottery/useExactMatchDealerLottery'


const BuyLottery: FC = () => {


    const handleTest = async () => {

        // useGovernmentLottery.setContractAddress("0x8eA27F3A15E03668D93519574989B8043AB61EAc")
        // const address = useGovernmentLottery.contractAddress;
        // console.log(address);
        // const metadata = await useGovernmentLottery.metadata();
        // console.log(metadata);

        // try{
        //     const reslt = await LotteryRegistry.getLastGovernmentAddress();
        //     console.log(reslt);
        // }
        // catch(error){
        //     console.error("Error queryById", error);
        //     throw error;
        // }

        // try{
        //     const reslt = await LotteryRegistry.getAllGovernmentLottery();
        //     console.log(reslt);
        // }
        // catch(error){
        //     console.error("Error queryById", error);
        //     throw error;
        // }



        try{
            const reslt = await useExactMatchDealerLottery.sell('0x146913E0062143F5d61b82F3c10E1f01dB322164',1000,1000);
            // console.log(reslt);
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