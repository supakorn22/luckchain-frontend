import * as React from 'react';
import Box from '@mui/material/Box';
import { ThemeProvider } from '@mui/material/styles';

export default function ShowPrevDraw() {
  const items = [1,2,3,4,5,6]
  const name = ['tata' , 'pooh' , 'pp' , 'asdfppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppp']
  return (
    <div className='flex bg-[#0040ff] h-[512px] p-4 my-3 rounded-[20px] shadow-md z-1'>
      <div className='flex-col  w-full space-y-3'>
        <p className=' text-[40px] justify-self-center font-bold'>PREVIOUS DRAW</p>
        <div className='grid grid-cols-6 gap-4 w-flex h-[100px] pr-[70px] pl-[70px] pt-5 '>
          {items.map((item, index) => (
              <div className='flex bg-[#ffffff] w-[60px] h-[90px] justify-self-center items-center justify-center rounded-[10px]'>
                {item}
              </div>
            ))}
        </div>
        <div className='pt-5 pr-[30px] pl-[30px] inline-block max-w-full'>
          <p >THIS WINNER 👑</p>
          <div className='truncate max-w-full'>
            {name.map((item, index) => (
              <p className='pl-2 inline bg-[#F2F2F2] pr-2 text-[#004fff] rounded-[5px] m-1'>
                {item}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}