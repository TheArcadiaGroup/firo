// FIROTOKEN ADDRESS = 0xd5d0322b6bab6a762c79f8c81a0b674778e13aed
// LPTOKEN ADDRESS = 0xd4de573f4af499b28ac387fac607f1bb819eca10
// Vesting address : 0xec7a39980A8E41b8873E75F2C6E9B8C741c19d72
// Locking address : 0x01388f74A059fEf5f41E8Ef9034141c318F1e2De
// MasterChef: 0x0cc96d5a90b6C43238733791f23BbA17D8d2EaE9

export const deployerAcc = (chainID: number | string) => {
	return chainID === 31337 || parseInt(chainID.toString()) === 31337
		? '0x7FB10CF27B4A7613d1B6F168e3DCf9728a115EFb'
		: chainID === 97 || parseInt(chainID.toString()) === 97
		? '0x05dC042b203De11a7CeDa84C06D3DcC0f8FD6E61'
		: chainID === 56 || parseInt(chainID.toString()) === 56
		? '0x1dd78cd9b142994c236c11bea8c904e49d01ee8a'
		: '';
};

export const firoToken = (chainID: number | string) => {
	return chainID === 1337 || parseInt(chainID.toString()) === 1337
		? '0x318a9b21469620675FbccfBD4757287E241Ad44A'
		: chainID === 97 || parseInt(chainID.toString()) === 97
		? '0xb9169FF37D9596008E9765C0A7721Bc6e9422115'
		: chainID === 56 || parseInt(chainID.toString()) === 56
		? '0xd5d0322b6bab6a762c79f8c81a0b674778e13aed'
		: '';
};

export const erc20Mock = (chainID: number | string) => {
	return chainID === 31337 || parseInt(chainID.toString()) === 31337
		? '0x64c71da9C9539239C526b3176BB9ddB17b024804'
		: chainID === 97 || parseInt(chainID.toString()) === 97
		? '0x4843b2337cf208574c8c916408b894e333bD39C5'
		: chainID === 56 || parseInt(chainID.toString()) === 56
		? '0xd4de573f4af499b28ac387fac607f1bb819eca10'
		: '';
};

export const vestingContract = (chainID: number | string) => {
	return chainID === 31337 || parseInt(chainID.toString()) === 31337
		? '0x38C2D27c1e1facCF2481A0ba6046D26E494Baea6'
		: chainID === 97 || parseInt(chainID.toString()) === 97
		? '0x462Ef7a62846f068962919C0D3F2eC292522de30'
		: chainID === 56 || parseInt(chainID.toString()) === 56
		? '0xc4E9634F5CE62e8076DD0EC9e0100efa71Dfd483'
		: '0xc4E9634F5CE62e8076DD0EC9e0100efa71Dfd483';
};

export const lockingContract = (chainID: number | string) => {
	return chainID === 31337 || parseInt(chainID.toString()) === 31337
		? '0x6F38994618D11b23C07750A636bee19b08Af0f90'
		: chainID === 97 || parseInt(chainID.toString()) === 97
		? '0x98b03026E4CbF6d9Ec17C7022B98521632A531fa'
		: chainID === 56 || parseInt(chainID.toString()) === 56
		? '0x6658bAF8a57069f58eCA63ff9A8626aeF5433092'
		: '0x6658bAF8a57069f58eCA63ff9A8626aeF5433092';
};

export const masterChef = (chainID: number | string) => {
	return chainID === 31337 || parseInt(chainID.toString()) === 31337
		? '0x2EDD220e1c1d7930495caFCC4507e1504b3388da'
		: chainID === 97 || parseInt(chainID.toString()) === 97
		? '0x74FAF62b6b33b19FC433E1e8b325013D267FDAD2'
		: chainID === 56 || parseInt(chainID.toString()) === 56
		? '0x1175F3E59C8DB26d9Cdf0aE8eb15b40E6a236c6A'
		: '0x1175F3E59C8DB26d9Cdf0aE8eb15b40E6a236c6A';
};
