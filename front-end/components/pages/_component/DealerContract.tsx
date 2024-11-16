import { useState } from 'react';
import * as React from 'react';
import Box from '@mui/material/Box';
import { ThemeProvider } from '@mui/material/styles';
import Slider from '@mui/material/Slider';

export default function DealerContract() {
  const [expandedIndex, setExpandedIndex] = useState<Number>(-1);

  const items2 = Array(24).fill('DEALER');
  const items = ['contract1' , 'contract2' , 'contract1','contract1','contract1','contract1','contract1','contract1']
  
  const filter_number = ['2 number','3 number','4 number','5 number','6 number']
  return (
    <>
    
    <div className='relative flex bg-[#E9F0FF] h-[512px] p-4 mt-3 mb-3 flex-col rounded-[20px] shadow-md z-1'>
      <p className='text-[#004fff] font-bold'>FILTER CONTRACT</p>
      
      <div className='flex '>
        {filter_number.map((filt , index)=>(
          <button className="inline-block rounded-[33px]  border-2 border-[#004fff] bg-white text-[15px] text-[#004fff] p-2 flex items-center justify-center m-2">
            {filt}
          </button>
        ))}
      </div>
        <p className='text-[#004fff] font-bold'>FILTER PRICE</p>
        <Slider defaultValue={50} aria-label="Default" valueLabelDisplay="auto" />
        <p className='text-[#004fff] font-bold'>FILTER REWARD</p>
        <Slider defaultValue={50} aria-label="Default" valueLabelDisplay="auto" />
      
      <div className=' flex bg-[#FFFFFF] h-[512px] p-4 my-3 flex-col rounded-[20px] shadow-md overflow-y-scroll '>
        <div className='text-[#004fff] font-bold'>
            <text>DEALER CONTRACT</text>
        </div>
        <div className='grid grid-cols-4 auto-rows-[minmax(100px,_auto)] gap-4 my-5 h-[512px]'>
          {items2.map((item, index) => (
                <div 
                key = {index}
                className={`transition-all duration-300 ease-in-out transform
                relative flex bg-[#ffffff] p-2 rounded-[10px] shadow-md
                ${expandedIndex == index ? 'bg-[#ff0000] row-span-3 col-span-4 ':''}
                `}
                // ${expandedIndex == index ? 'bg-[#ff0000] row-start-1 h-[256px] col-start-1 col-end-5  z-1':''}
                >
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