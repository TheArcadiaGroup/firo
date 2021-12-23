import { getVestingContract } from '$constants/contracts';
import { realizedFiroRewardsBalance } from '$stores/accountSummaryStore';
import { appProvider } from '$stores/wallet';
import { ethersBigNumberToNumber } from '$utils/helpers/ethersHelpers';
import { get } from 'svelte/store';

// Get the amount that can be unlocked from vesting
export const realizedFiroRewards = async (userAddress: string) => {
	try {
		const vestingContract = getVestingContract(get(appProvider));

		const realizedRewards = await vestingContract.getUnlockable(userAddress);

		realizedFiroRewardsBalance.set(ethersBigNumberToNumber(realizedRewards));

		console.log('REALIZED REWARDS: ', ethersBigNumberToNumber(realizedRewards));

		return ethersBigNumberToNumber(realizedRewards);
	} catch (error) {
		console.log(error);
		realizedFiroRewardsBalance.set(0);
		return 0;
	}
};
