<script>
	import { darkOverlay } from '$lib/Navbar/navStore';
	import { createEventDispatcher } from 'svelte';
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
	<h4>Are you sure you want to unstake all your positions?</h4>
	<p class="info">
		Unstaking will take {2} <span>days</span> and nullify your <span>FIRO</span> reward
	</p>
	<button>Confirm and Unstake all positions</button>
</div>

<style lang="postcss">
	.withdraw-popup {
		@apply flex flex-col bg-white rounded-[10px] p-4 w-full items-center text-center;
	}

	.withdraw-popup > img {
		@apply self-end mb-4;
	}

	h4 {
		@apply font-black text-2xl mb-8;
	}

	.info {
		@apply font-bold mb-8 max-w-[259px];
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
</style>
