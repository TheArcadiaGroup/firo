<script>
	import Stake from '$lib/Stake/index.svelte';
</script>

<main>
	<div class="top-section">
		<div class="left">
			<h2>Maximize yield by staking FIRO</h2>
			<p class="description">
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque efficitur risus metus,
				suscipit consequat est tempus semper. Suspendisse et urna vel metus pulvinar sagittis. Nunc
				tristique lobortis scelerisque. Fusce quis gravida ex. In sodales volutpat porttitor.
				Phasellus tempus eros id leo gravida, in viverra sem viverra. Donec vulputate massa at enim
				tincidunt hendre. In sodales volutpat porttitor. Phasellus tempus eros id leo gravida, in
				viverra sem viverra. Donec vulputate massa at enim tincidunt hendre
			</p>
		</div>
		<div class="right">
			<div class="logo-holder">
				<img class="firo-grp-logo" src="/images/png/firo-group.png" alt="firo-group-logo" />
			</div>
		</div>
	</div>

	<div class="mid-section">
		<div class="left">
			<div class="staking-apr component">
				<p class="staking-apr-text">Staking APR</p>
				<div class="apr-value">
					<p class="staking-apr-value-text">{9.58}%</p>
					<p>Yesterday's APR</p>
				</div>
			</div>
		</div>
	</div>

	<div class="lower-section">
		<div class="left">
			<Stake />
		</div>
		<div class="right">
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
		</div>
	</div>
</main>

<style lang="postcss">
	.top-section {
		@apply flex items-center w-full max-w-4xl self-center justify-between;
	}

	.mid-section {
		@apply flex items-center w-full max-w-4xl self-center justify-between;
	}

	.lower-section {
		@apply flex items-center w-full max-w-4xl self-center justify-between;
	}

	h2 {
		@apply text-2xl font-bold font-sans;
	}

	main {
		@apply flex flex-col justify-center font-sans mx-4;
	}

	.description {
		@apply text-para-color mb-7;
	}

	.right {
		@apply max-w-xs w-full;
	}

	.left {
		@apply max-w-xl w-full;
	}

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

	.logo-holder {
		@apply flex items-center justify-center;
	}

	.lower-section {
		@apply flex;
	}

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

	.atomic-dex {
		@apply py-2 border border-line-color rounded-xl flex justify-center mx-6;
	}
</style>
