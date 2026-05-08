import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  CalendarRange,
  Radio,
  Mail,
  MapPin,
  MessageCircleHeart,
  Phone,
  PlayCircle,
  Sparkles,
} from "lucide-react";
import { ChatButton } from "@/components/chat-button";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { EventCard } from "@/components/event-card";
import { upcomingEvents } from "@/lib/events";
import {
  elders,
  leadershipPortraits,
  ministries,
  pastors,
  services,
  site,
  siteUrl,
  churchVerses,
  visitorNotes,
} from "@/lib/site";

export default function Home() {
  return (
    <>
      <JsonLd />
      <main id="home" className="overflow-hidden bg-paper">
        <Header />
        <Hero />
        <Visit />
        <Events />
        <Verse />
        <Welcome />
        <Ministries />
        <Leadership />
        <Worship />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

function Hero() {
  return (
    <section className="relative min-h-[84svh] bg-ink text-white">
      <Image
        src="/stillwater/hero-water.jpg"
        alt="Still Water Christian Fellowship church building in Hope, Rhode Island"
        fill
        priority
        sizes="100vw"
        className="object-cover object-[58%_48%]"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,43,62,0.95),rgba(13,75,105,0.72)_46%,rgba(94,183,222,0.2))]" />
      <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(8,43,62,0.84),rgba(58,155,197,0.1)_50%,rgba(8,43,62,0.34))]" />

      <div className="section-shell relative flex min-h-[84svh] flex-col justify-end pb-8 pt-32 sm:pb-10">
        <div className="max-w-4xl pb-10">
          <p className="mb-5 inline-flex items-center gap-2 border-l-4 border-sky pl-4 text-sm font-bold uppercase tracking-[0.2em] text-sky">
            <Sparkles aria-hidden="true" className="size-4" />
            Hope, Rhode Island
          </p>
          <h1 className="serif max-w-4xl text-balance text-5xl font-bold leading-[1.02] sm:text-7xl lg:text-8xl">
            Still Water Christian Fellowship
          </h1>
          <p className="serif mt-6 max-w-3xl text-balance text-2xl font-semibold italic leading-tight text-sky sm:text-3xl">
            Proclaiming the Gospel truth of Jesus Christ to a lost world.
          </p>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-white/82 sm:text-xl">
            A Bible-believing, Christ-honoring, Independent Baptist Church
            shining the light of the Gospel in the Village of Hope, Rhode Island.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <a
              href="#visit"
              className="inline-flex items-center gap-2 bg-sky px-5 py-3 text-sm font-black uppercase tracking-[0.12em] text-ink transition hover:bg-white"
            >
              Plan Your Visit
              <ArrowRight aria-hidden="true" className="size-4" />
            </a>
            <a
              href="/sermons"
              className="inline-flex items-center gap-2 border border-white/42 px-5 py-3 text-sm font-black uppercase tracking-[0.12em] text-white transition hover:border-white hover:bg-white hover:text-ink"
            >
              <PlayCircle aria-hidden="true" className="size-4" />
              Listen to Sermons
            </a>
          </div>
        </div>

        <div className="grid border border-white/16 bg-white/10 backdrop-blur-md md:grid-cols-3">
          <HeroDayStat
            label="Sunday"
            primary="10:30 AM"
            primaryLabel="Worship"
            secondary="5:30 PM"
            secondaryLabel="Discipleship"
          />
          <HeroDayStat
            label="Wednesday"
            primary="10:00 AM"
            primaryLabel="Bible Study"
            secondary="6:00 PM"
            secondaryLabel="Prayer Meeting"
          />
          <div className="border-white/14 px-5 py-4 md:border-r md:last:border-r-0">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/55">
              Location
            </p>
            <p className="serif mt-1 text-3xl font-bold leading-tight text-white">
              51 Main St
            </p>
            <p className="mt-1 text-sm font-semibold text-white/72">
              Hope, RI 02831
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroDayStat({
  label,
  primary,
  primaryLabel,
  secondary,
  secondaryLabel,
}: {
  label: string;
  primary: string;
  primaryLabel: string;
  secondary: string;
  secondaryLabel: string;
}) {
  return (
    <div className="border-white/14 px-5 py-4 md:border-r md:last:border-r-0">
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/55">
        {label}
      </p>
      <p className="serif mt-1 text-3xl font-bold leading-tight text-white">
        {primary}
        <span className="ml-2 align-middle text-xs font-bold uppercase tracking-[0.16em] text-sky">
          {primaryLabel}
        </span>
      </p>
      <p className="serif mt-1 text-sm font-semibold text-white/72">
        {secondary}
        <span className="ml-2 align-middle text-[0.65rem] font-bold uppercase tracking-[0.16em] text-white/55">
          {secondaryLabel}
        </span>
      </p>
    </div>
  );
}

function Visit() {
  return (
    <section id="visit" className="bg-cream py-16 sm:py-20">
      <div className="section-shell">
        <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.22em] text-clay">
              Visit This Week
            </p>
            <h2 className="serif mt-4 text-balance text-5xl font-bold leading-tight text-ink sm:text-6xl">
              We Would Love To Meet You!
            </h2>
            <p className="mt-6 text-lg leading-8 text-ink-soft">
              When you come, you will find a church family and pastor who love the
              Bible. The preaching of the Word of God is filled with passion, zeal,
              and the fullness of the Holy Ghost.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <DayCard day="Sunday" services={services.filter((s) => s.day === "Sunday")} />
            <DayCard day="Wednesday" services={services.filter((s) => s.day === "Wednesday")} />
          </div>
        </div>
      </div>
    </section>
  );
}

type ServiceItem = (typeof services)[number];

function DayCard({ day, services }: { day: string; services: readonly ServiceItem[] }) {
  return (
    <article className="flex flex-col border border-rule bg-paper">
      <div className="flex items-center justify-between gap-4 border-b border-rule bg-mist/50 px-6 py-4">
        <p className="serif text-3xl font-bold leading-none text-ink">{day}</p>
        <CalendarRange aria-hidden="true" className="size-5 text-clay" />
      </div>
      <ul className="divide-y divide-rule">
        {services.map((service) => {
          const tagline =
            "tagline" in service ? service.tagline : undefined;
          const livestream =
            "livestream" in service ? service.livestream : false;
          return (
            <li key={service.time} className="flex gap-5 p-6">
              <div className="shrink-0 text-right">
                <p className="serif text-2xl font-bold leading-tight text-ink">
                  {service.time.split(" ")[0]}
                </p>
                <p className="text-xs font-black uppercase tracking-[0.18em] text-clay">
                  {service.time.split(" ")[1]}
                </p>
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="text-base font-bold uppercase tracking-[0.12em] text-ink">
                  {service.title}
                </h3>
                {tagline ? (
                  <p className="mt-2 text-sm leading-6 text-ink-soft">
                    {tagline}
                  </p>
                ) : null}
                {livestream ? (
                  <p
                    className="mt-3 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-clay"
                    title="Livestreamed on SermonAudio, Facebook & YouTube"
                  >
                    <Radio aria-hidden="true" className="size-3.5" />
                    Livestream
                  </p>
                ) : null}
              </div>
            </li>
          );
        })}
      </ul>
    </article>
  );
}

function Events() {
  const events = upcomingEvents(3);
  if (events.length === 0) return null;

  return (
    <section id="events" className="bg-paper py-20 sm:py-24">
      <div className="section-shell">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.22em] text-clay">
              Upcoming Events
            </p>
            <h2 className="serif mt-4 max-w-3xl text-balance text-5xl font-bold leading-tight text-ink sm:text-6xl">
              What&rsquo;s coming up at Still Water.
            </h2>
          </div>
          <p className="max-w-xl text-lg leading-8 text-ink-soft">
            Beyond our weekly services, the Lord brings us together for special
            gatherings, ministry meetings, and outreach. You are warmly invited
            to every one.
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <a
            href="/events"
            className="inline-flex items-center gap-2 border border-rule bg-cream px-5 py-3 text-sm font-black uppercase tracking-[0.12em] text-ink transition hover:bg-mist"
          >
            See All Events
            <ArrowRight aria-hidden="true" className="size-4" />
          </a>
        </div>
      </div>
    </section>
  );
}

function Welcome() {
  return (
    <section className="bg-paper py-20 sm:py-28">
      <div className="section-shell">
        <div className="grid gap-12 lg:grid-cols-[1.08fr_0.92fr] lg:items-start">
          <div className="relative min-h-[560px] overflow-hidden bg-mist soft-shadow">
            <Image
              src="/stillwater/bible-study.jpg"
              alt="A Bible study gathering at Still Water Christian Fellowship"
              fill
              sizes="(min-width: 1024px) 52vw, 100vw"
              className="object-cover"
            />
          </div>

          <div>
            <p className="text-sm font-black uppercase tracking-[0.22em] text-clay">
              What We Are About
            </p>
            <h2 className="serif mt-4 text-balance text-5xl font-bold leading-tight text-ink sm:text-6xl">
              Shining the light of the Gospel from darkness to light.
            </h2>
            <p className="mt-6 text-lg leading-8 text-ink-soft">
              Thank you for your interest in Still Water Christian Fellowship. It
              would be our great joy to share with you what Jesus Christ can do
              for you.
            </p>
          </div>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {visitorNotes.map((note) => (
            <article key={note.title} className="border-l-4 border-sky bg-mist/58 p-6">
              <h3 className="text-lg font-bold text-ink">{note.title}</h3>
              <p className="mt-2 text-sm leading-7 text-ink-soft">{note.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Verse() {
  return (
    <section className="bg-ink py-20 text-white sm:py-24">
      <div className="section-shell">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-10">
          <VerseBlock
            label={churchVerses.mission.label}
            reference={churchVerses.mission.reference}
            text={churchVerses.mission.text}
          />
          <VerseBlock
            label={churchVerses.theme.label}
            reference={churchVerses.theme.reference}
            pullQuote={churchVerses.theme.pullQuote}
            text={churchVerses.theme.text}
          />
        </div>
      </div>
    </section>
  );
}

function VerseBlock({
  label,
  reference,
  text,
  pullQuote,
}: {
  label: string;
  reference: string;
  text: string;
  pullQuote?: string;
}) {
  return (
    <div className="border-l-4 border-sky pl-6 sm:pl-8">
      <p className="text-xs font-black uppercase tracking-[0.22em] text-sky">
        {label} — {reference}
      </p>
      {pullQuote ? (
        <blockquote className="mt-6">
          <p className="serif text-balance text-3xl font-semibold italic leading-tight text-white sm:text-4xl">
            “{pullQuote}”
          </p>
        </blockquote>
      ) : (
        <blockquote className="mt-7">
          <p className="serif text-balance text-xl font-normal italic leading-relaxed text-white/92 sm:text-2xl">
            “{text}”
          </p>
        </blockquote>
      )}
    </div>
  );
}

function Ministries() {
  return (
    <section id="ministries" className="bg-ink py-20 text-white sm:py-28">
      <div className="section-shell">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.22em] text-sky">
              Our Ministries
            </p>
            <h2 className="serif mt-4 max-w-3xl text-balance text-5xl font-bold leading-tight sm:text-6xl">
              Places to grow, serve, and belong.
            </h2>
          </div>
          <p className="max-w-xl text-lg leading-8 text-white/72">
            Ministry at Still Water reaches children, students, adults, local
            neighbors, and world evangelism with the same Gospel-centered heartbeat.
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {ministries.map((ministry) => {
            const isLogo = "imageContain" in ministry && ministry.imageContain;
            const schedule =
              "schedule" in ministry ? ministry.schedule : undefined;
            const href = "href" in ministry ? ministry.href : undefined;
            const cta = "cta" in ministry ? ministry.cta : undefined;
            const inner = (
              <>
                <div
                  className={
                    isLogo
                      ? "relative aspect-square overflow-hidden bg-paper p-8"
                      : "relative aspect-square overflow-hidden bg-mist"
                  }
                >
                  <Image
                    src={ministry.image}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw"
                    className={
                      isLogo
                        ? "object-contain p-2"
                        : "object-cover transition duration-500 group-hover:scale-105"
                    }
                  />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="serif text-2xl font-bold leading-tight">
                    {ministry.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-ink-soft">
                    {ministry.body}
                  </p>
                  {schedule ? (
                    <p className="mt-auto pt-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-clay">
                      <CalendarRange aria-hidden="true" className="size-3.5" />
                      {schedule}
                    </p>
                  ) : null}
                  {href ? (
                    <p className="mt-auto pt-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-clay transition group-hover:text-fern">
                      {cta ?? "Read More"}
                      <ArrowUpRight aria-hidden="true" className="size-3.5" />
                    </p>
                  ) : null}
                </div>
              </>
            );
            return href ? (
              <Link
                key={ministry.title}
                href={href}
                className="group flex flex-col bg-white text-ink transition hover:shadow-lg"
              >
                {inner}
              </Link>
            ) : (
              <article
                key={ministry.title}
                className="group flex flex-col bg-white text-ink"
              >
                {inner}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Worship() {
  return (
    <section id="worship" className="bg-mist py-20 sm:py-28">
      <div className="section-shell grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.22em] text-clay">
            Worship
          </p>
          <h2 className="serif mt-4 text-balance text-5xl font-bold leading-tight text-ink sm:text-6xl">
            Reverent, Joyful, and Intentionally Blended.
          </h2>
