<script>
	import Switch from '$lib/Switch/index.svelte';
	import { onMount } from 'svelte';
	import { isStaking, walletConnected } from '$stores/stakingStore';

	var input;
	let inputValue;
	isStaking.set(true);
	onMount(() => {
		input = document.getElementById('text-input');
	});

	export let balance = 200;

	function isInputNumber(event) {
		var ch = String.fromCharCode(event.which);

		if (!/[0-9]/.test(ch)) {
			event.preventDefault();
		}
	}

	function inputMax() {
		input.value = balance;
	}
</script>

<div class="main">
	<Switch />
	{#if $isStaking}
		<p class="title">Stake LP TOKEN</p>
	{:else}
		<p class="title">Unstake LP TOKEN</p>
	{/if}

	<div class="text-div">
		<input
			id="text-input"
			bind:value={inputValue}
			type="text"
			on:keypress={isInputNumber}
			placeholder="0 LP TOKEN"
		/>
		<div class="max-balance">
			<p class="balance">Balance: {balance}</p>
			<div class="button" on:click={inputMax}>
				<p>MAX</p>
			</div>
		</div>
	</div>

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
		@apply flex flex-col rounded-xl border border-line-color bg-bg-primary p-5 xxl:p-10 xxxl:p-16 xxl:border-2 xxxl:border-4;
	}

	.title {
		@apply font-semibold text-xl md:text-2xl xxl:text-4xl xxxl:text-5xl my-4 xxl:my-6 xxxl:my-8;
	}

	input[type='text'] {
		@apply md:h-8 w-full mr-3 text-xs md:text-base xxl:text-2xl xxxl:text-4xl xxxl:h-16;
	}

	.text-div {
		@apply py-2 px-3 md:py-4 md:px-5 bg-white rounded-full border border-line-color flex xxxl:py-6 xxl:border-2 xxxl:border-4;
		box-shadow: 0px 4px 20px rgba(170, 123, 123, 0.1);
	}

	.balance {
		@apply text-black-lighter mr-3 text-sm md:text-base xxl:text-xl xxxl:text-3xl;
	}

	.max-balance {
		@apply min-w-max flex items-center;
	}

	.button > p {
		@apply text-white text-xs md:text-base xxl:text-xl xxxl:text-3xl;
	}

	.button {
		@apply bg-maincolor md:h-full py-1 px-2 md:px-3 rounded-2xl cursor-pointer flex items-center justify-center xxxl:rounded-full;
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
		@apply text-sm md:text-base xxl:text-xl xxxl:text-4xl xxxl:py-6 xxxl:h-auto xxxl:rounded-full;
		@apply transition-all;
		@apply hover:bg-maincolor hover:text-white;
	}
</style>
