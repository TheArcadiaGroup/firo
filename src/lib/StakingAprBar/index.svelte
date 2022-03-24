<script lang="ts">
	import { estimatedAPR, estimatedCompoundedAPR } from '$stores/stakingStore';

	let toolTipShown = false;
</script>

<div class="staking-apr component">
	<p class="staking-apr-text">Staking APR</p>
	<div class="apr-value">
		<div
			class="staking-apr-value-text"
			on:focus={() => {
				toolTipShown = true;
			}}
			on:mouseover={() => {
				toolTipShown = true;
			}}
			on:mouseout={() => {
				toolTipShown = false;
			}}
			on:blur={() => {
				toolTipShown = false;
			}}
		>
			{($estimatedAPR * 100).toFixed(2)}%
			<span class="tooltip-trigger">i</span>
			<div class="tooltip" class:hidden={!toolTipShown}>
				{($estimatedCompoundedAPR * 100).toFixed(2)}% Compounded Monthly
			</div>
		</div>
		<p class="undertext">Yesterday's APR</p>
	</div>
</div>

<style lang="postcss">
	.staking-apr-text {
		@apply font-bold text-xl md:text-2xl xxl:text-4xl xxxl:text-5xl;
	}

	.staking-apr {
		@apply p-4 md:p-3 flex justify-between items-center mb-3 xxl:mb-6 xxl:py-5 xxl:px-10 xxxl:mb-12 xxxl:py-7 xxxl:px-20;
	}

	.apr-value {
		@apply flex flex-col items-end;
	}

	.undertext {
		@apply text-xs md:text-base xxl:text-lg xxxl:text-3xl;
	}

	.staking-apr-value-text {
		@apply font-semibold text-xl md:text-3xl xxl:text-5xl xxxl:text-7xl relative cursor-pointer;
	}

	.component {
		@apply rounded-xl border border-line-color bg-bg-primary xxl:border-2 xxxl:border-4;
	}

	.tooltip-trigger {
		@apply text-xs absolute -top-2 -right-3 border rounded-full border-black-default;
		@apply w-4 h-4 flex items-center justify-center cursor-pointer scale-75;
	}

	.tooltip {
		@apply text-xs absolute w-56 text-center -right-1;
		@apply px-4 py-2 bg-black-default text-white rounded;
		top: -140%;
		clip-path: circle(0 at 100% 100%);
		animation: fadeIn 500ms ease-in-out forwards;
	}

	.tooltip::after {
		content: '';
		@apply absolute right-0;
		bottom: -8px;
		border: 15px solid;
		border-color: transparent black transparent transparent;
		transform: rotate(0deg);
	}

	@keyframes fadeIn {
		from {
			clip-path: circle(0% at 100% 100%);
		}

		to {
			clip-path: circle(180% at 100% 100%);
		}
	}
</style>
