import React, { useState } from 'react';
import { Button, Paper, TextField, Typography } from '@mui/material';

interface BuyLotteryProps {
    contractData: GovernmentLotteryFullMetadata | CustomDigitsDealerLotteryFullMetadata | ExactMatchDealerLotteryFullMetadata | null;
  onPurchase: (lotteryNumber: number, amount: number) => void;  // Expect lottery number and amount as arguments
}

const BuyLottery: React.FC<BuyLotteryProps> = ({ contractData, onPurchase }) => {
  const [lotteryNumber, setLotteryNumber] = useState<number>(0);
  const [amount, setAmount] = useState<number>(0);


  const getLotteryType = () => {
    if (!contractData) return 'Unknown'; // In case contractData is null



    if (contractData.lotteryType === 0) {
      return 'Government Lottery';  // Replace 'uniquePropertyForGov' with an actual property
    } else if (contractData.lotteryType === 1 && 'targetDigits' in contractData) {
      return 'Custom Digits Dealer Lottery';  // Replace with actual property
    } else  {
      return 'Exact Match Dealer Lottery';  // Replace with actual property
    }
    return 'Unknown';
  };

    // Limit to 6 digits (for example)
   const handleLotteryNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
    
        // Allow only digits and limit to 6 characters
        if (/^\d*$/.test(value) && value.length <= (contractData?.lottery?.digits ?? 0)) {
            setLotteryNumber(Number(value));
        }
      };
    


  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(Number(event.target.value));
  };

  const handleConfirmPurchase = () => {
    onPurchase(lotteryNumber, amount);  // Pass the lottery number and amount to the onPurchase function
  };

  return (
    <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
      <Typography variant="h6" className="text-black">
        Buying Lottery
      </Typography>
      <Typography className="text-black">
        Lottery type: {getLotteryType()}
      </Typography>
      <Typography className="text-black">
       Limit digits: {contractData?.lottery?.digits}
      </Typography>

      <Typography className="text-black">Contract Address: {contractData?.contractAddress}</Typography>
        <br/>
      <TextField
        label="Lottery Number"
        type="number"
        fullWidth
        value={lotteryNumber}
        onChange={handleLotteryNumberChange}
        sx={{ mb: 2 }}
      />

      <TextField
        label="Amount"
        type="number"
        fullWidth
        value={amount}
        onChange={handleAmountChange}
        sx={{ mb: 2 }}
      />

      <Button variant="contained" color="secondary" onClick={handleConfirmPurchase}>
        Confirm Purchase
      </Button>
    </Paper>
  );
};

export default BuyLottery;
