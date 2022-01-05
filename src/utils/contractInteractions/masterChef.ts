import { getMasterChefContract } from '$constants/contracts';
import { deployerAcc, erc20Mock } from '$constants/contracts/contractAddresses';
import { unstakeAllLPPopupActive, withdrawPopupActive } from '$stores/accountSummaryStore';
import { lockUpDuration, vestingDuration } from '$stores/stakingStore';
import { appProvider, appSigner, connectionDetails, userAddress } from '$stores/wallet';
import { toastError, toastSuccess } from '$utils/toastNotification';
import { ethers } from 'ethers';
import type { Pool } from 'src/global';
import { get } from 'svelte/store';
import { loadAllBalances } from './tokenBalances';

export const getPoolLength = async () => {
	const masterChefContract = getMasterChefContract(get(appProvider));
	try {
		const poolLength = await masterChefContract.poolLength();

		return +ethers.utils.formatUnits(poolLength, 0);
	} catch (err) {
		console.log(err.message);
		return 0;
	}
};

// Get Pool Info
export const getPoolInfoByIndex: (poolIndex: number) => Promise<Pool | null> = async (
	poolIndex: number
) => {
	const masterChefContract = getMasterChefContract(get(appSigner));
	try {
		const poolInfo = await masterChefContract.poolInfo(poolIndex);

		return poolInfo;
	} catch (err) {
		return null;
	}
};

// Get Contract Init Info
export const initMasterChefContract = async () => {
	const masterChefContract = getMasterChefContract(get(appSigner));

	console.log('VESTING CONTRACT: ', await masterChefContract.vesting());
	console.log('LOCKING CONTRACT: ', await masterChefContract.locking());

	// Initialize Pool if none is found
	const poolLength = await getPoolLength();

	if (
		poolLength === 0 &&
		deployerAcc(get(connectionDetails).chainId) === get(userAddress) &&
		import.meta.env.VITE_LOCALTESTING === 'true'
	) {
		console.log('CREATING POOL');
		// Create a pool
		const transaction: ethers.providers.TransactionResponse = await masterChefContract.add(
			ethers.utils.parseEther('100'),
			erc20Mock(get(connectionDetails).chainId),
			true
		);
		await transaction.wait(1);

		console.log(transaction.data);

		return true;
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

// get lock info
export const getUserLockInfo = async (userAddress: string) => {
	try {
		const masterChefContract = getMasterChefContract(get(appProvider));

		const lockInfo = await masterChefContract.getLockInfo(userAddress);

		let lockArray = [];

		for (let i = 0; i < lockInfo?.amounts.length; i++) {
			lockArray.push({
				index: i,
				amount: +parseFloat(ethers.utils.formatEther(lockInfo?.amounts[i])).toFixed(4),
				isWithdrawn: lockInfo?.isWithdrawns[i],
				unlockableAt: +parseFloat(ethers.utils.formatUnits(lockInfo?.unlockableAts[i], 0)).toFixed(
					4
				),
				tokens: lockInfo?.tokens[i]
			});
		}

		return lockArray;
	} catch (err) {
		return null;
	}
};

// Get the Total tokens a user can unstake
export const getTotalLPTokensStaked = async (userAddress: string) => {
	// Instead of looping through each time, have a separate database

	return getUserStakedPoolsData(userAddress).totalStaked;
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

// Unlock Vested Firo Tokens
export const unlockVestedFiroTokens = async (userAddress: string) => {
	try {
		const masterChefContract = getMasterChefContract(get(appSigner));

		const transaction = (await masterChefContract.unlockVesting(
			userAddress
		)) as ethers.providers.TransactionResponse;

		await transaction.wait(1);

		toastSuccess('Tokens Successfully Transfered to Token');
		withdrawPopupActive.set(false);
		unstakeAllLPPopupActive.set(false);
		await loadAllBalances(userAddress);

		return;
	} catch (error) {
		console.log(error);

		toastError(error.message || 'Token Transfer Failed');
		return;
	}
};

// Unlock Tokens - app only allows to unlock all that are locked
export const unlockLpTokens = async (userAddress: string, index: number) => {
	try {
		const masterChefContract = getMasterChefContract(get(appSigner));

		const transaction = await masterChefContract.unlock(userAddress, index);

		transaction.wait(1);

		toastSuccess('Tokens Successfully Transfered to Wallet');
		withdrawPopupActive.set(false);
		unstakeAllLPPopupActive.set(false);
		await loadAllBalances(userAddress);

		return true;
	} catch (error) {
		console.log(error);

		toastError(error.message || 'Token Transfer Failed');

		return false;
	}
};
