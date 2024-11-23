import Meta from '@components/common/Meta';
import { FC, useEffect, useState, Suspense, lazy } from 'react';
import { IHomePage } from './HomePage.type';
import useWeb3 from '@hooks/useWeb3';
import { ethers } from "ethers";
import LotteryLastRound from './components/LotteryLastRound';
import WildCardLotteryList from './components/WildCardLotteryList';

import useLotteryRegistry from '@utils/LotteryRegistry/useLotteryRegistry';
import { CircularProgress, Box } from "@mui/material";

import GovContract from '@components/pages/_component/GovContract';
import DealerContract from '@components/pages/_component/DealerContract';
import ShowPrevDraw from '@components/pages/_component/ShowPrevDraw';
import CreateDealerContract from '@components/pages/_component/CreateDealerContract';
import BuyLottery from '@components/pages/_component/BuyLottery';

// import LotteryTable from '@components/pages/_component/LotteryTable';
const LotteryTable = lazy(() => import('@components/pages/_component/LotteryBuyTable'));



const HomePage: FC<IHomePage> = () => {

	const [registerData, setRegisterData] = useState<LotteryRegistrySrotage>();

	const [selectedContractData, setSelectedContractData,] = useState<GovernmentLotteryFullMetadata | CustomDigitsDealerLotteryFullMetadata | ExactMatchDealerLotteryFullMetadata | null>(null);

	const handleBuyClick = (contractData: GovernmentLotteryFullMetadata | CustomDigitsDealerLotteryFullMetadata | ExactMatchDealerLotteryFullMetadata) => {

		setSelectedContractData(contractData); // Update the selected lottery
	};

	useEffect(() => {
		useLotteryRegistry.getData()
			.then((result) => {
				console.log(result);
				setRegisterData(result);

			})

	}, []);


	// const topWildCards = [...wildCards]
	// .sort((a, b) => b.prizePool - a.prizePool)
	// .slice(0, 4);

	return (
		<div className='flex flex-col my-5'>
			<div >
				<Meta
					title='LuckChain Lottery'
					description='LuckChain Lottery is a decentralized lottery application built on the Binance Smart Chain (BSC) Testnet for education purpose.'
				/>
			</div>

			<div className='flex flex-col  h-screen px-4 md:px-8 md:pt-4 lg:px-16 mb-20 '>


				<BuyLottery contractData={selectedContractData} onPurchase={() => console.log("Purchased!")} />
				<br />

				{registerData && (
					<Suspense fallback={<div>Loading...</div>}>
						<LotteryTable data={registerData} onBuyClick={handleBuyClick}  />
					</Suspense>
				)}


			</div>
		</div>
	);
};


export { HomePage };
