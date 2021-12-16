<script lang="ts">
	import { convertDate, dateDifference } from '$utils';

	export let first: boolean = false;
	export let stakedOn = new Date(2021, 11, 1, 12, 54, 35);
	export let unlockedOn = new Date(2022, 0, 1, 16, 48, 39);
	export let rewardOn = new Date(2022, 1, 1, 3, 24, 45);
	const totalTime = rewardOn.getTime() - stakedOn.getTime();
	const progressTime = new Date().getTime() - stakedOn.getTime();
	const progress = progressTime / totalTime;

	let progressBar = 0;

	setTimeout(() => {
		progressBar = progress;
	}, 500);
</script>

<div class="main">
	{#if !first}
		<hr class="top mobile" />
	{/if}

	<div class="top">
		<p class="locked">{15} LP<br class="desktop" />locked</p>
		<p class="unlocked" class:text-maincolor={progressBar > 0.5}>{15} LP unlocked</p>
		<div class="end" />
	</div>

	<div class="progress">
		<div class="progress-done" style="width: {progressBar * 100}%;" />
	</div>

	<div class="mid">
		<p class="locked">{stakedOn.toLocaleTimeString()}<br />{convertDate(stakedOn)}</p>
		<p class="unlocked" class:text-maincolor={progressBar > 0.5}>
			{unlockedOn.toLocaleTimeString()}<br />{convertDate(unlockedOn)}
		</p>
		<p class="end">{rewardOn.toLocaleTimeString()}<br />{convertDate(rewardOn)}</p>
	</div>

	<div class="bottom">
		<p>{dateDifference(unlockedOn, stakedOn)}</p>
		<div class="vl" />
		<p>{dateDifference(rewardOn, unlockedOn)}</p>
	</div>
	<hr class="dashed" />

	<div class="total-time">
		Total Time Until Reward<br />{dateDifference(rewardOn, stakedOn)}
	</div>
</div>

<style lang="postcss">
	.top {
		@apply flex font-medium text-xs md:text-base mb-3 md:mb-2 justify-between items-end text-subtext2 md:text-greytext md:font-medium;
	}

	.locked {
		@apply text-maincolor w-full;
	}

	.unlocked {
		@apply w-full text-center;
		@apply transition-all duration-1000;
	}

	.end {
		@apply w-full text-right;
	}

	.progress {
		@apply h-4 bg-[#d8d8d8] rounded-[30px] w-full mb-3 md:mb-4;
	}

	.progress-done {
		@apply rounded-[30px] flex items-center justify-center h-full w-0;
		@apply bg-gradient-to-r from-maincolor via-maincolor to-[#C65565EF];
		@apply transition-all duration-1000;
	}

	.mid {
		@apply flex font-medium text-xs md:text-base mb-3 justify-between px-1 leading-3 text-subtext2 md:text-greytext md:font-medium;
	}

	hr.dashed {
		@apply border-t-2 md:border-t border-dashed border-maincolor mb-3;
	}

	hr.top {
		@apply border-t-2 border-line-color mb-5;
	}

	.bottom {
		@apply flex font-medium text-xs md:text-base justify-between px-1 md:text-greytext md:font-medium;
	}

	.vl {
		@apply border-l-2 md:border-l border-dashed border-maincolor;
	}

	.bottom > p {
		@apply text-center w-full pb-2;
	}

	.total-time {
		@apply flex font-medium text-xs md:text-sm justify-center px-1 text-maincolor text-center leading-3 mb-5;
	}

	.mobile {
		@apply md:hidden;
	}

	.desktop {
		@apply hidden md:flex;
	}
</style>
