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


export type { LotteriesMetadata,WildcardDealerMetadata,GovernanceLottery,WildcardDealerLottery };