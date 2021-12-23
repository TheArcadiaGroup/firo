import { getMasterChefContract } from '$constants/contracts';
import { appProvider, userAddress } from '$stores/wallet';
import { ethers } from 'ethers';
import { get } from 'svelte/store';
import { loadStakeBalances, loadUnstakeBalances } from './contractInteractions/tokenBalances';
import { toastSuccess } from './toastNotification';

export default () => {
	const provider = get(appProvider);
	const masterChefContract = getMasterChefContract(provider);

	if (provider) {
		masterChefContract.on('Deposit', async (_userAddress, _poolId, amount) => {
			if (_userAddress === get(userAddress)) {
				try {
					toastSuccess(
						`Successfully Staked ${parseFloat(ethers.utils.formatEther(amount)).toFixed(
							4
						)} LP Tokens`
					);

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
					toastSuccess(
						`Successfully Staked ${parseFloat(ethers.utils.formatEther(amount)).toFixed(
							4
						)} LP Tokens`
					);

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
