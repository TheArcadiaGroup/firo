<script>
	export let show;
	export let click;
</script>

<main>
	<div
		class="bg-gray-100 fixed bottom-0 flex flex-col items-center {show} overflow-hidden rounded-t-3xl  bg-white   w-screen"
	>
		<img class="w-16 md:w-8 md:my-6 md:mx-10 py-4" src="/images/png/firo group.png" alt="" />
		<a class="border-b my-1 md:px-4 lg:px=4  md:my-0 w-5/6 py-1 flex justify-center" href="#"
			>Get Firo</a
		>
		<a class="my-1 md:mx-1 md:my-0 w-5/6 py-2 flex justify-center border-b" href="#">About</a>
		<a class="my-1 md:mx-4 md:my-0 w-5/6 py-2 flex border-b justify-center" href="#">Community</a>
		<a class="my-1 md:mx-4 md:my-0 w-5/6 py-2 flex justify-center border-b" href="#">Swap</a>
		<a class="my-1 md:mx-4 md:my-0 w-5/6 py-2 flex justify-center border-b" href="#">Stacking</a>
		<a class="my-1 md:mx-4 md:my-0 w-5/6 py-2 flex justify-center border-b" href="#">My Stakes</a>
		<a class="my-1 md:mx-4 md:my-0 w-5/6 py-2 flex justify-center border-b" href="#">Guides</a>
		<a class="my-1 md:mx-4 md:my-0 w-5/6 py-2 flex justify-center border-b" href="#">Blog</a>
		<a class="my-1 md:mx-4 md:my-0 w-5/6 py-2 flex justify-center" href="#">Crowdfunding</a>
		<button class="rounded-full bg-black text-white w-8 h-8 mb-2 " on:click={click}>X</button>
	</div>
</main>

<style>
</style>
