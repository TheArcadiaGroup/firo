<script lang="ts">
	import '$styles/tailwind.css';
	import Navbar from '$lib/Navbar/index.svelte';
	import { fade } from 'svelte/transition';
	import { darkOverlay, link } from '$stores/navStore';
	import { capitalizeFirstLetter } from '$utils/index';
	import Toast from '$lib/Toast/index.svelte';
	import { onMount } from 'svelte';
	import { refreshWalletConnection } from '$utils/walletConnection';
	import { appSigner } from '$stores/wallet';
	import { walletConnected } from '$stores/stakingStore';
	onMount(async () => {
		await refreshWalletConnection();
	});

	$: (async (connectStatus: boolean) => {
		walletConnected.set(connectStatus);
	})(!!$appSigner);
</script>

<svelte:head>
	<title>{capitalizeFirstLetter($link)} | Firo - Financial Privacy Renewed</title>
</svelte:head>

<main>
	{#if $darkOverlay}
		<div transition:fade class="darker" />
	{/if}
	<Navbar
		on:navclicked={() => {
			darkOverlay.set(!$darkOverlay);
		}}
	/>
	<slot />

	<!-- Toast Notifications -->
	<Toast />
</main>

<style lang="postcss">
	.darker {
		@apply fixed top-0 bottom-0 left-0 right-0 z-30 bg-black-light;
	}
</style>
