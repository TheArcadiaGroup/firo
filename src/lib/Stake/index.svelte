<script>
	// External
	import Switch from '$lib/Switch/index.svelte';
	import {
		isApproved,
		isStaking,
		lockUpDuration,
		stakingOrUnstakeAmount,
		vestingDuration,
		walletConnected
	} from '$stores/stakingStore';
	import TextInput from '$lib/TextInput/index.svelte';
	import {
		lpTokenBalance,
		pendingFiroRewardsBalance,
		totalStakedLPBalance
	} from '$stores/accountSummaryStore';
	import { stakeLPTokens, unStakeLpTokens } from '$utils/contractInteractions/staking';
	import { increaseMasterChefAllowance } from '$utils/contractInteractions/lpToken';
	import { connectToWallet } from '$utils/walletConnection';

	isStaking.set(true);

	const stakeButtonAction = () => {
		if (!$isApproved) {
			increaseMasterChefAllowance();
		} else if ($isStaking) {
			stakeLPTokens();
		} else {
			unStakeLpTokens();
		}
	};
</script>

<div class="main">
	<Switch />
	{#if $isStaking}
		<p class="title">Stake LP TOKEN</p>
	{:else}
		<p class="title">Unstake LP TOKEN</p>
	{/if}

	<TextInput balance={$isStaking ? $lpTokenBalance : $totalStakedLPBalance} />

	<div class="lower-text">
		{#if $isStaking}
			<p class="firo-lockup px-3">
				LP Lockup = {$lockUpDuration !== 0 ? $lockUpDuration / (60 * 60 * 24) : 3} Days + Reward Lockup
				= {$vestingDuration !== 0 ? $vestingDuration / (60 * 60 * 24) : 30} Days
			</p>
		{/if}
		{#if $isStaking}
			{#if $pendingFiroRewardsBalance > 0}
				<p class="until-x-firo px-3">
					<span class="red-text">
						{$vestingDuration / (60 * 60 * 24)} Days
					</span>
					Until <span class="red-text">{$pendingFiroRewardsBalance.noExponents()} FIRO</span> Reward
				</p>
			{/if}
		{:else}
			<p class="until-x-firo">
				Unstaking will take <span class="red-text">{$lockUpDuration / (60 * 60 * 24)} Days</span> after
				which you can withdraw your LP tokens
			</p>
		{/if}
	</div>

	<!-- TODO: PREVENT USERS FROM CLICKING BUTTON WHEN THEY ADDED MORE TOKENS THAN THEY HAVE -->
	{#if $walletConnected}
		<button
			on:click={stakeButtonAction}
			class="connect-wallet-button"
			disabled={($lpTokenBalance <= 0 &&
				$isStaking &&
				$stakingOrUnstakeAmount <= $lpTokenBalance) ||
				($totalStakedLPBalance <= 0 &&
					!$isStaking &&
					$stakingOrUnstakeAmount <= $totalStakedLPBalance)}
			class:cursor-not-allowed={($lpTokenBalance <= 0 &&
				$isStaking &&
				$stakingOrUnstakeAmount <= $lpTokenBalance) ||
				($totalStakedLPBalance <= 0 &&
					!$isStaking &&
					$stakingOrUnstakeAmount <= $totalStakedLPBalance)}
		>
			{!$isApproved ? 'Approve' : $isStaking ? 'Stake' : 'Unstake'}
		</button>
	{:else}
		<button class="connect-wallet-button" on:click={async () => await connectToWallet()}>
			Connect Wallet
		</button>
	{/if}
</div>

<style lang="postcss">
	.main {
		@apply flex flex-col rounded-xl border border-line-color bg-bg-primary p-4 md:p-8 xl:py-14 xxl:p-10 xxxl:p-20 xxl:border-2 xxxl:border-4 h-full;
	}

	.title {
		@apply font-semibold text-xl md:text-2xl xxl:text-4xl xxxl:text-5xl my-4 xxl:my-6 xxxl:my-8;
	}

	.red-text {
		@apply text-maincolor;
	}

	.until-x-firo {
		@apply font-bold;
	}

	.lower-text {
		@apply flex flex-col md:flex-row justify-between font-semibold mt-3 text-xs md:text-base xxl:text-xl xxxl:text-3xl xxxl:mt-4;
	}

	.firo-lockup {
		@apply text-black-lightest;
	}

	.connect-wallet-button {
		@apply mt-4 md:mt-8 py-2 md:py-3 border border-maincolor text-maincolor md:h-14 rounded-[45px];
		@apply text-[18px] md:text-base xxl:text-xl xxxl:text-4xl xxxl:py-6 xxxl:h-auto xxxl:rounded-full;
		@apply transition-all;
		@apply hover:bg-maincolor hover:text-white;
	}
</style>
