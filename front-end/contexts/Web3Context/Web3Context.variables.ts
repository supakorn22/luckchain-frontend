import { INetwork } from '@interfaces/network';

const NETWORKS = {
	// ethereum: 1,
	// goerli: 5,
	// optimism: 10,
	// goerliOptimism: 420,
	bnbSmartChainTestnet: 97
};

const WALLETS = {
	blocknative: {
		name: 'BlockNative',
		srcLogo: '/assets/logo-blocknative.svg'
	}
};

const WALLETS_ARRAY = Object.values(WALLETS);

const NETWORKS_DATA = {
	// [NETWORKS.ethereum]: {
	// 	id: NETWORKS.ethereum,
	// 	label: 'Ethereum',
	// 	token: 'ETH',
	// 	rpcUrl: process.env.RPC_ETHEREUM || 'https://rpc.ankr.com/eth'
	// },
	// [NETWORKS.goerli]: {
	// 	id: NETWORKS.goerli,
	// 	label: 'Goerli',
	// 	token: 'gETH',
	// 	rpcUrl: process.env.RPC_GOERLI || 'https://rpc.ankr.com/eth_goerli'
	// },
	// [NETWORKS.optimism]: {
	// 	id: NETWORKS.optimism,
	// 	label: 'Optimism',
	// 	token: 'ETH',
	// 	rpcUrl: process.env.RPC_OPTIMISM || 'https://rpc.ankr.com/optimism'
	// },
	// [NETWORKS.goerliOptimism]: {
	// 	id: NETWORKS.goerliOptimism,
	// 	label: 'Goerli Optimism',
	// 	token: 'gETH',
	// 	rpcUrl: process.env.RPC_GOERLI_OPTIMISM || 'https://rpc.ankr.com/optimism_testnet'
	// },
	[NETWORKS.bnbSmartChainTestnet]: {
		id: NETWORKS.bnbSmartChainTestnet,
		label: 'BNB Smart Chain Testnet',
		token: 'tBNB',
		rpcUrl: process.env.RPC_BNB_SMART_CHAIN_TESTNET || 'https://data-seed-prebsc-1-s1.bnbchain.org:8545'
	}
};

const NETWORKS_RPC = {
	// [NETWORKS.ethereum]: NETWORKS_DATA[NETWORKS.ethereum].rpcUrl,
	// [NETWORKS.goerli]: NETWORKS_DATA[NETWORKS.goerli].rpcUrl,
	// [NETWORKS.optimism]: NETWORKS_DATA[NETWORKS.optimism].rpcUrl,
	// [NETWORKS.goerliOptimism]: NETWORKS_DATA[NETWORKS.goerliOptimism].rpcUrl,
	[NETWORKS.bnbSmartChainTestnet]: NETWORKS_DATA[NETWORKS.bnbSmartChainTestnet].rpcUrl
};

const VALID_CHAIN_IDS: number[] = (Object.values(NETWORKS_DATA) as INetwork[])
	.map((n: INetwork): number => n.id || 0)
	.filter((n: number): boolean => n !== 0);

export { NETWORKS, NETWORKS_DATA, NETWORKS_RPC, VALID_CHAIN_IDS, WALLETS, WALLETS_ARRAY };
