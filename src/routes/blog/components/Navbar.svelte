<script lang="ts">
	import svelte from '../../../public/img/svelte.svg';
</script>

<nav class="border-gray-200 bg-white shadow-md">
	<div class="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4">
		<a href="" class="flex items-center space-x-3 rtl:space-x-reverse">
			<img src={svelte} class="h-8" alt="Svelte Logo" />
			<span class="self-center whitespace-nowrap text-2xl font-semibold">SvelteBlog</span>
		</a>
		<div class="flex space-x-3 md:order-2 md:space-x-0 rtl:space-x-reverse">
			<button
				type="button"
				class="rounded-lg bg-orange-700 px-4 py-2 text-center text-sm font-medium text-white hover:bg-orange-800 focus:outline-none focus:ring-4 focus:ring-orange-300"
				>Logout</button
			>
		</div>
	</div>
</nav>
