import { ethers } from 'ethers';
import { firoToken, masterChef } from './contractAddresses';
import FiroTokenAbi from '$constants/abi/FiroToken.json';
import MasterChefAbi from '$constants/abi/MasterChef.json';
import LPTokenAbi from '$constants/abi/LPTokenAbi.json';

// Firo
export const getFiroContract = (provider: ethers.Signer | ethers.providers.Provider) => {
	return new ethers.Contract(firoToken, FiroTokenAbi, provider);
};

// Masterchef
export const getMasterChefContract = (provider: ethers.Signer | ethers.providers.Provider) => {
	return new ethers.Contract(masterChef, MasterChefAbi, provider);
};

export const getLPTokenContract = (
	address: string,
	provider: ethers.Signer | ethers.providers.Provider
) => {
	return new ethers.Contract(address, LPTokenAbi, provider);
};
