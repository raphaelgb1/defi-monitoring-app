import { ethers } from 'ethers';
import { provider } from './blockchain';

// Exemplo de contrato de staking
const stakingContractAddress = '';

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

const stakingContract = new ethers.Contract(stakingContractAddress, stakingContractABI, provider);

export const getStakingInfo = async (address) => {
  try {
    const stakedAmount = await stakingContract.balanceOf(address);
    const rewards = await stakingContract.earned(address);
    return {
      stakedAmount: ethers.utils.formatEther(stakedAmount),
      rewards: ethers.utils.formatEther(rewards),
    };
  } catch (error) {
    console.error('Erro ao buscar informações de staking:', error);
    return {
      stakedAmount: '0',
      rewards: '0',
    };
  }
};

export { stakingContract };

