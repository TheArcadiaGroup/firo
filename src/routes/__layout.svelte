<script lang="ts">
	import '$styles/tailwind.css';
	import Navbar from '$lib/Navbar/index.svelte';
	import { fade } from 'svelte/transition';
	import { link } from '$lib/Navbar/navStore';

	let darkOverlay = false;

	// TODO: For such a function that could potentially be used elsewhere, have it in the utils folder and import it like so
	// import {capitalizeFirstLetter} from '$utils' if you have an index.ts file in there.
	function capitalizeFirstLetter(text: string) {
		const arr = text.split(' ');

		for (var i = 0; i < arr.length; i++) {
			arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
		}

		const str2 = arr.join(' ');
		return str2;
	}
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
