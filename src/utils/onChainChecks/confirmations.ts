import { appProvider } from '$stores/wallet';
import { get } from 'svelte/store';

export const getConfirmations = async (txHash: string) => {
	try {
		// get provider
		const provider = get(appProvider);

		// Get transaction details
		const trx = await provider.getTransaction(txHash);

		// Get current block number
		const currentBlock = await provider.getBlockNumber();

		// When transaction is unconfirmed, its block number is null.
		// In this case we return 0 as number of confirmations
		return trx.blockNumber === null ? 0 : currentBlock - trx.blockNumber;
	} catch (error) {
		console.log(error);
	}
};

export const waitForConfirmations = async (txHash: string, confirmations: number = 1) => {
	const myInterval = setInterval(async () => {
		const obtainedConfirmations = await getConfirmations(txHash);
		if (obtainedConfirmations <= confirmations) {
			clearInterval(myInterval);

			// Call functions waiting for confirmations
		}
	}, 1000);
};
