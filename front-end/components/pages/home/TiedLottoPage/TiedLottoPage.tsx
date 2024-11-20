import React, { useState } from 'react'


export const TiedLottoPage = () => {
    const nums = [1,2,3,4,5,6]

    const [buttonStates, setButtonStates] = useState<boolean[]>([false, false, false, false, false, false]);
    const handleButtonClick = (index: number) => {
      setButtonStates((prevStates) =>
        prevStates.map((state, i) => (i === index ? !state : state))
      );
    };
    const [formValues  ,setFormValues] = useState({
      price : '',
      reward: ''
    });

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name , value } = event.target;
      setFormValues({
        ...formValues,
        [name]: value,
      });
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) =>{
      e.preventDefault();
      console.log('Form Submitted',formValues.price,formValues.reward)
      const clickedButtons = buttonStates
        .map((state, index) => (state ? Math.abs(index-5) : null))
        .filter((index) => index !== null);
      console.log("Clicked Buttons:", clickedButtons);
    }

    return (
      <div className="relative bg-[#004fff] h-full p-3 m-3 flex-col rounded-[10px]">
      <div className='grid grid-cols-6 gap-4 w-flex h-[100px] pr-[70px] pl-[70px] pt-5 my-3'>
        {buttonStates.map((isClick, index) => (
            <button 
            key={index}
            onClick={() => handleButtonClick(index)}
            className={`flex bg-[#ffffff] w-[60px] h-[90px] justify-self-center flex items-center justify-center rounded-[10px] text-[#000000] 
            ${isClick ? "bg-[#ffc73a]" : "bg-[#ffffff]" }`}>
              {index+1}
            </button>
          ))}
      </div>
      <div className='flex flex-col  my-3 mb-10'>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name" className='text-[#ffffff]'>Price</label>
          </div>
          <div>
            <input
                type="text"
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
                type='text'
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