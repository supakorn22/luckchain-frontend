import { ethers } from "ethers";
// Function to check if the user is on the correct network
const checkNetwork = async () => {
    try {
      const chainId = await window.ethereum.request({ method: 'eth_chainId' });
      
      // BSC Testnet Chain ID: '0x61' (97 in decimal)
      if (chainId !== '0x61') {
        alert("Please switch to the BSC Testnet!");
        // Optionally, prompt the user to switch to BSC Testnet
        try {
          await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: '0x61' }],
          });
        } catch (switchError) {
          console.error("Error switching network:", switchError);
          alert("Unable to switch to BSC Testnet. Please manually switch your network.");
        }
        return false;  // Return false if the user is not on the correct network
      }
      return true;  // Return true if the user is on the correct network
    } catch (error) {
      console.error("Error checking network:", error);
      return false;
    }
  };
  
  


export default async function getSigner() {
  // Check if the browser has an Ethereum provider (e.g., MetaMask)

  const isNetworkCorrect = await checkNetwork();
  if (!isNetworkCorrect) {
    return null;  // Return null if the user is not on the correct network
  }
  if (typeof window.ethereum !== 'undefined') {
    // Request account access if needed
    await window.ethereum.request({ method: 'eth_requestAccounts' });

    // Create a provider using the browser's Ethereum provider (MetaMask)
    const provider = new ethers.BrowserProvider(window.ethereum);

    // Get the signer
    const signer = provider.getSigner();
    return signer;
  } else {
    console.error("Ethereum provider not found. Please install MetaMask.");
    return null;
  }
}