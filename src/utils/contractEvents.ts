import {
	getLockingContract,
	getMasterChefContract,
	getVestingContract
} from '$constants/contracts';
import { appProvider, userAddress } from '$stores/wallet';
import { get } from 'svelte/store';
import { loadStakeBalances, loadUnstakeBalances } from './contractInteractions/tokenBalances';

export default () => {
	const provider = get(appProvider);
	const masterChefContract = getMasterChefContract(provider);
	const lockingContract = getLockingContract(provider);
	const vestingContract = getVestingContract(provider);

	if (provider) {
		masterChefContract.on('Deposit', async (_userAddress, _poolId, amount) => {
			if (_userAddress === get(userAddress)) {
				try {
					console.log('LP TOKENS DEPOSITED');
					// Refresh stake balance
					await loadStakeBalances();
					await loadUnstakeBalances();
				} catch (err) {
					console.log(err);
				}
			}
		});

		masterChefContract.on('Withdraw', async (_userAddress, _poolId, amount) => {
			if (_userAddress === get(userAddress)) {
				try {
					console.log('LP TOKENS UNSTAKED');
					// Refresh stake balance
					await loadStakeBalances();
					await loadUnstakeBalances();
				} catch (err) {
					console.log(err);
				}
			}
		});

		// Lock Contract - Lock event
		lockingContract.on('Lock', async (_token, _userAddress, _amount) => {
			if (_userAddress === get(userAddress)) {
				try {
					console.log('LP TOKENS LOCKED');
					// Refresh stake balance
					await loadStakeBalances();
					await loadUnstakeBalances();
				} catch (err) {
					console.log(err);
				}
			}
		});

		// Locking contract - Unlock event
		lockingContract.on('Unlock', async (_tokenAddress, _userAddress, _amount) => {
			if (_userAddress === get(userAddress)) {
				try {
					console.log('LP TOKENS WITHDRAWN');
					// Refresh stake balance
					await loadStakeBalances();
					await loadUnstakeBalances();
				} catch (err) {
					console.log(err);
				}
			}
		});

		// Vesting Contract - Lock event
		vestingContract.on('Lock', async (_token, _userAddress, _amount) => {
			if (_userAddress === get(userAddress)) {
				try {
					console.log('FIRO TOKENS VESTED');
					// Refresh stake balance
					await loadStakeBalances();
					await loadUnstakeBalances();
				} catch (err) {
					console.log(err);
				}
			}
		});

		// Vesting Contract - Unlock event
		vestingContract.on('Unlock', async (_tokenAddress, _userAddress, _amount) => {
			if (_userAddress === get(userAddress)) {
				try {
					console.log('FIRO TOKENS UNLOCKED FROM VESTING');
					// Refresh stake balance
					await loadStakeBalances();
					await loadUnstakeBalances();
				} catch (err) {
					console.log(err);
				}
			}
		});
	}
};
