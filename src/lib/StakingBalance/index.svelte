<div class="component balance">
	<p class="balance-title">Balance</p>
	<div>
		<p>Unstaked</p>
		<div class="unstaked-amount">
			<img class="firo-symbol" src="/images/png/Firo-symbol-1.png" alt="firo-symbol" />
			<div class="unstaked-amount-value">
				<p>-</p>
				<p>FIRO</p>
			</div>
		</div>
	</div>
</div>

<style lang="postcss">
	.balance {
		@apply flex md:flex-col mt-3 md:mt-0 py-2 px-3 md:py-5 md:px-7 mb-3 md:mb-5 md:mx-6 text-xs md:text-base xxl:text-xl xxxl:text-3xl xxxl:py-10 xxxl:px-10 xxxl:leading-normal;
	}

	.balance-title {
		@apply text-base md:text-2xl xxl:text-3xl xxxl:text-5xl mb-3 mr-8;
	}

	.unstaked-amount {
		@apply flex items-center;
	}

	.unstaked-amount-value {
		@apply ml-2;
	}

	.component {
		@apply rounded-xl border border-line-color bg-bg-primary xxl:border-2 xxxl:border-4;
	}

	.firo-symbol {
		@apply w-10 md:w-1/4 xxl:w-2/12;
	}
</style>
