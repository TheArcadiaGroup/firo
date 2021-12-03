<script>
	import { onMount } from 'svelte';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	onMount(() => {
		// Stop populating the global scope within functions, always use either let or const
		var left = document.getElementById('left');
		var right = document.getElementById('right');
	});

	function leftClick() {
		// These values must be initialized before
		left.style.color = '#FFFFFF';
		right.style.color = '#000000B3';
		right.classList.remove('btn');
		left.classList.add('btn');

		dispatch('leftClicked');
	}

	function rightClick() {
		// Its bad practice to do this, initialize these elements within this component's scope and use them accordingly
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
		@apply self-center w-full xxl:text-lg;
	}

	.button-box {
		@apply relative rounded-3xl bg-white flex w-full;
	}

	.toggle-btn {
		@apply py-3 px-10 cursor-pointer bg-transparent relative text-center duration-500 rounded-3xl w-full;
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
		@apply bg-maincolor rounded-3xl;
	}
</style>
