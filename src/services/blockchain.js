import { ethers } from 'ethers';

const provider = new ethers.providers.InfuraProvider('mainnet', process.env.REACT_APP_INFURA_API_KEY);

export { provider };

export const getBalance = async (address) => {
  const balance = await provider.getBalance(address);
  return ethers.utils.formatEther(balance);
};

export const getTransactionCount = async (address) => {
  const txCount = await provider.getTransactionCount(address);
  return txCount;
};