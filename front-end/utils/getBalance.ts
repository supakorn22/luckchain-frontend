

import { ethers } from "ethers";
// Function to check if the user is on the correct network

export default async () => {
    
      const accounts = await window.ethereum.request({ method: 'eth_accounts' });
      const userAddress = accounts[0];
  
      const balance = await window.ethereum.request({
        method: 'eth_getBalance',
        params: [userAddress, 'latest'],
      });
      

      // return eth(bsc testnet) balance
      return balance;


  };