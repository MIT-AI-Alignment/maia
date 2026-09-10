<script lang="ts">
  import { slide } from 'svelte/transition';
  import { theme } from '$lib/stores/theme';
  import NavItem from './NavItem.svelte';
  import type { NavItem as NavItemType } from '$lib/stores/navigation';
  
  export let isOpen = false;
  export let activeDropdown: string | null = null;
  export let navItems: NavItemType[] = [];
  
  function setActiveDropdown(label: string | null) {
    activeDropdown = label;
  }
</script>

{#if isOpen}
  <div 
    transition:slide={{ duration: 200 }}
    class="fixed inset-x-0 top-[var(--header-height,var(--navbar-height))] h-[calc(100vh-var(--header-height,var(--navbar-height)))] supports-[height:100dvh]:h-[calc(100dvh-var(--header-height,var(--navbar-height)))] z-50 
           {$theme === 'dark' ? 'bg-surface-dark border-border-dark' : 'bg-surface-light-elevated border-border-light'}
           backdrop-blur-sm border-t overflow-y-auto pb-20"
  >
    <nav class="flex flex-col py-4">
      {#each navItems as item}
        <NavItem 
          {item} 
          isMobile={true} 
          {activeDropdown} 
          {setActiveDropdown} 
        />
      {/each}
      
    </nav>
  </div>
{/if}
