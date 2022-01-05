import { appProvider } from '$stores/wallet';
import { get } from 'svelte/store';

export const getUTCSeconds = () => {
	const x = new Date();
	const UTCseconds = (x.getTime() + x.getTimezoneOffset() * 60 * 1000) / 1000;
	return UTCseconds;
};

export const getCurrentBlockTimestampMilliseconds = async () => {
	return (
		((await get(appProvider).getBlock(await get(appProvider).getBlockNumber())).timestamp ||
			getUTCSeconds()) * 1000
	);
};
