<script lang="ts">
	export let id: string | undefined = undefined;
	export let title = '';
	export let icon = '';
</script>

<section 
	id={id} 
	class="maia-section mb-6 sm:mb-8 scroll-mt-24 p-4 sm:p-6"
>
	{#if title}
		<div class="flex items-center mb-6">
			<div class="w-12 h-12 flex items-center justify-center mr-4">
				<i class="{icon} maia-section-icon text-2xl"></i>
			</div>
			<h2 class="text-2xl md:text-3xl font-heading font-[550]">
				{title}
			</h2>
		</div>
	{/if}
	
	<div class="mt-4 prose dark:prose-invert max-w-none">
		<slot />
	</div>
</section>
