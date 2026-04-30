import Image from "next/image";
import type { ReactElement } from "react";
import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  Clock3,
  HeartHandshake,
  MapPin,
  MessageCircleHeart,
  Music2,
  PlayCircle,
  Sparkles,
} from "lucide-react";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import {
  beliefs,
  leaders,
  ministries,
  services,
  site,
  siteUrl,
  siteVerse,
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
        <Welcome />
        <Ministries />
        <Worship />
        <Leadership />
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
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/82 sm:text-xl">
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
          <HeroStat label="Sunday Worship" value="10:30 AM" />
          <HeroStat label="Wednesday Bible Study" value="7:00 PM" />
          <HeroStat label="Location" value="51 Main St" />
        </div>
      </div>
    </section>
  );
}

function HeroStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-white/14 px-5 py-4 md:border-r md:last:border-r-0">
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/55">
        {label}
      </p>
      <p className="serif mt-1 text-3xl font-bold text-white">{value}</p>
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
              We hope you will visit with us soon.
            </h2>
            <p className="mt-6 text-lg leading-8 text-ink-soft">
              When you come, you will find a church family and pastor who love the
              Bible. The preaching of the Word of God is filled with passion, zeal,
              and the fullness of the Holy Ghost.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {services.map((service) => (
              <article key={service.title} className="border border-rule bg-paper p-6">
                <div className="flex items-start justify-between gap-4">
                  <p className="text-sm font-black uppercase tracking-[0.18em] text-fern">
                    {service.day}
                  </p>
                  <Clock3 aria-hidden="true" className="size-5 text-clay" />
                </div>
                <p className="serif mt-6 text-4xl font-bold text-ink">
                  {service.time}
                </p>
                <h3 className="mt-4 text-base font-bold uppercase tracking-[0.13em] text-ink-soft">
                  {service.title}
                </h3>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Welcome() {
  return (
    <section className="bg-paper py-20 sm:py-28">
      <div className="section-shell grid gap-12 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
        <div className="relative min-h-[560px] overflow-hidden bg-mist soft-shadow">
          <Image
            src="/stillwater/bible-study.jpg"
            alt="A Bible study gathering at Still Water Christian Fellowship"
            fill
            sizes="(min-width: 1024px) 52vw, 100vw"
            className="object-cover"
          />
          <div className="absolute inset-x-0 bottom-0 bg-[linear-gradient(0deg,rgba(8,43,62,0.88),rgba(58,155,197,0))] p-6 pt-28 text-white sm:p-8">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-sky">
              Site Verse - {siteVerse.reference}
            </p>
            <p className="serif mt-3 max-w-2xl text-2xl font-bold leading-snug sm:text-3xl">
              {siteVerse.text}
            </p>
          </div>
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
            would be our great joy to share with you what Jesus Christ can do for
            you.
          </p>
          <div className="mt-8 grid gap-4">
            {visitorNotes.map((note) => (
              <article key={note.title} className="border-l-4 border-sky bg-mist/58 p-5">
                <h3 className="text-lg font-bold text-ink">{note.title}</h3>
                <p className="mt-2 text-sm leading-7 text-ink-soft">{note.body}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
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

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {ministries.map((ministry) => (
            <article key={ministry.title} className="bg-white text-ink">
              <div className="relative aspect-square overflow-hidden bg-mist">
                <Image
                  src={ministry.image}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw"
                  className="object-cover transition duration-500 hover:scale-105"
                />
              </div>
              <div className="p-5">
                <h3 className="serif text-2xl font-bold leading-tight">
                  {ministry.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-ink-soft">{ministry.body}</p>
              </div>
            </article>
          ))}
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
            Reverent, joyful, and intentionally blended.
          </h2>
          <p className="mt-6 text-lg leading-8 text-ink-soft">
            Still Water describes blended worship as a harmony that honors the
            musical traditions of the church while joining them with modern
            expressions of worship.
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            <WorshipPoint icon={<BookOpen />} label="Truthful words" />
            <WorshipPoint icon={<Music2 />} label="Generational unity" />
            <WorshipPoint icon={<HeartHandshake />} label="Orderly praise" />
          </div>
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

function WorshipPoint({ icon, label }: { icon: ReactElement; label: string }) {
  return (
    <div className="border border-rule bg-paper p-5">
      <div className="text-clay [&_svg]:size-6">{icon}</div>
      <p className="mt-5 text-sm font-black uppercase tracking-[0.14em] text-ink">
        {label}
      </p>
    </div>
  );
}

function Leadership() {
  return (
    <section id="leadership" className="bg-paper py-20 sm:py-28">
      <div className="section-shell">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.22em] text-clay">
              Leadership
            </p>
            <h2 className="serif mt-4 text-balance text-5xl font-bold leading-tight text-ink sm:text-6xl">
              Shepherding with Scripture and care.
            </h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {beliefs.map((belief) => (
              <p
                key={belief}
                className="border border-rule bg-cream px-5 py-4 text-sm font-semibold leading-7 text-ink-soft"
              >
                {belief}
              </p>
            ))}
          </div>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {leaders.map((leader) => (
            <article key={leader.name} className="border border-rule bg-white">
              <div className="relative aspect-[4/3] overflow-hidden bg-mist">
                <Image
                  src={leader.image}
                  alt={leader.name}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="p-5">
                <h3 className="serif text-3xl font-bold text-ink">{leader.name}</h3>
                <p className="mt-2 text-sm font-black uppercase tracking-[0.15em] text-clay">
                  {leader.role}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
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
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <ContactTile
            icon={<CalendarDays />}
            title="Sunday"
            body="Adult discipleship at 9:15 AM, worship at 10:30 AM, fellowship after service, and prayer at 6:00 PM."
          />
          <ContactTile
            icon={<BookOpen />}
            title="Wednesday"
            body="Morning devotions at 10:00 AM and Wednesday night Bible Study at 7:00 PM."
          />
          <ContactTile
            icon={<MessageCircleHeart />}
            title="Care"
            body="Prayer for the sick is observed on the second Sunday of the month."
          />
          <ContactTile
            icon={<HeartHandshake />}
            title="Community"
            body="Women's Caring & Sharing, Brother 2 Brother, Good News Bible Club, and rescue mission outreach."
          />
        </div>
      </div>
    </section>
  );
}

function ContactTile({
  icon,
  title,
  body,
}: {
  icon: ReactElement;
  title: string;
  body: string;
}) {
  return (
    <article className="border border-rule bg-paper p-6">
      <div className="text-clay [&_svg]:size-6">{icon}</div>
      <h3 className="serif mt-6 text-3xl font-bold text-ink">{title}</h3>
      <p className="mt-4 text-sm leading-7 text-ink-soft">{body}</p>
    </article>
  );
}

function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Church",
    name: site.name,
    url: siteUrl,
    telephone: site.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: "51 Main St",
      addressLocality: "Hope",
      addressRegion: "RI",
      addressCountry: "US",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
