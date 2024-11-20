import React from 'react';

interface WildLotteryTicket {
  number: string; // Lottery ticket number
  roundNumber: number; // The round number for the lottery
  prize: number; // Prize amount for this ticket
  prizeWildcards: boolean[];
  status: 'win' | 'lose' | 'process'; // Status of the lottery ticket
}

interface WildLotteryListProps {
  tickets: WildLotteryTicket[]; // Array of user lottery tickets
}

const WildLotteryList: React.FC<WildLotteryListProps> = ({ tickets }) => {
  return (
    <div className="lottery-list ">
        <h3 className="text-3xl font-semibold text-gray-700 mx-5">Wildcard lottery</h3>
      {tickets.map((ticket, index) => (
        <div
          key={index}
          className="lottery-ticket bg-white p-1 rounded shadow-md hover:shadow-lg transition-shadow mb-1 mx-5"
        >
          <h3 className="text-xl font-semibold text-gray-700 ">Ticket #{index + 1} digits: {ticket.prizeWildcards.map((digit) =>(digit ? '1' : '0')) }</h3>
          <div className="ticket-details grid grid-cols-2 ">
            {/* Ticket Number & Round Number */}
            <div className= "flex">
              <p className="text-gray-700 font-semibold mr-2">Ticket Number:</p>
              <p className="text-gray-700">{ticket.number}</p>
            </div>
            <div className= "flex">
              <p className="text-gray-700 font-semibold mr-2">Round Number:</p>
              <p className="text-gray-700">{ticket.roundNumber}</p>
            </div>

            {/* Prize & Status */}
            <div className= "flex">
              <p className="text-gray-700 font-semibold mr-2">Prize:</p>
              <p className="text-gray-700">${ticket.prize.toLocaleString()}</p>
            </div>
            <div className= "flex">
              <p className="text-gray-700 font-semibold mr-2">Status:</p>
              <p
                className={`text-lg font-bold ${
                  ticket.status === 'win'
                    ? 'text-green-500'
                    : ticket.status === 'lose'
                    ? 'text-red-500'
                    : 'text-yellow-500'
                }`}
              >
                {ticket.status.toUpperCase()}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default WildLotteryList;
