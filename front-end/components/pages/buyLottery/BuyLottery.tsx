
import { FC } from 'react';
import LotteryRegistry from '@utils/LotteryRegistry/LotteryRegistry';

const BuyLottery: FC = () => {


    const handleTest = async () => {
        try{
            const reslt = await LotteryRegistry.queryById(0,1)
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