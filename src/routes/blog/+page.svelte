<script lang="ts">
	import { onMount } from 'svelte';
	import { requireAuth } from '$lib/auth';
	import type { User } from '@supabase/supabase-js';
	import Navbar from './components/Navbar.svelte';
	import BlogCard from './components/BlogCard.svelte';

	let showCreateModal = $state(false);
	let post_title = $state('');
	let post_content = $state('');
	let user = $state<User | null>(null);
	let authError = $state<string | null>(null);
	let isLoading = $state(true);

	onMount(async () => {
		try {
			const authUser = await requireAuth();
			user = authUser;
		} catch (e: any) {
			authError = e.message;
		} finally {
			isLoading = false;
		}
	});
</script>

{#if isLoading}
	<div>Loading...</div>
{:else if user}
	<Navbar />
	<main class="flex h-screen justify-center pt-8">
		<div class="flex h-5/6 w-5/6 flex-col space-y-4 rounded-lg bg-slate-800 px-5 py-5 shadow-md">
			<BlogCard />
		</div>

		<button
			type="button"
			onclick={() => (showCreateModal = true)}
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

		{#if showCreateModal}
			<div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
				<div class="w-[600px] rounded-lg bg-white p-8 shadow-xl">
					<div class="mb-6 flex justify-between">
						<h2 class="text-xl font-bold">Create New Post</h2>
						<button
							class="text-gray-500 hover:text-gray-700"
							onclick={() => (showCreateModal = false)}
						>
							✕
						</button>
					</div>

					<form class="space-y-4">
						<fieldset>
							<label for="post-title" class="mb-2 block text-sm font-medium text-gray-900">
								Title
								<input
									type="text"
									id="post-title"
									name="post-title"
									bind:value={post_title}
									placeholder="Enter post title"
									class="w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
									required
								/>
							</label>
						</fieldset>

						<fieldset>
							<label for="post-content" class="mb-2 block text-sm font-medium text-gray-900">
								Content
								<textarea
									id="post-content"
									name="post-content"
									bind:value={post_content}
									rows="6"
									placeholder="Write your post content here..."
									class="w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
									required
								></textarea>
							</label>
						</fieldset>

						<button
							type="submit"
							class="w-full rounded-lg bg-orange-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-orange-800 focus:outline-none focus:ring-4 focus:ring-orange-300"
						>
							Create Post
						</button>
					</form>
				</div>
			</div>
		{/if}
	</main>
{:else if authError}
	<div class="text-red-500">{authError}</div>
{/if}
