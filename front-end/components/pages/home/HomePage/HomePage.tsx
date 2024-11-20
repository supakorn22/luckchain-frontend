import Meta from '@components/common/Meta';
import CTA from '@components/default/CTA';
import Tagline from '@components/default/Tagline';
import Technologies from '@components/default/Technologies';
import { FC } from 'react';
import { IHomePage } from './HomePage.type';
import useWeb3 from '@hooks/useWeb3';
import { ethers } from "ethers";

import GovContract from '@components/pages/_component/GovContract';
import DealerContract from '@components/pages/_component/DealerContract';
import ShowPrevDraw from '@components/pages/_component/ShowPrevDraw';
import CreateDealerContract from '@components/pages/_component/CreateDealerContract';

const HomePage: FC<IHomePage> = () => {
	const { connectWallet, accounts, setIsWalletModalOpen, isWalletModalOpen } = useWeb3();
	const address = accounts[0]?.address;
	const BSC_TESTNET_RPC_URL = "https://data-seed-prebsc-1-s1.binance.org:8545";

	// Replace with your contract's ABI and address
	const CONTRACT_ABI = [
	// Your contract's ABI here
  ];
  const CONTRACT_ADDRESS = "0xeD000BbEAa2409dFDD9EE1B07090fD9E7745548a";

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
