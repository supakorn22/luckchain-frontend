import Meta from '@components/common/Meta';
import { FC } from 'react';
import { IHomePage } from './HomePage.type';
import useWeb3 from '@hooks/useWeb3';
import { ethers } from "ethers";

import GovContract from '@components/pages/_component/GovContract';
import DealerContract from '@components/pages/_component/DealerContract';
import ShowPrevDraw from '@components/pages/_component/ShowPrevDraw';

const HomePage: FC<IHomePage> = () => {


	return (
		<div className='flex flex-col my-5'>
			<div >
			<Meta
				title='LuckChain Lottery'
				description='LuckChain Lottery is a decentralized lottery application built on the Binance Smart Chain (BSC) Testnet for education purpose.'
			/>
			</div>

			
		</div>
	);
  };
  

export { HomePage };
