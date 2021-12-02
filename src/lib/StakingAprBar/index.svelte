<div class="staking-apr component">
	<p class="staking-apr-text">Staking APR</p>
	<div class="apr-value">
		<p class="staking-apr-value-text">{9.58}%</p>
		<p>Yesterday's APR</p>
	</div>
</div>

<style lang="postcss">
	.staking-apr-text {
		@apply font-bold text-2xl;
	}

	.staking-apr {
		@apply p-3 flex justify-between items-center mb-3;
	}

	.apr-value {
		@apply flex flex-col items-end;
	}

	.staking-apr-value-text {
		@apply font-semibold text-3xl;
	}

	.component {
		@apply rounded-xl border border-line-color bg-bg-primary;
	}
</style>
