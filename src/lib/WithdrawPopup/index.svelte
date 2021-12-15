<script>
	import { darkOverlay } from '$lib/Navbar/navStore';
	import { createEventDispatcher } from 'svelte';
	import TextInput from '$lib/TextInput/index.svelte';
	import { scale } from 'svelte/transition';

	const dispatch = createEventDispatcher();
</script>

<div class="withdraw-popup" transition:scale>
	<img
		on:click={() => {
			darkOverlay.set(!$darkOverlay);
			dispatch('deactivatePopup');
		}}
		src="/images/svg/red-cross.svg"
		alt="close-icon"
	/>
	<h4>Withdraw Realized Rewards</h4>
	<p class="info"><span>{350} FIRO</span> will be sent to your wallet</p>
	<p class="amount">Amount to withdraw</p>
	<TextInput />
	<button>Confirm and Withdraw</button>
</div>

<style lang="postcss">
	.withdraw-popup {
		@apply flex flex-col bg-white rounded-[10px] p-4 w-full;
	}

	.withdraw-popup > img {
		@apply self-end mb-4;
	}

	h4 {
		@apply font-black text-2xl mb-8;
	}

	.info {
		@apply font-bold mb-8;
	}

	span {
		@apply text-maincolor;
	}

	.amount {
		@apply text-black-default opacity-50 mb-2;
	}

	button {
		@apply w-full md:w-auto bg-maincolor text-white md:text-lg;
		@apply hover:bg-white hover:border-opacity-100 hover:text-maincolor transition-all;
		@apply border border-maincolor rounded-[45px];
		@apply py-2 mb-7 mt-5 md:py-0 md:px-[148px] mx-auto md:h-[56px];
	}
</style>
