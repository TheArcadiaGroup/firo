<script>
	import { unstakeAllLPPopupActive } from '$stores/accountSummaryStore';
	import { selectedPool } from '$stores/accountSummaryStore';

	import { stakingOrUnstakeAmount } from '$stores/stakingStore';
	import { userAddress } from '$stores/wallet';
	import { getUserInfoWithIndex, unStakeLpTokens } from '$utils/contractInteractions/staking';
	import { ethers } from 'ethers';
	import { darkOverlay } from '$stores/navStore';
	import { lockUpDuration } from '$stores/stakingStore';
	import { scale } from 'svelte/transition';
</script>

<div class="withdraw-popup" transition:scale>
	<img
		on:click={() => {
			darkOverlay.set(false);
			unstakeAllLPPopupActive.set(false);
		}}
		src="/images/svg/red-cross.svg"
		alt="close-icon"
	/>
	<h4>Are you sure you want to unstake all your positions?</h4>
	<p class="desktop">Your Unstaked LP TOKEN will be sent to your wallet</p>
	<p class="info">
		Unstaking will take <span>{$lockUpDuration / (60 * 60 * 24)} days</span> after which you can withdraw
		your LP tokens
	</p>
	<button
		on:click={async () => {
			const result = await getUserInfoWithIndex($selectedPool, $userAddress);
			stakingOrUnstakeAmount.set(+ethers.utils.formatEther(result.amount));
			await unStakeLpTokens();
		}}>Confirm and Unstake all positions</button
	>
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
