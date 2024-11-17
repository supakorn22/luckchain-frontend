import React from 'react';

interface UserLotteryTicket {
  number: string; // Lottery ticket number
  roundNumber: number; // The round number for the lottery
  prize: number; // Prize amount for this ticket
  status: 'win' | 'lose' | 'process'; // Status of the lottery ticket
}

interface UserLotteryListProps {
  tickets: UserLotteryTicket[]; // Array of user lottery tickets
}

const UserLotteryList: React.FC<UserLotteryListProps> = ({ tickets }) => {
  return (
    <div className="lottery-list ">
        <h3 className="text-3xl font-semibold text-gray-700 mx-5">Main lottery</h3>
      {tickets.map((ticket, index) => (
        <div
          key={index}
          className="lottery-ticket bg-white p-1 rounded shadow-md hover:shadow-lg transition-shadow mb-1 mx-5"
        >
          <h3 className="text-xl font-semibold text-gray-700 ">Ticket #{index + 1}</h3>
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

export default UserLotteryList;
