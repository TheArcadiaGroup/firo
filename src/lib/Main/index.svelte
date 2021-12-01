<script lang="ts">
	import { Jumper } from 'svelte-loading-spinners';
</script>

<main>
	<img src="/images/png/firo group.png" alt="Firo LOGO" class="h-[50px]" />
	<h1>Firo Company Website</h1>
	<Jumper size="60" color="#FF3E00" unit="px" duration="1s" />
</main>

<style lang="postcss">
	* {
		@apply text-center;
		font-family: 'Inter', sans-serif;
	}

	main {
		@apply flex h-screen w-screen justify-center items-center flex-col;
	}

	h1 {
		@apply text-para-color text-xl my-2;
	}
</style>
