<script lang="ts">
</script>

<div class="mb-3 flex flex-row items-center justify-between">
	<h1 class="text-4xl font-bold text-white">All Blogs</h1>
	<button
		type="button"
		class="text-dark rounded-lg bg-white px-2 py-2 text-center text-sm font-medium hover:bg-orange-300 focus:outline-none focus:ring-4 focus:ring-orange-300"
		>Create your own post</button
	>
</div>

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
