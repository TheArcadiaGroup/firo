import { toastSuccess, toastWarning, toastError } from './../toastNotification';
import { appProvider, appSigner, userAddress, connectionDetails } from '$stores/wallet';
import { web3ModalInstance } from '$stores/wallet';
import Web3Modal from 'web3modal';
import { get } from 'svelte/store';
import { ethers } from 'ethers';

const initWeb3Modal = async () => {
	const web3Modal = new Web3Modal({
		// Disabled the default injected Metamask (also launches other injected if enabled + present)
		disableInjectedProvider: true,
		cacheProvider: true,
		// Only resolve when being ran (in browser)
		providerOptions: (await import('$utils/walletConnection/providerOptions')).default
	});

	web3ModalInstance.set(web3Modal);

	return web3Modal;
};

const initProviderEvents = (provider: any) => {
	// Subscribe to accounts change
	provider.on('accountsChanged', async (accounts: string[]) => {
		console.log('accountsChanged: ', accounts);

		if (accounts.length <= 0) {
			// Clear the cached provider
			get(web3ModalInstance)?.clearCachedProvider();

			// Inform the user
			toastWarning('Wallet Disconnected');
		}

		await refreshWalletConnection();
	});

	// Subscribe to chainId change
	provider.on('chainChanged', async (chainId: number | string) => {
		console.log('Chain Changed');
	});

	// Subscribe to provider connection
	provider.on('connect', async (info: { chainId: number }) => {
		console.log('connect: ', info);
		toastSuccess('Successfully Connected to Wallet');
	});

	// Subscribe to provider disconnection
	provider.on('disconnect', (error: { code: number; message: string }) => {
		console.log('disconnect: ', error);

		// Clear the cached provider
		get(web3ModalInstance)?.clearCachedProvider();

		// Inform the user
		toastWarning('Wallet Disconnected');
	});
};

const updateSvelteStore = async (provider: ethers.providers.ExternalProvider) => {
	// Convert to web3provider
	const ethersProvider = new ethers.providers.Web3Provider(provider);
	const connectedNetwork = await ethersProvider.getNetwork();

	connectionDetails.set(connectedNetwork);
	appProvider.set(ethersProvider);
	appSigner.set(ethersProvider.getSigner());
	userAddress.set(await ethersProvider.getSigner().getAddress());
};

// Connect to Wallet Pressed
export const connectToWallet = async () => {
	const web3Modal = get(web3ModalInstance) || (await initWeb3Modal());
	let provider: any;

	// Check if cachedProvider is Available
	try {
		// Clear the cached provider
		web3Modal.clearCachedProvider();
		// Init new connection
		provider = await web3Modal.connect();
	} catch (err) {
		console.log('FAILED TO CONNECT TO WALLET');
		console.log(err);
		return;
	}

	if (isBinance(provider)) {
		provider && initProviderEvents(provider);

		provider && (await updateSvelteStore(provider as ethers.providers.ExternalProvider));
	}

	return provider;
};

// Keep Wallet Connection Alive even after reload
export const refreshWalletConnection = async () => {
	const web3Modal = get(web3ModalInstance) || (await initWeb3Modal());
	let provider: any;

	// Check if cachedProvider is Available
	try {
		if (web3Modal.cachedProvider) {
			// Refresh the connection
			provider = await web3Modal.connectTo(web3Modal.cachedProvider);
		} else {
			// Clear Store
			provider = null;
		}
	} catch (err) {
		console.log('FAILED TO CONNECT TO WALLET');
		console.log(err);
		return;
	}

	if (provider && isBinance(provider)) {
		provider && initProviderEvents(provider);

		provider && (await updateSvelteStore(provider as ethers.providers.ExternalProvider));
	}

	return provider;
};

const isBinance = (provider: any) => {
	let chainId = provider.chainId;

	try {
		chainId = typeof chainId === 'string' ? parseInt(chainId) : chainId;
	} catch (err) {
		toastError('Error: This Application only Supports the Binance Smartchain');
	}

	if (chainId === 56 || chainId === 97) {
		return true;
	} else {
		toastError('Error: This Application only Supports the Binance Smartchain');
		return false;
	}
};
