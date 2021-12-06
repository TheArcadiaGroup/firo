<script>
	import { link } from '$lib/Navbar/navStore';

	function isPage(page) {
		return $link == page;
	}
</script>

<main>
	<div>
		<ul>
			<li>Get Firo</li>
			<li>About</li>
			<li>Community</li>
			<li>Swap</li>
			<li class:selected={isPage('staking')}>
				<a href="/">Staking</a>
			</li>
			<li>
				<a href="/my-stakes">My Stakes</a>
			</li>
			<li>
				<a href="https://firo.org/guide/">Guides</a>
			</li>
			<li>
				<a href="https://firo.org/blog/">Blog</a>
			</li>
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
