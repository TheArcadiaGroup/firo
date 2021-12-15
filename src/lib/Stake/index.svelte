<script>
	import Switch from '$lib/Switch/index.svelte';
	import { isStaking, walletConnected } from './stakingStore';
	import TextInput from '$lib/TextInput/index.svelte';

	isStaking.set(true);
</script>

<div class="main">
	<Switch />
	{#if $isStaking}
		<p class="title">Stake LP TOKEN</p>
	{:else}
		<p class="title">Unstake LP TOKEN</p>
	{/if}

	<TextInput />

	<div class="lower-text">
		{#if $isStaking}
			<p class="firo-lockup">LP Lockup = 365 Days + Reward Lockup = 365 Days</p>
		{/if}
		{#if $isStaking}
			<p class="until-x-firo">
				<span class="red-text">{730} Days</span> Until <span class="red-text">{12} FIRO</span> Reward
			</p>
		{:else}
			<p class="until-x-firo">
				Unstaking will take <span class="red-text">{730} Days</span> and nullify your reward of
				<span class="red-text">{12} FIRO</span>
			</p>
		{/if}
	</div>

	{#if $walletConnected}
		<button class="connect-wallet-button"> {$isStaking ? 'Stake' : 'Unstake'} </button>
	{:else}
		<button class="connect-wallet-button"> Connect Wallet </button>
	{/if}
</div>

<style lang="postcss">
	.main {
		@apply flex flex-col rounded-xl border border-line-color bg-bg-primary p-4 md:p-8 xl:py-14 xxl:p-10 xxxl:p-20 xxl:border-2 xxxl:border-4 h-full;
	}

	.title {
		@apply font-semibold text-xl md:text-2xl xxl:text-4xl xxxl:text-5xl my-4 xxl:my-6 xxxl:my-8;
	}

	.red-text {
		@apply text-maincolor;
	}

	.until-x-firo {
		@apply font-bold;
	}

	.lower-text {
		@apply flex flex-col md:flex-row justify-between font-semibold mt-3 text-xs md:text-base xxl:text-xl xxxl:text-3xl xxxl:mt-4;
	}

	.firo-lockup {
		@apply text-black-lightest;
	}

	.connect-wallet-button {
		@apply mt-4 md:mt-8 py-2 md:py-3 border border-maincolor text-maincolor md:h-14 rounded-[45px];
		@apply text-[18px] md:text-base xxl:text-xl xxxl:text-4xl xxxl:py-6 xxxl:h-auto xxxl:rounded-full;
		@apply transition-all;
		@apply hover:bg-maincolor hover:text-white;
	}
</style>
