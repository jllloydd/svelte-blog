<script lang="ts">
	import Navbar from './components/Navbar.svelte';
	import BlogCard from './components/BlogCard.svelte';
</script>

<Navbar />

<main class="h-screen flex justify-center pt-8">
    <div class="flex w-5/6 h-5/6 flex-col space-y-4 rounded-lg bg-slate-800 px-5 py-5 shadow-md">
        <BlogCard />
    </div>
</main>
