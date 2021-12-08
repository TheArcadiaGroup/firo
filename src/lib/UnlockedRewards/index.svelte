<div class="component balance">
	<p class="balance-title">Unlocked Rewards</p>
	<div>
		<div class="unstaked-amount">
			<div class="logo-container">
				<img class="firo-symbol" src="/images/png/Firo-symbol-1.png" alt="firo-symbol" />
				<img class="binance-chain" src="/images/svg/binance-chain.svg" alt="binance-chain" />
			</div>
			<div class="unstaked-amount-value">
				<p>{250}</p>
				<p>FIRO</p>
			</div>
		</div>
	</div>
	<p class="time">
		Total Time Until Reward <br />
		{'19:12:53:27'}
	</p>
</div>

<style lang="postcss">
	.balance {
		@apply flex md:flex-col mt-3 md:mt-0 py-2 px-3 md:py-5 md:px-7 mb-3 md:mb-3 md:mx-6 text-sm md:text-xl xxl:text-2xl xxxl:text-4xl xxxl:py-10 xxxl:px-10 xxxl:leading-normal;
	}

	.balance-title {
		@apply text-base md:text-xl xl:text-2xl xxl:text-3xl xxxl:text-5xl mb-1 mr-8;
	}

	.unstaked-amount {
		@apply flex;
	}

	.unstaked-amount-value {
		@apply ml-2;
	}

	.component {
		@apply rounded-xl border border-line-color bg-bg-primary xxl:border-2 xxxl:border-4;
	}

	.firo-symbol {
		@apply w-10 md:w-[60px] xxl:w-[70px] xxxl:w-[110px];
	}

	.logo-container {
		@apply flex flex-col justify-center items-center;
	}

	.binance-chain {
		@apply h-[20px] xl:h-[25px] xxl:h-[30px] xxxl:h-[50px];
	}

	.time {
		@apply text-xs md:text-base xxl:text-lg xxxl:text-3xl text-maincolor text-center mt-[16px] xxxl:mt-[32px];
	}
</style>
