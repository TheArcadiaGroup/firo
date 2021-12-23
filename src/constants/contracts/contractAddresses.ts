export const networkName = 'BSCTestnet';
export const networkID = 97;

// Change these depending on localdev settings
const isTestingLocally = import.meta.env.VITE_LOCALTESTING === 'true';

console.log('IS TESTING LOCALLY?: ', isTestingLocally);

export const deployerAcc = isTestingLocally
	? '0x7FB10CF27B4A7613d1B6F168e3DCf9728a115EFb'
	: '0x05dC042b203De11a7CeDa84C06D3DcC0f8FD6E61';

export const firoToken = isTestingLocally
	? '0x318a9b21469620675FbccfBD4757287E241Ad44A'
	: '0xcBBa97C89dE3051a346982D636E9384fA50Fbc96';

export const erc20Mock = isTestingLocally
	? '0x64c71da9C9539239C526b3176BB9ddB17b024804'
	: '0x47A0240D1d89Df9aF9172DAb19c5a2f17D46B77E';

export const vestingContract = isTestingLocally
	? '0x38C2D27c1e1facCF2481A0ba6046D26E494Baea6'
	: '0xf557432afA54bad37091C49bCc1d44d7e524f5fd';

export const lockingContract = isTestingLocally
	? '0x6F38994618D11b23C07750A636bee19b08Af0f90'
	: '0xD5B0237895b631dD81DE23D328e6514AFa9A0D37';

export const masterChef = isTestingLocally
	? '0x2EDD220e1c1d7930495caFCC4507e1504b3388da'
	: '0x43aEa86b583e07c9013894B8d5359Cd66Bc62737';
