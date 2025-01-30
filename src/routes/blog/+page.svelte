<script lang="ts">
	import { onMount } from 'svelte';
	import { requireAuth } from '$lib/auth';
	import { supabase } from '$lib/supabase';
	import type { User } from '@supabase/supabase-js';
	import Navbar from './components/Navbar.svelte';
	import BlogCard from './components/BlogCard.svelte';
	import type { Database } from '$lib/supabase';

	//state set up for post creation modal
	let showCreateModal = $state(false);

	//state set up for post creation
	let post_title = $state('');
	let post_content = $state('');

	//state set up for user authentication checking
	let user = $state<User | null>(null);
	let authError = $state<string | null>(null);
	let isLoading = $state(true);

	//state set up for pagination
	let currentPage = $state(1);
	let postsPerPage = 3; //setting the number of posts per page for pagination

	//user authentication checking onmount
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

	//function to handle post creation
	async function handleCreatePost(event: SubmitEvent) {
		event.preventDefault();

		if (!user) {
			return; //guard clause if user isn't authenticated
		}

		try {
			const { error } = await supabase
				.from('posts') //inserting the post into the posts table
				.insert({
					title: post_title,
					content: post_content,
					user_id: user.id
				});

			if (error) throw error;

			// reset the form and close modal after successful post creation
			post_title = '';
			post_content = '';
			showCreateModal = false;
		} catch (e) {
			console.error('Error creating post:', e);
			console.log(e);
		}
	}

	//function to fetch all posts
	type Post = Database['public']['Tables']['posts']['Row'] & {
		profiles: {
			username: string;
		};
	};
	let posts = $state<Post[]>([]);

	async function fetchPosts() {
		console.log('Fetching posts...');
		//fetching all posts from the database with profiles
		const { data, error } = await supabase
			.from('posts')
			.select(
				`
				*,
				profiles (
					username
				)
			`
			)
			.order('created_at', { ascending: false })
			.range((currentPage - 1) * postsPerPage, currentPage * postsPerPage - 1);

		if (error) {
			console.error('Error fetching posts:', error);
			return;
		}

		console.log('Posts fetched successfully:', data);
		posts = data;
	}

	//fetching all posts as DOM loads
	onMount(() => {
		console.log('Component mounted, setting up subscription...');
		fetchPosts();

		// real time subscription set up
		const subscription = supabase
			.channel('posts_channel')
			.on(
				'postgres_changes',
				{
					event: '*',
					schema: 'public',
					table: 'posts'
				},
				(payload) => {
					console.log('Received database change:', payload);
					// refetch posts when any change occurs
					fetchPosts();
				}
			)
			.subscribe((status) => {
				console.log('Subscription status:', status);
			});

		// reset subscription after site use
		return () => {
			console.log('Cleaning up subscription...');
			subscription.unsubscribe();
		};
	});
</script>

{#if isLoading}
	<div>Loading...</div>
{:else if user}
	<Navbar />

	<main class="flex justify-center px-4 pb-24 pt-8 md:px-0">
		<div
			class="flex w-full flex-col space-y-4 rounded-lg bg-slate-800 px-3 py-5 shadow-md md:w-5/6 md:px-5"
		>
			<h1 class="mb-3 text-2xl font-bold text-white md:text-4xl">All Blogs</h1>
			{#each posts as post}
				<BlogCard {post} />
			{/each}

			<!-- pagination setup-->
			<div class="mt-6 flex justify-center gap-2 md:gap-4">
				<button
					class="rounded-md bg-orange-700 px-2 py-2 text-sm text-white disabled:opacity-50 md:px-4 md:text-base"
					onclick={() => {
						currentPage--;
						fetchPosts();
					}}
					disabled={currentPage === 1}
				>
					Previous
				</button>
				<span class="flex items-center text-sm text-white md:text-base">Page {currentPage}</span>
				<button
					class="rounded-md bg-orange-700 px-2 py-2 text-sm text-white disabled:opacity-50 md:px-4 md:text-base"
					onclick={() => {
						currentPage++;
						fetchPosts();
					}}
					disabled={posts.length < postsPerPage}
				>
					Next
				</button>
			</div>
		</div>

		<button
			type="button"
			onclick={() => (showCreateModal = true)}
			class="fixed bottom-8 right-4 rounded-full bg-orange-700 p-2 font-bold text-white shadow-lg hover:bg-orange-800 focus:outline-none focus:ring-4 focus:ring-orange-300 md:right-8 md:p-3"
		>
			<span class="flex items-center gap-1 md:gap-2">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-5 w-5 md:h-6 md:w-6"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M12 4v16m8-8H4"
					/>
				</svg>
				<span class="text-sm md:text-base">Create Post</span>
			</span>
		</button>

		{#if showCreateModal}
			<div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
				<div class="w-full max-w-[600px] rounded-lg bg-white p-4 shadow-xl md:p-8">
					<div class="mb-6 flex justify-between">
						<h2 class="text-lg font-bold md:text-xl">Create New Post</h2>
						<button
							class="text-gray-500 hover:text-gray-700"
							onclick={() => (showCreateModal = false)}
						>
							✕
						</button>
					</div>

					<form class="space-y-4" onsubmit={handleCreatePost}>
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
