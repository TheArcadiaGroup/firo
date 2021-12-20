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
		totalLockedLPTokenBalance
	} from '$stores/accountSummaryStore';
	import { onMount } from 'svelte';
	import { getLPTokenBalanceBasedOnPoolToken } from '$utils/contractInteractions/tokenBalances';
	import { getPoolInfoByIndex, getPoolLength } from '$utils/contractInteractions/masterChef';
	import { userAddress } from '$stores/wallet';
	import { getUserInfoWithIndex, stakeLPTokens } from '$utils/contractInteractions/staking';
	import {
		checkMasterchefAllowance,
		increaseMasterChefAllowance
	} from '$utils/contractInteractions/lpToken';
	import { ethers } from 'ethers';

	isStaking.set(true);

	const loadStakeBalances = async () => {
		// Get the pool length
		const lastPoolIndex = await getPoolLength();

		// Set default pool
		selectedPool.set(lastPoolIndex && typeof lastPoolIndex === 'number' ? lastPoolIndex - 1 : 0);

		// Get first pool if above fails
		const lastPool =
			lastPoolIndex && typeof lastPoolIndex === 'number'
				? await getPoolInfoByIndex(lastPoolIndex - 1)
				: await getPoolInfoByIndex(0);
		const poolLpTokenAddress = lastPool?.lpToken;

		const tokenBalance = await getLPTokenBalanceBasedOnPoolToken(poolLpTokenAddress, $userAddress);

		// Update Store
		lpTokenBalance.set(tokenBalance);
	};

	const loadUnstakeBalances = async () => {
		const result = await getUserInfoWithIndex(0, $userAddress);

		totalLockedLPTokenBalance.set(parseFloat(ethers.utils.formatEther(result?.amount)));

		console.log('LOCKED AMOUNT: ', ethers.utils.formatEther(result?.amount));
		console.log('REWARD DEBT: ', ethers.utils.formatEther(result?.rewardDebt));
	};

	const buttonDisabled = () => {
		// Always allow approval requests
		if ($isApproved) {
			return false;
		} else {
			return (
				($lpTokenBalance <= 0 && $isStaking && $stakingOrUnstakeAmount <= $lpTokenBalance) ||
				($totalLockedLPTokenBalance <= 0 &&
					!$isStaking &&
					$stakingOrUnstakeAmount <= $totalLockedLPTokenBalance)
			);
		}
	};

	// Check Masterchef allowance everytime useraddress changes
	$: (async (userAddress) => {
		if (userAddress) {
			isApproved.set((await checkMasterchefAllowance(userAddress)) > 0);
			await loadStakeBalances();
			await loadUnstakeBalances();
		}
	})($userAddress);
</script>

<div class="main">
	<Switch />
	{#if $isStaking}
		<p class="title">Stake LP TOKEN</p>
	{:else}
		<p class="title">Unstake LP TOKEN</p>
	{/if}

	<TextInput balance={$isStaking ? $lpTokenBalance : $totalLockedLPTokenBalance} />

	<div class="lower-text">
		{#if $isStaking}
			<p class="firo-lockup">
				LP Lockup = {$vestingDuration / (60 * 60 * 24)} Days + Reward Lockup = {$lockUpDuration /
					(60 * 60 * 24)} Days
			</p>
		{/if}
		{#if $isStaking}
			<p class="until-x-firo">
				<span class="red-text">{730} Days</span> Until <span class="red-text">{12} FIRO</span> Reward
			</p>
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
			on:click={() => (!$isApproved ? increaseMasterChefAllowance() : stakeLPTokens())}
			class="connect-wallet-button"
			disabled={buttonDisabled()}
			class:cursor-not-allowed={buttonDisabled()}
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
