import React, { useState } from 'react'


export const BuyLottoPage = () => {
    const nums = [1,2,3,4,5,6]

    const [formValues  ,setFormValues] = useState({
      lottoNum : '',
      buyNum: ''
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
      console.log('Form Submitted',formValues.lottoNum,formValues.buyNum)
    }

    return (
      <div className="relative bg-[#004fff] h-full p-3 m-3 flex-col rounded-[10px]">
      <div className='flex flex-col  my-3 mb-10'>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name" className='text-[#fff]'>Input your Lottery number</label>
          </div>
          <div>
            <input
                type="text"
                id="lottoNum"
                name="lottoNum"
                value={formValues.lottoNum}
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
            <label htmlFor="shortInfo" className='text-[#fff]'>How many</label>
          </div>
          <div>
            <input
                type='text'
                id="buyNum"
                name="buyNum"
                value={formValues.buyNum}
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