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
  recurring?: boolean;
  recurrenceLabel?: string;
};

type RecurringMinistry = Omit<ChurchEvent, "id" | "date" | "featured" | "recurring"> & {
  slug: string;
  weekOfMonth: number;
  weekday: number;
  skipMonths?: number[];
};

const CHURCH_TIME_ZONE = "America/New_York";
const isoDateFormatter = new Intl.DateTimeFormat("en-CA", {
  timeZone: CHURCH_TIME_ZONE,
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

/**
 * Today's date as YYYY-MM-DD in America/New_York (Hope, RI).
 * Use this instead of new Date().toISOString().slice(0, 10) so events do not
 * disappear early when UTC has already rolled to the next day.
 */
export function todayInChurchTime(): string {
  return isoDateFormatter.format(new Date());
}

const recurringMinistries: RecurringMinistry[] = [
  {
    slug: "mens-discipleship-breakfast",
    title: "Men's Discipleship Breakfast",
    category: "Men's Ministry",
    weekOfMonth: 3,
    weekday: 6,
    startTime: "8:30 AM",
    endTime: "10:00 AM",
    location: "Fellowship Hall",
    recurrenceLabel: "Meets every 3rd Saturday",
    description:
      "Breakfast, Bible study, and Christ-centered fellowship for the men of Still Water. This recurring ministry meets every 3rd Saturday of each month. All visitors welcome.",
  },
  {
    slug: "ladies-caring-sharing",
    title: "Ladies Caring & Sharing",
    category: "Ladies Ministry",
    weekOfMonth: 1,
    weekday: 6,
    skipMonths: [7],
    startTime: "12:00 PM",
    endTime: "2:00 PM",
    location: "Fellowship Hall",
    recurrenceLabel: "Meets every 1st Saturday",
    description:
      "A time of prayer, encouragement, and fellowship for the ladies of the church. This recurring ministry meets every 1st Saturday of each month, except July. Please bring a friend.",
  },
  {
    slug: "providence-rescue-mission",
    title: "Providence Rescue Mission",
    category: "Outreach",
    weekOfMonth: 4,
    weekday: 1,
    startTime: "5:30 PM",
    endTime: "8:00 PM",
    location: "Providence Rescue Mission, RI",
    recurrenceLabel: "Meets every 4th Monday",
    description:
      "Serving a home-cooked meal and sharing the life-changing Gospel with neighbors in Providence. This recurring ministry takes place every 4th Monday of each month.",
  },
];

function isoDate(year: number, month: number, day: number) {
  return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

function parts(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return { y, m, d, dt: new Date(Date.UTC(y, m - 1, d)) };
}

function nthWeekdayOfMonth(year: number, month: number, weekday: number, weekOfMonth: number) {
  const firstOfMonth = new Date(Date.UTC(year, month - 1, 1));
  const firstWeekday = firstOfMonth.getUTCDay();
  const offset = (weekday - firstWeekday + 7) % 7;
  return 1 + offset + (weekOfMonth - 1) * 7;
}

function nextRecurringOccurrence(ministry: RecurringMinistry, todayIso: string): ChurchEvent {
  const today = parts(todayIso);
  let year = today.y;
  let month = today.m;

  for (let i = 0; i < 24; i += 1) {
    const candidateMonth = ((month - 1 + i) % 12) + 1;
    const candidateYear = year + Math.floor((month - 1 + i) / 12);

    if (ministry.skipMonths?.includes(candidateMonth)) continue;

    const day = nthWeekdayOfMonth(
      candidateYear,
      candidateMonth,
      ministry.weekday,
      ministry.weekOfMonth
    );
    const date = isoDate(candidateYear, candidateMonth, day);

    if (date >= todayIso) {
      return {
        id: `${ministry.slug}-${date}`,
        title: ministry.title,
        category: ministry.category,
        date,
        startTime: ministry.startTime,
        endTime: ministry.endTime,
        location: ministry.location,
        description: ministry.description,
        recurring: true,
        recurrenceLabel: ministry.recurrenceLabel,
      };
    }
  }

  throw new Error(`Unable to generate recurring event for ${ministry.title}`);
}

function buildEvents() {
  const todayIso = todayInChurchTime();
  const specialEvents = rawEvents as ChurchEvent[];
  const generatedRecurringEvents = recurringMinistries.map((ministry) =>
    nextRecurringOccurrence(ministry, todayIso)
  );

  return [...specialEvents, ...generatedRecurringEvents].sort((a, b) =>
    a.date.localeCompare(b.date)
  );
}

const events: ChurchEvent[] = buildEvents();

export const allEvents: readonly ChurchEvent[] = events;

export function upcomingEvents(limit?: number): ChurchEvent[] {
  const todayIso = todayInChurchTime();
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
