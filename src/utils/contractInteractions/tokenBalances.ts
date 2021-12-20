import { getLPTokenContract } from '$constants/contracts';
import { appProvider } from '$stores/wallet';
import { ethersBigNumberToNumber } from '$utils/helpers/ethersHelpers';
import { get } from 'svelte/store';

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
