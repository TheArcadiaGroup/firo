<div class="component balance">
	<p class="balance-title">Balance</p>
	<p>Unstaked</p>
	<div class="unstaked-amount">
		<img src="/images/png/Firo-symbol-1.png" alt="firo-symbol" />
		<div class="unstaked-amount-value">
			<p>-</p>
			<p>FIRO</p>
		</div>
	</div>
</div>

<style lang="postcss">
	.balance {
		@apply py-5 px-7 mb-5 mx-6;
	}

	.balance-title {
		@apply text-2xl mb-3;
	}

	.unstaked-amount {
		@apply flex items-center;
	}

	.unstaked-amount-value {
		@apply ml-2;
	}

	.component {
		@apply rounded-xl border border-line-color bg-bg-primary;
	}
</style>
