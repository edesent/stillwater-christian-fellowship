import type { Metadata } from "next";
import Image from "next/image";
import { ArrowUpRight, HandHeart, Heart, Sparkles } from "lucide-react";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { site, siteUrl } from "@/lib/site";

const TITHELY_EMBED_URL = "https://give.tithe.ly/?c=1383729";

export const metadata: Metadata = {
  title: `Give — ${site.name}`,
  description: `Give to the ministry of ${site.name} in Hope, Rhode Island. Online giving is processed securely through Tithe.ly.`,
  alternates: { canonical: `${siteUrl}/give` },
};

export default function GivePage() {
  return (
    <>
      <GiveJsonLd />
      <main className="overflow-hidden bg-paper">
        <Header />
        <Hero />
        <Embed />
        <OtherWays />
      </main>
      <Footer />
    </>
  );
}

function Hero() {
  return (
    <section className="relative bg-ink text-white">
      <Image
        src="/stillwater/community.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-center opacity-40"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,43,62,0.96),rgba(13,75,105,0.78)_50%,rgba(58,155,197,0.32))]" />

      <div className="section-shell relative pb-16 pt-32 sm:pb-20 sm:pt-40">
        <p className="mb-5 inline-flex items-center gap-2 border-l-4 border-sky pl-4 text-sm font-bold uppercase tracking-[0.2em] text-sky">
          <Sparkles aria-hidden="true" className="size-4" />
          Cheerful Givers
        </p>
        <h1 className="serif max-w-4xl text-balance text-5xl font-bold leading-[1.04] sm:text-7xl">
          Give to support the work.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-white/82 sm:text-xl">
          Every tithe and offering helps Still Water proclaim the Gospel,
          disciple believers, and serve the Village of Hope. Online giving is
          processed securely through Tithe.ly directly below — or use one of
          the other ways to give.
        </p>
      </div>
    </section>
  );
}

function Embed() {
  return (
    <section className="bg-paper py-12 sm:py-16">
      <div className="section-shell">
        <div className="border border-rule bg-white p-3 shadow-sm sm:p-5">
          <div className="mb-3 flex items-center justify-between gap-3 px-2 sm:px-3">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-clay">
              Secure Giving
            </p>
            <a
              href={site.give}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.16em] text-ink-soft transition hover:text-ink"
            >
              Open in Tithe.ly
              <ArrowUpRight aria-hidden="true" className="size-3.5" />
            </a>
          </div>
          <iframe
            src={TITHELY_EMBED_URL}
            title={`Give to ${site.name} via Tithe.ly`}
            className="block h-[1000px] w-full border-0 bg-white"
            loading="lazy"
            allow="payment"
          />
        </div>
        <p className="mt-3 text-center text-xs text-ink-soft">
          Giving form provided by{" "}
          <a
            href="https://tithe.ly/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-clay underline-offset-4 hover:underline"
          >
            Tithe.ly
          </a>
          . If the form does not load, click “Open in Tithe.ly” above.
        </p>
      </div>
    </section>
  );
}

function OtherWays() {
  return (
    <section className="bg-cream py-16 sm:py-20">
      <div className="section-shell">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.22em] text-clay">
              Other Ways to Give
            </p>
            <h2 className="serif mt-4 text-balance text-4xl font-bold leading-tight text-ink sm:text-5xl">
              Generosity, with gratitude.
            </h2>
          </div>
          <p className="max-w-xl text-base leading-7 text-ink-soft">
            “Each one must give as he has decided in his heart, not reluctantly
            or under compulsion, for God loves a cheerful giver.” — 2 Corinthians 9:7
          </p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          <article className="border border-rule bg-paper p-7">
            <div className="grid size-12 place-items-center border border-sky/55 bg-mist text-fern">
              <Heart aria-hidden="true" className="size-6" />
            </div>
            <h3 className="serif mt-7 text-2xl font-bold text-ink">In Person</h3>
            <p className="mt-3 text-sm leading-7 text-ink-soft">
              Place tithes and offerings in the box at the back of the
              sanctuary on Sundays.
            </p>
          </article>

          <article className="border border-rule bg-paper p-7">
            <div className="grid size-12 place-items-center border border-sky/55 bg-mist text-fern">
              <HandHeart aria-hidden="true" className="size-6" />
            </div>
            <h3 className="serif mt-7 text-2xl font-bold text-ink">By Mail</h3>
            <p className="mt-3 text-sm leading-7 text-ink-soft">
              Checks payable to {site.name} can be mailed to{" "}
              {site.address} 02831.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}

function GiveJsonLd() {
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
            name: "Give",
            item: `${siteUrl}/give`,
          },
        ],
      },
      {
        "@type": "WebPage",
        name: `Give — ${site.name}`,
        url: `${siteUrl}/give`,
        description: `Give to the ministry of ${site.name} in Hope, Rhode Island.`,
        inLanguage: "en-US",
        isPartOf: { "@id": `${siteUrl}/#website` },
        about: { "@id": `${siteUrl}/#church` },
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
