import {
	getLPTokenContract,
	getMasterChefContract,
	getVestingContract
} from '$constants/contracts';
import {
	selectedPool,
	lpTokenBalance,
	totalStakedLPBalance,
	totalUnlockedLPTokenBalance,
	totalLockedLPBalance,
	pendingFiroRewardsBalance,
	realizedFiroRewardsBalance
} from '$stores/accountSummaryStore';
import { appProvider } from '$stores/wallet';
import { getUTCTimeStamp } from '$utils/helpers/showTimeInLocalTime';
import { getCurrentBlockTimestampMilliseconds } from '$utils/onChainFuncs';
import { ethers } from 'ethers';
import type { LockInfo, UserInfo } from 'src/global';
import { get } from 'svelte/store';
import { getPoolInfoByIndex } from './masterChef';

/*
 * Balances to load:
 * LP Token Balance (From Wallet) - Available LP Tokens ✅
 * Staked LP Tokens (on MasterChef) ✅
 * Pending Rewards (From vesting contract or MasterChef (pendingFiro Func)) ✅
 * Locked Tokens - From locking contract ✅
 * Unlocked LP Tokens - From locking contract ✅
 * Pending Firo (account summary page) - currently locked in the vesting contract
 * Total realized rewards that can be withdrawn - unlocked firo rewards
 */

// Get the User's LP Token Balance
export const getUserLPTokenBalance = async (userAddress: string) => {
	try {
		// * Get the Pool + Pool LP Contract Address
		const poolInfo = await getPoolInfoByIndex(0);
		// * Get the user's balance
		const userBalance = await getLPTokenContract(poolInfo.lpToken, get(appProvider)).balanceOf(
			userAddress
		);

		// * Set store
		lpTokenBalance.set(+ethers.utils.formatEther(userBalance) || 0);

		// * Return it as a number
		return +ethers.utils.formatEther(userBalance);
	} catch (error) {
		return 0;
	}
};

// return staked tokens
export const getStakedLPTokensBalance = async (userAddress: string) => {
	try {
		const stakedTokens = (await getUserInfo(userAddress)).amount;

		// * Set Store
		totalStakedLPBalance.set(stakedTokens);

		return stakedTokens;
	} catch (error) {
		return 0;
	}
};

// Get the user's info
export const getUserInfo: (userAddress: string) => Promise<UserInfo> = async (
	userAddress: string
) => {
	try {
		const masterChefContract = getMasterChefContract(get(appProvider));
		const userInfo = await masterChefContract.getUserInfo(get(selectedPool), userAddress);

		return {
			amount: +ethers.utils.formatEther(userInfo?.amount) || 0,
			rewardDebt: +ethers.utils.formatEther(userInfo?.rewardDebt) || 0
		};
	} catch (error) {
		return {
			amount: 0,
			rewardDebt: 0
		};
	}
};

// Get the user's pending Rewards
export const getUserPendingRewards = async (userAddress: string) => {
	try {
		const masterChefContract = getMasterChefContract(get(appProvider));
		const pendingFiroAmt = await masterChefContract.pendingFiro(get(selectedPool), userAddress);

		// * set store
		pendingFiroRewardsBalance.set(+ethers.utils.formatEther(pendingFiroAmt) || 0);

		return +ethers.utils.formatEther(pendingFiroAmt);
	} catch (error) {
		return 0;
	}
};

// Get user's locked and unlocked LP tokens (from locking contract)
export const getLpTokenLockInfoBalance = async (userAddress: string) => {
	try {
		const masterChefContract = getMasterChefContract(get(appProvider));
		const lockInfo: LockInfo = await masterChefContract.getLockInfo(userAddress);

		// Update locked lp tokens store
		let lockedLPBalance = 0;
		// Update unlocked lp tokens store
		let unlockedLPBalance = 0;

		await Promise.all(
			lockInfo.amounts.map(async (amt, i) => {
				const unlockTimestamp = +ethers.utils.formatUnits(lockInfo.unlockableAts[i], 0) * 1000;
				const blockTime = await getCurrentBlockTimestampMilliseconds();

				if (unlockTimestamp < blockTime) {
					// is still locked
					lockedLPBalance += +ethers.utils.formatEther(amt);
				} else {
					unlockedLPBalance += +ethers.utils.formatEther(amt);
				}
			})
		);

		// Update store
		totalLockedLPBalance.set(lockedLPBalance);
		totalUnlockedLPTokenBalance.set(unlockedLPBalance);

		return {
			unlockedLP: unlockedLPBalance,
			lockedLP: lockedLPBalance
		};
	} catch (error) {
		return {
			unlockedLP: 0,
			lockedLP: 0
		};
	}
};

// Get the amount that can be unlocked from vesting
export const realizedFiroRewards = async (userAddress: string) => {
	try {
		const vestingContract = getVestingContract(get(appProvider));

		const realizedRewards = await vestingContract.getUnlockable(userAddress);

		realizedFiroRewardsBalance.set(+ethers.utils.formatEther(realizedRewards));

		console.log('REALIZED REWARDS: ', +ethers.utils.formatEther(realizedRewards));

		return +ethers.utils.formatEther(realizedRewards);
	} catch (error) {
		console.log(error);
		realizedFiroRewardsBalance.set(0);
		return 0;
	}
};

export const loadAllBalances = async (userAddress: string) => {
	await getUserLPTokenBalance(userAddress);
	await getStakedLPTokensBalance(userAddress);
	await getUserPendingRewards(userAddress);
	await realizedFiroRewards(userAddress);
	await getLpTokenLockInfoBalance(userAddress);
};
