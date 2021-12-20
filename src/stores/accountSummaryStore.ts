import { writable } from 'svelte/store';

export const showAccountSummary = writable(false);

// User Account Store Details
export const selectedPool = writable<number>(0); // default pool
export const lpTokenBalance = writable<number>(0); // In LP
export const totalLockedLPTokenBalance = writable<number>(0); // In LP
export const totalUnlockedLPTokenBalance = writable<number>(0); // In LP
export const pendingFiroRewardsBalance = writable<number>(0); // In Firo
export const realizedFiroRewardsBalance = writable<number>(0); // In Firo
