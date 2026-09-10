<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { theme } from '$lib/stores/theme';
	import Footer from '../routes/components/footer.svelte';
	import Navbar from '../routes/components/navbar.svelte';
	import { updatePageNavItems, clearPageNavItems, type DropdownItem } from '$lib/stores/navigation';
	
	export let title: string;
	export let description: string;
	export let heroIcon = '';
	export let heroTitle: string;
	export let centerTitle = false;
	export let pageNavItems: DropdownItem[] = [];
	
	let mounted = false;
	
	// Update the navigation store with page-specific items
	$: if (pageNavItems.length > 0) {
		updatePageNavItems(pageNavItems);
	}
	
	// Clear page navigation items when component is destroyed
	onMount(() => {
		mounted = true;
		return () => {
			clearPageNavItems();
		};
	});
</script>

<svelte:head>
	<title>MAIA - {title}</title>
	<meta name="description" content={description} />
</svelte:head>

<main class="min-h-screen bg-surface-light dark:bg-surface-dark dark:text-maia-50 relative overflow-hidden">
	<!-- No background grid needed anymore -->
	
	<Navbar />
	
	<!-- Hero Section -->
	<div class="bg-gradient-to-b {$theme === 'dark' 
		? 'from-maia-500/5 via-maia-500/3 to-transparent' 
		: 'from-maia-500/3 via-maia-500/2 to-transparent'} pt-10 md:pt-32 pb-8 md:pb-12 relative z-10">
		<div class="px-5 sm:px-8 md:px-24 mx-auto max-w-6xl">
			<h1 class="pt-6 md:pt-16 text-4xl md:text-5xl lg:text-6xl font-heading font-[550] mb-6 {centerTitle ? 'text-center' : ''}">
				{#if heroIcon}
					<i class="{heroIcon} mr-3 text-maia-800 dark:text-maia-500"></i>
				{/if}
				{@html heroTitle}
			</h1>
			<slot name="hero-content" />
		</div>
	</div>
	
	<!-- Main Content -->
	<div class="px-5 sm:px-8 md:px-24 mx-auto max-w-6xl pb-16 relative z-10">
		<slot />
	</div>
	
	<Footer />
</main>

<style lang="postcss">
	:global(.prose) {
		@apply text-maia-950 dark:text-maia-100;
	}
	
	:global(.prose a) {
		@apply text-maia-800 dark:text-maia-400 font-medium hover:text-maia-700 dark:hover:text-maia-300 transition-colors;
	}
	
	:global(.prose p) {
		@apply mb-4;
	}
	
	:global(.prose ul) {
		@apply mb-4 ml-6 list-disc;
	}
	
	:global(.prose li) {
		@apply mb-0;
	}
</style>
