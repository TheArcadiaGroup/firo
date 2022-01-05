<script lang="ts">
	import { fade } from 'svelte/transition';
	import { createEventDispatcher } from 'svelte';
	import {
		clickedTokenPopup,
		lpTokenBalance,
		pendingFiroRewardsBalance,
		realizedFiroRewardsBalance,
		totalLockedLPBalance,
		totalUnlockedLPTokenBalance,
		unstakeAllLPPopupActive,
		withdrawPopupActive
	} from '$stores/accountSummaryStore';

	const dispatch = createEventDispatcher();
</script>

<div class="main" transition:fade>
	<div
		class="account-summary-header"
		class:blurry={$withdrawPopupActive || $unstakeAllLPPopupActive}
	>
		<h2>Account Summary</h2>
		<img
			on:click={() => {
				dispatch('deactivateAccountSummary');
			}}
			src="/images/svg/red-cross.svg"
			alt="close-icon"
		/>
	</div>

	<div class="top holder" class:blurry={$withdrawPopupActive || $unstakeAllLPPopupActive}>
		<div class="data-holder shield">
			<img src="/images/svg/shield.svg" alt="shield-icon" />
			<div>
				<p class="data-text">Total LP Balance</p>
				<p class="value">{$lpTokenBalance.noExponents()} LP TOKEN</p>
			</div>
		</div>

		<div class="data-holder money">
			<img src="/images/svg/money.svg" alt="money-icon" />
			<div>
				<p class="data-text">Total Locked <br />LP Balance</p>
				<p class="value">{$totalLockedLPBalance.noExponents()} LP TOKEN</p>
			</div>
		</div>

		<div class="data-holder desktop">
			<img src="/images/svg/banking.svg" alt="banking-icon" />
			<div>
				<p class="data-text">Total Unlocked LP Balance</p>
				<p class="value">{$totalUnlockedLPTokenBalance.noExponents()} LP TOKEN</p>
			</div>
		</div>
	</div>

	<div class="data-holder mobile" class:blurry={$withdrawPopupActive || $unstakeAllLPPopupActive}>
		<img src="/images/svg/banking.svg" alt="banking-icon" />
		<div>
			<p class="data-text">Total Unlocked LP Balance</p>
			<p class="value">{$totalUnlockedLPTokenBalance.noExponents()} LP TOKEN</p>
		</div>
	</div>

	<div
		class="withdraw-button-holder unlock-btn"
		class:blurry={$withdrawPopupActive || $unstakeAllLPPopupActive}
	>
		<button
			class="withdraw-button"
			disabled={$totalUnlockedLPTokenBalance <= 0}
			class:cursor-not-allowed={$totalUnlockedLPTokenBalance <= 0}
			on:click={() => {
				clickedTokenPopup.set('LP');
				withdrawPopupActive.set(!$withdrawPopupActive);
			}}>Withdraw Unlocked LP</button
		>
	</div>

	<div class="bottom holder" class:blurry={$withdrawPopupActive || $unstakeAllLPPopupActive}>
		<div class="data-holder shield">
			<img src="/images/svg/pending.svg" alt="pending-icon" />
			<div>
				<p class="data-text">Total Pending Rewards</p>
				<p class="value">{$pendingFiroRewardsBalance.noExponents()} FIRO</p>
			</div>
		</div>

		<div class="vl desktop" class:blurry={$withdrawPopupActive || $unstakeAllLPPopupActive} />

		<div class="award data-holder" class:blurry={$withdrawPopupActive || $unstakeAllLPPopupActive}>
			<img src="/images/svg/award.svg" alt="award-icon" />
			<div>
				<p class="data-text">Total Realized <br />Rewards</p>
				<p class="value">{$realizedFiroRewardsBalance.noExponents()} FIRO</p>
			</div>
		</div>
	</div>

	<div
		class="withdraw-button-holder"
		class:blurry={$withdrawPopupActive || $unstakeAllLPPopupActive}
	>
		<button
			class="withdraw-button"
			disabled={$realizedFiroRewardsBalance <= 0}
			class:cursor-not-allowed={$realizedFiroRewardsBalance <= 0}
			on:click={() => {
				clickedTokenPopup.set('FIRO');
				withdrawPopupActive.set(!$withdrawPopupActive);
			}}>Withdraw Realized Rewards</button
		>
	</div>
</div>

<style lang="postcss">
	h2 {
		@apply md:mr-5 md:text-3xl;
	}

	.main {
		@apply px-5 md:max-w-[1000px] xxxl:max-w-[1500px] w-full md:mx-auto md:flex md:flex-col z-40 py-4 md:py-14;
		@apply fixed top-0 left-1/2 -translate-x-1/2 h-full bg-white overflow-y-scroll md:overflow-hidden;
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
		@apply py-2 mb-7 md:py-0 md:px-[148px] mx-auto md:h-[56px];
	}

	/* .my-stakes-title {
		@apply text-lg md:text-3xl font-semibold;
		@apply mb-5 md:mt-[78px];
	} */

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
		@apply md:border-none;
	}

	.top > .data-holder {
		@apply py-[45px];
	}

	.bottom {
		@apply md:border md:border-line-color rounded-[10px] md:mb-0 md:items-center md:py-[55px] md:mt-20;
	}

	.top {
		@apply md:mb-4;
	}

	.vl {
		@apply border-l border-greytext h-[70px];
	}

	.withdraw-button-holder {
		@apply w-full md:relative -mt-4 md:mt-4;
	}

	.withdraw-button {
		@apply md:w-[512px] mt-4 md:mt-0 md:absolute md:left-1/2 md:-translate-x-1/2;
	}

	.unlock-btn {
		@apply md:mt-0;
	}

	.account-summary-header > img {
		@apply md:h-[40px] md:w-[40px] cursor-pointer;
	}

	.blurry {
		@apply md:filter md:blur;
	}
</style>
