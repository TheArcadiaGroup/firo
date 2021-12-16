<script>
	import { isStaking } from '$stores/stakingStore';
	import { scale } from 'svelte/transition';
</script>

<div class="component balance">
	<p class="balance-title">Available LP TOKEN</p>
	<div>
		<div class="unstaked-amount">
			<div class="logo-container">
				<img class="firo-symbol" src="/images/png/lp-token.png" alt="firo-symbol" />
				<img class="binance-chain" src="/images/svg/binance-chain.svg" alt="binance-chain" />
			</div>
			<div class="unstaked-amount-value">
				<p>{250}</p>
				<p>LP TOKEN</p>
			</div>
		</div>
	</div>
	{#if !$isStaking}
		<div class="btn-holder" transition:scale>
			<button> Unstake all positions </button>
		</div>
	{/if}
</div>

<style lang="postcss">
	.balance {
		@apply flex flex-col mt-3 md:mt-0 py-2 px-3 md:py-5 md:px-7 mb-3 md:mb-5 md:mx-6 text-sm md:text-xl xxl:text-2xl xxxl:text-4xl xxxl:py-10 xxxl:px-10 xxxl:leading-normal w-full;
	}

	.balance-title {
		@apply text-sm md:text-xl xl:text-2xl xxl:text-3xl xxxl:text-5xl mb-1 md:mr-8 font-semibold md:font-normal;
	}

	.unstaked-amount {
		@apply flex mb-2 md:mb-0;
	}

	.unstaked-amount-value {
		@apply ml-2;
	}

	.component {
		@apply rounded-xl border border-line-color bg-bg-primary xxl:border-2 xxxl:border-4;
	}

	.firo-symbol {
		@apply w-10 md:w-[60px] xxl:w-[70px] xxxl:w-[110px];
	}

	.logo-container {
		@apply flex flex-col justify-center items-center;
	}

	.binance-chain {
		@apply h-[20px] xl:h-[25px] xxl:h-[30px] xxxl:h-[50px];
	}

	button {
		@apply w-full md:w-auto border border-maincolor border-opacity-0 rounded-[120px] py-[8px] md:py-[9px] md:px-[24px] xxxl:py-[23px] xxxl:px-[120px] bg-maincolor text-white hover:bg-white hover:border-opacity-100 hover:text-maincolor hover:bg-transparent transition-all;
		@apply text-xs md:text-base xxl:text-xl xxxl:text-4xl;
	}

	.btn-holder {
		@apply w-full flex justify-center items-center;
	}
</style>
