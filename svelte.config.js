import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		adapter: adapter({
			// default options are shown. On some platforms
			// these options are set automatically — see below
			pages: 'build',
			assets: 'build',
			fallback: undefined,
			precompress: false,
			strict: true
		}),
		prerender: {
			handleHttpError: ({ path, message }) => {
				// Never publish a build that silently dropped the calendar page.
				if (path.replace(/\/$/, '') === '/events') throw new Error(message);
			}
		}
	},

	// Add onwarn configuration to handle package warnings
	onwarn: (warning, handler) => {
		if (warning.code.startsWith('a11y-')) {
			return;
		}
		if (warning.message.includes('@splidejs/svelte-splide') || 
			warning.message.includes('@splidejs/splide')) {
			return;
		}
		handler(warning);
	}
};

export default config;
