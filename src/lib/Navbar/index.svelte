<script>
	import { isStaking } from '$lib/Navbar/navStore';
</script>

<main>
	<div>
		<ul>
			<li>Get Firo</li>
			<li>About</li>
			<li>Community</li>
			<li>Swap</li>
			<li class:selected={$isStaking}>
				<a href="/">Staking</a>
			</li>
			<li class:selected={!$isStaking}>
				<a href="/my-stakes">My Stakes</a>
			</li>
			<li>Guides</li>
			<li>Blog</li>
			<li>Crowdfunding</li>
		</ul>
	</div>
</main>

<style lang="postcss">
	main {
		@apply flex justify-center md:mt-6 xl:mt-12 xxxl:mt-24;
	}

	ul {
		@apply md:flex md:items-center w-full md:justify-between xl:justify-around md:max-w-3xl xl:max-w-5xl xxl:text-xl xxxl:text-4xl xxl:max-w-7xl xxxl:max-w-fourk;
	}

	div {
		@apply w-full md:max-w-4xl xl:max-w-6xl xxl:max-w-screen-xl xxxl:max-w-fourk;
	}

	li {
		@apply cursor-pointer;
	}

	.selected {
		@apply font-bold;
	}
</style>
