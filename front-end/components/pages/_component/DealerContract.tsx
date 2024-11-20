import { useState } from 'react';
import * as React from 'react';
import Box from '@mui/material/Box';
import { ThemeProvider } from '@mui/material/styles';
import Slider from '@mui/material/Slider';

export default function DealerContract() {
  const [expandedIndex, setExpandedIndex] = useState<Number>(-1);

  const items2 = Array(24).fill('DUMMY DEALER');
  const items = ['contract1' , 'contract2' , 'contract1','contract1','contract1','contract1','contract1','contract1']
  
  const filter_number = ['2 number','3 number','4 number','5 number','6 number']
  const [buttonStates, setButtonStates] = useState<boolean[]>([false, false, false, false, false]);
    const handleButtonClick = (index: number) => {
      setButtonStates((prevStates) =>
        prevStates.map((state, i) => (i === index ? !state : state))
      );
    };
  return (
    <>
    
    <div className='relative flex bg-[#E9F0FF] h-[800px] p-4 mt-3 mb-3 flex-col rounded-[20px] shadow-md z-1'>
      <p className='text-[#004fff] font-bold'>FILTER CONTRACT</p>
      
      <div className='flex '>
        {buttonStates.map((isClick , index)=>(
          <button 
          key={index}
          onClick={() => handleButtonClick(index)}
          className={`inline-block rounded-[33px]  border-2 border-[#004fff] bg-white text-[15px] text-[#004fff] p-2 flex items-center justify-center m-2
          ${isClick ? "text-[#fff] bg-[#004fff]" : ""}`}>
            {filter_number[index]}
          </button>
        ))}
      </div>
        <p className='text-[#004fff] font-bold'>FILTER PRICE</p>
        <Slider defaultValue={50} aria-label="Default" valueLabelDisplay="auto" />
        <p className='text-[#004fff] font-bold'>FILTER REWARD</p>
        <Slider defaultValue={50} aria-label="Default" valueLabelDisplay="auto" />
      




      <div className=' flex bg-[#FFFFFF] h-[800px] p-4 my-3 flex-col rounded-[20px] shadow-md overflow-y-scroll '>
        <div className='text-[#004fff] font-bold'>
            <text>DEALER CONTRACT</text>
        </div>
        <div className='grid grid-cols-4 auto-rows-[minmax(100px,_auto)] gap-4 my-5 h-[800px]'>
          {items2.map((item, index) => (
                <div 
                key = {index}
                className={`transition-all duration-300 ease-in-out transform
                relative flex bg-[#ffffff] p-2 rounded-[10px] shadow-md
                ${expandedIndex == index ? 'bg-[#f0f0f0f0] row-span-3 col-span-4 shadow-lg ':''}
                `}>
                  <text>{item}</text>
                  <button className='absolute right-2 bottom-2 text-[#004fff] '
                  onClick={()=>setExpandedIndex(expandedIndex == index ? -1 : index)}>see more...</button>
                </div>
          ))}
        </div>
      </div>
    </div>
    </>
  );
}