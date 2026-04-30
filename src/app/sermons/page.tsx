import type { Metadata } from "next";
import Image from "next/image";
import { ArrowUpRight, Clock3, Headphones, Mic, Sparkles } from "lucide-react";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { formatSermonDate, getSermons, type Sermon } from "@/lib/sermons";
import { site, siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: `Sermons — ${site.name}`,
  description: `Listen to recent sermons from ${site.name} in Hope, Rhode Island.`,
  alternates: { canonical: `${siteUrl}/sermons` },
};

export default async function SermonsPage() {
  const sermons = await getSermons();
  const [latest, ...rest] = sermons;

  return (
    <>
      <main className="overflow-hidden bg-paper">
        <Header />
        <Hero latest={latest} count={sermons.length} />
        {sermons.length === 0 ? <Empty /> : <Archive sermons={rest} />}
      </main>
      <Footer />
    </>
  );
}

function Hero({ latest, count }: { latest: Sermon | undefined; count: number }) {
  return (
    <section className="relative bg-ink text-white">
      <Image
        src="/stillwater/worship.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-center opacity-50"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,43,62,0.96),rgba(13,75,105,0.78)_50%,rgba(58,155,197,0.32))]" />

      <div className="section-shell relative pb-16 pt-32 sm:pb-20 sm:pt-40">
        <p className="mb-5 inline-flex items-center gap-2 border-l-4 border-sky pl-4 text-sm font-bold uppercase tracking-[0.2em] text-sky">
          <Sparkles aria-hidden="true" className="size-4" />
          Sermon Library
        </p>
        <h1 className="serif max-w-4xl text-balance text-5xl font-bold leading-[1.04] sm:text-7xl">
          Sit with the Word, hear it preached.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-white/82 sm:text-xl">
          Recent messages from Sunday worship and Wednesday Bible study at Still
          Water. {count > 0 ? `${count} sermons available — newest first.` : null}
        </p>

        {latest ? <LatestCard sermon={latest} /> : null}
      </div>
    </section>
  );
}

function LatestCard({ sermon }: { sermon: Sermon }) {
  return (
    <article className="mt-12 grid gap-0 border border-white/16 bg-white/8 backdrop-blur-md md:grid-cols-[0.95fr_1.05fr]">
      <div className="border-b border-white/14 p-7 sm:p-9 md:border-b-0 md:border-r">
        <p className="text-xs font-black uppercase tracking-[0.22em] text-sky">
          Latest Message
        </p>
        <h2 className="serif mt-5 text-balance text-3xl font-bold leading-tight sm:text-4xl">
          {sermon.title}
        </h2>
        <dl className="mt-7 grid gap-4 text-sm text-white/78 sm:grid-cols-2">
          <Meta icon={<Mic />} label="Speaker" value={sermon.speaker} />
          <Meta
            icon={<Clock3 />}
            label="Date"
            value={formatSermonDate(sermon.pubDate)}
          />
        </dl>
      </div>
      <div className="flex flex-col justify-between gap-6 p-7 sm:p-9">
        <div className="flex items-center gap-3 text-sm font-bold uppercase tracking-[0.14em] text-white/70">
          <Headphones aria-hidden="true" className="size-4 text-sky" />
          {sermon.durationLabel || "Audio"}
        </div>
        <audio
          controls
          preload="none"
          src={sermon.audioUrl}
          className="w-full"
        >
          Your browser does not support the audio element.
        </audio>
        <a
          href={sermon.sermonAudioUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex w-fit items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-white/65 transition hover:text-white"
        >
          Open on SermonAudio
          <ArrowUpRight aria-hidden="true" className="size-3.5" />
        </a>
      </div>
    </article>
  );
}

function Meta({
  icon,
  label,
  value,
}: {
  icon: React.ReactElement;
  label: string;
  value: string;
}) {
  if (!value) return null;
  return (
    <div>
      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-white/55 [&_svg]:size-3.5">
        {icon}
        {label}
      </div>
      <p className="mt-2 text-base font-semibold leading-6 text-white">{value}</p>
    </div>
  );
}

function Archive({ sermons }: { sermons: Sermon[] }) {
  return (
    <section className="bg-cream py-16 sm:py-24">
      <div className="section-shell">
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.22em] text-clay">
              Sermon Archive
            </p>
            <h2 className="serif mt-4 text-balance text-5xl font-bold leading-tight text-ink sm:text-6xl">
              Past messages, ready when you are.
            </h2>
          </div>
          <p className="max-w-xl text-base leading-7 text-ink-soft">
            Each card includes the audio inline — tap play to listen here, or open
            the sermon on SermonAudio for series notes and additional formats.
          </p>
        </div>

        <ul className="mt-12 grid gap-3">
          {sermons.map((sermon) => (
            <SermonRow key={sermon.id} sermon={sermon} />
          ))}
        </ul>
      </div>
    </section>
  );
}

function SermonRow({ sermon }: { sermon: Sermon }) {
  return (
    <li className="border border-rule bg-paper">
      <details className="group">
        <summary className="flex cursor-pointer list-none items-start gap-5 p-5 transition hover:bg-mist/40 sm:items-center sm:p-6">
          <div className="grid size-11 shrink-0 place-items-center border border-rule bg-cream text-clay transition group-open:border-sky group-open:bg-sky group-open:text-ink">
            <Headphones aria-hidden="true" className="size-5" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-clay">
              {formatSermonDate(sermon.pubDate)}
            </p>
            <h3 className="serif mt-1 text-balance text-xl font-bold leading-tight text-ink sm:text-2xl">
              {sermon.title}
            </h3>
            <p className="mt-1 text-sm font-semibold text-ink-soft">
              {sermon.speaker}
            </p>
          </div>
          <div className="hidden shrink-0 text-right text-xs font-bold uppercase tracking-[0.16em] text-ink-soft sm:block">
            {sermon.durationLabel}
          </div>
        </summary>
        <div className="border-t border-rule bg-mist/40 p-5 sm:p-6">
          {sermon.description ? (
            <p className="mb-4 max-w-3xl text-sm leading-7 text-ink-soft">
              {sermon.description}
            </p>
          ) : null}
          <audio
            controls
            preload="none"
            src={sermon.audioUrl}
            className="w-full"
          >
            Your browser does not support the audio element.
          </audio>
          <a
            href={sermon.sermonAudioUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-clay transition hover:text-ink"
          >
            Open on SermonAudio
            <ArrowUpRight aria-hidden="true" className="size-3.5" />
          </a>
        </div>
      </details>
    </li>
  );
}

function Empty() {
  return (
    <section className="bg-cream py-24">
      <div className="section-shell text-center">
        <p className="serif text-3xl font-bold text-ink">
          Sermons are temporarily unavailable.
        </p>
        <p className="mt-4 text-base text-ink-soft">
          Please check back shortly, or visit{" "}
          <a
            href={site.sermonAudio}
            className="font-bold text-clay underline-offset-4 hover:underline"
          >
            our SermonAudio page
          </a>
          .
        </p>
      </div>
    </section>
  );
}
