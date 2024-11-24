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
} from "@mui/material";
import TruncateText from '@components/default/TruncateText/TruncateText';


interface LotteryTableProps {
  data: GovernmentLotteryFullMetadata[];
}

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

const LotteryTable: React.FC<LotteryTableProps> = ({ data }) => {

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
              <TableCell>Status</TableCell>
              <TableCell>Winning Number</TableCell>
              <TableCell>Winning Prize</TableCell>
              <TableCell>Owner</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((lottery, index) => (
              <TableRow key={`gov-${index}`}>
                {/* Map from last to first */}
                <TableCell>{data.length - index}</TableCell>
                <TableCell><TruncateText text={lottery.contractAddress} /></TableCell>
                <TableCell>{mapStatusToEnum(lottery.status)}</TableCell>
                <TableCell>{lottery.winingNumber.toString()}</TableCell>
                <TableCell>{lottery.winnigPrize.toString()}</TableCell>
                <TableCell><TruncateText text={lottery.owner} /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default LotteryTable;
