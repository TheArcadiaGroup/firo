<script>
	import Stake from '$lib/Stake/index.svelte';
	import Header from '$lib/Header/index.svelte';
	import StakingAprBar from '$lib/StakingAprBar/index.svelte';
	import UnlockedRewards from '$lib/UnlockedRewards/index.svelte';
	import AvailableLpToken from '$lib/AvailableLpToken/index.svelte';
	import { link } from '$lib/Navbar/navStore';
	import { walletConnected } from '$lib/Stake/stakingStore';
	import NoWallet from '$lib/NoWallet/index.svelte';
	import { onMount } from 'svelte';

	onMount(() => {
		link.set('staking');
	});
</script>

<div class="main">
	<div class="top-section">
		<div class="left">
			<Header />
		</div>
		<div class="right">
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
					<UnlockedRewards />
					<AvailableLpToken />
				{:else}
					<NoWallet>Unlocked Rewards</NoWallet>
					<NoWallet>Available LP TOKEN</NoWallet>
				{/if}
				<p class="atomidex-title">Swap on Atomixdex</p>
				<a href="!#" class="atomic-dex">
					<img src="/images/png/atomic-dex.png" alt="atomic-dex" />
				</a>
			</div>
		</div>
	</div>
</div>

<style lang="postcss">
	.main {
		@apply flex flex-col justify-center font-sans mx-4 md:mb-4;
	}

	.top-section {
		@apply md:flex md:items-center w-full md:max-w-4xl xl:max-w-6xl xxl:max-w-screen-xl xxxl:max-w-fourk self-center md:justify-between xl:justify-around;
		@apply md:mt-6 xl:mt-12 xxl:mt-16 xxxl:mt-28;
	}

	.top-section > .right {
		@apply hidden md:inline;
	}

	.lower-section > .right {
		@apply self-start;
	}

	.lower-section {
		@apply md:flex items-center w-full max-w-4xl xl:max-w-6xl xxl:max-w-screen-xl xxxl:max-w-fourk self-center md:justify-between xl:justify-around mb-16 md:mb-0;
	}

	.right {
		@apply md:max-w-xs xl:max-w-md xxl:max-w-md xxxl:max-w-3xl w-full;
	}

	.left {
		@apply md:max-w-2xl xl:max-w-3xl xxl:max-w-4xl xxxl:max-w-screen-xl w-full;
	}

	/* TODO: Which is it here md:inline or md:flex? */
	.logo-holder {
		@apply hidden md:inline md:flex md:items-center md:justify-center;
	}

	.firo-grp-logo {
		@apply xxxl:w-7/12 mb-24;
	}

	.atomic-dex {
		@apply py-1 md:py-2 border border-line-color rounded-xl flex justify-center md:mx-6 xxl:border-2 xxxl:border-4 xxxl:h-24;
	}

	.atomidex-title {
		@apply font-bold md:ml-6 xxl:text-lg xxxl:text-3xl leading-normal md:mb-1 xl:mb-2 xxl:mb-3 xxxl:mb-4;
	}
</style>
