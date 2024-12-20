import Navbar from '@components/default/Navbar';
import ResponsiveProvider from '@contexts/ResponsiveContext';
import Web3Provider from '@contexts/Web3Context';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import '../theme/globals.css';

const CreateNextjsDapp = ({ Component, pageProps }: AppProps) => {
	return (
		<>
			<Head>
				<meta name='viewport' content='width=device-width, initial-scale=1.0' />

				<link rel='apple-touch-icon' href='/lucchain.webp'></link>

				<meta name='application-name' content='LuckChain' />
				<meta name='mobile-web-app-capable' content='yes' />
				<meta name='apple-mobile-web-app-status-bar-style' content='default' />
				<meta name='apple-mobile-web-app-title' content='LuckChain' />
				<meta
					name='description'
					content='Starter to create Dapps with Next, React and Ethers. No longer waste valuable time building your project structure. Start coding is easy as npx create-nextjs-dapp'
				/>

				<meta name='theme-color' content='#FFFFFF' />
			</Head>

			<ResponsiveProvider>
				<Web3Provider>
					<Navbar />
					<Component {...pageProps} />
				</Web3Provider>
			</ResponsiveProvider>
		</>
	);
};

export default CreateNextjsDapp;
