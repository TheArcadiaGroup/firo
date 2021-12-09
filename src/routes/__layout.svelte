<script lang="ts">
	import '$styles/tailwind.css';
	import Navbar from '$lib/Navbar/index.svelte';
	import { fade } from 'svelte/transition';
	import { link } from '$lib/Navbar/navStore';
	import { capitalizeFirstLetter } from '$utils/index';

	let darkOverlay = false;
</script>

<svelte:head>
	<title>{capitalizeFirstLetter($link)} | Firo - Financial Privacy Renewed</title>
</svelte:head>

<main>
	{#if darkOverlay}
		<div transition:fade class="darker" />
	{/if}
	<Navbar
		on:navclicked={() => {
			darkOverlay = !darkOverlay;
		}}
	/>
	<slot />
</main>

<style lang="postcss">
	.darker {
		@apply fixed top-0 bottom-0 left-0 right-0 z-30 bg-black-light;
	}
</style>
