import { appProvider } from '$stores/wallet';
import { ethers } from 'ethers';
import { get } from 'svelte/store';

export const ethersBigNumberToNumber = (ethersBigNumber: ethers.BigNumberish) => {
	try {
		return +ethers.utils.formatEther(ethersBigNumber);
	} catch (err) {
		console.log(err);
		throw err;
	}
};

export const etherStringToBigNumber = (etherString: string) => {
	try {
		return ethers.utils.parseEther(etherString);
	} catch (err) {
		console.log(err);
		throw err;
	}
};
