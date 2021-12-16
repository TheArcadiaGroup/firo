<script>
	import { darkOverlay } from '$stores/navStore';
	import { createEventDispatcher } from 'svelte';
	import { scale } from 'svelte/transition';

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
	<h4>Are you sure you want to unstake all your positions?</h4>
	<p class="desktop">Your Unstaked LP TOKEN will be sent to your wallet</p>
	<p class="info">
		Unstaking will take <span>{2} days</span> and nullify your <span>FIRO</span> reward
	</p>
	<button>Confirm and Unstake all positions</button>
</div>

<style lang="postcss">
	.withdraw-popup {
		@apply flex flex-col bg-white rounded-[10px] p-4 w-full items-center text-center;
		@apply md:px-5 md:pt-5 md:pb-12 md:max-w-[600px];
	}

	.withdraw-popup > img {
		@apply self-end mb-4 cursor-pointer;
		@apply md:w-[40px] md:h-[40px] md:mb-6;
	}

	h4 {
		@apply font-black text-2xl md:text-3xl mb-8 md:mb-6 md:max-w-[400px];
	}

	.info {
		@apply font-bold mb-8 md:mb-16 max-w-[259px] md:max-w-max md:text-xl;
	}

	span {
		@apply text-maincolor;
	}

	button {
		@apply w-full md:w-auto bg-maincolor text-white md:text-lg;
		@apply hover:bg-white hover:border-opacity-100 hover:text-maincolor transition-all;
		@apply border border-maincolor rounded-[45px];
		@apply py-2 mb-7 mt-5 md:py-0 md:px-[148px] mx-auto md:h-[56px];
	}

	.desktop {
		@apply hidden md:flex md:mb-6 md:font-bold md:text-lg;
	}
</style>
