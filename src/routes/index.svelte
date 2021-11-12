<script>
	import { Jumper } from 'svelte-loading-spinners';
</script>

<main>
	<img src="/images/png/logo.png" alt="JEM GITHUB LOGO" class="h-[50px]" />
	<h1>IDS.Company Base Project</h1>
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
		@apply text-red-300 text-xl my-2;
	}
</style>
