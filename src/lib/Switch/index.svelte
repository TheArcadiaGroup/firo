<script>
	import { onMount } from 'svelte';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	let left, right;

	onMount(() => {
		left = document.getElementById('left');
		right = document.getElementById('right');
	});

	function leftClick() {
		left.style.color = '#FFFFFF';
		right.style.color = '#000000B3';
		right.classList.remove('btn');
		left.classList.add('btn');

		dispatch('leftClicked');
	}

	function rightClick() {
		right.style.color = '#FFFFFF';
		left.style.color = '#000000B3';
		left.classList.remove('btn');
		right.classList.add('btn');

		dispatch('rightClicked');
	}
</script>

<main>
	<div class="form-box">
		<div class="button-box">
			<button type="button" class="toggle-btn btn" id="left" on:click={leftClick}>Stake FIRO</button
			>
			<button type="button" class="toggle-btn" id="right" on:click={rightClick}>Unstake</button>
		</div>
	</div>
</main>

<style lang="postcss">
	main {
		@apply self-center w-full xxl:text-xl xxxl:text-3xl;
	}

	.button-box {
		@apply border-4 md:border-0 border-white relative rounded-full bg-white flex w-full;
	}

	.toggle-btn {
		@apply py-3 md:px-10 cursor-pointer bg-transparent relative text-center duration-500 rounded-full w-full xxxl:py-5 xxxl:font-semibold;
		border: 0;
		outline: none;
	}

	#left {
		@apply text-white;
	}

	#right {
		@apply text-black-light;
	}

	.btn {
		@apply bg-maincolor rounded-full;
	}
</style>
