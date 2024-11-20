import React from 'react';



interface UserLotteryListProps {
  tickets: LotteryGovernmentTicket[]; // Array of lottery tickets
}

const UserLotteryList: React.FC<UserLotteryListProps> = ({ tickets }) => {
  return (
    <div className="lottery-list">
      <h3 className="text-3xl font-semibold text-gray-700 mx-5">Main Lottery</h3>
      {tickets.map((ticket, index) => (
        <div
          key={index}
          className="lottery-ticket bg-white p-1 rounded shadow-md hover:shadow-lg transition-shadow mb-1 mx-5"
        >
          <h3 className="text-xl font-semibold text-gray-700">Ticket #{index + 1}</h3>
          <div className="ticket-details grid grid-cols-2">
            {/* Ticket Number */}
            <div className="flex">
              <p className="text-gray-700 font-semibold mr-2">Ticket Number:</p>
              <p className="text-gray-700">{ticket.ticketNumber}</p>
            </div>

            {/* Amount */}
            <div className="flex">
              <p className="text-gray-700 font-semibold mr-2">Amount:</p>
              <p className="text-gray-700">{ticket.amount.toLocaleString()}</p>
            </div>

            {/* Prize */}
            <div className="flex">
              <p className="text-gray-700 font-semibold mr-2">Prize:</p>
              <p className="text-gray-700">{ticket.prize.toLocaleString()} wei</p>
            </div>

            {/* Status */}
            <div className="flex">
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
