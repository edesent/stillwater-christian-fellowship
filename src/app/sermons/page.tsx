import type { Metadata } from "next";
import Image from "next/image";
import {
  ArrowUpRight,
  BookOpen,
  Clock3,
  Headphones,
  Mic,
  PlayCircle,
  Radio,
  Sparkles,
} from "lucide-react";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import {
  formatSermonDate,
  getSermons,
  type LiveWebcast,
  type Sermon,
} from "@/lib/sermons";
import { site, siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: `Sermons — ${site.name}`,
  description: `Listen to recent sermons from ${site.name} in Hope, Rhode Island — live on Sunday at 10:30 AM.`,
  alternates: { canonical: `${siteUrl}/sermons` },
};

export default async function SermonsPage() {
  const { coverImage, sermons, live } = await getSermons();
  const [featured, ...rest] = sermons;

  return (
    <>
      <SermonsJsonLd sermons={sermons} coverImage={coverImage} />
      <main className="overflow-hidden bg-paper">
        <Header />
        <Hero
          live={live}
          featured={featured}
          count={sermons.length}
          coverImage={coverImage}
        />
        {sermons.length === 0 ? (
          <Empty />
        ) : (
          <Archive sermons={rest} coverImage={coverImage} />
        )}
      </main>
      <Footer />
    </>
  );
}

function Hero({
  live,
  featured,
  count,
  coverImage,
}: {
  live: LiveWebcast | null;
  featured: Sermon | undefined;
  count: number;
  coverImage: string;
}) {
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
          Water. {count > 0 ? `${count} sermons in the library — newest first.` : null}
        </p>

        {live ? (
          <LiveCard live={live} />
        ) : featured ? (
          <FeaturedCard sermon={featured} coverImage={coverImage} />
        ) : null}
      </div>
    </section>
  );
}

function LiveCard({ live }: { live: LiveWebcast }) {
  return (
    <article className="mt-12 grid gap-0 border border-sky/55 bg-sky/12 backdrop-blur-md md:grid-cols-[1.05fr_0.95fr]">
      <div className="relative aspect-video overflow-hidden bg-ink md:aspect-auto">
        <Image
          src={live.previewImageURL}
          alt=""
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-ink/30" />
        <div className="absolute left-5 top-5 inline-flex items-center gap-2 border border-sky/70 bg-ink/80 px-3 py-1.5 text-xs font-black uppercase tracking-[0.2em] text-sky">
          <span className="grid size-2 place-items-center">
            <span className="size-2 animate-pulse rounded-full bg-sky" />
          </span>
          Live Now
        </div>
      </div>
      <div className="flex flex-col gap-5 p-7 sm:p-9">
        <p className="text-xs font-black uppercase tracking-[0.22em] text-sky">
          {live.eventType || "Live Broadcast"}
        </p>
        <h2 className="serif text-balance text-3xl font-bold leading-tight sm:text-4xl">
          {live.title}
        </h2>
        <a
          href={live.webcastUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto inline-flex w-fit items-center gap-2 bg-sky px-5 py-3 text-sm font-black uppercase tracking-[0.12em] text-ink transition hover:bg-white"
        >
          <Radio aria-hidden="true" className="size-4" />
          Watch the Livestream
        </a>
      </div>
    </article>
  );
}

function FeaturedCard({
  sermon,
  coverImage,
}: {
  sermon: Sermon;
  coverImage: string;
}) {
  return (
    <article className="mt-12 grid gap-0 border border-white/16 bg-white/8 backdrop-blur-md md:grid-cols-[0.95fr_1.05fr]">
      <div className="relative aspect-[16/10] overflow-hidden bg-ink md:aspect-auto md:min-h-[280px]">
        <Image
          src={sermon.thumbnailUrl || coverImage}
          alt={sermon.title}
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover"
        />
        {sermon.hasVideo ? (
          <div className="absolute left-5 top-5 inline-flex items-center gap-2 border border-white/30 bg-ink/70 px-3 py-1.5 text-xs font-black uppercase tracking-[0.2em] text-white">
            <PlayCircle aria-hidden="true" className="size-3.5" />
            Video
          </div>
        ) : null}
      </div>
      <div className="flex flex-col gap-5 p-7 sm:p-9">
        <p className="text-xs font-black uppercase tracking-[0.22em] text-sky">
          Latest Message
        </p>
        <h2 className="serif text-balance text-3xl font-bold leading-tight sm:text-4xl">
          {sermon.title}
        </h2>
        <dl className="grid gap-4 text-sm text-white/78 sm:grid-cols-2">
          <Meta icon={<Mic />} label="Speaker" value={sermon.speaker} />
          <Meta
            icon={<Clock3 />}
            label="Preached"
            value={formatSermonDate(sermon.pubDate)}
          />
          <Meta
            icon={<BookOpen />}
            label="Scripture"
            value={sermon.bibleText}
          />
          <Meta
            icon={<Headphones />}
            label="Length"
            value={sermon.durationLabel}
          />
        </dl>
        {sermon.audioUrl ? (
          <audio
            controls
            preload="none"
            src={sermon.audioUrl}
            className="w-full"
          >
            Your browser does not support the audio element.
          </audio>
        ) : null}
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

function Archive({
  sermons,
  coverImage,
}: {
  sermons: Sermon[];
  coverImage: string;
}) {
  if (sermons.length === 0) return null;
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
            Tap a sermon to expand the audio player, or open it on SermonAudio
            for video, transcripts, and additional formats.
          </p>
        </div>

        <ul className="mt-12 grid gap-3">
          {sermons.map((sermon) => (
            <SermonRow
              key={sermon.id}
              sermon={sermon}
              coverImage={coverImage}
            />
          ))}
        </ul>
      </div>
    </section>
  );
}

function SermonRow({
  sermon,
  coverImage,
}: {
  sermon: Sermon;
  coverImage: string;
}) {
  return (
    <li className="border border-rule bg-paper">
      <details className="group">
        <summary className="flex cursor-pointer list-none items-start gap-5 p-5 transition hover:bg-mist/40 sm:items-center sm:p-6">
          <div className="relative size-20 shrink-0 overflow-hidden border border-rule bg-mist sm:size-28 sm:aspect-video sm:w-40">
            <Image
              src={sermon.thumbnailUrl || coverImage}
              alt=""
              fill
              sizes="(min-width: 640px) 160px, 80px"
              className="object-cover"
            />
            <div className="absolute inset-0 grid place-items-center bg-ink/40 text-white opacity-0 transition group-hover:opacity-100 group-open:opacity-100">
              {sermon.hasVideo ? (
                <PlayCircle aria-hidden="true" className="size-7" />
              ) : (
                <Headphones aria-hidden="true" className="size-6" />
              )}
            </div>
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-clay">
              {formatSermonDate(sermon.pubDate)}
              {sermon.eventType ? ` · ${sermon.eventType}` : ""}
            </p>
            <h3 className="serif mt-1 text-balance text-xl font-bold leading-tight text-ink sm:text-2xl">
              {sermon.title}
            </h3>
            {sermon.bibleText ? (
              <p className="mt-1 text-sm font-semibold text-fern">
                {sermon.bibleText}
              </p>
            ) : null}
            <p className="mt-1 text-sm font-semibold text-ink-soft">
              {sermon.speaker}
            </p>
          </div>
          <div className="hidden shrink-0 text-right text-xs font-bold uppercase tracking-[0.16em] text-ink-soft sm:block">
            {sermon.durationLabel}
          </div>
        </summary>
        <div className="border-t border-rule bg-mist/40 p-5 sm:p-6">
          {sermon.audioUrl ? (
            <audio
              controls
              preload="none"
              src={sermon.audioUrl}
              className="w-full"
            >
              Your browser does not support the audio element.
            </audio>
          ) : null}
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

function SermonsJsonLd({
  sermons,
  coverImage,
}: {
  sermons: Sermon[];
  coverImage: string;
}) {
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
            name: "Sermons",
            item: `${siteUrl}/sermons`,
          },
        ],
      },
      {
        "@type": "PodcastSeries",
        name: `${site.name} Sermons`,
        url: `${siteUrl}/sermons`,
        description: `Recent sermons from ${site.name} in Hope, Rhode Island.`,
        image: coverImage,
        author: { "@id": churchId },
        publisher: { "@id": churchId },
      },
      {
        "@type": "ItemList",
        name: `${site.name} — Sermon Archive`,
        url: `${siteUrl}/sermons`,
        numberOfItems: sermons.length,
        itemListElement: sermons.slice(0, 25).map((sermon, index) => ({
          "@type": "ListItem",
          position: index + 1,
          item: {
            "@type": "PodcastEpisode",
            name: sermon.title,
            url: sermon.sermonAudioUrl,
            datePublished: sermon.pubDate,
            duration: sermon.durationSeconds
              ? `PT${Math.floor(sermon.durationSeconds / 60)}M${sermon.durationSeconds % 60}S`
              : undefined,
            associatedMedia: {
              "@type": "AudioObject",
              contentUrl: sermon.audioUrl,
              encodingFormat: "audio/mpeg",
            },
            author: { "@type": "Person", name: sermon.speaker },
            inLanguage: "en",
          },
        })),
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
