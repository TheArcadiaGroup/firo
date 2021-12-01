<script>
	import Stake from '$lib/Stake/index.svelte';
</script>

<main>
	<section class="main-section">
		<section class="left-section">
			<h2>Maximize yield by staking FIRO</h2>
			<p class="description">
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque efficitur risus metus,
				suscipit consequat est tempus semper. Suspendisse et urna vel metus pulvinar sagittis. Nunc
				tristique lobortis scelerisque. Fusce quis gravida ex. In sodales volutpat porttitor.
				Phasellus tempus eros id leo gravida, in viverra sem viverra. Donec vulputate massa at enim
				tincidunt hendre. In sodales volutpat porttitor. Phasellus tempus eros id leo gravida, in
				viverra sem viverra. Donec vulputate massa at enim tincidunt hendre
			</p>
			<div class="staking-apr component">
				<p class="staking-apr-text">Staking APR</p>
				<div class="apr-value">
					<p class="staking-apr-value-text">{9.58}%</p>
					<p>Yesterday's APR</p>
				</div>
			</div>
			<Stake />
		</section>
		<div class="space" />
		<section class="right-section">
			<img class="firo-grp-logo" src="/images/png/firo-group.png" alt="firo-group-logo" />
			<div>
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
				<div class="atomic-dex">
					<img src="/images/png/atomic-dex.png" alt="atomic-dex" />
				</div>
			</div>
		</section>
	</section>
</main>

<style lang="postcss">
	h2 {
		@apply text-2xl font-bold font-sans;
	}

	main {
		@apply flex flex-col justify-center items-center font-sans mx-4;
	}

	.main-section {
		@apply w-full max-w-7xl flex;
	}

	.description {
		@apply text-para-color;
	}

	.left-section {
		@apply w-full;
	}

	.right-section {
		@apply max-w-xs w-full h-screen flex flex-col justify-around;
	}

	.space {
		@apply w-1/6;
	}

	.staking-apr-text {
		@apply font-bold text-2xl;
	}

	.staking-apr {
		@apply p-6 mt-14 flex justify-between items-center mb-6;
	}

	.staking-apr-value-text {
		@apply font-semibold text-3xl;
	}

	.apr-value {
		@apply flex flex-col items-end;
	}

	.component {
		@apply rounded-xl border border-line-color bg-bg-primary;
	}

	.balance {
		@apply py-7 px-8 w-full mb-5;
	}

	.balance-title {
		@apply text-2xl mb-4;
	}

	.unstaked-amount {
		@apply flex items-center;
	}

	.firo-grp-logo {
		@apply w-48 self-center;
	}

	.unstaked-amount-value {
		@apply ml-2;
	}

	.atomic-dex {
		@apply py-2 border border-line-color rounded-xl flex justify-center;
	}
</style>
