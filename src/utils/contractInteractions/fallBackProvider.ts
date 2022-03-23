import { ethers } from 'ethers';

// for mainnet
export default () => {
	return new ethers.providers.JsonRpcProvider('https://bsc-dataseed.binance.org/', 56);
};
