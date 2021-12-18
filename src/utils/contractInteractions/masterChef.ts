import { getLPTokenContract, getMasterChefContract } from '$constants/contracts';
import { lockUpDuration, vestingDuration } from '$stores/stakingStore';
import { appProvider, appSigner, userAddress } from '$stores/wallet';
import { ethersBigNumberToNumber } from '$utils/helpers/ethersHelpers';
import { ethers } from 'ethers';
import type { Pool } from 'src/global';
import { get } from 'svelte/store';

export const getPoolLength = async () => {
	const masterChefContract = getMasterChefContract(get(appProvider));
	try {
		const poolLength = await masterChefContract.poolLength();

		console.log(poolLength);

		return poolLength;
	} catch (err) {
		console.log(err.message);
		return 0;
	}
};

// Get Pool Info
export const getPoolInfo: (poolIndex: number) => Promise<Pool | null> = async (
	poolIndex: number
) => {
	try {
		const masterChefContract = getMasterChefContract(get(appProvider));
		const poolInfo = await masterChefContract.getPoolInfo(poolIndex);

		return poolInfo;
	} catch (err) {
		console.log(err.message);
		return null;
	}
};

// Get Contract Init Info
export const initMasterChefContract = async () => {
	const masterChefContract = getMasterChefContract(get(appSigner));

	console.log(await masterChefContract.deployed());
};

// Get LP Token Balance
export const getLPTokenBalance = async (poolIndex: number, userAddress: string) => {
	try {
		const pool = await getPoolInfo(poolIndex);

		// Get LP Token address
		if (pool && pool.lpToken) {
			const lpTokenContract = getLPTokenContract(pool.lpToken, get(appProvider));

			const balanceInEthers = await lpTokenContract.getBalance(userAddress);

			return ethersBigNumberToNumber(balanceInEthers);
		}

		return 0;
	} catch (err) {
		console.log(err.message);
		return 0;
	}
};

// Get pools where user has staked tokens
export const getUserStakedPoolsData = (userAddress: string) => {
	// Get the pools from the server
	return {
		totalStaked: 0,
		pools: [
			{
				poolIndex: 0,
				stakedAmount: 0
			}
		]
	};
};

// Get the Total tokens a user can unstake
export const getTotalLPTokensStaked = async (userAddress: string) => {
	// Instead of looping through each time, have a separate database

	return getUserStakedPoolsData(userAddress).totalStaked;
};

// Get Pending Firos
export const getPendingFiroTokens = async (poolIndex: number, userAddress: string) => {
	try {
		// Only need provider here as its a read operation
		const masterChefContract = getMasterChefContract(get(appProvider));

		const pendingFirosInEthers = await masterChefContract.pendingFiro(poolIndex, userAddress);

		return ethersBigNumberToNumber(pendingFirosInEthers);
	} catch (err) {
		console.log(err.message);
		return 0;
	}
};

// Get Lockup duration
export const getLockUpDuration = async () => {
	try {
		const masterChefContract = getMasterChefContract(get(appProvider));
		const lockupSeconds = parseFloat(
			ethers.utils.formatUnits(await masterChefContract.lockingDuration(), 0)
		);

		// Update store
		lockUpDuration.set(lockupSeconds);

		return lockupSeconds;
	} catch (err) {
		console.log(err);
		return 0;
	}
};

// Get Vesting Duration
export const getVestingDuration = async () => {
	try {
		const masterChefContract = getMasterChefContract(get(appProvider));
		const vestingSeconds = parseFloat(
			ethers.utils.formatUnits(await masterChefContract.vestingDuration(), 0)
		);

		// Update store
		vestingDuration.set(vestingSeconds);

		return vestingSeconds;
	} catch (err) {
		console.log(err);
		return 0;
	}
};
