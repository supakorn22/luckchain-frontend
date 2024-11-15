import Meta from '@components/common/Meta';
import { FC } from 'react';
import { IHomePage } from './HomePage.type';
import useWeb3 from '@hooks/useWeb3';
import React, { useEffect, useState } from 'react';
import  TestContract from '@components/testContract/testLotteryContract';

const HomePage: FC<IHomePage> = () => {


	return (
	  <>
		<Meta
		  title="LuckChain Lottery"
		  description="LuckChain Lottery is a decentralized lottery application built on the Binance Smart Chain (BSC) Testnet for education purpose."
		/>
  
		<div>
		<TestContract /> 
		</div>
	  </>
	);
  };
  

export { HomePage };
