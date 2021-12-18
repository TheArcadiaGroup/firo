<script>
	import { fade } from 'svelte/transition';
	import { showAccountSummary } from '$stores/accountSummaryStore';
</script>

<div class="mobile">
	<img class="nav-img" src="/images/png/firo-group.png" alt="firo-group-logo" />
</div>

{#if !$showAccountSummary}
	<div class="main notmobile" transition:fade>
		<img class="desktop-logo" src="/images/png/firo-group.png" alt="firo-group-logo" />
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

	.nav-img {
		@apply w-16;
	}

	.desktop-logo {
		@apply hidden md:inline absolute left-[60px] lg:top-[15px] xl:top-[30px] xl:left-[150px] xxl:left-[120px] xxxl:left-[300px] xxxl:top-[60px] md:w-[90px] xl:w-[105px] xxxl:w-[210px];
	}
</style>
