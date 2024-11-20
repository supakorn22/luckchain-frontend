import React from 'react';

interface WildCard {
  digits: string; // 6-digit wild card number
  ownerId: string; // ID of the owner
  buyerCount: number; // Number of buyers
  prizePool: number; // Prize pool in dollars
}

interface WildCardLotteryListProps {
  wildCards: WildCard[];
}

const WildCardLotteryList: React.FC<WildCardLotteryListProps> = ({ wildCards }) => {
  return (
    <div className="wildcard-list-container bg-gray-100 p-4 rounded shadow-md mt-10 mx-20">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Last Round Wild Card Lotteries</h2>
      <div className="wildcard-list grid grid-cols-1 md:grid-cols-2 gap-4">
        {wildCards.map((wildCard, index) => (
          <div
            key={index}
            className="wildcard-card bg-white p-4 rounded shadow hover:shadow-lg transition-shadow"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-blue-600">Wild Card #{index + 1}</h3>
              <span className="text-sm text-gray-500">Owner ID: {wildCard.ownerId}</span>
            </div>
            <div className="flex justify-center items-center space-x-2 mb-4">
              {wildCard.digits.split('').map((digit, i) => (
                <div
                  key={i}
                  className="digit-box w-10 h-10 bg-blue-500 text-white flex items-center justify-center text-lg font-bold rounded"
                >
                  {digit}
                </div>
              ))}
            </div>
            <p className="text-gray-700">
              <strong>Buyers:</strong> {wildCard.buyerCount}
            </p>
            <p className="text-gray-700">
              <strong>Prize Pool:</strong> ${wildCard.prizePool.toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WildCardLotteryList;
