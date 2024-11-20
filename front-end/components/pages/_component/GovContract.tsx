'use client'
import { useRouter } from 'next/navigation';
import * as React from 'react';
import Box from '@mui/material/Box';
import { ThemeProvider } from '@mui/material/styles';

export default function GovContract() {
  const items = ['?','?','?','?','?','?']
  const items2 = Array(6).fill('💸')
  const router = useRouter();
  const handleNavigation = () => {
    router.push('/buylottopage')
  }
  return (
    <div className='relative flex flex-col bg-[#F2F2F2] h-[512px] p-4 my-3 rounded-[20px] shadow-md z-1'>
      <div className='text-[#004fff] font-bold'>
          <text>GOVERNANCE CONTRACT</text>
      </div>
      <div className='grid grid-cols-6 gap-4 w-flex h-[100px] pr-[70px] pl-[70px] pt-5  '>
          {items2.map((item, index) => (
              <div className='flex bg-[#ffffff] w-[60px] h-[90px] justify-self-center flex items-center justify-center rounded-[10px]'>
                {item}
              </div>
            ))}
      </div>
      <div className='p-10'></div>
      <button onClick={handleNavigation} className="absolute right-[10px] bottom-[10px] rounded-[33px] w-[150px] h-[20px] border-2 border-[#004fff] bg-white text-[15px] text-[#004fff] p-4 flex items-center justify-center">
        Buy Lottery
      </button>
    </div>
  );
}