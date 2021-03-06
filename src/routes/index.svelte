<script lang="ts">
	import Stake from '$lib/Stake/index.svelte';
	import Header from '$lib/Header/index.svelte';
	import StakingAprBar from '$lib/StakingAprBar/index.svelte';
	import UnlockedRewards from '$lib/UnlockedRewards/index.svelte';
	import AvailableLpToken from '$lib/AvailableLpToken/index.svelte';
	import { link } from '$stores/navStore';
	import { walletConnected } from '$stores/stakingStore';
	import NoWallet from '$lib/NoWallet/index.svelte';
	import { onMount } from 'svelte';
	import AccountSummary from '$lib/AccountSummary/index.svelte';
	import { showAccountSummary } from '$stores/accountSummaryStore';
	import FiroDex from '$lib/icons/FiroDex.svelte';
	import PancakeSwapFull from '$lib/icons/PancakeSwapFull.svelte';
	import BinanceLogo from '$lib/icons/BinanceLogo.svelte';

	onMount(() => {
		link.set('staking');
	});

	const triggerAction = async () => {
		// Dev use
	};
</script>

{#if $showAccountSummary}
	<AccountSummary
		on:deactivateAccountSummary={() => {
			showAccountSummary.set(false);
		}}
	/>
{:else}
	<div class="main">
		<div class="top-section">
			<div class="left">
				<Header
					on:activateAccountSummary={() => {
						showAccountSummary.set(true);
					}}
				/>
			</div>
			<div class="right" on:click={triggerAction}>
				<div class="logo-holder">
					<img class="firo-grp-logo" src="/images/png/firo-group.png" alt="firo-group-logo" />
				</div>
			</div>
		</div>

		<div class="lower-section">
			<div class="left">
				<StakingAprBar />
				<Stake />
			</div>
			<div class="right">
				<div>
					{#if $walletConnected}
						<div class="component-holder">
							<UnlockedRewards />
							<AvailableLpToken />
						</div>
					{:else}
						<div class="component-holder">
							<NoWallet first={true}>Unlocked Rewards</NoWallet>
							<NoWallet>Available LP TOKEN</NoWallet>
						</div>
					{/if}

					<div class="link_btns">
						<!-- Pancake Swap Link -->
						<p class="atomidex-title">Add Liquidity for LP Tokens</p>
						<a
							href="https://pancakeswap.finance/add/0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c/0xd5d0322b6bab6a762c79f8c81a0b674778e13aed"
							target="_blank"
							class="pancakeswap-link"
						>
							<PancakeSwapFull class="h-full scale-50 md:scale-75" />
						</a>
					</div>

					<div class="link_btns">
						<!-- Pancake Swap Link -->
						<p class="atomidex-title">Swap on Pancakeswap</p>
						<a
							href="https://pancakeswap.finance/swap?inputCurrency=0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c&outputCurrency=0xd5d0322b6bab6a762c79f8c81a0b674778e13aed"
							target="_blank"
							class="pancakeswap-link"
						>
							<PancakeSwapFull class="h-full scale-50 md:scale-75" />
						</a>
					</div>

					<div class="link_btns">
						<!-- FiroDex Link -->
						<p class="atomidex-title my-2">Swap FIRO {'<=>'} BEP20 FIRO</p>
						<a
							href="https://github.com/firoorg/FiroDEX-Desktop/releases"
							target="_blank"
							class="atomic-dex"
						>
							<FiroDex class="h-full scale-75 md:scale-90" />
						</a>
						<a
							href="https://www.binance.com/en/register?ref=BO08LUVY"
							target="_blank"
							class="atomic-dex"
						>
							<BinanceLogo class="h-full scale-75 md:scale-90" />
						</a>
					</div>
				</div>
			</div>
		</div>
	</div>
{/if}

<style lang="postcss">
	.main {
		@apply flex flex-col justify-center font-sans mx-4 md:mb-4 xl:mb-8;
	}

	.top-section {
		@apply md:flex md:items-center w-full md:max-w-4xl xl:max-w-6xl xxl:max-w-screen-xl xxxl:max-w-fourk self-center md:justify-between xl:justify-around;
		@apply md:mt-10 xl:mt-20 xxl:mt-24 xxxl:mt-36;
	}

	.top-section > .right {
		@apply hidden md:inline;
	}

	.lower-section > .right {
		@apply self-start;
	}

	.lower-section > .left {
		@apply self-start;
	}

	.lower-section {
		@apply md:flex items-center w-full max-w-4xl xl:max-w-6xl xxl:max-w-screen-xl xxxl:max-w-fourk self-center md:justify-between xl:justify-around mb-16 md:mb-0;
		@apply h-auto;
	}

	.lower-section > .right,
	.lower-section > .left {
		@apply flex flex-col h-full justify-between;
	}

	.right {
		@apply md:max-w-xs xl:max-w-md xxl:max-w-md xxxl:max-w-3xl w-full;
	}

	.left {
		@apply md:max-w-2xl xl:max-w-3xl xxl:max-w-4xl xxxl:max-w-screen-xl w-full;
	}

	.logo-holder {
		@apply hidden md:flex md:items-center md:justify-center;
	}

	.firo-grp-logo {
		@apply xxxl:w-7/12 mb-24;
	}

	.atomic-dex,
	.pancakeswap-link {
		@apply py-1 md:py-2 border border-line-color rounded-xl flex justify-center md:mx-6 xxl:border-2 xxxl:border-4 xxxl:h-24 w-full h-14;
	}

	.atomidex-title {
		@apply font-bold md:ml-6 xxl:text-lg xxxl:text-3xl leading-normal;
	}

	.link_btns {
		@apply flex flex-col space-y-2;
	}

	.component-holder {
		@apply flex w-full md:flex-col;
	}
</style>
