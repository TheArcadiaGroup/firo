<script>
	import { isStaking } from '../Stake/stakingStore';

	let left, right;

	function toggleClass() {
		left.classList.toggle('btn');
		right.classList.toggle('btn');
	}

	function leftClick() {
		toggleClass();
		isStaking.set(true);
	}

	function rightClick() {
		toggleClass();
		isStaking.set(false);
	}
</script>

<div class="main">
	<div class="form-box">
		<div class="button-box">
			<button type="button" bind:this={left} class="toggle-btn btn" on:click={leftClick}
				>Stake FIRO</button
			>
			<button type="button" bind:this={right} class="toggle-btn not-btn" on:click={rightClick}
				>Unstake</button
			>
		</div>
	</div>
</div>

<style lang="postcss">
	.main {
		@apply self-center rounded-full w-full text-sm md:text-base xxl:text-xl xxxl:text-3xl text-black-light;
	}

	.button-box {
		@apply border-4 md:border-0 border-white relative rounded-full bg-white flex w-full;
	}

	.toggle-btn {
		@apply py-2 md:py-3 md:px-10 cursor-pointer bg-transparent relative text-center duration-500 rounded-full;
		@apply w-full xxxl:py-5 xxxl:font-semibold;
		border: 0;
		outline: none;
	}

	.btn {
		@apply bg-maincolor text-white;
	}
</style>
