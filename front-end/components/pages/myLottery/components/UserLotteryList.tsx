import React from 'react';

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

import TruncateText from '@components/default/TruncateText/TruncateText';

enum LotteryStatus {
  NOT_STARTED = 0,
  ACTIVE = 1,
  ENDED = 2,
  PRIZE_PAID = 3,
  ARCHIVED = 4,
}


const mapStatusToEnum = (status: number): string => {
  switch (status) {
    case LotteryStatus.NOT_STARTED:
      return "Not Started";
    case LotteryStatus.ACTIVE:
      return "Active";
    case LotteryStatus.ENDED:
      return "Ended";
    case LotteryStatus.PRIZE_PAID:
      return "Prize Paid";
    case LotteryStatus.ARCHIVED:
      return "Archived";
    default:
      return "Unknown";
  }
};

const CustomDigitsWinningNumber = (winningNumber: number,targetDigits : number[]): number => {
  const winningNumberList = winningNumber.toString().split('').map(Number);
  let customWinningNumber :number = 0;
  
  for (let i=0;i<targetDigits.length;i++){
    customWinningNumber += winningNumberList[targetDigits[i]] * Math.pow(10,i);
  
  }

  
  return customWinningNumber;
}

interface UserLotteryListProps {
  allUserLottery: getAllUserLottery; // Array of lottery tickets
}

const UserLotteryList: React.FC<UserLotteryListProps> = ({ allUserLottery }) => {
  const reversedGovernmentLottery = [...allUserLottery.governmentLotterys].reverse();
  const reversedDealerLottery = [...allUserLottery.dealerLotterys].reverse();

  return (
    <div>
    {/* Table Container for Government Lotteries */}
    <TableContainer component={Paper}>
      <Typography variant="h6" sx={{ p: 2 }} className="text-black">
        Your Government Lotteries
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>Address</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Winning Number</TableCell>
            <TableCell>Winning Prize</TableCell>
            <TableCell>ticketPrices</TableCell>
            <TableCell>amount</TableCell>
            <TableCell>Ticket Number</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {reversedGovernmentLottery.map((lottery, index) => (
            <TableRow key={`gov-${index}`}>
              <TableCell>{index + 1}</TableCell>
              <TableCell><TruncateText text={lottery.contractAddress} /></TableCell>
              <TableCell>Government Lottery</TableCell>
              <TableCell>{mapStatusToEnum(lottery.contractMetadata.status)}</TableCell>
              <TableCell>{lottery.contractMetadata.winningNumberValid ?  lottery.contractMetadata.winningNumber.toString() : 'not out' }</TableCell>
              <TableCell>{lottery.contractMetadata.winnigPrize.toString()}</TableCell>
              <TableCell>{lottery.ticketPrices.toString()}</TableCell>
              <TableCell>{lottery.amount}</TableCell>
              <TableCell>{lottery.ticketNumber}</TableCell>             
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

    <br></br>
    <TableContainer component={Paper} >
      <Typography className="text-black" variant="h6" sx={{ p: 2 }}>
        Wildcard Dealer Lotteries
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>Address</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Winning Number</TableCell>
            <TableCell>Winning Prize</TableCell>
            <TableCell>ticketPrices</TableCell>
            <TableCell>amount</TableCell>
            <TableCell>Ticket Number</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {reversedDealerLottery.map((lottery, index) => (
            <TableRow key={`gov-${index}`}>
              <TableCell>{index + 1}</TableCell>
              <TableCell><TruncateText text={lottery.contractAddress} /></TableCell>
              <TableCell>{lottery.isCustomDigits ? 'CustomDigits Lottery' : 'Exactmatch Lottery'  }</TableCell>
              <TableCell>{mapStatusToEnum(lottery.contractMetadata.status)}</TableCell>
              <TableCell>{lottery.contractMetadata.winningNumberValid ?  lottery.contractMetadata.winningNumber.toString() : 'not out' }</TableCell>
              {/* <TableCell>{lottery.contractMetadata.winnigPrize.toString()}</TableCell> */}
              <TableCell>{
                lottery.isCustomDigits ? 
                CustomDigitsWinningNumber(lottery.contractMetadata.winningNumber, lottery?.targetDigits ?? [])
                : lottery.contractMetadata.winningNumber
                  }


                </TableCell>
              <TableCell>{lottery.ticketPrices.toString()}</TableCell>
              <TableCell>{lottery.amount}</TableCell>
              <TableCell>{lottery.ticketNumber}</TableCell>             
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </div>
  );
};

export default UserLotteryList;
