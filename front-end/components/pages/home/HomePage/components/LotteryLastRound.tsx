import React from 'react';

interface LotteryLastRoundProps {
  roundNumber: number;
  buyerCount: number;
  poolPrize: number; // Assume prize is in dollars
  lotteryNumber: string; // 6-digit lottery number as a string
  date: string;
}

const LotteryLastRound: React.FC<LotteryLastRoundProps> = ({
  roundNumber,
  buyerCount,
  poolPrize,
  lotteryNumber,
  date,
}) => {
  return (
    <div className="lottery-container bg-gray-100 p-4 rounded shadow-md mx-20">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Last Lottery Round</h2>
      <div className="lottery-number-container mt-4 flex justify-center items-center space-x-2">
        {lotteryNumber.split('').map((digit, index) => (
          <div
            key={index}
            className="lottery-digit-box w-12 h-12 bg-blue-500 text-white flex items-center justify-center text-xl font-bold rounded"
          >
            {digit}
          </div>
        ))}
      </div>
      <div className="details  ">
      <p className="mb-2 text-black">
          <strong>Date:</strong> {date}
        </p>
        <p className="mb-2 text-black">
          <strong>Round :</strong> {roundNumber}
        </p>
        <p className="mb-2 text-black">
          <strong>Buyers:</strong> {buyerCount}
        </p>
        <p className="mb-2 text-black">
          <strong>Prize Pool:</strong> ${poolPrize.toLocaleString()}
        </p>
      </div>
      
    </div>
  );
};

export default LotteryLastRound;
