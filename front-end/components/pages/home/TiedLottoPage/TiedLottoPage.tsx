import { FC, useEffect, useState, Suspense, lazy } from 'react';
import useLotteryRegistry from '@utils/LotteryRegistry/useLotteryRegistry';
import MultipleDigitSelector from './components/DigitSelector';
import TruncateText from '@components/default/TruncateText/TruncateText';
import useBaseLottery from '@utils/BaseLottery/useBaseLottery';
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
  const buttonDisableCon1: boolean =  governmentLotteryFullMetadata == undefined|| (governmentLotteryFullMetadata!= undefined && governmentLotteryFullMetadata.status >1  ) || winningPrize1 == 0 || tickerPrice1 == 0 || digits1 == 0 || maxSet1 == 0;

  const [digitsSelected,setSelectedDigits] = useState<number[]>([]);

  const handleSelectionChange = (selectedDigits: number[]) => {
    setSelectedDigits(selectedDigits.map(i => i - 1));
  };

  


  const handleSellLottery1 = async () => {
    
    if (digitsSelected.length == 0){
      if (governmentLotteryFullMetadata?.contractAddress) {
        useLotteryRegistry.addExactMatchDealerLottery(governmentLotteryFullMetadata.contractAddress, winningPrize1, tickerPrice1, maxSet1);
        const data = await useLotteryRegistry.getAllUserDealerLottery()
        setDealerLotterys([...data]);
      
      } else {
        console.error("Contract address is undefined");
      }
    }
    else {
      if (governmentLotteryFullMetadata?.contractAddress) {
        useLotteryRegistry.addCustomDigitsLottery(governmentLotteryFullMetadata.contractAddress, winningPrize1,digitsSelected, tickerPrice1, maxSet1, );
        const data = await useLotteryRegistry.getAllUserDealerLottery()
        setDealerLotterys([...data]);
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

  const [dealerLotterys, setDealerLotterys] = useState<(CustomDigitsDealerLotteryFullMetadata |  ExactMatchDealerLotteryFullMetadata)[]>([]);

    useEffect(() => {
      useLotteryRegistry.getAllUserDealerLottery().then((result) => {
        setDealerLotterys(result);
      })
    }
      , []);
  

      const checkLotteryCanEnd = async (governmentAddress : string) :Promise<boolean>  => {
        useBaseLottery.setContractAddress(governmentAddress);
        const metadata = await useBaseLottery.metadata();
        if (metadata.status >= 3){
          return true;
        }

        return false;
      }

      const handleSellLotteryEnd = async (address : string,governmentAddress : string) => {

        if(await checkLotteryCanEnd(governmentAddress) == false){

          alert("The lottery can't be ended yet. Cause the government lottery that this lottery is tied to is not in paid prize status yet.");
          return

        }

        useBaseLottery.setContractAddress(address);
        await useBaseLottery.end();
        await useBaseLottery.payPrize();
        await useBaseLottery.archive();
        const data = await useLotteryRegistry.getAllUserDealerLottery()
        setDealerLotterys([...data]);
      }

      const handleSellLotteryStart = async (address : string) => {
        useBaseLottery.setContractAddress(address);
        await useBaseLottery.start();
        const data = await useLotteryRegistry.getAllUserDealerLottery()
        setDealerLotterys([...data]);
      }



  return (
    <div className='p-4'>
      <Typography className="text-black" variant="h4" gutterBottom>
        Dealer seller page - this page is for the dealer to sell the lottery
      </Typography>

      <Typography className="text-black" variant="h4" gutterBottom>
        Last government lottery status : {mapStatusToEnum(governmentLotteryFullMetadata?.status ?? -1)}
      </Typography>
      <Typography className="text-black" variant="h4" gutterBottom>
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

      <Typography className="text-black"  gutterBottom>
          You can Chage lottery status here.
          <br /> In real contract has more status to change but in this page only have 2 status to change. Start and End.
          <br /> Your lottery will start sell when you click start button. The status will be Active.
          <br /> Your lottery will end when you click end button. The status will be Ended. But you can only end the lottery if the government lottery that this lottery is tied to is in Prize Paid status.
          <br /> Cause in Prize Paid status the government lottery will show the winning number. So the dealer can end the lottery.
          <br /> After the lottery is ended the dealer can pay the prize to the winner if lottery funds is enough.
          <br /> If not it will send the prize to the you and 7% to the government.
        </Typography>
      <TableContainer component={Paper} >
        <Typography className="text-black" variant="h6" sx={{ p: 2 }}>
          Change Status Wildcard Dealer Lotteries
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Address</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Winning Prize</TableCell>
              <TableCell>Ticket price</TableCell>
              <TableCell>Change status</TableCell>

            </TableRow>
          </TableHead>
          <TableBody>
            {dealerLotterys.map((lottery, index) => (
              <TableRow key={`dealer-${index}`}>
                <TableCell><TruncateText text={lottery.contractAddress} /></TableCell>
                <TableCell>
                  {Array.isArray((lottery as CustomDigitsDealerLotteryFullMetadata).targetDigits)
                    ? "Custom Digits Dealer"
                    : "Exact Match Dealer"}
                </TableCell>
                <TableCell>{mapStatusToEnum(lottery.status)}</TableCell>
                <TableCell>{lottery.winnigPrize.toString()}</TableCell>
                <TableCell>{lottery.lottery?.getListingPrice}</TableCell>
                <TableCell>

                {lottery.status == 0 &&
                <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleSellLotteryStart(lottery.contractAddress)  } // Trigger the callback
                    >
                      Start
                </Button>}

                {lottery.status == 1  &&
                <Button
                      variant="contained"
                      color="warning"
                      onClick={() =>  handleSellLotteryEnd(lottery.contractAddress,lottery.governmentLottery)} // Trigger the callback
                    >
                      End
                </Button>}

               
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}