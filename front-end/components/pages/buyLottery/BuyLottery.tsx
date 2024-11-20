
import { FC } from 'react';
import LotteryRegistry from '@utils/LotteryRegistry/useLotteryRegistry';
import useGovernmentLottery from '@utils/GovernmentLottery/useGovernmentLottery';



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

        try{
            const reslt = await LotteryRegistry.getAllGovernmentLottery();
            console.log(reslt);
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