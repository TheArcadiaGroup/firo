import { getLPTokenContract } from '$constants/contracts';
import {
	selectedPool,
	lpTokenBalance,
	totalStakedLPBalance,
	totalUnlockedLPTokenBalance
} from '$stores/accountSummaryStore';
import { appProvider, userAddress } from '$stores/wallet';
import { ethersBigNumberToNumber } from '$utils/helpers/ethersHelpers';
import { localeTimeToOnChainTime } from '$utils/helpers/showTimeInLocalTime';
import { ethers } from 'ethers';
import { get } from 'svelte/store';
import { getPoolLength, getPoolInfoByIndex, getUserLockInfo } from './masterChef';
import { getUserInfoWithIndex } from './staking';

export const getLPTokenBalanceBasedOnPoolToken = async (
	lptokenAddress: string,
	userAddress: string
) => {
	try {
		if (lptokenAddress && userAddress) {
			const lpTokenContract = getLPTokenContract(lptokenAddress, get(appProvider));

			const userBalance = await lpTokenContract.balanceOf(userAddress);

			return ethersBigNumberToNumber(userBalance);
		} else {
			return 0;
		}
	} catch (err) {
		console.log(err);
		return 0;
	}
};

export const loadStakeBalances = async () => {
	// Get the pool length
	const lastPoolIndex = await getPoolLength();

	// Set default pool
	selectedPool.set(lastPoolIndex && typeof lastPoolIndex === 'number' ? lastPoolIndex - 1 : 0);

	// Get first pool if above fails
	const lastPool =
		lastPoolIndex && typeof lastPoolIndex === 'number'
			? await getPoolInfoByIndex(lastPoolIndex - 1)
			: await getPoolInfoByIndex(0);
	const poolLpTokenAddress = lastPool?.lpToken;

	const tokenBalance = await getLPTokenBalanceBasedOnPoolToken(
		poolLpTokenAddress,
		get(userAddress)
	);

	// Update Store
	lpTokenBalance.set(tokenBalance);

	console.log('TOKEN BALANCE: ', tokenBalance);

	return tokenBalance;
};

export const loadUnstakeBalances = async () => {
	const result = await getUserInfoWithIndex(get(selectedPool), get(userAddress));

	const value = +ethers.utils.formatEther(result?.amount);

	console.log('UNSTAKE AMT: ', value);
	totalStakedLPBalance.set(value);

	return +value;
};

// Load Withdrawable LP Token Indexes (lock contract indexes)
export const loadWithdrawableLPTokens = async () => {
	try {
		const lockInfoArr = await getUserLockInfo(get(userAddress));
		let withdrawableLP = 0;

		lockInfoArr.map((lockInfo) => {
			if (localeTimeToOnChainTime() > lockInfo.unlockableAt) {
				// If locktime is past user can withdraw
				withdrawableLP += lockInfo.amount;
			}
		});

		// Set the store
		totalUnlockedLPTokenBalance.set(withdrawableLP);

		return withdrawableLP;
	} catch (error) {
		console.log(error);

		return 0;
	}
};
