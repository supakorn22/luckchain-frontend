import { FC } from 'react';

import UserLotteryList from './components/UserLotteryList';
import WildLotteryList from './components/WildLotteryList';

interface UserLotteryTicket {
  number: string;
  roundNumber: number;
  prize: number;
  status: 'win' | 'lose' | 'process';
}

interface WildLotteryTicket {
    number: string; // Lottery ticket number
    roundNumber: number; // The round number for the lottery
    prize: number; // Prize amount for this ticket
    prizeWildcards: boolean[];
    status: 'win' | 'lose' | 'process'; // Status of the lottery ticket
  }

const userTickets: UserLotteryTicket[] = [
  {
    number: '123456',
    roundNumber: 5,
    prize: 10000,
    status: 'win',
  },
  {
    number: '654321',
    roundNumber: 4,
    prize: 5000,
    status: 'lose',
  },
  {
    number: '112233',
    roundNumber: 6,
    prize: 2000,
    status: 'process',
  },
];


const wildTickets: WildLotteryTicket[] = [
    {
      number: '123456',
      roundNumber: 5,
      prize: 10000,
      status: 'win',
        prizeWildcards: [true, false, false, true, false, true],
    },
    {
      number: '654321',
      roundNumber: 4,
      prize: 5000,
      status: 'lose',
        prizeWildcards: [false, false, false, false, false, false],
    },
    {
      number: '112233',
      roundNumber: 6,
      prize: 2000,
      status: 'process',
        prizeWildcards: [true, true, true, true, true, true],
    },
  ];

const MyLottery: FC<{}> = () => {




    return (
            <div className="min-h-screen bg-gray-100 py-10">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-700">Your Lottery Tickets</h1>
      <UserLotteryList tickets={userTickets} />
        <WildLotteryList tickets={wildTickets} />
    </div>

    );

}

export { MyLottery };