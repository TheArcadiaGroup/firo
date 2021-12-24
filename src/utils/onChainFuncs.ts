import { appProvider } from '$stores/wallet';
import { get } from 'svelte/store';

export const getCurrentBlockTimestampMilliseconds = async () => {
	return (
		(await get(appProvider).getBlock(await get(appProvider).getBlockNumber())).timestamp * 1000
	);
};
