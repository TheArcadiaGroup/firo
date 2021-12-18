import { writable } from 'svelte/store';

export const isStaking = writable(true);
export const walletConnected = writable(false);
export const lockUpDuration = writable<number>(0);
export const vestingDuration = writable<number>(0);
