import Meta from '@components/common/Meta';
import { FC } from 'react';
import { IHomePage } from './HomePage.type';
import useWeb3 from '@hooks/useWeb3';
import { ethers } from "ethers";
import LotteryLastRound from './components/LotteryLastRound';
import WildCardLotteryList from './components/WildCardLotteryList';


import GovContract from '@components/pages/_component/GovContract';
import DealerContract from '@components/pages/_component/DealerContract';
import ShowPrevDraw from '@components/pages/_component/ShowPrevDraw';

const wildCards = [
    { digits: '010110', ownerId: 'user123', buyerCount: 25, prizePool: 1000 },
    { digits: '110011', ownerId: 'user456', buyerCount: 40, prizePool: 2000 },
    { digits: '101101', ownerId: 'user789', buyerCount: 30, prizePool: 1500 },
    { digits: '011011', ownerId: 'user321', buyerCount: 35, prizePool: 3000 },
    { digits: '111000', ownerId: 'user654', buyerCount: 20, prizePool: 1200 },
  ];


const HomePage: FC<IHomePage> = () => {



	const topWildCards = [...wildCards]
    .sort((a, b) => b.prizePool - a.prizePool)
    .slice(0, 4);

	return (
		<div className='flex flex-col my-5'>
			<div >
			<Meta
				title='LuckChain Lottery'
				description='LuckChain Lottery is a decentralized lottery application built on the Binance Smart Chain (BSC) Testnet for education purpose.'
			/>
			</div>

			<LotteryLastRound date="2024-11-18" roundNumber={1} lotteryNumber={'123456'} buyerCount={10} poolPrize={100} />
			<WildCardLotteryList wildCards={topWildCards} />
		</div>
	);
  };
  

export { HomePage };
