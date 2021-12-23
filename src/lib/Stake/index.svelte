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
		selectedPool,
		totalStakedLPBalance
	} from '$stores/accountSummaryStore';
	import { appProvider, userAddress } from '$stores/wallet';
	import { stakeLPTokens, unStakeLpTokens } from '$utils/contractInteractions/staking';
	import {
		checkMasterchefAllowance,
		increaseMasterChefAllowance
	} from '$utils/contractInteractions/lpToken';
	import {
		loadStakeBalances,
		loadUnstakeBalances,
		loadWithdrawableLPTokens
	} from '$utils/contractInteractions/tokenBalances';
	import {
		getLockUpDuration,
		getPendingFiroTokens,
		getVestingDuration
	} from '$utils/contractInteractions/masterChef';
	import { realizedFiroRewards } from '$utils/contractInteractions/vesting';

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

	// Check Masterchef allowance everytime useraddress changes
	$: (async (userAddress) => {
		if (userAddress) {
			const allowance = await checkMasterchefAllowance(userAddress);
			console.log('ALLOWANCE: ', allowance > 0);
			isApproved.set(allowance > 0);
			await loadStakeBalances();
			await loadUnstakeBalances();
			await realizedFiroRewards(userAddress);
			await loadWithdrawableLPTokens();

			// Check pending firos
			const pendingFiros = await getPendingFiroTokens($selectedPool, userAddress);
			pendingFiroRewardsBalance.set(pendingFiros);
		}
	})($userAddress);

	$: (async (_appProvider) => {
		if (_appProvider) {
			await getLockUpDuration();
			await getVestingDuration();
		}
	})($appProvider);
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
			<p class="firo-lockup">
				LP Lockup = {$lockUpDuration / (60 * 60 * 24)} Days + Reward Lockup = {$vestingDuration /
					(60 * 60 * 24)} Days
			</p>
		{/if}
		{#if $isStaking}
			{#if $pendingFiroRewardsBalance > 0}
				<p class="until-x-firo">
					<!-- <span class="red-text">
						{$vestingDuration}
					</span>
					Until <span class="red-text">{$pendingFiroRewardsBalance} FIRO</span> Reward -->
				</p>
			{/if}
		{:else}
			<p class="until-x-firo">
				Unstaking will take <span class="red-text">{$lockUpDuration / (60 * 60 * 24)} Days</span>
				and nullify your reward of
				<span class="red-text">{$pendingFiroRewardsBalance} FIRO</span>
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
		<button class="connect-wallet-button"> Connect Wallet </button>
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
