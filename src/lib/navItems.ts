export const NAVIGATION_ITEMS = [
	{
		label: 'Home',
		href: '/',
		icon: 'fas fa-home'
	},
	{
		label: 'Orientation 2026',
		href: '/orientation-2026/',
		icon: 'fas fa-compass',
		dropdownItems: [
			{ href: '/orientation-2026#form', label: 'Interest Form' },
			{ href: '/orientation-2026#schedule', label: 'Schedule' },
			{ href: '/orientation-2026#calendar', label: 'Google Calendar' },
			{ href: '/orientation-2026#rsvp', label: 'RSVP Links' }
		]
	},
	{
		label: 'Events',
		href: '/events/',
		icon: 'fas fa-calendar',
		dropdownItems: [
			{ href: '/events/#upcoming', label: 'Upcoming events' },
			{ href: '/events/#past', label: 'Past events & initiatives' },
			{ href: '/orientation-2026/', label: 'Orientation 2026' }
		]
	},
	{
		label: 'Research',
		href: '/initiatives',
		icon: 'fas fa-flask',
		dropdownItems: [
			{ href: '/initiatives#research', label: 'Research by MAIA Members' },
			{ href: '/initiatives#orgs', label: 'Organizations MAIA Works With' }
		]
	},
	{
		label: 'Get Involved',
		href: '/getinvolved',
		icon: 'fas fa-hands-helping',
		dropdownItems: [
			{ href: '/getinvolved#aisf', label: 'AI Safety Fundamentals' },
			{ href: '/getinvolved#membership', label: 'Membership' },
			{ href: '/getinvolved#workshops', label: 'Workshops' },
			{ href: '/getinvolved#bootcamps', label: 'Bootcamps' }
			// { href: '/getinvolved#calendar', label: 'Calendar' }
		]
	},
	{
		label: 'Resources',
		href: '/resources',
		icon: 'fas fa-book',
		dropdownItems: [
			{ href: '/resources#why-ai-safety', label: 'Why AI Safety?' },
			{ href: '/aisf', label: 'AISF Curriculum' },
			{ href: '/resources/mit-classes', label: 'MIT & Harvard Classes' },
			{ href: '/resources/faculty-labs', label: 'MIT Faculty and Labs' },
			{ href: '/resources/fellowships', label: 'AI Safety Fellowships' }
		]
	},
	{
		label: 'About',
		href: '/about',
		icon: 'fas fa-info-circle',
		dropdownItems: [
			{ href: '/about#about', label: 'About MAIA' },
			{ href: '/about#what-is-maia', label: 'What is MAIA?' },
			{ href: '/about#executives', label: 'Executives' },
			{ href: '/about#organizers', label: 'Organizers' },
			{ href: '/about#advisors', label: 'Advisors' }
		]
	}
] as const;
