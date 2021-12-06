<script>
	import Stake from '$lib/Stake/index.svelte';
	import Header from '$lib/Header/index.svelte';
	import StakingAprBar from '$lib/StakingAprBar/index.svelte';
	import StakingBalance from '$lib/StakingBalance/index.svelte';
	import { onMount } from 'svelte';
	import { link } from '$lib/Navbar/navStore';

	onMount(() => {
		link.set('staking');
	});
</script>

<main>
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

	<div class="mid-section">
		<div class="left">
			<StakingAprBar />
		</div>
		<div class="right" />
	</div>

	<div class="lower-section">
		<div class="left">
			<Stake />
		</div>
		<div class="right">
			<div>
				<StakingBalance />
				<div class="atomic-dex">
					<img src="/images/png/atomic-dex.png" alt="atomic-dex" />
				</div>
			</div>
		</div>
	</div>
</main>

<style lang="postcss">
	main {
		@apply flex flex-col justify-center font-sans mx-4;
	}

	.top-section {
		@apply md:flex md:items-center w-full md:max-w-4xl xl:max-w-6xl xxl:max-w-screen-xl xxxl:max-w-fourk self-center md:justify-between xl:justify-around;
		@apply md:mt-6 xl:mt-12 xxl:mt-16 xxxl:mt-28;
	}

	.top-section > .right {
		@apply hidden md:inline;
	}

	.mid-section > .right {
		@apply hidden md:inline;
	}

	.lower-section > .right {
		@apply self-start;
	}

	.mid-section {
		@apply flex items-center w-full max-w-4xl xl:max-w-6xl xxl:max-w-screen-xl xxxl:max-w-fourk self-center md:justify-between xl:justify-around;
	}

	.lower-section {
		@apply md:flex items-center w-full max-w-4xl xl:max-w-6xl xxl:max-w-screen-xl xxxl:max-w-fourk self-center md:justify-between xl:justify-around mb-16 md:mb-0;
	}

	.right {
		@apply md:max-w-xs xxl:max-w-md xxxl:max-w-2xl w-full;
	}

	.left {
		@apply md:max-w-2xl xxl:max-w-4xl xxxl:max-w-screen-xl w-full;
	}

	.logo-holder {
		@apply hidden md:inline md:flex md:items-center md:justify-center;
	}

	.firo-grp-logo {
		@apply xxxl:w-8/12;
	}

	.atomic-dex {
		@apply py-2 border border-line-color rounded-xl flex justify-center md:mx-6 xxl:border-2 xxxl:border-4 xxxl:h-24;
	}
</style>
