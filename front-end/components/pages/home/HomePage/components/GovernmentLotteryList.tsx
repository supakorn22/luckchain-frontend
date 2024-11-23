

import React from "react";

interface GovernmentLotteryFullMetadata {
  lotteryTicket: string;
  lotteryType: number;
  status: number;
  winingNumber: number;
  winnigPrize: number;
  owner: string;
  winningNumberValid: boolean;
}

interface Props {
  data: GovernmentLotteryFullMetadata[];
  currentId: string;
}

const GovernmentLotteryList: React.FC<Props> = ({ data, currentId }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-6">
      <h2 className="text-lg font-semibold mb-4">Government Lottery</h2>
      <ul className="space-y-4">
        {data.map((lottery, index) => (
          <li
            key={index}
            className={`p-4 border rounded-lg ${
              lottery.lotteryTicket === currentId
                ? "bg-green-100 border-green-500"
                : "bg-gray-100 border-gray-300"
            }`}
          >
            <p className="font-medium">Ticket: {lottery.lotteryTicket}</p>
            <p>Winning Number: {lottery.winingNumber}</p>
            <p>Prize: {lottery.winnigPrize}</p>
            <p>Status: {lottery.status === 1 ? "Active" : "Inactive"}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GovernmentLotteryList;
