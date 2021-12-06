<script>
	import '$styles/tailwind.css';
	import Navbar from '$lib/Navbar/index.svelte';
</script>

<svelte:head>
	<title>IDS.Company</title>
</svelte:head>

<Navbar />
<slot />
