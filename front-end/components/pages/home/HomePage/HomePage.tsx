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
import CreateDealerContract from '@components/pages/_component/CreateDealerContract';

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

			<div className='flex flex-col justify-evenly h-screen px-4 md:px-8 md:pt-4 lg:px-16 mb-20 '>
				{/* <div className='flex flex-col justify-evenly h-screen pt-24 px-4 md:px-8 md:pt-8 lg:px-16 '>
					<span className='text-white'>text-whit {address}</span>
					 </div>*/}
				
				<ShowPrevDraw/>	
				<GovContract/>
				<CreateDealerContract/>
				<DealerContract/>
			</div>
		</div>
	);
  };
  

export { HomePage };
