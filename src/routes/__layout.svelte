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
	import { calculateStakingApr, loadAllBalances } from '$utils/contractInteractions/tokenBalances';
	import {
		clickedTokenPopup,
		realizedFiroRewardsBalance,
		totalUnlockedLPTokenBalance,
		unstakeAllLPPopupActive,
		withdrawPopupActive
	} from '$stores/accountSummaryStore';
	import WithdrawPopup from '$lib/WithdrawPopup/index.svelte';
	import UnstakePopup from '$lib/UnstakePopup/index.svelte';
	import { unlockVestedFiroTokens } from '$utils/contractInteractions/masterChef';

	const closePopup = (e) => {
		if (!(e.target as any).closest('.withdraw-popup')) {
			unstakeAllLPPopupActive.set(false);
			withdrawPopupActive.set(false);
		}
	};

	onMount(async () => {
		await refreshWalletConnection();
		await calculateStakingApr();
		await getLockUpDuration();
		await getVestingDuration();
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

	$: withdrawPopup = $withdrawPopupActive;
	$: unstakePopup = $unstakeAllLPPopupActive;
</script>

<svelte:head>
	<title>{capitalizeFirstLetter($link)} | Firo - Financial Privacy Renewed</title>
</svelte:head>

<main>
	{#if withdrawPopup}
		<div class="popup-holder" on:click={closePopup}>
			<WithdrawPopup
				token={$clickedTokenPopup}
				balance={$clickedTokenPopup === 'FIRO'
					? $realizedFiroRewardsBalance
					: $totalUnlockedLPTokenBalance}
				on:confirmButtonClicked={async () => {
					if ($clickedTokenPopup === 'FIRO') {
						// Withdraw Firo
						await unlockVestedFiroTokens($userAddress);
					}
				}}
			/>
		</div>
	{/if}

	{#if unstakePopup}
		<div class="popup-holder" on:click={closePopup}>
			<UnstakePopup />
		</div>
	{/if}

	<Navbar />
	<slot />

	<!-- Toast Notifications -->
	<Toast />
</main>

<style lang="postcss">
	.popup-holder {
		@apply fixed top-0 left-0 right-0 bottom-0 h-screen w-screen z-50 px-4;
		@apply justify-center items-center flex;
	}

	.popup-holder::after {
		content: '';
		@apply fixed top-0 bottom-0 left-0 right-0 z-[-1] bg-black-light;
	}
</style>
