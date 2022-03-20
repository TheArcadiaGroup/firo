import {
	getLPTokenContract,
	getMasterChefContract,
	getVestingContract
} from '$constants/contracts';
import { masterChef } from '$constants/contracts/contractAddresses';
import {
	selectedPool,
	lpTokenBalance,
	totalStakedLPBalance,
	totalUnlockedLPTokenBalance,
	totalLockedLPBalance,
	pendingFiroRewardsBalance,
	realizedFiroRewardsBalance
} from '$stores/accountSummaryStore';
import { estimatedAPY } from '$stores/stakingStore';
import { appProvider, connectionDetails } from '$stores/wallet';
import { getCurrentBlockTimestampMilliseconds } from '$utils/onChainFuncs';
import { ethers } from 'ethers';
import type { LockInfo, UserInfo } from 'src/global';
import { get } from 'svelte/store';
import { getPoolInfoByIndex } from './masterChef';

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
		lpTokenBalance.set(+ethers.utils.formatEther(userBalance));

		// * Return it as a number
		return +ethers.utils.formatEther(userBalance);
	} catch (error) {
		lpTokenBalance.set(0);
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
		totalStakedLPBalance.set(0);
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
		pendingFiroRewardsBalance.set(+ethers.utils.formatEther(pendingFiroAmt));

		return +ethers.utils.formatEther(pendingFiroAmt);
	} catch (error) {
		pendingFiroRewardsBalance.set(0);

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

				// Current seconds since epoch are fewer than the unlocktime which is in the future implying not unlocked
				if (blockTime < unlockTimestamp) {
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
	await calculateStakingApr();
};

// Calculate staking APR
export const calculateStakingApr = async () => {
	try {
		const provider = get(appProvider);

		const masterChefContract = getMasterChefContract(provider);

		const userMockedBalance = ethers.BigNumber.from(ethers.utils.parseEther('1000'));

		const lpPool = await masterChefContract.poolInfo(get(selectedPool) || 0);

		const lpContract = getLPTokenContract(lpPool.lpToken, provider);

		let accFiroPerShare: ethers.BigNumber = ethers.BigNumber.from(lpPool?.accFiroPerShare);
		const blockNumber = await provider.getBlockNumber(); // current block number or block number at the end of the day
		const lastRewardBlock = +ethers.utils.formatUnits(lpPool?.lastRewardBlock, 0); // first block number of the day (the day we are calculating the APY for)

		const timeElapsed = (blockNumber - lastRewardBlock) / (3600 * 24 * 365); // convert second timestamps to years

		const lpSupply = ethers.BigNumber.from(
			await lpContract.balanceOf(masterChef(get(connectionDetails)?.chainId))
		);

		const multiplier: ethers.BigNumber = ethers.BigNumber.from(
			await masterChefContract.getMultiplier(lastRewardBlock, blockNumber)
		);
		const firoPerBlock: ethers.BigNumber = ethers.BigNumber.from(
			await masterChefContract.firoPerBlock()
		);
		const totalAllocPoint = ethers.BigNumber.from(await masterChefContract.totalAllocPoint());
		const firoReward = multiplier.mul(firoPerBlock).mul(lpPool?.allocPoint).div(totalAllocPoint);

		accFiroPerShare = accFiroPerShare.add(firoReward.mul(1e12).div(lpSupply));
		const pendingRewards = +ethers.utils.formatEther(
			userMockedBalance.mul(accFiroPerShare).div(1e12).sub(ethers.BigNumber.from(0))
		);

		// Interest rate
		const r = (1 / timeElapsed) * ((pendingRewards + 1000) / 1000 - 1);

		estimatedAPY.set(r);

		return r;
	} catch (err) {
		console.log(err);
	}
};
