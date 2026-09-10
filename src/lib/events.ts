export type CalendarEvent = {
 id: string;
 title: string;
 start: string;
 end?: string;
 description?: string;
 location?: string;
 url?: string;
 kind?: 'event' | 'initiative';
 dateLabel?: string;
};

const zone = 'America/New_York';
const isDay = (value: string) => value.length === 10;
export const localDate = (date: Date) => new Intl.DateTimeFormat('en-CA', {
 timeZone: zone, year: 'numeric', month: '2-digit', day: '2-digit'
}).format(date);

export function displayDate(value: string) {
 return new Intl.DateTimeFormat('en-US', {
  month: 'short', day: 'numeric', year: 'numeric', timeZone: isDay(value) ? 'UTC' : zone
 }).format(new Date(isDay(value) ? value + 'T12:00:00Z' : value));
}

export function displayTime(value: string) {
 if (isDay(value)) return;
 return new Intl.DateTimeFormat('en-US', {
  hour: 'numeric', minute: '2-digit', timeZone: zone
 }).format(new Date(value));
}

export function displayTimeRange(start: string, end?: string) {
 const startTime = displayTime(start);
 if (!startTime) return;
 if (!end || end === start) return startTime;
 const endTime = displayTime(end);
 if (!endTime) return startTime;
 return startTime + '–' + (displayDate(start) === displayDate(end) ? '' : displayDate(end) + ', ') + endTime;
}

export function displayDateRange(event: CalendarEvent) {
 if (event.dateLabel) return event.dateLabel;
 if (!event.end || !isDay(event.start) || !isDay(event.end)) return displayDate(event.start);
 // iCalendar all-day DTEND is exclusive.
 const lastDay = new Date(event.end + 'T12:00:00Z');
 lastDay.setUTCDate(lastDay.getUTCDate() - 1);
 const end = lastDay.toISOString().slice(0, 10);
 return end > event.start ? displayDate(event.start) + ' – ' + displayDate(end) : displayDate(event.start);
}

export function splitEvents(events: CalendarEvent[], now = new Date()) {
 const upcoming: CalendarEvent[] = [], past: CalendarEvent[] = [];
 for (const event of events) {
  const end = event.end || event.start;
  const active = isDay(end)
   ? (event.end && event.end !== event.start ? end > localDate(now) : end >= localDate(now))
   : new Date(end).getTime() >= now.getTime();
  (active ? upcoming : past).push(event);
 }
 upcoming.sort((a, b) => a.start.localeCompare(b.start));
 past.sort((a, b) => b.start.localeCompare(a.start));
 return { upcoming, past };
}
