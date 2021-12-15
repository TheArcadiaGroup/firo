<script lang="ts">
	import StakeProgress from '$lib/StakeProgress/index.svelte';
	import { fly } from 'svelte/transition';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();
</script>

<div class="main" transition:fly={{ y: 200, duration: 1000 }}>
	<div class="account-summary-header">
		<h2>Account Summary</h2>
		<img
			on:click={() => {
				dispatch('deactivateAccountSummary');
			}}
			src="/images/svg/red-cross.svg"
			alt="close-icon"
		/>
	</div>

	<div class="top holder">
		<div class="data-holder shield">
			<img src="/images/svg/shield.svg" alt="shield-icon" />
			<div>
				<p class="data-text">Total LP Balance</p>
				<p class="value">{350} LP TOKEN</p>
			</div>
		</div>

		<div class="data-holder money">
			<img src="/images/svg/money.svg" alt="money-icon" />
			<div>
				<p class="data-text">Total Locked <br />LP Balance</p>
				<p class="value">{150} LP TOKEN</p>
			</div>
		</div>

		<div class="data-holder desktop">
			<img src="/images/svg/banking.svg" alt="banking-icon" />
			<div>
				<p class="data-text">Total Unlocked LP Balance</p>
				<p class="value">{200} LP TOKEN</p>
			</div>
		</div>
	</div>

	<div class="data-holder mobile">
		<img src="/images/svg/banking.svg" alt="banking-icon" />
		<div>
			<p class="data-text">Total Unlocked LP Balance</p>
			<p class="value">{200} LP TOKEN</p>
		</div>
	</div>

	<div class="bottom holder">
		<div class="data-holder shield">
			<img src="/images/svg/pending.svg" alt="pending-icon" />
			<div>
				<p class="data-text">Total Pending Rewards</p>
				<p class="value">{350} FIRO</p>
			</div>
		</div>

		<div class="vl" />

		<div class="award data-holder">
			<img src="/images/svg/award.svg" alt="award-icon" />
			<div>
				<p class="data-text">Total Realized <br />Rewards</p>
				<p class="value">{150} FIRO</p>
			</div>
		</div>
	</div>

	<div class="withdraw-button-holder">
		<button class="withdraw-button">Withdraw Realized Rewards</button>
	</div>

	<div class="my-stakes">
		<h3 class="my-stakes-title">My Stakes</h3>
		<StakeProgress first={true} />
		<StakeProgress />
		<StakeProgress />
	</div>

	<button>Unstake all positions</button>
</div>

<style lang="postcss">
	h2 {
		@apply md:mr-5 md:text-3xl;
	}

	.main {
		@apply px-5 md:max-w-[1000px] md:mx-auto md:flex md:flex-col;
	}

	.account-summary-header {
		@apply text-lg font-semibold;
		@apply flex justify-between md:justify-start;
		@apply mb-4 min-w-max;
	}

	.holder {
		@apply flex;
	}

	.data-holder {
		@apply py-4 mb-4 md:mb-0 md:py-0 md:px-8;
		@apply border border-line-color rounded-[10px];
		@apply w-full h-[140px] md:h-auto;
		@apply flex flex-col md:flex-row justify-around md:justify-start items-center;
	}

	.shield {
		@apply mr-4;
	}

	.data-text {
		@apply font-semibold text-xs font-sans text-greytext text-center md:text-left md:text-sm;
	}

	.value {
		@apply font-bold text-lg font-sans text-maincolor text-center md:text-left md:text-xl;
	}

	button {
		@apply w-full md:w-auto bg-maincolor text-white md:text-lg;
		@apply hover:bg-white hover:border-opacity-100 hover:text-maincolor transition-all;
		@apply border border-maincolor rounded-[45px];
		@apply py-2 mb-7 md:py-0 px-[148px] mx-auto md:h-[56px];
	}

	.my-stakes-title {
		@apply text-lg md:text-3xl font-semibold;
		@apply mb-5 md:mt-[78px];
	}

	.mobile {
		@apply md:hidden;
	}

	.desktop {
		@apply hidden md:flex;
	}

	.money {
		@apply md:mr-4;
	}

	.data-holder > img {
		@apply md:mr-5 md:w-[60px] md:h-[60px];
	}

	br {
		@apply md:hidden;
	}

	.award {
		@apply md:justify-end;
	}

	.bottom > .data-holder {
		@apply border-none;
	}

	.top > .data-holder {
		@apply py-[45px];
	}

	.bottom {
		@apply border border-line-color rounded-[10px] md:mb-0 md:items-center py-[55px];
	}

	.top {
		@apply md:mb-4;
	}

	.vl {
		@apply border-l border-greytext h-[70px];
	}

	.withdraw-button {
		@apply md:w-auto md:absolute md:top-[-28px] md:right-[225px];
	}

	.withdraw-button-holder {
		@apply md:w-auto md:relative;
	}

	.account-summary-header > img {
		@apply md:h-[40px] md:w-[40px] cursor-pointer;
	}
</style>
