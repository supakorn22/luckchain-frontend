import React, { useState } from "react";
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
} from "@mui/material";

// Define the Lottery Metadata interface
interface LotteryMetadata {
  id: string;
  status: "Available" | "Sold" | "Inactive" | "Pending";
  winingNumber: number | null;
  winnigPrize: number | null;
  owner: string;
}

const AdminPage: React.FC = () => {
  // Mock state for lottery data
  const [lotteries, setLotteries] = useState<LotteryMetadata[]>([
    {
      id: "1",
      status: "Available",
      winingNumber: null,
      winnigPrize: null,
      owner: "0xOwner1",
    },
    {
      id: "2",
      status: "Sold",
      winingNumber: 12345,
      winnigPrize: 100000,
      owner: "0xOwner2",
    },
    {
      id: "3",
      status: "Inactive",
      winingNumber: null,
      winnigPrize: null,
      owner: "0xOwner3",
    },
  ]);

  // Handle selling a lottery
  const handleSellLottery = () => {
    const newLottery: LotteryMetadata = {
      id: (lotteries.length + 1).toString(),
      status: "Available",
      winingNumber: null,
      winnigPrize: null,
      owner: "0xNewOwner",
    };
    setLotteries([...lotteries, newLottery]);
  };

  // Handle changing lottery status
  const handleChangeStatus = (id: string, newStatus: LotteryMetadata["status"]) => {
    const updatedLotteries = lotteries.map((lottery) =>
      lottery.id === id ? { ...lottery, status: newStatus } : lottery
    );
    setLotteries(updatedLotteries);
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography className="text-black"  variant="h4" gutterBottom>
        Admin Page - Manage Lotteries
      </Typography>

      <Typography className="text-black" >
        In this pages you are Admin. You can mange government lotteries and stroage contract.
        <br/> You can set stroage contract at env.
        <br/> To sell lottery you need to ARCHIVED last lottery first. This is not contract requirement but it is a good practice for my frontend setup.
        <br/> The status of lottery can be NOT_STARTED -{">"} ACTIVE -{">"} ENDED -{">"} PRIZE_PAID -{">"} ARCHIVED
        </Typography>
      <Button variant="contained" color="primary" onClick={handleSellLottery} sx={{ mb: 3 }}>
        Sell Lottery
      </Button>

      
    </Box>
  );
};

export {AdminPage};
