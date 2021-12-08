<div class="component">
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
		@apply rounded-xl border border-line-color bg-bg-primary xxl:border-2 xxxl:border-4 h-[189px] xxl:h-[200px] xxxl:h-[350px] cursor-not-allowed;
		@apply flex items-center justify-around md:flex-col mt-3 md:mt-0 py-2 px-3 md:py-3 md:px-5 mb-3 md:mb-5 md:mx-6 text-sm md:text-base xxl:text-xl xxxl:text-4xl xxxl:py-8 xxxl:px-8;
	}

	.content {
		@apply flex flex-col justify-center items-center;
	}

	.title {
		@apply text-base md:text-xl xxl:text-3xl xxxl:text-5xl text-center justify-self-start;
	}

	img {
		@apply w-[25px] xxxl:w-[75px] mb-4;
	}

	.description {
		@apply opacity-30 font-dmsans font-semibold;
	}
</style>
