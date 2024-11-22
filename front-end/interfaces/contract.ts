interface LotteriesMetadata {
  tickerPrice: number;
  prizeAmount: number;
  prizeNumber: number;
  status: number;
  balance: number;
}

interface WildcardDealerMetadata {
  tickerPrice: number;
  prizeAmount: number;
  balance: number;
}

interface GovernanceLottery {
  editor: string;
  owner: string;
  contractAddress: string;
  tickerPrice: number;
  ptizeAmount: number;
}

interface WildcardDealerLottery {
  editor: string;
  owner: string;
  contractAddress: string;
  tickerPrice: number;
  prizeAmount: number;
  prizeWildcards: boolean[];
}

interface LotteryTicketFullMetadata {
  digits: number;
  fallbackTicketPrice: number;
  getListingPrice: number;
  MAX_TICKET_NUMBER: number;
  maxSet: number;
  minter: string;
  ownner: string;
}

interface GovernmentLotteryFullMetadata {
  lottery?: LotteryTicketFullMetadata;
  checkFund: number;
  lotteryTicket: string;
  lottteryType: number;
  status: number;
  winingNumber: number;
  winnigPrize: number;
  winningNumberValid: boolean;
  owner: string;
}

interface CustomDigitsDealerLotteryFullMetadata {
  lottery?: LotteryTicketFullMetadata;
  checkFund: number;
  lotteryTicket: string;
  lottteryType: number;
  status: number;
  winingNumber: number;
  winnigPrize: number;
  winningNumberValid: boolean;
  owner: string;
  targetDigits: number[];
}

interface ExactMatchDealerLotteryFullMetadata {
  lottery?: LotteryTicketFullMetadata;
  checkFund: number;
  lotteryTicket: string;
  lottteryType: number;
  status: number;
  winingNumber: number;
  winnigPrize: number;
  winningNumberValid: boolean;
  owner: string;
}

interface LotteryRegistrySrotage {
    owner: string;
    governmentLotterys: GovernmentLotteryFullMetadata[];
    wildcardDealerLotterys: (CustomDigitsDealerLotteryFullMetadata |  ExactMatchDealerLotteryFullMetadata) [];
}




// export type { LotteriesMetadata,WildcardDealerMetadata,GovernanceLottery,WildcardDealerLottery };