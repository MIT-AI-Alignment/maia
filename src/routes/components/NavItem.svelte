<script lang="ts">
  import { slide } from 'svelte/transition';
  import { page } from '$app/stores';
  import { theme } from '$lib/stores/theme';

  export let item: {
    label: string;
    href: string;
    icon: string;
    dropdownItems?: Array<{ href: string; label: string }>;
  };

  export let isMobile = false;
  export let activeDropdown: string | null = null;
  export let setActiveDropdown: (label: string | null) => void;

  // Check if current page matches this nav item or any of its dropdown items
  $: isActive = $page.url.pathname === item.href ||
                (item.dropdownItems?.some(subItem =>
                  $page.url.pathname + $page.url.hash === subItem.href ||
                  $page.url.pathname === subItem.href.split('#')[0]
                ) ?? false);

  function handleMouseEnter() {
    if (!isMobile && item.dropdownItems) {
      setActiveDropdown(item.label);
    }
  }

  function handleMouseLeave(e: MouseEvent) {
    if (!isMobile && item.dropdownItems) {
      const relatedTarget = e.relatedTarget instanceof HTMLElement ? e.relatedTarget : null;
      const currentTarget = e.currentTarget as HTMLElement;
      if (relatedTarget && currentTarget && !currentTarget.contains(relatedTarget)) {
        setActiveDropdown(null);
      }
    }
  }

  function handleClick() {
    if (isMobile && item.dropdownItems) {
      if (activeDropdown === item.label) {
        setActiveDropdown(null);
      } else {
        setActiveDropdown(item.label);
      }
    }
  }
</script>

{#if isMobile}
  <div class="w-full">
    {#if !item.dropdownItems}
      <a class="flex min-h-11 items-center gap-2 px-6 py-3" href={item.href}>
        <i class="{item.icon} w-5 text-center"></i><span>{item.label}</span>
      </a>
    {:else}
    <button
      class="px-6 py-2 w-full text-left flex items-center justify-between transition-colors duration-200
             {isActive
               ? 'text-maia-800 dark:text-maia-400 bg-maia-50 dark:bg-maia-950/30'
               : 'hover:bg-maia-50 dark:hover:bg-maia-950/30'}"
      on:click={handleClick}
      aria-expanded={activeDropdown === item.label}
      style="min-height:44px"
    >
      <div class="flex items-center gap-2">
        <i class="{item.icon} w-5 text-center"></i>
        <span>{item.label}</span>
      </div>
      {#if item.dropdownItems}
        <i class="fas fa-chevron-{activeDropdown === item.label ? 'up' : 'down'} text-xs opacity-70"></i>
      {/if}
    </button>
    {/if}

    {#if item.dropdownItems && activeDropdown === item.label}
      <div transition:slide={{ duration: 200 }}
           class="{$theme === 'dark' ? 'bg-maia-950/20' : 'bg-maia-50/50'}">
        {#each item.dropdownItems as subItem}
          <a
            href={subItem.href}
            class="px-12 py-3 min-h-11 block w-full text-left transition-colors duration-200
                   {$page.url.pathname + $page.url.hash === subItem.href || $page.url.pathname === subItem.href.split('#')[0]
                    ? 'text-maia-800 dark:text-maia-400 bg-maia-100/50 dark:bg-maia-950/40'
                    : 'hover:bg-maia-100/50 dark:hover:bg-maia-950/40'}"
          >
            {subItem.label}
          </a>
        {/each}
      </div>
    {/if}
  </div>
{:else}
  <div
    class="relative group"
    role="button"
    tabindex="0"
    on:mouseenter={handleMouseEnter}
    on:mouseleave={handleMouseLeave}
  >
    <a
      class="px-3 py-2 rounded-md transition-colors duration-200 flex items-center gap-2
             {isActive ? 'text-maia-800 dark:text-maia-400' :
                        'hover:text-maia-800 dark:hover:text-maia-400'}"
      href={item.href}
    >
      <i class="{item.icon} text-sm"></i>
      <span>{item.label}</span>
      {#if item.dropdownItems}
        <i class="fas fa-chevron-down text-xs opacity-70 group-hover:rotate-180 transition-transform duration-200"></i>
      {/if}
    </a>

    {#if item.dropdownItems && activeDropdown === item.label}
      <div
        transition:slide={{ duration: 150 }}
		class="maia-nav-dropdown absolute top-full left-0 rounded-md py-1 min-w-[200px] border backdrop-blur-sm"
        role="menu"
        tabindex="0"
        on:mouseleave={() => setActiveDropdown(null)}
      >
        {#each item.dropdownItems as subItem}
          <a
            href={subItem.href}
			class="block px-4 py-2 transition-colors duration-200
			       {$page.url.pathname + $page.url.hash === subItem.href || $page.url.pathname === subItem.href.split('#')[0] ?
					'maia-nav-dropdown-active' :
					'maia-nav-dropdown-link'}"
          >
            {subItem.label}
          </a>
        {/each}
      </div>
    {/if}
  </div>
{/if}
