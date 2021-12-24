<script lang="ts">
	import '$styles/tailwind.css';
	import Navbar from '$lib/Navbar/index.svelte';
	import { link } from '$stores/navStore';
	import { capitalizeFirstLetter } from '$utils/index';
	import Toast from '$lib/Toast/index.svelte';
	import { onMount } from 'svelte';
	import { refreshWalletConnection } from '$utils/walletConnection';
	import { appSigner, userAddress } from '$stores/wallet';
	import { isApproved, walletConnected } from '$stores/stakingStore';
	import contractEvents from '$utils/contractEvents';
	import {
		getLockUpDuration,
		getVestingDuration,
		initMasterChefContract
	} from '$utils/contractInteractions/masterChef';
	import { checkMasterchefAllowance } from '$utils/contractInteractions/lpToken';
	import { loadAllBalances } from '$utils/contractInteractions/tokenBalances';
	onMount(async () => {
		await refreshWalletConnection();
	});

	$: (async (connectStatus: boolean) => {
		walletConnected.set(connectStatus);

		if (connectStatus) {
			await initMasterChefContract();
			const allowance = await checkMasterchefAllowance($userAddress);
			isApproved.set(allowance > 0);
			await getLockUpDuration();
			await getVestingDuration();

			// Load all balances
			loadAllBalances($userAddress);

			contractEvents();
		}
	})(!!$appSigner);
</script>

<svelte:head>
	<title>{capitalizeFirstLetter($link)} | Firo - Financial Privacy Renewed</title>
</svelte:head>

<main>
	<Navbar />
	<slot />

	<!-- Toast Notifications -->
	<Toast />
</main>
