<script lang="ts">
	export let first: boolean = false;
	export let progress = 0.7;
	export let stakedOn = new Date(2021, 11, 1);
	export let unlockedOn = new Date(2021, 11, 1);
	export let rewardOn = new Date(2021, 11, 1);

	const monthNames = [
		'Jan',
		'Feb',
		'Mar',
		'Apr',
		'May',
		'Jun',
		'Jul',
		'Aug',
		'Sep',
		'Oct',
		'Nov',
		'Dec'
	];

	function convertDate(date: Date) {
		return `${date.getDate()} ${monthNames[date.getMonth()]} ${date.getFullYear()}`;
	}

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
		<p class="locked">Staked on<br />{convertDate(stakedOn)}</p>
		<p class="unlocked" class:text-maincolor={progressBar > 0.5}>
			Unlocked on<br />{convertDate(unlockedOn)}
		</p>
		<p class="end">Reward on<br />{convertDate(rewardOn)}</p>
	</div>

	<div class="bottom">
		<p>19:12:53:27</p>
		<div class="vl" />
		<p>19:12:53:27</p>
	</div>
	<hr class="dashed" />

	<div class="total-time">
		Total Time Until Reward<br />19:12:53:27
	</div>
</div>

<style lang="postcss">
	.top {
		@apply flex font-medium text-xs md:text-base mb-3 md:mb-2 justify-between items-end text-subtext2 md:text-greytext;
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
		@apply flex font-medium text-xs md:text-base mb-3 justify-between px-1 leading-3 text-subtext2 md:text-greytext;
	}

	hr.dashed {
		@apply border-t-2 md:border-t border-dashed border-maincolor mb-3;
	}

	hr.top {
		@apply border-t-2 border-line-color mb-5;
	}

	.bottom {
		@apply flex font-medium text-xs md:text-base justify-between px-1 md:text-greytext;
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
