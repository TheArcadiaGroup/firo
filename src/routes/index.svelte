<script>
	import Stake from '$lib/Stake/index.svelte';
	import Header from '$lib/Header/index.svelte';
	import StakingAprBar from '$lib/StakingAprBar/index.svelte';
	import StakingBalance from '$lib/StakingBalance/index.svelte';
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
		@apply md:flex md:items-center w-full md:max-w-4xl xl:max-w-6xl self-center md:justify-between xl:justify-around;
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
		@apply flex items-center w-full max-w-4xl xl:max-w-6xl self-center md:justify-between xl:justify-around;
	}

	.lower-section {
		@apply md:flex items-center w-full max-w-4xl xl:max-w-6xl self-center md:justify-between xl:justify-around;
	}

	.right {
		@apply md:max-w-xs w-full;
	}

	.left {
		@apply md:max-w-xl w-full;
	}

	.logo-holder {
		@apply hidden md:inline md:flex md:items-center md:justify-center;
	}

	.atomic-dex {
		@apply py-2 border border-line-color rounded-xl flex justify-center md:mx-6;
	}
</style>
