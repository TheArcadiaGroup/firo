<script>
	import Switch from '$lib/Switch/index.svelte';
	import { onMount } from 'svelte';

	var input;
	let inputValue;
	let isStaking = true;
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

	function leftClicked() {
		isStaking = true;
	}

	function rightClicked() {
		isStaking = false;
	}
</script>

<main>
	<Switch on:leftClicked={leftClicked} on:rightClicked={rightClicked} />
	{#if isStaking}
		<p class="title">Stake FIRO</p>
	{:else}
		<p class="title">Unstake FIRO</p>
	{/if}

	<div class="text-div">
		<input
			id="text-input"
			bind:value={inputValue}
			type="text"
			on:keypress={isInputNumber}
			placeholder="0 FIRO"
		/>
		<div class="max-balance">
			<p class="balance">Balance: {balance}</p>
			<div class="button" on:click={inputMax}>
				<p>MAX</p>
			</div>
		</div>
	</div>

	<div class="lower-text">
		{#if isStaking}
			<p class="firo-lockup">FIRO Lockup = 365 Days + Reward Lockup = 365 Days</p>
		{/if}
		{#if isStaking}
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

	<div class="connect-wallet-button">
		<p>Connect Wallet</p>
	</div>
</main>

<style lang="postcss">
	main {
		@apply flex flex-col rounded-xl border border-line-color bg-bg-primary p-5 xxl:p-10;
	}

	.title {
		@apply font-bold text-2xl xxl:text-4xl my-4 xxl:my-6;
	}

	input {
		@apply h-8 w-full mr-3;
	}

	.text-div {
		@apply py-4 px-5 bg-white rounded-3xl border border-line-color flex;
		box-shadow: 0px 4px 20px rgba(170, 123, 123, 0.1);
	}

	.balance {
		@apply text-black-lighter mr-3 xxl:text-xl;
	}

	.max-balance {
		@apply min-w-max flex items-center;
	}

	.button > p {
		@apply text-white xxl:text-xl;
	}

	.button {
		@apply bg-maincolor py-1 px-3 rounded-2xl cursor-pointer;
	}

	.red-text {
		@apply text-maincolor;
	}

	.until-x-firo {
		@apply font-bold;
	}

	.lower-text {
		@apply flex justify-between mt-3 xxl:text-xl;
	}

	.firo-lockup {
		@apply text-black-lightest;
	}

	.connect-wallet-button {
		@apply mt-8 py-3 border border-maincolor rounded-3xl text-maincolor flex flex-col items-center text-2xl xxl:text-3xl xxl:mt-10;
	}
</style>
