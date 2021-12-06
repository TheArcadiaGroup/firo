<script>
	import '$styles/tailwind.css';
	import Navbar from '$lib/Navbar/index.svelte';
	import { fade } from 'svelte/transition';

	let darkOverlay = false;
</script>

<svelte:head>
	<title>IDS.Company</title>
</svelte:head>

{#if darkOverlay}
	<div transition:fade class="darker" />
{/if}
<Navbar
	on:navclicked={() => {
		darkOverlay = !darkOverlay;
	}}
/>
<slot />

<style lang="postcss">
	.darker {
		@apply fixed top-0 bottom-0 left-0 right-0 z-30 bg-black-light;
	}
</style>
