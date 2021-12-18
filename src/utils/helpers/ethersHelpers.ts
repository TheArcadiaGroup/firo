import { ethers } from 'ethers';

export const ethersBigNumberToNumber = (ethersBigNumber: ethers.BigNumberish) => {
	try {
		return parseFloat(ethers.utils.formatEther(ethersBigNumber));
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
