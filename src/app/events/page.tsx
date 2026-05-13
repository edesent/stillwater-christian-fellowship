import type { Metadata } from "next";
import Image from "next/image";
import { Sparkles } from "lucide-react";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { EventRow } from "@/components/event-card";
import {
  type ChurchEvent,
  allEvents,
  formatEventBadge,
  upcomingEvents,
} from "@/lib/events";
import { site, siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: `Events — ${site.name}`,
  description: `Upcoming events and gatherings at ${site.name} in Hope, Rhode Island.`,
  alternates: { canonical: `${siteUrl}/events` },
};

export default function EventsPage() {
  const upcoming = upcomingEvents();
  const past = allEvents.filter((e) => !upcoming.includes(e));

  return (
    <>
      <EventsJsonLd events={upcoming} />
      <main className="overflow-hidden bg-paper">
        <Header />
        <Hero count={upcoming.length} />
        <UpcomingList events={upcoming} />
        {past.length > 0 ? <PastList events={past} /> : null}
      </main>
      <Footer />
    </>
  );
}

function Hero({ count }: { count: number }) {
  return (
    <section className="relative bg-ink text-white">
      <Image
        src="/stillwater/community.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-center opacity-45"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,43,62,0.96),rgba(13,75,105,0.78)_50%,rgba(58,155,197,0.32))]" />

      <div className="section-shell relative pb-16 pt-32 sm:pb-20 sm:pt-40">
        <p className="mb-5 inline-flex items-center gap-2 border-l-4 border-sky pl-4 text-sm font-bold uppercase tracking-[0.2em] text-sky">
          <Sparkles aria-hidden="true" className="size-4" />
          What&rsquo;s Coming Up
        </p>
        <h1 className="serif max-w-4xl text-balance text-5xl font-bold leading-[1.04] sm:text-7xl">
          Events At Still Water
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-white/82 sm:text-xl">
          {count > 0
            ? `${count} gathering${count === 1 ? "" : "s"} on the calendar — special services, ministry meetings, and outreach. You are warmly invited.`
            : "We are between events at the moment — please check back soon, or join us for our weekly worship and Bible study."}
        </p>
      </div>
    </section>
  );
}

function UpcomingList({ events }: { events: ChurchEvent[] }) {
  if (events.length === 0) {
    return (
      <section className="bg-paper py-20 sm:py-24">
        <div className="section-shell">
          <p className="text-base text-ink-soft">
            No upcoming events at this time. See you on Sunday at 10:30 AM!
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-paper py-16 sm:py-20">
      <div className="section-shell">
        <ul className="grid gap-5">
          {events.map((event) => (
            <EventRow key={event.id} event={event} />
          ))}
        </ul>
      </div>
    </section>
  );
}

function PastList({ events }: { events: ChurchEvent[] }) {
  return (
    <section className="bg-cream py-16 sm:py-20">
      <div className="section-shell">
        <p className="text-sm font-black uppercase tracking-[0.22em] text-clay">
          Past Events
        </p>
        <h2 className="serif mt-4 text-balance text-4xl font-bold leading-tight text-ink sm:text-5xl">
          Looking back with thanksgiving.
        </h2>
        <ul className="mt-10 grid gap-4 md:grid-cols-2">
          {events
            .slice()
            .reverse()
            .map((event) => (
              <li
                key={event.id}
                className="flex items-baseline gap-5 border-l-4 border-rule bg-paper p-5"
              >
                <div className="shrink-0 text-right">
                  <p className="serif text-2xl font-bold leading-none text-ink">
                    {formatEventBadge(event).day}
                  </p>
                  <p className="mt-1 text-xs font-black uppercase tracking-[0.18em] text-clay">
                    {formatEventBadge(event).month}
                  </p>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-fern">
                    {event.category}
                  </p>
                  <h3 className="serif mt-1 text-xl font-bold leading-tight text-ink">
                    {event.title}
                  </h3>
                </div>
              </li>
            ))}
        </ul>
      </div>
    </section>
  );
}

function EventsJsonLd({ events }: { events: ChurchEvent[] }) {
  const churchId = `${siteUrl}/#church`;
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
          {
            "@type": "ListItem",
            position: 2,
            name: "Events",
            item: `${siteUrl}/events`,
          },
        ],
      },
      ...events.map((event) => ({
        "@type": "Event",
        name: event.title,
        startDate: event.date,
        endDate: event.endDate ?? event.date,
        eventStatus: "https://schema.org/EventScheduled",
        eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
        location: {
          "@type": "Place",
          name: event.location,
          address: site.address,
        },
        organizer: { "@id": churchId },
        description: event.description,
        isAccessibleForFree: true,
      })),
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
