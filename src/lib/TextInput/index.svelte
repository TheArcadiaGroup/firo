<script>
	import { stakingOrUnstakeAmount } from '$stores/stakingStore';

	export let balance = 0;
	export let placeholder = '0 LP TOKEN';

	let inputValue;
	let input;
	function isInputNumber(event) {
		const ch = String.fromCharCode(event.which);

		if (!/[0-9]/.test(ch)) {
			event.preventDefault();
		}
	}

	function inputMax() {
		input.value = balance;
		inputValue = balance;
	}

	$: ((value) => {
		const parsedValue = value ? +value : 0;
		stakingOrUnstakeAmount.set(parsedValue ? parsedValue : 0);
	})(inputValue);
</script>

<div class="text-div">
	<input
		bind:value={inputValue}
		bind:this={input}
		type="text"
		on:keypress={isInputNumber}
		{placeholder}
	/>
	<div class="max-balance">
		<p class="balance">Balance: {balance}</p>
		<div class="button" on:click={inputMax}>
			<p>MAX</p>
		</div>
	</div>
</div>

<style lang="postcss">
	input[type='text'] {
		@apply md:h-8 w-full mr-3 text-base xxl:text-2xl xxxl:text-4xl xxxl:h-16 outline-none;
	}

	.text-div {
		@apply py-2 px-3 md:py-3 md:px-5 bg-white rounded-full border border-line-color flex xxxl:py-6 xxl:border-2 xxxl:border-4;
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
		@apply bg-maincolor md:h-full py-1 px-2 md:px-3 xxxl:px-6 rounded-2xl cursor-pointer flex items-center justify-center xxxl:rounded-full;
	}
</style>
