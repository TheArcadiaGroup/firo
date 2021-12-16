import { binanceWalletLogo, metamaskLogo } from '$constants/walletLogos';

const infuraId = '456e115b04624699aa0e776f6f2ee65c';

const isMetaMaskInstalled = () => {
	if ((window as any).ethereum) {
		if ((window as any).ethereum.providers) {
			return (window as any).ethereum.providers.find((prov) => prov.isMetaMask);
		} else {
			return (window as any).ethereum?.isMetaMask;
		}
	}
	return false;
};

export default {
	// Replace Default Metamask Injected Wallet
	'custom-metamask': {
		display: {
			logo: metamaskLogo,
			name: 'MetaMask',
			description: 'Connect to your MetaMask Wallet'
		},
		package: true,
		connector: async () => {
			if (!isMetaMaskInstalled()) {
				// window.location = "https://metamask.app.link/dapp/www.ethbox.org/app/"; // <-- LOOK HERE
				return;
			}

			let provider = null;
			if (typeof (window as any).ethereum !== 'undefined') {
				if ((window as any).ethereum.providers) {
					let providers = (window as any).ethereum.providers;
					provider = providers.find((prov) => prov.isMetaMask);
				} else {
					provider = (window as any).ethereum;
				}

				try {
					await provider.request({ method: 'eth_requestAccounts' });
				} catch (error) {
					console.log('Wallet Request Cancelled');
					return;
				}
			} else {
				console.log('No MetaMask Wallet found');
				return;
			}

			console.log('MetaMask Connected');
			return provider;
		}
	},

	// WalletConnect
	walletconnect: {
		package: (window as any).WalletConnectProvider.default, // required
		options: {
			infuraId: infuraId, // required
			rpc: {
				56: 'https://bsc-dataseed.binance.org/'
			},
			network: 'binance',
			chainId: 56
		}
	},

	// Binance SmartChain
	'custom-binancechainwallet': {
		display: {
			logo: binanceWalletLogo,
			name: 'Binance Chain Wallet',
			description: 'Connect to your Binance Chain Wallet'
		},
		package: true,
		connector: async () => {
			let provider = null;
			if (typeof (window as any).BinanceChain !== 'undefined') {
				provider = (window as any).BinanceChain;
				try {
					await provider.request({ method: 'eth_requestAccounts' });
				} catch (error) {
					throw new Error('User Rejected');
				}
			} else {
				throw new Error('No Binance Chain Wallet found');
			}
			return provider;
		}
	}
};
