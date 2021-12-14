<script>
	export let first = false;
</script>

<div class="component" class:first>
	<p class="title">
		<slot />
	</p>
	<div class="content">
		<img src="/images/svg/wallet.svg" alt="wallet-icon" />
		<p class="description">CONNECT WALLET</p>
	</div>
</div>

<style lang="postcss">
	.component {
		@apply rounded-xl border border-line-color xxl:border-2 xxxl:border-4;
		@apply bg-bg-primary h-[120px] md:h-[185px] xl:h-[195px] xxl:h-[215px] xxxl:h-[350px] cursor-pointer;
		@apply flex items-center justify-around flex-col w-full;
		@apply mt-3 md:mt-0 py-2 px-3 md:py-2 md:px-5 mb-3 md:mb-5 md:mx-6 text-[10px] md:text-base xxl:text-lg xxxl:text-3xl xxxl:py-6 xxxl:px-8;
	}

	.content {
		@apply flex flex-col justify-center items-center;
	}

	.title {
		@apply text-xs md:text-xl xxl:text-2xl xxxl:text-4xl text-center justify-self-start;
	}

	img {
		@apply w-[18px] md:w-[25px] xxxl:w-[75px] mb-2 md:mb-4;
	}

	.description {
		@apply opacity-30 font-dmsans font-semibold;
	}

	.first {
		@apply mr-4;
	}
</style>
