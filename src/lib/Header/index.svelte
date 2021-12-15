<script>
	import { walletConnected } from '$lib/Stake/stakingStore';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();
</script>

<h2>Earn FIRO by Staking your LP Tokens</h2>
<p class="description">
	You can stake your FIRO/WBNB Pancakeswap liquidity provision tokens here to earn additional BEP20
	Firo.
	<br />
	<br />
	***Unstaking your LP, has a cool down of 2 days to encourage users to provide long term liquidity to
	FIRO on BSC.
</p>
<div class="btn-holder">
	{#if $walletConnected}
		<button
			on:click={() => {
				dispatch('activateAccountSummary');
			}}
		>
			View Account Summary
		</button>
	{:else}
		<button> Connect Wallet </button>
	{/if}
</div>

<style lang="postcss">
	h2 {
		@apply text-xl md:text-2xl xl:text-3xl xxl:text-4xl xxxl:text-6xl font-bold font-sans;
	}

	.description {
		@apply text-para-color mt-2 mb-4 text-sm md:text-base xxl:text-xl xxxl:text-4xl xxl:mt-5 xxxl:mt-10 xxxl:mb-28 xxxl:leading-normal md:mb-8 xl:mb-[20px];
	}

	button {
		@apply w-full md:w-auto border border-maincolor mb-4 md:mb-8 xl:mb-[20px] xxl:mb-[40px] xxxl:mb-[80px] xxxl:border-opacity-0 rounded-[120px] px-[60px] py-[9px] md:py-[14px] xxxl:py-[28px] xxxl:px-[120px] bg-maincolor text-white hover:bg-white hover:border-opacity-100 hover:text-maincolor transition-all;
		@apply text-sm md:text-base xxl:text-xl xxxl:text-4xl;
	}

	.btn-holder {
		@apply w-full flex justify-center items-center;
	}
</style>
