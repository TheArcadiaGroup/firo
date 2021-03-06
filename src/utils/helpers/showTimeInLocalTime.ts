import { appProvider } from '$stores/wallet';
import { get } from 'svelte/store';

const getMilliSecondsOffset = () => {
	// Get minutes and return in milliseconds
	return new Date().getTimezoneOffset() * 60 * 1000;
};

export const localeTimeToOnChainTime = () => {
	return Date.now() + getMilliSecondsOffset();
};

export const getUTCTimeStamp = (now = new Date()) => {
	const utc_timestamp = Date.UTC(
		now.getUTCFullYear(),
		now.getUTCMonth(),
		now.getUTCDate(),
		now.getUTCHours(),
		now.getUTCMinutes(),
		now.getUTCSeconds(),
		now.getUTCMilliseconds()
	);

	return utc_timestamp;
};
