/// <reference types="@sveltejs/kit" />

import type { ethers } from 'ethers';

interface Pool {
	lpToken: string;
	allocPoint: ethers.BigNumberish;
	lastRewardBlock: ethers.BigNumberish;
	accFiroPerShare: ethers.BigNumberish;
}
