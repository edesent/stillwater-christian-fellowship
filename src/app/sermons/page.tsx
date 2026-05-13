import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
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

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}): Promise<Metadata> {
  const { page: pageStr } = await searchParams;
  const page = Math.max(1, parseInt(pageStr ?? "1", 10) || 1);
  const titleSuffix = page > 1 ? ` — Page ${page}` : "";
  const canonical =
    page === 1 ? `${siteUrl}/sermons` : `${siteUrl}/sermons?page=${page}`;
  const description =
    page > 1
      ? `Sermon archive page ${page} — older messages from ${site.name} in Hope, Rhode Island.`
      : `Listen to recent sermons from ${site.name} in Hope, Rhode Island — live on Sunday at 10:30 AM.`;

  return {
    title: `Sermons${titleSuffix} — ${site.name}`,
    description,
    alternates: { canonical },
    openGraph: {
      title: `Sermons${titleSuffix} — ${site.name}`,
      description,
      url: canonical,
      type: "website",
    },
  };
}

export default async function SermonsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page: pageStr } = await searchParams;
  const pageInput = Math.max(1, parseInt(pageStr ?? "1", 10) || 1);
  const { coverImage, sermons, live, page, totalCount, totalPages } =
    await getSermons(pageInput);

  const isFirstPage = page === 1;
  const [featured, ...rest] = sermons;
  const archive = isFirstPage ? rest : sermons;

  return (
    <>
      <SermonsJsonLd sermons={sermons} coverImage={coverImage} />
      <main className="overflow-hidden bg-paper">
        <Header />
        <Hero
          live={isFirstPage ? live : null}
          featured={isFirstPage ? featured : undefined}
          page={page}
          totalPages={totalPages}
          totalCount={totalCount}
          coverImage={coverImage}
        />
        {sermons.length === 0 ? (
          <Empty />
        ) : (
          <Archive
            sermons={archive}
            coverImage={coverImage}
            page={page}
            totalPages={totalPages}
          />
        )}
      </main>
      <Footer />
    </>
  );
}

function Hero({
  live,
  featured,
  page,
  totalPages,
  totalCount,
  coverImage,
}: {
  live: LiveWebcast | null;
  featured: Sermon | undefined;
  page: number;
  totalPages: number;
  totalCount: number;
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
          {page > 1 ? `Page ${page} of ${totalPages}` : "Sermon Library"}
        </p>
        <h1 className="serif max-w-4xl text-balance text-5xl font-bold leading-[1.04] sm:text-7xl">
          &ldquo;Thus Saith The Lord...&rdquo;
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-white/82 sm:text-xl">
          When you visit SWCF, you will hear the Undiluted Word of God.. Lifting
          Up the Lord Jesus Christ and Him Crucified. Pastor Bob
          Unapologetically Preaches, by the Guidance of the Holy Spirit, with
          Conviction, Compassion, and Confidence…. And Love!
        </p>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-white/82 sm:text-xl">
          Recent messages from Sunday worship and Wednesday Bible study at Still
          Water.{" "}
          {totalCount > 0
            ? `${totalCount} sermons in the library — newest first.`
            : null}
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
        <SermonPlayer sermon={sermon} variant="featured" />
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

function SermonPlayer({
  sermon,
  variant,
}: {
  sermon: Sermon;
  variant: "featured" | "row";
}) {
  if (sermon.videoUrl) {
    return (
      <video
        controls
        preload="none"
        playsInline
        poster={sermon.thumbnailUrl || undefined}
        src={sermon.videoUrl}
        className={
          variant === "featured"
            ? "aspect-video w-full bg-ink"
            : "aspect-video w-full bg-ink"
        }
      >
        Your browser does not support the video element.
      </video>
    );
  }
  if (sermon.audioUrl) {
    return (
      <audio
        controls
        preload="none"
        src={sermon.audioUrl}
        className="w-full"
      >
        Your browser does not support the audio element.
      </audio>
    );
  }
  return null;
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
  page,
  totalPages,
}: {
  sermons: Sermon[];
  coverImage: string;
  page: number;
  totalPages: number;
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
              {page > 1
                ? `Older messages — page ${page}.`
                : "Past messages, ready when you are."}
            </h2>
          </div>
          <p className="max-w-xl text-base leading-7 text-ink-soft">
            Tap a sermon to expand the video player, or open it on SermonAudio
            for transcripts and additional formats.
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

        <Pagination page={page} totalPages={totalPages} />
      </div>
    </section>
  );
}

function Pagination({
  page,
  totalPages,
}: {
  page: number;
  totalPages: number;
}) {
  if (totalPages <= 1) return null;
  const pages = pageList(page, totalPages);
  const hrefFor = (n: number) => (n === 1 ? "/sermons" : `/sermons?page=${n}`);

  return (
    <nav
      aria-label="Sermon archive pagination"
      className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-rule pt-8"
    >
      {page > 1 ? (
        <Link
          href={hrefFor(page - 1)}
          className="inline-flex items-center gap-2 border border-rule bg-paper px-4 py-2.5 text-sm font-black uppercase tracking-[0.14em] text-ink transition hover:bg-mist"
        >
          <ArrowLeft aria-hidden="true" className="size-4" />
          Previous
        </Link>
      ) : (
        <span />
      )}

      <ol className="flex flex-wrap items-center gap-1.5">
        {pages.map((p, i) =>
          p === "…" ? (
            <li
              key={`dots-${i}`}
              className="px-2 text-sm font-bold text-ink-soft"
              aria-hidden="true"
            >
              …
            </li>
          ) : (
            <li key={p}>
              <Link
                href={hrefFor(p)}
                aria-current={p === page ? "page" : undefined}
                className={
                  p === page
                    ? "grid size-10 place-items-center border border-ink bg-ink text-sm font-black text-white"
                    : "grid size-10 place-items-center border border-rule bg-paper text-sm font-bold text-ink transition hover:bg-mist"
                }
              >
                {p}
              </Link>
            </li>
          )
        )}
      </ol>

      {page < totalPages ? (
        <Link
          href={hrefFor(page + 1)}
          className="inline-flex items-center gap-2 border border-rule bg-paper px-4 py-2.5 text-sm font-black uppercase tracking-[0.14em] text-ink transition hover:bg-mist"
        >
          Next
          <ArrowRight aria-hidden="true" className="size-4" />
        </Link>
      ) : (
        <span />
      )}
    </nav>
  );
}

function pageList(current: number, total: number): (number | "…")[] {
  const out: (number | "…")[] = [];
  const push = (v: number | "…") => {
    if (out[out.length - 1] !== v) out.push(v);
  };
  const window = 1;
  for (let i = 1; i <= total; i++) {
    if (
      i === 1 ||
      i === total ||
      (i >= current - window && i <= current + window)
    ) {
      push(i);
    } else if (i < current - window || i > current + window) {
      push("…");
    }
  }
  return out;
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
          <SermonPlayer sermon={sermon} variant="row" />
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
