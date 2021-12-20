import { getMasterChefContract } from '$constants/contracts';
import { lpTokenBalance, selectedPool } from '$stores/accountSummaryStore';
import { stakingOrUnstakeAmount } from '$stores/stakingStore';
import { appProvider, appSigner } from '$stores/wallet';
import { toastError } from '$utils/toastNotification';
import { ethers } from 'ethers';
import { get } from 'svelte/store';

export const stakeLPTokens = async () => {
	try {
		const amount = get(stakingOrUnstakeAmount);

		if (amount > get(lpTokenBalance)) {
			toastError('Amount Cannot be More than Actual Balance');
			return;
		}

		const masterChefContract = getMasterChefContract(get(appSigner));

		const result = await masterChefContract.deposit(
			get(selectedPool),
			ethers.utils.parseEther(amount.toString())
		);

		console.log(result);

		return result;
	} catch (err) {
		console.log(err);

		toastError(err.message || err.toString());
	}
};

export const getUserInfoWithIndex = async (index: number, userAddress: string) => {
	try {
		const masterChefContract = getMasterChefContract(get(appProvider));
		const userInfo = masterChefContract.getUserInfo(index, userAddress);

		return userInfo;
	} catch (err) {
		console.log(err);
		return null;
	}
};
