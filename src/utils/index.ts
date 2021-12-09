export const capitalizeFirstLetter = (text: string): string => {
	const arr = text.split(' ');

	for (let i = 0; i < arr.length; i++) {
		arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
	}

	const str2 = arr.join(' ');
	return str2;
};
