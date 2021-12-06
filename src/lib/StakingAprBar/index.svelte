<div class="staking-apr component">
	<p class="staking-apr-text">Staking APR</p>
	<div class="apr-value">
		<p class="staking-apr-value-text">{9.58}%</p>
		<p class="undertext">Yesterday's APR</p>
	</div>
</div>

<style lang="postcss">
	.staking-apr-text {
		@apply font-bold text-xl md:text-2xl xxl:text-4xl xxxl:text-5xl;
	}

	.staking-apr {
		@apply p-4 md:p-3 flex justify-between items-center mb-3 xxl:mb-6 xxl:py-5 xxl:px-10 xxxl:mb-16 xxxl:py-7 xxxl:px-20;
	}

	.apr-value {
		@apply flex flex-col items-end;
	}

	.undertext {
		@apply text-xs md:text-base xxl:text-lg xxxl:text-3xl;
	}

	.staking-apr-value-text {
		@apply font-semibold text-xl md:text-3xl xxl:text-5xl xxxl:text-7xl;
	}

	.component {
		@apply rounded-xl border border-line-color bg-bg-primary xxl:border-2 xxxl:border-4;
	}
</style>
