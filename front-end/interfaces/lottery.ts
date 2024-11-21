


interface LotteryGovernmentTicket {
    ticketNumber: number;
    prize: number;
    status: 'win' | 'lose' | 'process';
    amount:number;
  }


interface   LotteryExactMatch{
    status: number;
    winningPrize : number;
    winningNumberValid: boolean;
    fund : number
}

interface   LotteryCustomDigits{
    status: number;
    winningPrize : number;
    winningNumberValid: boolean;
    fund : number
}