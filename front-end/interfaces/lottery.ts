


interface LotteryGovernmentTicket {
    ticketNumber: number;
    prize: number;
    status: 'win' | 'lose' | 'process';
    amount:number;
  }