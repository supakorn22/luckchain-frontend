import React from "react";
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

interface LotteryTableProps {
  data: LotteryRegistrySrotage;
  onBuyClick: (contractData: GovernmentLotteryFullMetadata | CustomDigitsDealerLotteryFullMetadata | ExactMatchDealerLotteryFullMetadata) => void; // Callback function
}
enum LotteryStatus {
  NOT_STARTED = 0,
  ACTIVE = 1,
  ENDED = 2,
  PRIZE_PAID = 3,
  ARCHIVED = 4
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
const CustomDigitsWinningNumber = (winningNumber: number, targetDigits: number[]): number => {
  const winningNumberList = winningNumber.toString().split('').map(Number);
  let customWinningNumber: number = 0;

  for (let i = 0; i < targetDigits.length; i++) {
    customWinningNumber += winningNumberList[targetDigits[i]] * Math.pow(10, i);

  }


  return customWinningNumber;
}


const LotteryTable: React.FC<LotteryTableProps> = ({ data, onBuyClick }) => {
  // Map to store rounds for government lotteries
  const GovernmentLotterysLength = data.governmentLotterys.length;

  const governmentLotterysAddressToRound = data.governmentLotterys.reduce(
    (acc, lottery, index) => {
      acc[lottery.contractAddress] = [index + 1, lottery.status, lottery.winingNumber];
      return acc;
    },
    {} as { [key: string]: [number, number, number] }
  );

  return (
    <div>
      {/* Table Container for Government Lotteries */}
      <TableContainer component={Paper}>
        <Typography variant="h6" sx={{ p: 2 }} className="text-black">
          Government Lotteries
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
              <TableCell>Ticket price</TableCell>
              <TableCell>Owner</TableCell>
              <TableCell>Buy</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.governmentLotterys.map((lottery, index) => (
              <TableRow key={`gov-${index}`}>
                <TableCell>{data.governmentLotterys.length - index}</TableCell>
                <TableCell><TruncateText text={lottery.contractAddress} /></TableCell>
                <TableCell>Government Lottery</TableCell>
                <TableCell>{mapStatusToEnum(lottery.status)}</TableCell>
                <TableCell>{
                  lottery.winningNumberValid ?
                    lottery.winingNumber.toString() :
                    'not out'

                }</TableCell>
                <TableCell>{lottery.winnigPrize.toString()}</TableCell>
                <TableCell>{lottery.lottery?.getListingPrice}</TableCell>
                <TableCell><TruncateText text={lottery.owner} /></TableCell>
                <TableCell>
                  { (data.governmentLotterys.length - index)  === GovernmentLotterysLength && lottery.status == 1 &&
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => onBuyClick(lottery)} // Trigger the callback
                    >
                      Buy
                    </Button>}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <br></br>
      {/* Table Container for Wildcard Dealer Lotteries */}
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
              <TableCell>Ticket price</TableCell>
              <TableCell>Owner</TableCell>
              <TableCell>Buy</TableCell>

            </TableRow>
          </TableHead>
          <TableBody>
            {data.wildcardDealerLotterys.map((lottery, index) => (
              <TableRow key={`dealer-${index}`}>
                <TableCell>{governmentLotterysAddressToRound[lottery.governmentLottery][0]}</TableCell>
                <TableCell><TruncateText text={lottery.contractAddress} /></TableCell>
                <TableCell>
                  {Array.isArray((lottery as CustomDigitsDealerLotteryFullMetadata).targetDigits)
                    ? "Custom Digits Dealer"
                    : "Exact Match Dealer"}
                </TableCell>
                <TableCell>{mapStatusToEnum(lottery.status)}</TableCell>
                <TableCell>{

                  // Array.isArray((lottery as CustomDigitsDealerLotteryFullMetadata).targetDigits)
                  //     ? CustomDigitsWinningNumber(governmentLotterysAddressToRound[lottery.governmentLottery][2],(lottery as CustomDigitsDealerLotteryFullMetadata).targetDigits)
                  //     : governmentLotterysAddressToRound[lottery.governmentLottery][2]


                  lottery.winningNumberValid ?

                    (Array.isArray((lottery as CustomDigitsDealerLotteryFullMetadata).targetDigits) ?
                      CustomDigitsWinningNumber(lottery.winingNumber, (lottery as CustomDigitsDealerLotteryFullMetadata).targetDigits)
                      : lottery.winingNumber) : 'not out'



                }


                </TableCell>
                <TableCell>{lottery.winnigPrize.toString()}</TableCell>
                <TableCell>{lottery.lottery?.getListingPrice}</TableCell>
                <TableCell><TruncateText text={lottery.owner} /></TableCell>
                <TableCell>

                  {index + 1 === GovernmentLotterysLength
                    && lottery.status == 1 
                    && governmentLotterysAddressToRound[lottery.governmentLottery][1] <=1
                    &&
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => onBuyClick(lottery)} // Trigger the callback
                    >
                      Buy
                    </Button>}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default LotteryTable;
