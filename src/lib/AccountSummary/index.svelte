<script lang="ts">
	import StakeProgress from '$lib/StakeProgress/index.svelte';
	import { fly } from 'svelte/transition';
	import { createEventDispatcher } from 'svelte';
	import { darkOverlay } from '$lib/Navbar/navStore';
	import WithdrawPopup from '$lib/WithdrawPopup/index.svelte';
	import UnstakePopup from '$lib/UnstakePopup/index.svelte';

	const dispatch = createEventDispatcher();
	let withdrawPopupActive: boolean = false;
	let unstakePopupActive: boolean = false;
</script>

<div class="main" transition:fly={{ y: 200, duration: 1000 }}>
	{#if withdrawPopupActive}
		<div class="popup-holder">
			<WithdrawPopup
				on:deactivatePopup={() => {
					withdrawPopupActive = !withdrawPopupActive;
				}}
			/>
		</div>
	{/if}

	{#if unstakePopupActive}
		<div class="popup-holder">
			<UnstakePopup
				on:deactivatePopup={() => {
					unstakePopupActive = !unstakePopupActive;
				}}
			/>
		</div>
	{/if}

	<div class="account-summary-header" class:blurry={$darkOverlay}>
		<h2>Account Summary</h2>
		<img
			on:click={() => {
				dispatch('deactivateAccountSummary');
			}}
			src="/images/svg/red-cross.svg"
			alt="close-icon"
		/>
	</div>

	<div class="top holder" class:blurry={$darkOverlay}>
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

	<div class="data-holder mobile" class:blurry={$darkOverlay}>
		<img src="/images/svg/banking.svg" alt="banking-icon" />
		<div>
			<p class="data-text">Total Unlocked LP Balance</p>
			<p class="value">{200} LP TOKEN</p>
		</div>
	</div>

	<div class="bottom holder" class:blurry={$darkOverlay}>
		<div class="data-holder shield">
			<img src="/images/svg/pending.svg" alt="pending-icon" />
			<div>
				<p class="data-text">Total Pending Rewards</p>
				<p class="value">{350} FIRO</p>
			</div>
		</div>

		<div class="vl" class:blurry={$darkOverlay} />

		<div class="award data-holder" class:blurry={$darkOverlay}>
			<img src="/images/svg/award.svg" alt="award-icon" />
			<div>
				<p class="data-text">Total Realized <br />Rewards</p>
				<p class="value">{150} FIRO</p>
			</div>
		</div>
	</div>

	<div class="withdraw-button-holder" class:blurry={$darkOverlay}>
		<button
			class="withdraw-button"
			on:click={() => {
				darkOverlay.set(!$darkOverlay);
				withdrawPopupActive = !withdrawPopupActive;
			}}>Withdraw Realized Rewards</button
		>
	</div>

	<div class="my-stakes" class:blurry={$darkOverlay}>
		<h3 class="my-stakes-title">My Stakes</h3>
		<StakeProgress first={true} />
		<StakeProgress />
		<StakeProgress />
	</div>

	<button
		class:blurry={$darkOverlay}
		on:click={() => {
			darkOverlay.set(!$darkOverlay);
			unstakePopupActive = !unstakePopupActive;
		}}>Unstake all positions</button
	>
</div>

<style lang="postcss">
	h2 {
		@apply md:mr-5 md:text-3xl;
	}

	.main {
		@apply px-5 md:max-w-[1000px] md:mx-auto md:flex md:flex-col z-40;
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
		@apply md:w-auto mt-4 md:mt-0 md:absolute md:top-[-28px] md:right-[225px];
	}

	.withdraw-button-holder {
		@apply md:w-auto md:relative;
	}

	.account-summary-header > img {
		@apply md:h-[40px] md:w-[40px] cursor-pointer;
	}

	.popup-holder {
		@apply fixed top-0 left-0 right-0 bottom-0 h-screen w-screen z-50 px-4;
		@apply justify-center items-center flex;
	}

	.blurry {
		@apply md:filter md:blur;
	}
</style>
