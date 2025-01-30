<script lang="ts">
    import { onMount } from 'svelte';
    import { supabase } from '$lib/supabase';
    
    //initializing blog data as props
    const props = $props<{
        post: {
            id: string;
            created_at: string;
            updated_at: string;
            user_id: string;
            title: string;
            content: string;
        }
    }>();
    
    //initializing the username state
    let username = $state<string>('');
    
    //date formatting for the date of the blog post
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    //getting the username of the user who posted the blog
    onMount(async () => {
        const { data, error } = await supabase
            .from('profiles')
            .select('username')
            .eq('id', props.post.user_id)
            .single();
            
        if (error) {
            console.error('Error fetching username:', error);
            username = 'Unknown User';
        } else {
            username = data.username || 'Anonymous';
        }
    });

    //function to shorten the text if the blog post is too long
    const shortenText = (text: string, maxLength: number = 350) => {
        if (text.length <= maxLength) return text;
        return text.slice(0, maxLength).trim() + '...';
    };

    //modal state intialization
    let showPostModal = $state(false);
</script>

<article class="flex flex-col space-y-3 rounded-lg bg-white px-3 py-3 shadow-md">
	<div class="flex items-center gap-3">
		<h2 class="text-2xl font-bold">{props.post.title}</h2>
		<span class="text-sm text-gray-400">Posted by: {username} on {formatDate(props.post.created_at)}</span>
		<!-- username will be displayed in the span element -->
	</div>
	<p class="text-sm">{shortenText(props.post.content)}</p>
	<div class="flex justify-end">
		<button
			type="button"
            onclick={() => (showPostModal = true)}
			class="rounded-lg bg-orange-700 px-2 py-2 text-center text-sm font-medium text-white hover:bg-orange-800 focus:outline-none focus:ring-4 focus:ring-orange-300"
			>Read More</button
		>
	</div>
</article>

{#if showPostModal}
<div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div class="relative max-h-[90vh] w-[90vw] max-w-2xl overflow-y-auto rounded-lg bg-white p-6 shadow-xl">
        <button
            onclick={() => (showPostModal = false)}
            class="absolute right-4 top-4 text-gray-600 hover:text-gray-900"
        >
            <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
        </button>
        
        <div class="mt-2">
            <h2 class="mb-4 text-2xl font-bold">{props.post.title}</h2>
            <div class="mb-4 text-sm text-gray-600">
                Posted by: {username} on {formatDate(props.post.created_at)}
            </div>
            <div class="prose max-w-none">
                <p class="whitespace-pre-wrap">{props.post.content}</p>
            </div>
        </div>
    </div>
</div>
{/if}

