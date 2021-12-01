<script>
	import { onMount } from 'svelte';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	onMount(() => {
		var btn = document.getElementById('btn');
		var left = document.getElementById('left');
		var right = document.getElementById('right');
	});

	function leftClick() {
		btn.style.left = '0';
		left.style.color = '#FFFFFF';
		right.style.color = '#000000B3';

		dispatch('leftClicked');
	}

	function rightClick() {
		btn.style.left = '400px';
		right.style.color = '#FFFFFF';
		left.style.color = '#000000B3';

		dispatch('rightClicked');
	}
</script>

<main>
	<div class="form-box">
		<div class="button-box">
			<div id="btn" />
			<button type="button" class="toggle-btn" id="left" on:click={leftClick}>Stake FIRO</button>
			<button type="button" class="toggle-btn" id="right" on:click={rightClick}>Unstake</button>
		</div>
	</div>
</main>

<style lang="postcss">
	main {
		@apply self-center;
	}

	.button-box {
		@apply relative rounded-3xl bg-white flex;
		width: 800px;
	}

	.toggle-btn {
		@apply py-3 px-10 cursor-pointer bg-transparent relative text-center;
		width: 400px;
		border: 0;
		outline: none;
	}

	#btn {
		@apply left-0 top-0 absolute h-full bg-maincolor rounded-3xl duration-500;
		width: 400px;
	}

	#left {
		@apply text-white;
	}

	#right {
		@apply text-black-light;
	}
</style>
