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
	: '0x0a093C96eEcA31C0Dbb05f5d0A94F79783De22cc';

export const erc20Mock = isTestingLocally
	? '0x64c71da9C9539239C526b3176BB9ddB17b024804'
	: '0xf3e22FCc912A64993779EeCa3454095A87667b7a';

export const vestingContract = isTestingLocally
	? '0x38C2D27c1e1facCF2481A0ba6046D26E494Baea6'
	: '0xeC0a4Cc5F445F5F3d7F8b830eF3986Bc1f48eA46';

export const lockingContract = isTestingLocally
	? '0x6F38994618D11b23C07750A636bee19b08Af0f90'
	: '0x2a966a936f925A9dC281cD111dE017C82b29eA52';

export const masterChef = isTestingLocally
	? '0x2EDD220e1c1d7930495caFCC4507e1504b3388da'
	: '0x77dC0667E09B4E94c1B8E496953C1534F32F3544';
