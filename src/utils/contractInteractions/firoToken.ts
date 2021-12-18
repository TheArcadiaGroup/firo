import { getFiroContract } from '$constants/contracts';
import { appProvider } from '$stores/wallet';
import { ethersBigNumberToNumber } from '$utils/helpers/ethersHelpers';
import { get } from 'svelte/store';

export const getFiroAccountBalance = async (address: string) => {
	const firoContract = getFiroContract(get(appProvider));
	const firoAccBalance = await firoContract.balanceOf(address);

	return ethersBigNumberToNumber(firoAccBalance);
};
