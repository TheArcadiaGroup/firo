<script lang="ts">
	import { darkOverlay } from '$stores/navStore';
	import { createEventDispatcher } from 'svelte';
	import TextInput from '$lib/TextInput/index.svelte';
	import { scale, fade } from 'svelte/transition';
	import { getUserLockInfo, unlockLpTokens } from '$utils/contractInteractions/masterChef';
	import { userAddress } from '$stores/wallet';

	export let token: 'FIRO' | 'LP' = 'FIRO';
	export let balance: number = 0;
	const dispatch = createEventDispatcher();
</script>

<div class="withdraw-popup" transition:scale>
	<img
		on:click={() => {
			darkOverlay.set(false);
			dispatch('deactivatePopup');
		}}
		src="/images/svg/red-cross.svg"
		alt="close-icon"
	/>
	<h4>
		Withdraw
		{#if token === 'FIRO'}
			Realized Rewards
		{:else}
			Unlocked LP
		{/if}
	</h4>
	<p class="info">
		A total of <span>{balance} {token}</span> is ready for withdrawal to your wallet
	</p>
	{#if token === 'FIRO'}
		<p class="amount">Amount to withdraw</p>
		<div class="text-holder">
			<TextInput placeholder={token === 'FIRO' ? '0 FIRO' : '0 LP TOKEN'} {balance} />
		</div>
		<button on:click={() => dispatch('confirmButtonClicked')}>Confirm and Withdraw</button>
	{:else}
		<div class="lpTokenAmts w-full flex flex-col space-y-1">
			{#await getUserLockInfo($userAddress)}
				Loading...
			{:then lockInfoArr}
				{#each lockInfoArr as lockInfo, index}
					<div
						class="lockedData w-full flex justify-between items-center md:text-lg"
						transition:fade
					>
						<div class="text-black-default opacity-50 mx-4">
							Unlocked on:
							{new Date(lockInfo.unlockableAt * 1000)}
							<!-- <Time
								class="ml-1"
								timestamp={lockInfo.unlockableAt * 1000}
								format="YYYY-MM-DDTHH:mm:ss UTC"
							/> -->
						</div>
						<div
							class="lpWithdrawBtn max-h-full text-base cursor-pointer"
							on:click={() => unlockLpTokens($userAddress, index)}
						>
							Withdraw {lockInfo.amount} LP
						</div>
					</div>
				{/each}
			{:catch}
				No History to Show
			{/await}
		</div>
	{/if}
</div>

<style lang="postcss">
	.withdraw-popup {
		@apply flex flex-col bg-white rounded-[10px] p-4 w-full;
		@apply md:px-5 md:pt-5 md:pb-12 md:max-w-[600px];
	}

	.withdraw-popup > img {
		@apply self-end mb-4 md:w-[40px] md:h-[40px] cursor-pointer;
	}

	h4 {
		@apply font-black text-2xl mb-8 md:mx-[17px];
	}

	.info {
		@apply font-bold mb-8 md:mb-10 md:mx-[17px];
	}

	span {
		@apply text-maincolor;
	}

	.amount {
		@apply text-black-default opacity-50 mb-2 md:mb-3 md:mx-[17px];
	}

	button {
		@apply w-full md:w-auto bg-maincolor text-white md:text-lg;
		@apply hover:bg-white hover:border-opacity-100 hover:text-maincolor transition-all;
		@apply border border-maincolor rounded-[45px];
		@apply py-2 mb-7 mt-5 md:mt-8 md:py-0 md:px-[148px] mx-auto md:mx-[17px] md:h-[56px];
	}

	.lpWithdrawBtn {
		@apply border border-maincolor rounded-[45px];
		@apply py-2 px-10 flex items-center justify-center;
		@apply hover:bg-white hover:border-opacity-100 hover:text-maincolor transition-all bg-maincolor text-white;
	}

	.text-holder {
		@apply md:mx-[17px];
	}
</style>
