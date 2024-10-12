import { ethers } from 'ethers';
import { provider } from './blockchain';

// ABI do contrato de staking
const stakingContractABI = [
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "user",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "reward",
        "type": "uint256"
      }
    ],
    "name": "RewardPaid",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "user",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "Staked",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "balanceOf",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "earned",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];

export const getStakingInfo = async (contractAddress, userAddress) => {
  try {
    const stakingContract = new ethers.Contract(contractAddress, stakingContractABI, provider);
    let stakedAmount = ethers.BigNumber.from(0);
    let rewards = ethers.BigNumber.from(0);

    if (userAddress) {
      stakedAmount = await stakingContract.balanceOf(userAddress);
      rewards = await stakingContract.earned(userAddress);
    }

    return {
      stakedAmount: ethers.utils.formatEther(stakedAmount),
      rewards: ethers.utils.formatEther(rewards),
    };
  } catch (error) {
    console.error('Erro ao buscar informações de staking:', error);
    throw error;
  }
};

export const subscribeToEvents = (contractAddress, userAddress, callback) => {
  try {
    const stakingContract = new ethers.Contract(contractAddress, stakingContractABI, provider);
    stakingContract.on('RewardPaid', (user, reward) => {
      if (!userAddress || user.toLowerCase() === userAddress.toLowerCase()) {
        callback(`Usuário ${user} recebeu uma recompensa de ${ethers.utils.formatEther(reward)} ETH`);
      }
    });

    stakingContract.on('Staked', (user, amount) => {
      if (!userAddress || user.toLowerCase() === userAddress.toLowerCase()) {
        callback(`Usuário ${user} fez um staking de ${ethers.utils.formatEther(amount)} ETH`);
      }
    });
  } catch (error) {
    console.error('Erro ao subscrever aos eventos:', error);
    throw error;
  }
};