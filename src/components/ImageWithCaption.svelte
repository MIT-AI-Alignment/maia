<script lang="ts">
	export let src: string;
	export let alt: string;
	export let caption: string;
	export let width = "100%";
	export let height: string | undefined = undefined;
	export let showShadow = true;
</script>

<div class="image-with-caption {showShadow ? 'shadow-lg' : ''}">
	<div class="rounded-lg overflow-hidden" style="width: {width};">
		<img 
			{src} 
			{alt} 
			loading="lazy" decoding="async"
			class="w-full object-cover" 
			style="{height ? `height: ${height};` : ''}" 
		/>
		<div class="bg-surface-light-alt dark:bg-surface-dark-alt p-2 border-t border-border-light dark:border-border-dark">
			<p class="text-xs text-center text-maia-950/70 dark:text-maia-200">
				{caption}
			</p>
		</div>
	</div>
</div>
