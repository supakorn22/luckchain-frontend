import { FC, useEffect, useState, Suspense, lazy } from 'react';
import useLotteryRegistry from '@utils/LotteryRegistry/useLotteryRegistry';
import MultipleDigitSelector from './components/DigitSelector';

import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Grid,
  TextField
} from "@mui/material";

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


export const TiedLottoPage = () => {

  const [governmentLotteryFullMetadata, setGovernmentLotteryFullMetadata] = useState<GovernmentLotteryFullMetadata | null>(null);

  const [winningPrize1, setWinningPrize1] = useState<number>(0);
  const [tickerPrice1, setTickerPrice1] = useState<number>(0);
  const [digits1, setDigits1] = useState<number>(6);
  const [maxSet1, setMaxSet1] = useState<number>(999999);
  const [randomContractAddress1, setRandomContractAddress1] = useState<string>('');

  const [buttonDisable1, setButtonDisable1] = useState<boolean>(false);
  const buttonDisableCon1: boolean =  (governmentLotteryFullMetadata!= undefined && governmentLotteryFullMetadata.status >=1  ) || winningPrize1 == 0 || tickerPrice1 == 0 || digits1 == 0 || maxSet1 == 0;

  const [digitsSelected,setSelectedDigits] = useState<number[]>([]);

  const handleSelectionChange = (selectedDigits: number[]) => {
    setSelectedDigits(selectedDigits.map(i => i - 1));
  };

  const handleSellLottery1 = async () => {
    
    if (digitsSelected.length == 0){
      if (governmentLotteryFullMetadata?.contractAddress) {
        useLotteryRegistry.addExactMatchDealerLottery(governmentLotteryFullMetadata.contractAddress, winningPrize1, tickerPrice1, maxSet1);
      } else {
        console.error("Contract address is undefined");
      }
    }
    else {
      if (governmentLotteryFullMetadata?.contractAddress) {
        useLotteryRegistry.addCustomDigitsLottery(governmentLotteryFullMetadata.contractAddress, winningPrize1,digitsSelected, tickerPrice1, maxSet1, );
      } else {
        console.error("Contract address is undefined");
      }
    }
  };


  useEffect(() => {
    useLotteryRegistry.getLastGovernmentLottery().then((result) => {
      setGovernmentLotteryFullMetadata(result);
    })
  }
    , []);

  return (
    <div>
      <Typography className="text-black" variant="h4" gutterBottom>
        Dealer seller page - this page is for the dealer to sell the lottery
      </Typography>

      <Typography className="text-black" variant="h4" gutterBottom>
        Last government lottery status : {mapStatusToEnum(governmentLotteryFullMetadata?.status ?? -1)}
      </Typography>
      <Typography className="text-black" gutterBottom>
        To sell lottery the last government lottery must be in Not Started or Active status.
      </Typography>



      <div>
        <Typography className="text-black" variant="h6" gutterBottom>
          The lottery you sell has 2 type : Exact match and custom digits. In this page will auto select type. If you select custom digits the type will be custom digits.
          <br /> Custom digits is work like underground lottery. You can select the digits that you want to sell.
          <br /> Exact match is work like government lottery. has same digits length as last government lottery.
          {/* Sell Exact match lottery. Has same digits length as last government lottery. */}
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Winning Prize"
              variant="outlined"
              fullWidth
              type="number"
              value={winningPrize1}
              onChange={(e) => setWinningPrize1(Number(e.target.value))}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Ticket Price"
              variant="outlined"
              fullWidth
              type="number"
              value={tickerPrice1}
              onChange={(e) => setTickerPrice1(Number(e.target.value))}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Max Set (max ticket that user can buy)"
              variant="outlined"
              fullWidth
              type="number"
              value={maxSet1}
              onChange={(e) => setMaxSet1(Number(e.target.value))}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
          <MultipleDigitSelector onSelectionChange={handleSelectionChange} 
          digits = { [...Array(governmentLotteryFullMetadata?.lottery?.digits).keys()].map(i => i + 1)} 
          />
          </Grid>
        </Grid>
        <Button
          variant="contained"
          color="primary"
        onClick={handleSellLottery1}
        sx={{ mb: 3 }}
        disabled={buttonDisable1 || buttonDisableCon1}
        >
          Sell Lottery
        </Button>
        
      </div>
    </div>
  )
}