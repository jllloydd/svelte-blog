<script lang="ts">
    import { onMount } from 'svelte';
    import { supabase } from '$lib/supabase';
    
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
    
    let username = $state<string>('');
    
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

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
</script>

<article class="flex flex-col space-y-3 rounded-lg bg-white px-3 py-3 shadow-md">
	<div class="flex items-center gap-3">
		<h2 class="text-2xl font-bold">{props.post.title}</h2>
		<span class="text-sm text-gray-400">Posted by: {username} on {formatDate(props.post.created_at)}</span>
		<!-- username will be displayed in the span element -->
	</div>
	<p class="text-sm">{props.post.content}</p>
	<div class="flex justify-end">
		<button
			type="button"
			class="rounded-lg bg-orange-700 px-2 py-2 text-center text-sm font-medium text-white hover:bg-orange-800 focus:outline-none focus:ring-4 focus:ring-orange-300"
			>Read More</button
		>
	</div>
	<!-- button probably leads to modal where all contents are seen -->
</article>

