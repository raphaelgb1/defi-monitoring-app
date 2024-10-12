import { ethers } from 'ethers';
import { stakingContract } from './defi';

export const subscribeToEvents = (address, callback) => {
  try {
    stakingContract.on('RewardPaid', (user, reward) => {
      if (user.toLowerCase() === address.toLowerCase()) {
        callback(`Você recebeu uma recompensa de ${ethers.utils.formatEther(reward)} ETH`);
      }
    });

    stakingContract.on('Staked', (user, amount) => {
      if (user.toLowerCase() === address.toLowerCase()) {
        callback(`Você fez um staking de ${ethers.utils.formatEther(amount)} ETH`);
      }
    });
  } catch (error) {
    console.error('Erro ao subscrever aos eventos:', error);
  }
};