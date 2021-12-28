/// <reference types="@sveltejs/kit" />

declare global {
	interface Number {
		noExponents: () => string;
	}
}

import type { ethers } from 'ethers';

interface Pool {
	lpToken: string;
	allocPoint: ethers.BigNumberish;
	lastRewardBlock: ethers.BigNumberish;
	accFiroPerShare: ethers.BigNumberish;
}

interface LockInfo {
	// From locking contract
	isWithdrawns: bool[]; // Whether entry has been withdrawn
	tokens: string[]; // LP tokens related to the lock
	unlockableAts: ethers.BigNumberish[]; // timestamps
	amounts: ethers.BigNumberish[]; // value of tokens
}

interface UserInfo {
	amount: number; // Balance of staked LP Tokens
	rewardDebt: number; // Withdrawn reward
}
