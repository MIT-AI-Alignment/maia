<script lang="ts">
	import { PEOPLE, type Person } from '$lib/people';
	import IconChevronDown from '~icons/ph/caret-down-bold';
	import Link from '../../components/Link.svelte';
	import { slide } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import { onMount } from 'svelte';

	// Define interface for link objects
	interface LinkObject {
		platform: string;
		icon: string;
		url: string | undefined;
		title: string;
		category: string;
		priority: number;
		rawEmail?: string | undefined;
		originalUrl?: string;
		displayUrl?: string;
	}

	// Allow passing either a personId or individual properties
	export let personId: string | undefined = undefined;
	export let name: string | undefined = undefined;
	export let position: string | undefined = undefined;
	export let subtitle: string | undefined = undefined;
	export let imageUrl: string | undefined = undefined;

	// Contact info and profiles
	export let email: string | undefined = undefined;
	export let mitEmail: string | undefined = undefined;
	export let github: string | undefined = undefined;
	export let gitlab: string | undefined = undefined;
	export let linkedin: string | undefined = undefined;
	export let personalPage: string | undefined = undefined;
	export let twitter: string | undefined = undefined;
	export let instagram: string | undefined = undefined;
	export let medium: string | undefined = undefined;
	export let slack: string | undefined = undefined;
	export let signal: string | undefined = undefined; // Kept for backward compatibility but not used
	export let calendly: string | undefined = undefined;
	export let googleScholar: string | undefined = undefined;
	export let orcid: string | undefined = undefined;
	export let arxiv: string | undefined = undefined;
	export let openreview: string | undefined = undefined;

	// Contact preferences and display options
	export let contactPreferences: Record<string, string> | undefined = undefined;
	export let showSocials = true; // Default to showing social icons
	export let showAllContacts = false;
	export let showAllSocials = false; // New option to show all social links
	export let showExpandButton = false; // New option to show expand button

	// If personId is provided, use it to get the person data
	let person: Person | undefined = undefined;
	if (personId) {
		person = PEOPLE[personId];

		// Use person data if individual props aren't provided
		name = name || person?.name;
		position = position || person?.position;
		imageUrl = imageUrl || person?.imageUrl;
		email = email || person?.email;
		mitEmail = mitEmail || person?.mitEmail;
		github = github || person?.github;
		gitlab = gitlab || person?.gitlab;
		linkedin = linkedin || person?.linkedin;
		personalPage = personalPage || person?.personalPage;
		twitter = twitter || person?.twitter;
		instagram = instagram || person?.instagram;
		medium = medium || person?.medium;
		slack = slack || person?.slack;
		calendly = calendly || person?.calendly;
		googleScholar = googleScholar || person?.googleScholar;
		orcid = orcid || person?.orcid;
		arxiv = arxiv || person?.arxiv;
		openreview = openreview || person?.openreview;
		contactPreferences = contactPreferences || person?.contactPreferences;

		// Apply default visibility settings from person object if they exist
		if (person?.contactPreferences) {
			if (showAllSocials === false && person.contactPreferences.showAllSocials === 'true') {
				showAllSocials = true;
			}
			if (showAllContacts === false && person.contactPreferences.showAllContacts === 'true') {
				showAllContacts = true;
			}
		}
	}

	// Define all profile links with consistent structure
	const allLinks: LinkObject[] = [
		// Basic contact
		{
			platform: 'calendly',
			icon: 'fa-regular fa-calendar',
			url: calendly,
			title: 'Find a time to chat',
			category: 'basic',
			priority: 0
		},
		{
			platform: 'personalPage',
			icon: 'fa-solid fa-globe',
			url: personalPage,
			title: 'Personal Website',
			category: 'basic',
			priority: 1
		},
		{
			platform: 'email',
			icon: 'fa-solid fa-envelope',
			// Store the email but don't create a mailto link
			url: mitEmail || email,
			rawEmail: mitEmail || email, // Store the raw email for display
			title: mitEmail ? 'MIT Email' : 'Email',
			category: 'basic',
			priority: 2
		},
		{
			platform: 'linkedin',
			icon: 'fa-brands fa-linkedin',
			url: linkedin,
			title: 'LinkedIn',
			category: 'basic',
			priority: 3
		},

		// Social and code
		{
			platform: 'github',
			icon: 'fa-brands fa-github',
			url: github,
			title: 'GitHub',
			category: 'social',
			priority: 4
		},
		{
			platform: 'gitlab',
			icon: 'fa-brands fa-gitlab',
			url: gitlab,
			title: 'GitLab',
			category: 'social',
			priority: 5
		},
		{
			platform: 'twitter',
			icon: 'fa-brands fa-x-twitter',
			url: twitter,
			title: 'Twitter/X',
			category: 'social',
			priority: 6
		},
		{
			platform: 'instagram',
			icon: 'fa-brands fa-instagram',
			url: instagram,
			title: 'Instagram',
			category: 'social',
			priority: 7
		},
		{
			platform: 'medium',
			icon: 'fa-brands fa-medium',
			url: medium,
			title: 'Medium',
			category: 'social',
			priority: 8
		},

		// Academic
		{
			platform: 'googleScholar',
			icon: 'fa-solid fa-graduation-cap',
			url: googleScholar,
			title: 'Google Scholar',
			category: 'academic',
			priority: 9
		},
		{
			platform: 'orcid',
			icon: 'fa-solid fa-id-card',
			url: orcid,
			title: 'ORCID',
			category: 'academic',
			priority: 10
		},
		{
			platform: 'arxiv',
			icon: 'fa-solid fa-file-pdf',
			url: arxiv,
			title: 'arXiv',
			category: 'academic',
			priority: 11
		},
		{
			platform: 'openreview',
			icon: 'fa-solid fa-book-open',
			url: openreview,
			title: 'OpenReview',
			category: 'academic',
			priority: 12
		},

		// Messaging
		{
			platform: 'slack',
			icon: 'fa-brands fa-slack',
			url: slack,
			title: 'Slack',
			category: 'messaging',
			priority: 13
		}
	];

	// Filter links for display based on showAllSocials
	const socialLinks = showAllSocials
		? allLinks.filter(
				(link) => link.url && (link.category === 'basic' || link.category === 'social')
			)
		: allLinks.filter((link) => link.url && link.category === 'basic');

	// Group links by category for the expanded view
	const linksByCategory = {
		messaging: allLinks.filter((link) => link.url && link.category === 'messaging'),
		academic: allLinks.filter((link) => link.url && link.category === 'academic'),
		email: [
			{
				platform: 'email',
				icon: 'fa-solid fa-envelope',
				url: email,
				rawEmail: email,
				title: 'Personal Email',
				category: 'email'
			},
			{
				platform: 'mitEmail',
				icon: 'fa-solid fa-graduation-cap',
				url: mitEmail,
				rawEmail: mitEmail,
				title: 'MIT Email',
				category: 'email'
			}
		].filter((link) => link.url)
	};

	// Check if there's additional information to show
	const hasAdditionalInfo =
		linksByCategory.messaging.length > 0 ||
		linksByCategory.academic.length > 0 ||
		linksByCategory.email.length > 0 ||
		(showAllSocials === false &&
			allLinks.filter((link) => link.url && link.category === 'social').length > 0);

	// Generate a unique ID for this profile component instance
	const profileId = `profile-${Math.random().toString(36).substring(2, 9)}`;

	// Toggle function for expand button
	function toggleExpandInfo() {
		showAllContacts = !showAllContacts;
		if (!showAllSocials && showAllContacts) {
			showAllSocials = true;
		}
	}

	// Function to handle email icon click
	function handleEmailClick(event: MouseEvent) {
		// First open the dropdown
		showAllContacts = true;
		if (!showAllSocials) {
			showAllSocials = true;
		}

		// Use setTimeout to allow the dropdown to render before trying to highlight
		setTimeout(() => {
			// Find the email section using the unique profile ID
			const emailSection = document.getElementById(`${profileId}-email-section`);

			if (emailSection) {
				// Ensure the section is visible first
				emailSection.scrollIntoView({ behavior: 'smooth', block: 'center' });

				// Apply highlight with a stronger effect
				emailSection.classList.add('highlight-section');

				// Remove highlight after a few seconds
				setTimeout(() => {
					emailSection.classList.remove('highlight-section');
				}, 3000);
			} else {
				console.error('Email section element not found');
			}
		}, 700); // Increased timeout to ensure dropdown is fully rendered
	}

	// Helper function to format link display text
	function formatLinkText(platform: string, value: string): string {
		if (!value) return '';

		if (platform === 'arxiv') {
			return value.startsWith('http') ? value.split('/').pop() || value : value;
		}
		if (platform === 'openreview') {
			return value.includes('?id=')
				? value.split('?id=').pop() || value
				: value.split('/').pop() || value;
		}
		if (platform === 'googleScholar') {
			return value.includes('user=')
				? value.split('user=')[1]?.split('&')[0] || value
				: value.split('/').pop() || value;
		}
		if (value.startsWith('http')) {
			return value.split('/').pop() || value;
		}
		return value;
	}

	// Helper function to format link URL
	function formatLinkUrl(platform: string, value: string): string {
		if (!value) return '';

		if (platform === 'arxiv' && !value.startsWith('http')) {
			return `https://arxiv.org/abs/${value}`;
		}
		return value;
	}

	// Helper function to obfuscate email addresses to prevent scraping
	function obfuscateEmail(emailStr: string | undefined): string {
		if (!emailStr) return '';

		// Make a copy to avoid modifying the parameter directly
		let email = emailStr;

		// Handle mailto: prefix
		if (email.startsWith('mailto:')) {
			email = email.substring(7);
		}

		// Replace @ and . with [at] and [dot]
		return email.replace('@', ' [at] ').replace(/\./g, ' [dot] ');
	}

	// Function to detect if a string contains an email address
	function containsEmail(text: string | undefined): boolean {
		if (!text) return false;
		// Basic email regex pattern
		const emailPattern = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
		return emailPattern.test(text);
	}

	// Function to obfuscate any email addresses found in a string
	function obfuscateEmailsInText(text: string | undefined): string {
		if (!text) return '';

		// Basic email regex pattern with capture groups
		const emailPattern = /([a-zA-Z0-9._%+-]+)@([a-zA-Z0-9.-]+)\.([a-zA-Z]{2,})/g;

		// Replace all email occurrences with obfuscated version
		return text.replace(emailPattern, '$1 [at] $2 [dot] $3');
	}

	// Process all link URLs to check for and obfuscate emails
	const processedLinks = allLinks.map((link) => {
		// Create a copy of the link object
		const processedLink = { ...link };

		// If the URL contains an email but isn't already a mailto link
		if (link.url && containsEmail(link.url) && !link.url.startsWith('mailto:')) {
			// Store the original URL for actual navigation
			processedLink.originalUrl = link.url;
			// Create an obfuscated display version
			processedLink.displayUrl = obfuscateEmailsInText(link.url);
		}

		return processedLink;
	});
</script>

<div
	class="flex flex-col basis-full sm:basis-1/2 lg:basis-1/3 mb-8 profile-container"
	id={profileId}
>
	{#if name && imageUrl}
		<div class="flex items-center">
			<img src={imageUrl} alt={name} loading="lazy" decoding="async" class="rounded-lg h-24 w-24 object-cover shrink-0" />
			<div class="flex flex-col ml-4 mr-4 min-w-0">
				<p class="text-xl font-heading font-[550] leading-none m-0">{name}</p>
				<p class="text-sm text-maia-800 dark:text-maia-400 leading-none m-0 mt-0.5">{subtitle || position}</p>

				{#if showSocials}
					<div class="flex flex-wrap items-center gap-1 mt-0.5 text-sm leading-none">
						{#each socialLinks as link}
							{#if link.url}
								{#if link.platform === 'email'}
									<span
										class="text-maia-950/60 hover:text-maia-800 dark:text-maia-200 dark:hover:text-maia-400 cursor-pointer"
										title="Click to show email address"
										on:click={handleEmailClick}
									>
										<i class={link.icon}></i>
									</span>
								{:else if containsEmail(link.url)}
									<!-- For non-email links that contain email addresses -->
									<span
										class="text-maia-950/60 hover:text-maia-800 dark:text-maia-200 dark:hover:text-maia-400 cursor-pointer"
										title={`${link.title} (contains email address)`}
										on:click={handleEmailClick}
									>
										<i class={link.icon}></i>
									</span>
								{:else}
									<a
										href={link.url}
										target="_blank"
										rel="noopener noreferrer"
										class="text-maia-950/60 hover:text-maia-800 dark:text-maia-200 dark:hover:text-maia-400"
										title={link.title}
									>
										<i class={link.icon}></i>
									</a>
								{/if}
							{/if}
						{/each}

						{#if showExpandButton && hasAdditionalInfo}
							<button
								class="text-maia-800 hover:text-maia-700 dark:text-maia-400 dark:hover:text-maia-300 bg-maia-100 dark:bg-maia-900/30 rounded-full w-[1.25rem] h-[1.25rem] flex items-center justify-center transition-transform duration-200"
								title="Show more information"
								on:click={toggleExpandInfo}
								style="transform: {showAllContacts ? 'rotate(180deg)' : 'rotate(0deg)'}"
							>
								<i class="fa-solid fa-chevron-down text-xs"></i>
							</button>
						{/if}
					</div>
				{/if}
			</div>
		</div>

		{#if showAllContacts}
			<div
				transition:slide={{ duration: 300, easing: cubicOut }}
				class="mt-4 text-sm bg-surface-light-elevated dark:bg-surface-dark-elevated p-4 rounded-md border border-maia-800 dark:border-maia-400 shadow-xl z-10 relative overflow-hidden min-w-[280px] max-w-[400px] w-auto"
			>
				<!-- Display each category of links -->
				{#each Object.entries(linksByCategory) as [category, links]}
					{#if links.length > 0}
						<div
							id={category === 'email' ? `${profileId}-email-section` : undefined}
							class={`mb-4 ${category === 'email' ? 'email-section' : ''}`}
						>
							<p
								class="font-semibold mb-2 text-center text-maia-800 dark:text-maia-400 pb-1 border-b border-maia-800 dark:border-maia-400"
							>
								{category.charAt(0).toUpperCase() + category.slice(1)}
							</p>
							<ul class="text-xs space-y-2">
								{#each links as link}
									<li class="grid grid-cols-[2rem_1fr] items-center">
										<i class={`${link.icon} text-center text-maia-800 dark:text-maia-400`}></i>
										<div class="break-words">
											<span class="font-medium mr-2">{link.title}</span>
											{#if link.platform === 'email' || link.platform === 'mitEmail'}
												{#if link.url}
													<span class="break-all inline-block select-all">
														{obfuscateEmail(link.url)}
													</span>
												{/if}
											{:else if link.url && containsEmail(link.url)}
												<!-- For non-email links that contain email addresses -->
												<span class="break-all inline-block select-all">
													{obfuscateEmailsInText(link.url)}
												</span>
											{:else if link.url}
												<Link
													href={formatLinkUrl(link.platform, link.url)}
													className="break-all inline-block"
												>
													{formatLinkText(link.platform, link.url)}
												</Link>
											{/if}
										</div>
									</li>
								{/each}
							</ul>
						</div>
					{/if}
				{/each}
			</div>
		{/if}
	{:else}
		<div class="p-4 bg-surface-light-alt dark:bg-surface-dark-alt rounded-lg">
			<p class="text-status-error">Error: Missing required data (name and imageUrl)</p>
		</div>
	{/if}
</div>

<style>
	.highlight-section {
		animation: pulse 1.5s ease-in-out;
		position: relative;
		z-index: 20;
	}

	@keyframes pulse {
		0% {
			background-color: transparent;
		}
		50% {
			background-color: var(--maia-300, #d8b4fe);
			opacity: 0.3;
		}
		100% {
			background-color: transparent;
		}
	}
</style>
