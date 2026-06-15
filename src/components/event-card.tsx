import Link from "next/link";
import { CalendarRange, Clock, MapPin, Sparkles } from "lucide-react";
import {
  type ChurchEvent,
  formatEventBadge,
  formatEventDateLong,
  formatEventTimeRange,
} from "@/lib/events";

export function EventCard({ event }: { event: ChurchEvent }) {
  const badge = formatEventBadge(event);
  const time = formatEventTimeRange(event);

  return (
    <Link
      href="/events"
      className={`group flex h-full flex-col border bg-paper p-6 transition hover:shadow-lg ${
        event.featured ? "border-gold/70 bg-cream/70 shadow-sm" : "border-rule"
      }`}
    >
      <div className="flex items-baseline justify-between gap-4">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.22em] text-clay">
            {badge.month}
          </p>
          <p className="serif mt-1 text-5xl font-bold leading-none text-ink">
            {badge.day}
          </p>
        </div>
        {event.featured ? (
          <span className="inline-flex items-center gap-1 border border-sky/55 bg-white px-2 py-1 text-[0.65rem] font-black uppercase tracking-[0.16em] text-fern">
            <Sparkles aria-hidden="true" className="size-3" />
            Featured
          </span>
        ) : null}
      </div>

      <p className="mt-6 text-xs font-black uppercase tracking-[0.18em] text-fern">
        {event.category}
      </p>
      <h3 className="serif mt-2 text-2xl font-bold leading-tight text-ink">
        {event.title}
      </h3>

      <dl className="mt-5 space-y-1.5 text-sm text-ink-soft">
        {time ? (
          <div className="inline-flex items-center gap-2">
            <Clock aria-hidden="true" className="size-3.5 text-clay" />
            {time}
          </div>
        ) : null}
        <div className="inline-flex items-center gap-2">
          <MapPin aria-hidden="true" className="size-3.5 text-clay" />
          {event.location}
        </div>
      </dl>

      <p className="mt-auto pt-5 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.18em] text-clay transition group-hover:text-fern">
        Event details →
      </p>
    </Link>
  );
}

export function EventRow({ event }: { event: ChurchEvent }) {
  const badge = formatEventBadge(event);
  const time = formatEventTimeRange(event);

  return (
    <li
      className={`grid gap-6 border bg-cream p-6 sm:grid-cols-[auto_1fr] sm:gap-9 sm:p-8 ${
        event.featured ? "border-sky/55 bg-mist/55" : "border-rule"
      }`}
    >
      <div className="flex items-baseline gap-5 sm:flex-col sm:items-center sm:gap-2 sm:border-r sm:border-rule sm:pr-9">
        <div className="text-center">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-clay">
            {badge.month}
          </p>
          <p className="serif mt-1 text-5xl font-bold leading-none text-ink sm:text-6xl">
            {badge.day}
          </p>
          <p className="mt-2 text-[0.65rem] font-black uppercase tracking-[0.18em] text-ink-soft">
            {formatEventDateLong(event).split(",")[0]}
          </p>
        </div>
      </div>

      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-3">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-fern">
            {event.category}
          </p>
          {event.featured ? (
            <span className="inline-flex items-center gap-1 border border-sky/55 bg-white px-2 py-0.5 text-[0.65rem] font-black uppercase tracking-[0.16em] text-fern">
              <Sparkles aria-hidden="true" className="size-3" />
              Featured
            </span>
          ) : null}
        </div>
        <h3 className="serif mt-3 text-balance text-3xl font-bold leading-tight text-ink sm:text-4xl">
          {event.title}
        </h3>
        <div className="mt-4 space-y-2 text-base leading-7 text-ink-soft">
          {event.description.split("\n").map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
        <dl className="mt-5 grid gap-2 text-sm leading-6 text-ink-soft sm:grid-cols-[auto_1fr] sm:gap-x-4">
          <dt className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.18em] text-clay">
            <CalendarRange aria-hidden="true" className="size-3.5" />
            Date
          </dt>
          <dd>{formatEventDateLong(event)}</dd>
          {time ? (
            <>
              <dt className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.18em] text-clay">
                <Clock aria-hidden="true" className="size-3.5" />
                Time
              </dt>
              <dd>{time}</dd>
            </>
          ) : null}
          <dt className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.18em] text-clay">
            <MapPin aria-hidden="true" className="size-3.5" />
            Where
          </dt>
          <dd>{event.location}</dd>
        </dl>
      </div>
    </li>
  );
}
