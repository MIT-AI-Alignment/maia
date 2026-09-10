import { CONFIG } from '$lib/config';
import { readCalendarEvents } from '$lib/server/calendar';
import { PROGRAM_HISTORY } from '$lib/programHistory';

export async function load({ fetch }) {
 const response = await fetch(CONFIG.events.calendarIcalLink, { signal: AbortSignal.timeout(20000) });
 if (!response.ok) throw new Error('Public calendar unavailable; refusing to publish an empty event archive.');
 const events = readCalendarEvents(await response.text());
 return { events: [...events, ...PROGRAM_HISTORY], fetchedAt: new Date().toISOString() };
}
