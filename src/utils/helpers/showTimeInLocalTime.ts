const getMilliSecondsOffset = () => {
	// Get minutes and return in milliseconds
	return new Date().getTimezoneOffset() * 60 * 1000;
};

export const localeTimeToOnChainTime = () => {
	return Date.now() + getMilliSecondsOffset();
};

export const onChainTimeToLocalTime = (onChainTimestamp: number) => {
	return onChainTimestamp * 1000 - getMilliSecondsOffset();
};
