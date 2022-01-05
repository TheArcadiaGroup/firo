import { readable, writable } from 'svelte/store';

export const showAccountSummary = writable(false);

// User Account Store Details
export const selectedPool = readable<number>(0); // default pool
export const lpTokenBalance = writable<number>(0); // LP in user's account
export const totalLockedLPBalance = writable<number>(0); // locked lp balance
export const totalStakedLPBalance = writable<number>(0); // staked LP - on master chef
export const totalUnlockedLPTokenBalance = writable<number>(0); // lp that can be withdrawn
export const pendingFiroRewardsBalance = writable<number>(0); // In Firo
export const realizedFiroRewardsBalance = writable<number>(0); // In Firo
export const withdrawPopupActive = writable<boolean>(false);
export const unstakeAllLPPopupActive = writable<boolean>(false);
export const clickedTokenPopup = writable<'FIRO' | 'LP'>('FIRO');
