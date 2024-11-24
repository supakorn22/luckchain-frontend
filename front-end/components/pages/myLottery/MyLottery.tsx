import { FC } from 'react';
import React, { useState, useEffect } from 'react';
import UserLotteryList from './components/UserLotteryList';
import WildLotteryList from './components/WildLotteryList';
import useLotteryRegistry from '@utils/LotteryRegistry/useLotteryRegistry';
import useGovernmentLottery from '@utils/GovernmentLottery/useGovernmentLottery';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Button,
} from "@mui/material";



const MyLottery: FC<{}> = () => {

  const [allUserLottery, setAllUserLottery] = useState<getAllUserLottery | undefined>()

  useEffect(() => {
    useLotteryRegistry.getAllUserLottery()
      .then((result) => {

        setAllUserLottery(result)
        // setGovernmentLottery(result)
        // console.log(result)

      })

  }, []);



  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-700">Your Lottery Tickets</h1>
      <Typography  sx={{ p: 2 }} className="text-black">
          This page shows all the lottery tickets you have purchased.
        </Typography>
      {allUserLottery ?
          <UserLotteryList allUserLottery={allUserLottery} />
          : "you dont have any lottery tickets"
      }
      {/* <WildLotteryList tickets={wildTickets} /> */}
    </div>

  );

}

export { MyLottery };