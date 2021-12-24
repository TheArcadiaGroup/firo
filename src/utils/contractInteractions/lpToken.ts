import { getLPTokenContract } from '$constants/contracts';
import { erc20Mock, masterChef } from '$constants/contracts/contractAddresses';
import { isApproved } from '$stores/stakingStore';
import { appProvider, appSigner } from '$stores/wallet';
import { toastSuccess } from '$utils/toastNotification';
import { ethers } from 'ethers';
import { get } from 'svelte/store';

export const checkMasterchefAllowance = async (userAddress: string) => {
	const lpContract = getLPTokenContract(erc20Mock, get(appProvider));
	try {
		if (!userAddress) return 0;

		const allowanceInEth = await lpContract.allowance(userAddress, masterChef);

		return +ethers.utils.formatEther(allowanceInEth);
	} catch (err) {
		console.log(err);
		return 0;
	}
};

export const increaseMasterChefAllowance = async () => {
	console.log('Called');
	try {
		const lpContract = getLPTokenContract(erc20Mock, get(appSigner));
		const transaction = await lpContract.increaseAllowance(
			masterChef,
			ethers.utils.parseEther('999999999999999999999999999999999999000000000000000000')
		);

		console.log(transaction);

		toastSuccess('Successfully executed transaction');

		isApproved.set(true);

		return transaction;
	} catch (err) {
		console.log(err);
		return 0;
	}
};
