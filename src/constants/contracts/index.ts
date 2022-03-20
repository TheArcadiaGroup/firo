import { ethers } from 'ethers';
import { firoToken, lockingContract, masterChef, vestingContract } from './contractAddresses';
import FiroTokenAbi from '$constants/abi/FiroToken.json';
import MasterChefAbi from '$constants/abi/MasterChef.json';
import VestingAbi from '$constants/abi/Vesting.json';
import LockingAbi from '$constants/abi/Locking.json';
import LPTokenAbi from '$constants/abi/LPTokenAbi.json';
import { connectionDetails } from '$stores/wallet';
import { get } from 'svelte/store';

// Firo
export const getFiroContract = (provider: ethers.Signer | ethers.providers.Provider) => {
	return new ethers.Contract(firoToken(get(connectionDetails)?.chainId), FiroTokenAbi, provider);
};

// Masterchef
export const getMasterChefContract = (provider: ethers.Signer | ethers.providers.Provider) => {
	return new ethers.Contract(masterChef(get(connectionDetails)?.chainId), MasterChefAbi, provider);
};

// Vesting Contract
export const getVestingContract = (provider: ethers.Signer | ethers.providers.Provider) => {
	return new ethers.Contract(
		vestingContract(get(connectionDetails)?.chainId),
		VestingAbi,
		provider
	);
};

// Locking Contract
export const getLockingContract = (provider: ethers.Signer | ethers.providers.Provider) => {
	return new ethers.Contract(
		lockingContract(get(connectionDetails)?.chainId),
		LockingAbi,
		provider
	);
};

export const getLPTokenContract = (
	address: string,
	provider: ethers.Signer | ethers.providers.Provider
) => {
	return new ethers.Contract(address, LPTokenAbi, provider);
};
