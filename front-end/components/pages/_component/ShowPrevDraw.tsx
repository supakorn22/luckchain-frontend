import * as React from 'react';
import Box from '@mui/material/Box';
import { ThemeProvider } from '@mui/material/styles';
import { useState, useEffect } from 'react';
import useLotteryRegistry from '@utils/LotteryRegistry/useLotteryRegistry';
import useGovernmentLottery from '@utils/GovernmentLottery/useGovernmentLottery';


export default function ShowPrevDraw() {

  const [number, setnumber] = useState<number[]>([1, 2, 5, 6]);
  const [winningPrize, setWinningPrize] = useState<number>(1000000);

  // useEffect(() => {
  //   useLotteryRegistry.getLastGovernmentNotactiveAddress()
  //     .then((result) => {
  //       const address = result;
  //       useGovernmentLottery.setContractAddress(address);
  //       useGovernmentLottery.metadata()
  //         .then((metadata) => {
  //           const digits = Array.from(String(metadata[1]), Number);
  //           setnumber(digits);
  //           console.log('Metadata:', metadata[2]);
  //           setWinningPrize(Number(metadata[2]));
  //         })
  //         .catch((error) => {
  //           console.error('Error getting metadata:', error);
  //         });


  //     })

  // }, []);


  // const items = [1,2,3,4,5,6]
  const name = ['tata', 'pooh', 'pp', 'asdfppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppp']
  return (
    <div className='flex bg-[#0040ff] h-[512px] p-4 my-3 rounded-[20px] shadow-md z-1'>
      <div className='flex-col  w-full space-y-3'>
        <p className=' text-[40px] justify-self-center font-bold'>PREVIOUS DRAW</p>
        <div className="flex justify-center gap-4 w-full h-[100px] pr-[70px] pl-[70px] pt-5">
          {number.map((item, index) => (
            <div
              key={index}
              className="flex bg-[#ffffff] w-[60px] h-[90px] items-center justify-center rounded-[10px]"
            >
              <h1 className="text-black">{item}</h1>
            </div>
          ))}
        </div>


        <div className='pt-5 pr-[30px] pl-[30px] inline-block max-w-full'>
          <p>WINNING PRIZE 💰</p>
          <div className='truncate max-w-full'>
            <p className='pl-2 inline bg-[#F2F2F2] pr-2 text-[#004fff] rounded-[5px] m-1'>
              {winningPrize}
            </p>
          </div>
        </div>
        {/* <div className='pt-5 pr-[30px] pl-[30px] inline-block max-w-full'>
          <p >THIS WINNER 👑</p>
          <div className='truncate max-w-full'>
            {name.map((item, index) => (
              <p className='pl-2 inline bg-[#F2F2F2] pr-2 text-[#004fff] rounded-[5px] m-1'>
                {item}
              </p>
            ))}
          </div>
        </div> */}
      </div>
    </div>
  );
}