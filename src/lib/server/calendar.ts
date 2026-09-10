import ICAL from 'ical.js';
import type { CalendarEvent } from '../events';

function clean(value: unknown): string {
 return String(value ?? '').replace(/<br\s*\/?>|<\/(?:p|div|li)>/gi, ' ')
  .replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/\s+/g, ' ').trim();
}

function iso(time: ICAL.Time): string {
 if (time.isDate) return time.toString();
 // Floating times in this public MIT calendar are local Cambridge times.
 if (time.zone === ICAL.Timezone.localTimezone) {
  const zone = ICAL.TimezoneService.get('America/New_York');
  if (!zone) throw new Error('Calendar is missing its local timezone');
  time = time.clone();
  time.zone = zone;
 }
 return time.toJSDate().toISOString();
}

// Expand genuine RFC 5545 occurrences, including exceptions and EXDATEs.
// Infinite series are bounded to two years ahead; historical events have no display cap.
export function readCalendarEvents(calendar: string, now = new Date()): CalendarEvent[] {
 const root = new ICAL.Component(ICAL.parse(calendar));
 if (root.name !== 'vcalendar') throw new Error('Invalid calendar response');
 for (const component of root.getAllSubcomponents('vtimezone')) {
  ICAL.TimezoneService.register(new ICAL.Timezone(component));
 }
 const limit = new Date(now);
 limit.setUTCFullYear(limit.getUTCFullYear() + 2);
 const result = new Map<string, CalendarEvent>();
 const components = root.getAllSubcomponents('vevent');
 for (const component of components) {
  const event = new ICAL.Event(component);
  if (event.isRecurrenceException()) continue;
  const iterator = event.iterator();
  let occurrence;
  let steps = 0;
  while ((occurrence = iterator.next())) {
   if (++steps > 10000) throw new Error('Calendar recurrence exceeded safety limit');
   if (occurrence.toJSDate() > limit) break;
   const detail = event.getOccurrenceDetails(occurrence);
   const item = detail.item;
   if (item.component.getFirstPropertyValue('status') === 'CANCELLED' ||
       /\bcancell?(?:ed|ation)\b/i.test(item.summary ?? '')) continue;
   const start = iso(detail.startDate);
   const end = iso(detail.endDate);
   const title = clean(item.summary);
   if (!title || !start) continue;
   const id = event.uid + '/' + occurrence.toString();
   result.set(id, { id, title, start, end, description: clean(item.description),
    location: clean(item.location), kind: 'event' });
  }
 }
 return [...result.values()].sort((a, b) => a.start.localeCompare(b.start));
}
