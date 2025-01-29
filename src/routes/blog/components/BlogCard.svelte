<script lang="ts">
</script>

<h1 class="mb-3 text-4xl font-bold text-white">All Blogs</h1>

<article class="flex flex-col space-y-3 rounded-lg bg-white px-3 py-3 shadow-md">
	<div class="flex items-center gap-3">
		<h2 class="text-2xl font-bold">Title</h2>
		<span class="text-sm text-gray-400">Posted by: *user* on *date*</span>
		<!-- username will be displayed in the span element -->
	</div>
	<p class="text-sm">lorem ipsum dolor something something whatever man testing lang</p>
	<div class="flex justify-end">
		<button
			type="button"
			class="rounded-lg bg-orange-700 px-2 py-2 text-center text-sm font-medium text-white hover:bg-orange-800 focus:outline-none focus:ring-4 focus:ring-orange-300"
			>Read More</button
		>
	</div>
	<!-- button probably leads to modal where all contents are seen -->
</article>

<!-- floating action button for creating posts -->
<button
	type="button"
	class="fixed bottom-8 right-8 rounded-full bg-orange-700 p-3 font-bold text-white shadow-lg hover:bg-orange-800 focus:outline-none focus:ring-4 focus:ring-orange-300"
>
	<span class="flex items-center gap-2">
		<svg
			xmlns="http://www.w3.org/2000/svg"
			class="h-6 w-6"
			fill="none"
			viewBox="0 0 24 24"
			stroke="currentColor"
		>
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
		</svg>
		<span>Create Post</span>
	</span>
</button>