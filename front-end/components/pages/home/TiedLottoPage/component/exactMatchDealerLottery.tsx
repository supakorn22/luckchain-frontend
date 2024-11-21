import React, { useState } from 'react'
import useExactMatchDealerLottery from '@utils/ExactMatchDealerLottery/useExactMatchDealerLottery'
import useLotteryRegistry from '@utils/LotteryRegistry/useLotteryRegistry';
import useGovernmentLottery from '@utils/GovernmentLottery/useGovernmentLottery';


export const ExactMatchDealerLotteryForm = () => {

    const [buttonStates, setButtonStates] = useState<boolean[]>([false, false, false, false, false, false]);
    const handleButtonClick = (index: number) => {
      setButtonStates((prevStates) =>
        prevStates.map((state, i) => (i === index ? !state : state))
      );
    };
    const [formValues  ,setFormValues] = useState({
      price : 0,
      reward: 0
    });

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name , value } = event.target;
      setFormValues({
        ...formValues,
        [name]: value,
      });
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) =>{
      e.preventDefault();
      console.log('Form Submitted',formValues.price,formValues.reward)
      
      //check Lottery status

      const metadata = await useLotteryRegistry.getLastGovernmentMetadata()
      const address = await useLotteryRegistry.getLastGovernmentAddress()

      if(metadata[0]>1){
        alert('Lottery now are not avalible cause the last round is end wait for next round')
        return;
      }


      useExactMatchDealerLottery.sell(address, formValues.reward, formValues.price)
      

    }

    return (
      
      <div className="relative bg-[#004fff] h-full p-3 m-3 flex-col rounded-[10px]">
       
      <div className='flex flex-col  my-3 mb-10'>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name" className='text-[#ffffff]'>Price</label>
          </div>
          <div>
            <input
                type="number"
                id="price"
                name="price"
                value={formValues.price}
                onChange={handleInputChange}
                style={
                  {
                    width : '50%',
                    color: '#000'
                  }
                }
            />
          </div>
          <div>
            <label htmlFor="shortInfo" className='text-[#ffffff]'>Reward</label>
          </div>
          <div>
            <input
                type='number'
                id="reward"
                name="reward"
                value={formValues.reward}
                onChange={handleInputChange}
                style={
                  {
                    width : '50%',
                    color: '#000'
                  }
                }
            />
          </div>
                


          <button type="submit" className="absolute right-[10px] bottom-[10px] rounded-[33px] w-[150px] h-[20px] border-2 border-[#004fff] bg-white text-[15px] text-[#004fff] p-4 flex items-center justify-center">
            Create Contract
          </button>
        </form>
      </div>
      <div>
      </div>
      </div>
    )
}