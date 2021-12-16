import type Web3Modal from 'web3modal';
import type { ethers } from 'ethers';
import { writable } from 'svelte/store';

export const appProvider = writable<ethers.providers.Provider>(null);
export const appSigner = writable<ethers.Signer>(null);
export const connectionDetails = writable(null);
export const userAddress = writable<string>('');
export const web3ModalInstance = writable<Web3Modal>(null);
