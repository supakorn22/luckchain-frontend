

interface BuyedTicket {
    lotteryType: number;
    isCustomDigits ?: boolean;
    digits : number;
    amount: number;
    ticketPrices: number;
    ticketNumber: number;
    baseLottery: string;
    targetDigits?: number[];
    contractMetadata:ContractMetadata;
}



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