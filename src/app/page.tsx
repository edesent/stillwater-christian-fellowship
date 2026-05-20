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
  services,
  site,
  siteUrl,
  churchVerses,
  visitorNotes,
} from "@/lib/site";

const happeningToday = {
  enabled: false,
  title: "Happening Today!",
  image: "/uploads/happening-today.jpg",
  alt: "Invitation for today's church event",
  description: "Join us today at Still Water Christian Fellowship.",
  href: "/events",
  cta: "View Details",
} as const;

export default function Home() {
  return (
    <>
      <JsonLd />
      <main id="home" className="overflow-hidden bg-paper">
        <Header />
        <Hero />
        <Welcome />
        <Visit />
        <Events />
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
        <div className="grid gap-8 pb-10 lg:grid-cols-[minmax(0,1fr)_minmax(280px,360px)] lg:items-end">
          <div className="max-w-4xl">
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
              A Bible-Believing, Christ-Honoring, Independent Baptist Church
              shining the Light of the Gospel in the Village of Hope, Rhode Island.
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

          <HappeningTodayCard />
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
            secondaryLabel="Prayer Service"
          />
          <div className="border-white/14 px-5 py-4 md:border-r md:last:border-r-0">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/55">
              Location
            </p>
            <p className="serif mt-1 text-3xl font-bold leading-tight text-white">
              51 Main Street
            </p>
            <p className="mt-1 text-sm font-semibold text-white/72">
              Hope, RI 02831
            </p>
          </div>
        </div>

        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {visitorNotes.map((note) => (
            <article key={note.title} className="border-l-4 border-sky bg-white/92 p-5 text-ink shadow-sm backdrop-blur">
              <h3 className="text-lg font-bold text-ink">{note.title}</h3>
              <p className="mt-2 whitespace-pre-line text-sm leading-7 text-ink-soft">
                {note.body}
              </p>
              {"verse" in note && note.verse ? (
                <blockquote className="mt-5 border-t border-rule pt-4">
                  <p className="serif text-base italic leading-7 text-ink">
                    &ldquo;{note.verse}&rdquo;
                  </p>
                  {"reference" in note && note.reference ? (
                    <cite className="mt-3 block text-xs font-black uppercase tracking-[0.16em] text-clay not-italic">
                      {note.reference}
                    </cite>
                  ) : null}
                </blockquote>
              ) : null}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function HappeningTodayCard() {
  if (!happeningToday.enabled) return null;

  const card = (
    <article className="w-full overflow-hidden border border-sky/45 bg-white/95 text-ink shadow-2xl backdrop-blur-md lg:ml-auto">
      <div className="bg-sky px-5 py-3 text-ink">
        <p className="text-xs font-black uppercase tracking-[0.22em]">
          {happeningToday.title}
        </p>
      </div>
      <div className="relative aspect-[4/3] bg-mist">
        <Image
          src={happeningToday.image}
          alt={happeningToday.alt}
          fill
          sizes="(min-width: 1024px) 360px, 100vw"
          className="object-cover"
        />
      </div>
      <div className="p-5">
        <p className="text-sm leading-7 text-ink-soft">
          {happeningToday.description}
        </p>
        <p className="mt-4 inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.16em] text-clay transition group-hover:text-fern">
          {happeningToday.cta}
          <ArrowUpRight aria-hidden="true" className="size-3.5" />
        </p>
      </div>
    </article>
  );

  if (!happeningToday.href) return card;

  return (
    <Link href={happeningToday.href} className="group block w-full lg:max-w-[360px]">
      {card}
    </Link>
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
            <p className="mt-5 text-lg leading-7 text-ink-soft">
              SWCF is a Church Family. We have a Pastor that Loves the Lord. His
              Preaching of the Word of God is filled with Passion, Zeal, and the
              Fullness of the Holy Ghost.
            </p>
            <p className="mt-3 text-lg leading-7 text-ink-soft">
              Jesus Himself said, &ldquo;Come unto me, all ye that labour and are
              heavy laden, and I will give you rest.&rdquo;
            </p>
            <p className="mt-3 text-lg leading-7 text-ink-soft">
              We Pray that You would take up His Gracious Offer and Join Us!
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
              What&rsquo;s Coming Up At Still Water.
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
          <div className="relative min-h-[560px] overflow-hidden border-4 border-sky/70 bg-mist p-2 shadow-lg ring-1 ring-clay/25">
            <div className="relative h-full min-h-[540px] overflow-hidden bg-mist">
              <Image
                src="/stillwater/bible-study.jpg"
                alt="A Bible study gathering at Still Water Christian Fellowship"
                fill
                sizes="(min-width: 1024px) 52vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>

          <div>
            <p className="text-sm font-black uppercase tracking-[0.22em] text-clay">
              What We Are About
            </p>
            <h2 className="serif mt-4 text-balance text-5xl font-bold leading-tight text-ink sm:text-6xl">
              Shining Gospel Light Into A Dark And Cold World
            </h2>
            <blockquote className="mt-6 border-l-4 border-sky pl-5">
              <p className="serif text-2xl font-semibold italic leading-tight text-ink sm:text-3xl">
                &ldquo;..they that dwell in the land of the shadow of death, upon them hath the light shined&rdquo;
              </p>
              <cite className="mt-3 block text-sm font-bold uppercase tracking-[0.16em] text-clay not-italic">
                Isaiah 9:2
              </cite>
            </blockquote>
            <p className="mt-6 text-lg leading-8 text-ink-soft">
              Thank you for your interest in Still Water Christian Fellowship. It
              would be our great joy to share with you what Jesus Christ can do
              for you.
            </p>
          </div>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          <div className="border-l-4 border-sky bg-mist/58 p-6">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-clay">
              {churchVerses.mission.label} — {churchVerses.mission.reference}
            </p>
            <blockquote className="mt-5">
              <p className="serif text-xl italic leading-relaxed text-ink sm:text-2xl">
                &ldquo;{churchVerses.mission.text}&rdquo;
              </p>
            </blockquote>
          </div>

          <div className="border-l-4 border-sky bg-mist/58 p-6">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-clay">
              {churchVerses.theme.label} — {churchVerses.theme.reference}
            </p>
            <blockquote className="mt-5">
              <p className="serif text-3xl font-semibold italic leading-tight text-ink">
                &ldquo;{churchVerses.theme.pullQuote}&rdquo;
              </p>
              <p className="mt-5 text-base leading-7 text-ink-soft">
                {churchVerses.theme.text}
              </p>
            </blockquote>
          </div>
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
              Places To Serve, to Grow, and to Belong
            </h2>
          </div>
          <blockquote className="max-w-xl border-l-4 border-sky pl-5">
            <p className="serif text-2xl font-semibold italic leading-tight text-white sm:text-3xl">
              &ldquo;.. love the Lord your God... serve him with all your heart and with all your soul&rdquo;
            </p>
            <cite className="mt-3 block text-sm font-bold uppercase tracking-[0.16em] text-sky not-italic">
              Deuteronomy 11:13
            </cite>
          </blockquote>
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
                  {"verse" in ministry && typeof ministry.verse === "string" ? (
                    <p className="mt-4 text-sm italic leading-7 text-ink-soft">
                      {ministry.verse}
                    </p>
                  ) : null}
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
            Praise and Worship
          </p>
          <h2 className="serif mt-4 text-balance text-5xl font-bold leading-tight text-ink sm:text-6xl">
            &ldquo;O sing unto the Lord a new song: sing unto the Lord, all the earth.&rdquo; - Psalm 96:1
          </h2>
          <p className="mt-6 text-lg leading-8 text-ink-soft">
            At SWFC, we Sing Joyfully unto the Lord. He is Worthy of all of our
            praise. We Shout His Praises.. We lift His Holy Name on High!
          </p>
        </div>
        <div className="relative aspect-[4/3] overflow-hidden bg-fern soft-shadow">
          <Image
            src="/stillwater/worship.jpg"
            alt="Still Water Christian Fellowship worship team"
            fill
            sizes="(min-width: 1024px) 52vw, 100vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}

function Leadership() {
  const otherElders = elders.filter(
    (e) =>
      !leadershipPortraits.some((p) =>
        p.name.toLowerCase().includes(e.name.split(" ").pop()!.toLowerCase())
      )
  );

  return (
    <section id="leadership" className="bg-cream py-20 sm:py-28">
      <div className="section-shell">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.22em] text-clay">
              Leadership
            </p>
            <h2 className="serif mt-4 text-balance text-5xl font-semibold italic leading-tight text-ink sm:text-6xl">
              &ldquo;and he gave some.. Pastors and Teachers..&rdquo; - Ephesians 4:11
            </h2>
          </div>
          <div className="max-w-xl">
            <p className="text-lg leading-8 text-ink-soft">
              Pastor Bob, Pastor Joe, and the Elders are Men who faithfully
              Labor as Under-Shepherds. They are led and guided by The Holy Spirit in the
              Word. They are True Servant Leaders of God's Precious Flock.
            </p>
            <Link
              href="/from-the-pastor"
              className="mt-6 inline-flex items-center gap-2 border border-rule bg-paper px-5 py-3 text-sm font-black uppercase tracking-[0.12em] text-ink transition hover:bg-mist"
            >
              From The Pastor
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          </div>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {leadershipPortraits.map((person) => {
            const image = "image" in person ? person.image : undefined;
            return (
              <article
                key={person.name}
                className="flex flex-col border border-rule bg-paper"
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-mist">
                  {image ? (
                    <Image
                      src={image}
                      alt={person.name}
                      fill
                      sizes="(min-width: 1024px) 28vw, (min-width: 640px) 45vw, 100vw"
                      className={person.role === "Senior Pastor" ? "object-cover object-[center_18%]" : "object-cover object-center"}
                    />
                  ) : (
                    <div className="absolute inset-0 grid place-items-center bg-mist">
                      <span
                        className="serif text-7xl font-bold text-fern/70"
                        aria-hidden="true"
                      >
                        {person.name
                          .split(/\s+/)
                          .map((part) => part[0])
                          .filter(Boolean)
                          .slice(0, 2)
                          .join("")
                          .toUpperCase()}
                      </span>
                    </div>
                  )}
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <p className="text-xs font-black uppercase tracking-[0.22em] text-fern">
                    {person.role}
                  </p>
                  <h3 className="serif mt-3 text-2xl font-bold leading-tight text-ink">
                    {person.name}
                  </h3>
                  {"body" in person && person.body ? (
                    <details className="group mt-4">
                      <summary className="cursor-pointer list-none">
                        <p className="line-clamp-4 text-sm leading-7 text-ink-soft group-open:line-clamp-none">
                          {person.body}
                        </p>
                        <span className="mt-4 inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.16em] text-clay transition hover:text-fern group-open:hidden">
                          Read More
                          <ArrowRight aria-hidden="true" className="size-3.5" />
                        </span>
                        <span className="mt-4 hidden text-xs font-black uppercase tracking-[0.16em] text-clay transition hover:text-fern group-open:inline-flex">
                          Show Less
                        </span>
                      </summary>
                    </details>
                  ) : null}
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-10 grid gap-3 sm:grid-cols-2">
          {otherElders.map((elder) => (
            <article
              key={elder.name}
              className="flex items-center gap-4 border border-rule bg-paper p-5"
            >
              <Initials name={elder.name} muted />
              <div>
                <p className="text-xs font-black uppercase tracking-[0.18em] text-fern">
                  Elder
                </p>
                <h3 className="serif mt-1 text-xl font-bold leading-tight text-ink">
                  {elder.name}
                </h3>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Initials({ name, muted = false }: { name: string; muted?: boolean }) {
  const initials = name
    .split(/\s+/)
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
  return (
    <span
      className={
        muted
          ? "grid size-12 shrink-0 place-items-center border border-rule bg-paper text-base font-black text-ink-soft"
          : "grid size-14 shrink-0 place-items-center border border-sky/55 bg-mist text-lg font-black text-fern"
      }
      aria-hidden="true"
    >
      {initials}
    </span>
  );
}

function Contact() {
  return (
    <section id="contact" className="bg-cream py-20 sm:py-28">
      <div className="section-shell grid gap-8 lg:grid-cols-[1fr_1fr]">
        <div className="bg-fern p-7 text-white sm:p-10">
          <MapPin aria-hidden="true" className="size-9 text-sky" />
          <h2 className="serif mt-8 text-balance text-5xl font-bold leading-tight">
            Find us in Hope.
          </h2>
          <p className="mt-5 text-lg leading-8 text-white/76">
            {site.address}. {site.addressNote}. Sunday live streaming is available
            through SermonAudio at 10:30 AM.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <a
              href="https://maps.google.com/?q=51+Main+St+Hope+RI"
              className="inline-flex items-center gap-2 bg-white px-5 py-3 text-sm font-black uppercase tracking-[0.12em] text-ink transition hover:bg-sky"
            >
              <MapPin aria-hidden="true" className="size-4" />
              Directions
            </a>
            <a
              href="/sermons"
              className="inline-flex items-center gap-2 border border-white/42 px-5 py-3 text-sm font-black uppercase tracking-[0.12em] text-white transition hover:border-white hover:bg-white hover:text-ink"
            >
              <PlayCircle aria-hidden="true" className="size-4" />
              Listen to Sermons
            </a>
          </div>

          <div className="mt-10 border-t border-white/18 pt-7">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-sky">
              What to Expect
            </p>
            <dl className="mt-5 grid gap-3 text-sm leading-6 text-white/82">
              <div className="flex items-baseline gap-3">
                <dt className="serif w-24 shrink-0 font-bold text-white">
                  Dress
                </dt>
                <dd>Come as you are.</dd>
              </div>
              <div className="flex items-baseline gap-3">
                <dt className="serif w-24 shrink-0 font-bold text-white">
                  Worship
                </dt>
                <dd>Reverent, Bible-centered, about an hour.</dd>
              </div>
              <div className="flex items-baseline gap-3">
                <dt className="serif w-24 shrink-0 font-bold text-white">
                  After
                </dt>
                <dd>Stay for our Fellowship Feast — all welcome.</dd>
              </div>
            </dl>
          </div>
        </div>

        <ConnectWithPastor />
      </div>
    </section>
  );
}

function ConnectWithPastor() {
  return (
    <article className="flex flex-col border border-rule bg-paper p-8 sm:p-10">
      <div className="grid size-14 place-items-center border border-sky/55 bg-[#f8fcff] text-fern">
        <MessageCircleHeart aria-hidden="true" className="size-7" />
      </div>
      <p className="mt-7 text-xs font-black uppercase tracking-[0.22em] text-clay">
        Connect with Pastor Bob
      </p>
      <h3 className="serif mt-4 text-balance text-4xl font-bold leading-tight text-ink sm:text-5xl">
        Have a question? Start a chat.
      </h3>
      <p className="mt-5 text-base leading-7 text-ink-soft">
        Pastor Bob would love to hear from you — whether you’re visiting,
        asking about faith, or in need of prayer. Send a message and he will
        personally reply.
      </p>
      <div className="mt-7 flex flex-wrap gap-3">
        <ChatButton />
        <a
          href={`mailto:${site.email}?subject=Connect with Pastor Bob`}
          className="inline-flex items-center gap-2 border border-rule px-5 py-3 text-sm font-black uppercase tracking-[0.12em] text-ink transition hover:bg-cream"
        >
          <Mail aria-hidden="true" className="size-4" />
          Email
        </a>
        <a
          href={`tel:${site.phone.replace(/[^0-9]/g, "")}`}
          className="inline-flex items-center gap-2 border border-rule px-5 py-3 text-sm font-black uppercase tracking-[0.12em] text-ink transition hover:bg-cream"
        >
          <Phone aria-hidden="true" className="size-4" />
          Call
        </a>
      </div>
      <p className="mt-auto pt-7 text-xs text-ink-soft">
        Replies typically arrive within a day, often sooner.
      </p>
    </article>
  );
}


function JsonLd() {
  const churchId = `${siteUrl}/#church`;
  const websiteId = `${siteUrl}/#website`;
  const pastorId = `${siteUrl}/#pastor-bob`;

  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: siteUrl,
        name: site.name,
        description: site.description,
        inLanguage: "en-US",
        publisher: { "@id": churchId },
        potentialAction: {
          "@type": "SearchAction",
          target: `${siteUrl}/?q={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": ["Church", "LocalBusiness", "PlaceOfWorship"],
        "@id": churchId,
        name: site.name,
        alternateName: site.shortName,
        url: siteUrl,
        description: site.description,
        telephone: site.phone,
        email: site.email,
        priceRange: "Free",
        image: [`${siteUrl}/stillwater/hero-water.jpg`],
        logo: `${siteUrl}/stillwater/stillwater-ri-logo.png`,
        sameAs: [site.facebook, site.sermonAudio],
        address: {
          "@type": "PostalAddress",
          streetAddress: "51 Main Street",
          addressLocality: "Hope",
          addressRegion: "RI",
          postalCode: "02831",
          addressCountry: "US",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: 41.72363,
          longitude: -71.64019,
        },
        areaServed: [
          { "@type": "Place", name: "Hope, Rhode Island" },
          { "@type": "Place", name: "Scituate, Rhode Island" },
          { "@type": "Place", name: "Coventry, Rhode Island" },
          { "@type": "Place", name: "West Warwick, Rhode Island" },
        ],
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: "Sunday",
            opens: "09:15",
            closes: "12:00",
            description: "Adult Sunday School 9:15 AM, Worship Service 10:30 AM",
          },
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: "Sunday",
            opens: "17:30",
            closes: "18:30",
            description: "Discipleship Bible Study 5:30 PM",
          },
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: "Wednesday",
            opens: "10:00",
            closes: "11:00",
            description: "Bible Study (verse by verse) 10:00 AM",
          },
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: "Wednesday",
            opens: "18:00",
            closes: "19:30",
            description: "Prayer Meeting Service 6:00 PM",
          },
        ],
        denomination: "Independent Baptist",
        founder: { "@id": pastorId },
        employee: [{ "@id": pastorId }],
        event: [
          {
            "@type": "Event",
            name: "Sunday Worship Service",
            description: "Weekly Sunday worship service with Bible preaching.",
            eventSchedule: {
              "@type": "Schedule",
              repeatFrequency: "P1W",
              byDay: "https://schema.org/Sunday",
              startTime: "10:30",
              endTime: "12:00",
            },
            location: { "@id": churchId },
            organizer: { "@id": churchId },
            isAccessibleForFree: true,
            eventAttendanceMode:
              "https://schema.org/OfflineEventAttendanceMode",
            eventStatus: "https://schema.org/EventScheduled",
          },
          {
            "@type": "Event",
            name: "Wednesday Bible Study",
            description: "Midweek verse-by-verse Bible study.",
            eventSchedule: {
              "@type": "Schedule",
              repeatFrequency: "P1W",
              byDay: "https://schema.org/Wednesday",
              startTime: "10:00",
              endTime: "11:00",
            },
            location: { "@id": churchId },
            organizer: { "@id": churchId },
            isAccessibleForFree: true,
            eventAttendanceMode:
              "https://schema.org/OfflineEventAttendanceMode",
            eventStatus: "https://schema.org/EventScheduled",
          },
          {
            "@type": "Event",
            name: "Wednesday Prayer Meeting Service",
            description:
              "Pleading with and praising the Lord — encouragement and exhortation.",
            eventSchedule: {
              "@type": "Schedule",
              repeatFrequency: "P1W",
              byDay: "https://schema.org/Wednesday",
              startTime: "18:00",
              endTime: "19:30",
            },
            location: { "@id": churchId },
            organizer: { "@id": churchId },
            isAccessibleForFree: true,
            eventAttendanceMode:
              "https://schema.org/OfflineEventAttendanceMode",
            eventStatus: "https://schema.org/EventScheduled",
          },
        ],
      },
      {
        "@type": "Person",
        "@id": pastorId,
        name: "Robert Levesque",
        alternateName: "Pastor Bob",
        jobTitle: "Senior Pastor",
        affiliation: { "@id": churchId },
        worksFor: { "@id": churchId },
        sameAs: [site.sermonAudio],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
