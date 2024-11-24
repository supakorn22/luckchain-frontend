import { FC } from 'react';
import React,{ useState,useEffect } from 'react';
import UserLotteryList from './components/UserLotteryList';
import WildLotteryList from './components/WildLotteryList';
import useLotteryRegistry from '@utils/LotteryRegistry/useLotteryRegistry';
import useGovernmentLottery from '@utils/GovernmentLottery/useGovernmentLottery';


const MyLottery: FC<{}> = () => {

  const [governmentLottery,setGovernmentLottery ] =  useState <LotteryGovernmentTicket[]>([])

  // useEffect(() => {
  //   useLotteryRegistry.getAllGovernmentLottery()
  //     .then((result) => {
  //       setGovernmentLottery(result)
  //       // console.log(result)

  //     })
     
  // }, []);



    return (
            <div className="min-h-screen bg-gray-100 py-10">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-700">Your Lottery Tickets</h1>
      <UserLotteryList tickets={governmentLottery} />
        {/* <WildLotteryList tickets={wildTickets} /> */}
    </div>

    );

}

export { MyLottery };