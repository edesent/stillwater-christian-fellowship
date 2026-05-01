import rawEvents from "@/data/events.json";

export type ChurchEvent = {
  id: string;
  title: string;
  category: string;
  date: string;
  endDate?: string;
  startTime?: string;
  endTime?: string;
  location: string;
  description: string;
  featured?: boolean;
};

const events: ChurchEvent[] = (rawEvents as ChurchEvent[])
  .slice()
  .sort((a, b) => a.date.localeCompare(b.date));

export const allEvents: readonly ChurchEvent[] = events;

export function upcomingEvents(limit?: number): ChurchEvent[] {
  const todayIso = new Date().toISOString().slice(0, 10);
  const upcoming = events.filter((e) => (e.endDate ?? e.date) >= todayIso);
  return typeof limit === "number" ? upcoming.slice(0, limit) : upcoming;
}

const MONTHS_SHORT = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];
const MONTHS_LONG = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
const WEEKDAYS_LONG = [
  "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday",
];

function parts(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return { y, m, d, dt: new Date(Date.UTC(y, m - 1, d)) };
}

export function formatEventBadge(event: ChurchEvent) {
  const { m, d } = parts(event.date);
  if (event.endDate) {
    const end = parts(event.endDate);
    if (end.m === m) {
      return { month: MONTHS_SHORT[m - 1], day: `${d}–${end.d}` };
    }
    return {
      month: `${MONTHS_SHORT[m - 1]}–${MONTHS_SHORT[end.m - 1]}`,
      day: `${d}–${end.d}`,
    };
  }
  return { month: MONTHS_SHORT[m - 1], day: String(d) };
}

export function formatEventDateLong(event: ChurchEvent) {
  const start = parts(event.date);
  const startStr = `${WEEKDAYS_LONG[start.dt.getUTCDay()]}, ${MONTHS_LONG[start.m - 1]} ${start.d}, ${start.y}`;
  if (!event.endDate) return startStr;
  const end = parts(event.endDate);
  const endStr = `${MONTHS_LONG[end.m - 1]} ${end.d}, ${end.y}`;
  return `${startStr} — ${endStr}`;
}

export function formatEventTimeRange(event: ChurchEvent) {
  if (!event.startTime) return null;
  if (!event.endTime) return event.startTime;
  return `${event.startTime} – ${event.endTime}`;
}
