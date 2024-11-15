interface LotteriesMetadata {
    tickerPrice: number;
    prizeAmount: number;
    prizeNumber: number;
    status: number;
    balance: number;
  }

interface wildcardDealerLottery {
    tickerPrice: number;
    prizeAmount: number;
    balance: number;
}

export type { LotteriesMetadata,wildcardDealerLottery };