import { getMasterChefContract } from '$constants/contracts';
import { lpTokenBalance, selectedPool, totalStakedLPBalance } from '$stores/accountSummaryStore';
import { stakingOrUnstakeAmount } from '$stores/stakingStore';
import { appProvider, appSigner, userAddress } from '$stores/wallet';
import { toastError, toastSuccess } from '$utils/toastNotification';
import { ethers } from 'ethers';
import { get } from 'svelte/store';
import { loadAllBalances } from './tokenBalances';

export const stakeLPTokens = async () => {
	try {
		const amount = get(stakingOrUnstakeAmount);

		if (amount <= 0) {
			toastError('Please enter amount to stake');
			return;
		}

		if (amount > get(lpTokenBalance)) {
			toastError('Amount Cannot be More than Actual Balance');
			return;
		}

		const masterChefContract = getMasterChefContract(get(appSigner));

		const transaction = (await masterChefContract.deposit(
			get(selectedPool),
			ethers.utils.parseEther(amount.toString())
		)) as ethers.providers.TransactionResponse;

		await transaction.wait();

		toastSuccess(`Successfully Staked ${amount.toString()} LP Tokens`);

		return transaction;
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
		return {
			amount: 0
		};
	}
};

export const unStakeLpTokens = async () => {
	try {
		const amount = get(stakingOrUnstakeAmount);

		if (amount <= 0) {
			toastError('Please enter amount to unstake');
			return;
		}

		if (amount > get(totalStakedLPBalance)) {
			toastError('Amount Cannot be More than Actual Balance');
			return;
		}

		const masterChefContract = getMasterChefContract(get(appSigner));

		const transaction = (await masterChefContract.withdraw(
			get(selectedPool),
			ethers.utils.parseEther(amount.toString())
		)) as ethers.providers.TransactionResponse;

		await transaction.wait();

		toastSuccess(`Successfully Unstaked ${amount.toString()} LP Tokens`);

		await loadAllBalances(get(userAddress));

		return transaction;
	} catch (err) {
		console.log(err);
		toastError(err.message || err.toString());
	}
};

// Not Implemented
// export const emergencyWithdrawLpTokens = async () => {
// 	const amount = get(stakingOrUnstakeAmount);

// 	if (amount <= 0) {
// 		toastError('Please enter amount to unstake');
// 		return;
// 	}

// 	if (amount > get(totalStakedLPBalance)) {
// 		toastError('Amount Cannot be More than Actual Balance');
// 		return;
// 	}
// };
