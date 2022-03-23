import { writable } from 'svelte/store';

export const isApproved = writable(false);
export const isStaking = writable(true);
export const stakingOrUnstakeAmount = writable<number>(0);
export const walletConnected = writable(false);
export const lockUpDuration = writable<number>(0);
export const vestingDuration = writable<number>(0);
export const estimatedAPR = writable<number>(0);
