<script>
	import { darkOverlay } from '$lib/Navbar/navStore';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();
</script>

<div class="withdraw-popup">
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
</div>

<style lang="postcss">
	.withdraw-popup {
		@apply flex flex-col bg-white rounded-[10px] p-4 w-full;
	}

	.withdraw-popup > img {
		@apply self-end mb-4;
	}

	h4 {
		@apply font-bold text-xl mb-8;
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
</style>
