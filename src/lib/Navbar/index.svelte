<script>
	import { link } from '$lib/Navbar/navStore';
	import { slide, fade } from 'svelte/transition';
	import { createEventDispatcher } from 'svelte';
	import Divider from '$lib/Divider/index.svelte';
	import { showAccountSummary } from '$lib/AccountSummary/accountSummaryStore';

	const dispatch = createEventDispatcher();

	let showNav = false;

	function isPage(page) {
		return $link == page;
	}
</script>

<div class="mobile">
	<img class="nav-img" src="/images/png/firo-group.png" alt="firo-group-logo" />
	<button
		on:click={() => {
			// dispatch('navclicked');
			// showNav = true;
		}}
	>
		<img src="/images/png/menu.png" alt="menu" />
	</button>
</div>

{#if showNav}
	<div class="main" transition:slide>
		<div class="divider">
			<ul>
				<img class="firo-grp-logo" src="/images/png/firo-group.png" alt="firo-group-logo" />
				<li>Get Firo</li>
				<Divider />
				<li>About</li>
				<Divider />
				<li>Community</li>
				<Divider />
				<li>Swap</li>
				<Divider />
				<li class:selected={isPage('staking')}>
					<a href="/">Staking</a>
				</li>
				<Divider />
				<li>
					<a href="/my-stakes">My Stakes</a>
				</li>
				<Divider />
				<li>
					<a href="https://firo.org/guide/">Guides</a>
				</li>
				<Divider />
				<li>
					<a href="https://firo.org/blog/">Blog</a>
				</li>
				<Divider />
				<li>Crowdfunding</li>
				<button
					on:click={() => {
						dispatch('navclicked');
						showNav = false;
					}}
				>
					<img src="/images/png/close.png" alt="close" />
				</button>
			</ul>
		</div>
	</div>
{/if}

{#if !$showAccountSummary}
	<div class="main notmobile" transition:fade>
		<img class="desktop-logo" src="/images/png/firo-group.png" alt="firo-group-logo" />
		<!-- <div class="divider">
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
		</div> -->
	</div>
{/if}

<style lang="postcss">
	.main {
		@apply fixed bottom-0 bg-white w-full h-3/4 z-50 pb-8 pt-12 rounded-tl-mobile rounded-tr-mobile md:rounded-none md:pb-0 md:pt-0 md:static md:h-full flex md:items-center justify-center md:mt-6 xl:mt-12 xxxl:mt-24 text-center;
	}

	.notmobile {
		@apply hidden md:flex;
	}

	.mobile {
		@apply flex flex-row justify-between items-center p-5 md:hidden mb-8 md:mb-0;
		box-shadow: 0px 4px 30px rgba(0, 0, 0, 0.08);
	}

	ul {
		@apply flex flex-col items-center h-full justify-between md:items-start md:flex-row md:items-center w-full md:justify-between xl:justify-around md:max-w-3xl xl:max-w-5xl xxl:text-xl xxxl:text-4xl xxl:max-w-7xl xxxl:max-w-fourk;
	}

	.divider {
		@apply flex flex-col w-full h-full md:flex-row md:items-start items-center md:max-w-4xl xl:max-w-6xl xxl:max-w-screen-xl xxxl:max-w-fourk;
	}

	li {
		@apply cursor-pointer;
	}

	.selected {
		@apply font-bold;
	}

	.firo-grp-logo {
		@apply md:hidden w-28;
	}

	.nav-img {
		@apply w-16;
	}

	.desktop-logo {
		@apply hidden md:inline absolute left-[60px] lg:top-[15px] xl:top-[30px] xl:left-[150px] xxl:left-[120px] xxxl:left-[300px] xxxl:top-[60px] md:w-[90px] xl:w-[105px] xxxl:w-[210px];
	}
</style>
