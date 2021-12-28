import { appProvider, connectionDetails } from '$stores/wallet';
import { get } from 'svelte/store';

export const networkName = get(connectionDetails)?.name || 'BSCTestnet';
export const chainID = get(connectionDetails)?.chainId || 97;

export const deployerAcc =
	chainID === 1337 || parseFloat(chainID.toString()) === 1337
		? '0x7FB10CF27B4A7613d1B6F168e3DCf9728a115EFb'
		: chainID === 97 || parseFloat(chainID.toString()) === 97
		? '0x05dC042b203De11a7CeDa84C06D3DcC0f8FD6E61'
		: chainID === 56 || parseFloat(chainID.toString()) === 56
		? ''
		: '';

export const firoToken =
	chainID === 1337 || parseFloat(chainID.toString()) === 1337
		? '0x318a9b21469620675FbccfBD4757287E241Ad44A'
		: chainID === 97 || parseFloat(chainID.toString()) === 97
		? '0xf470c420FaF8B58E38de39236D10A37F6cc4b63A'
		: chainID === 56 || parseFloat(chainID.toString()) === 56
		? ''
		: '';

export const erc20Mock =
	chainID === 1337 || parseFloat(chainID.toString()) === 1337
		? '0x64c71da9C9539239C526b3176BB9ddB17b024804'
		: chainID === 97 || parseFloat(chainID.toString()) === 97
		? '0x528aD99B2dA1b7D998c5056fb7cD1Ac630647943'
		: chainID === 56 || parseFloat(chainID.toString()) === 56
		? ''
		: '';

export const vestingContract =
	chainID === 1337 || parseFloat(chainID.toString()) === 1337
		? '0x38C2D27c1e1facCF2481A0ba6046D26E494Baea6'
		: chainID === 97 || parseFloat(chainID.toString()) === 97
		? '0xeC0a4Cc5F445F5F3d7F8b830eF3986Bc1f48eA46'
		: chainID === 56 || parseFloat(chainID.toString()) === 56
		? ''
		: '';

export const lockingContract =
	chainID === 1337 || parseFloat(chainID.toString()) === 1337
		? '0x6F38994618D11b23C07750A636bee19b08Af0f90'
		: chainID === 97 || parseFloat(chainID.toString()) === 97
		? '0x2a966a936f925A9dC281cD111dE017C82b29eA52'
		: chainID === 56 || parseFloat(chainID.toString()) === 56
		? ''
		: '';

export const masterChef =
	chainID === 1337 || parseFloat(chainID.toString()) === 1337
		? '0x2EDD220e1c1d7930495caFCC4507e1504b3388da'
		: chainID === 97 || parseFloat(chainID.toString()) === 97
		? '0x2b7F36DB476Eb4F04893D80Bc5439D6987e12A7a'
		: chainID === 56 || parseFloat(chainID.toString()) === 56
		? ''
		: '';
