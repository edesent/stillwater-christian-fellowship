import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Sparkles } from "lucide-react";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { churchHistory, site, siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Our History",
  description: `The story of Still Water Christian Fellowship, from the 1765 Hope Furnace ironworks to the 1875 founding of Hope Church in the Village of Hope, Rhode Island.`,
  alternates: { canonical: `${siteUrl}/history` },
};

export default function HistoryPage() {
  return (
    <>
      <HistoryJsonLd />
      <main className="overflow-hidden bg-paper">
        <Header />
        <Hero />
        <Era era={churchHistory.furnace} accent="left" />
        <Era era={churchHistory.church} accent="right" />
        <Today />
      </main>
      <Footer />
    </>
  );
}

function Hero() {
  return (
    <section className="relative bg-ink text-white">
      <Image
        src="/stillwater/hero-water.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-[58%_48%] opacity-45"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,43,62,0.96),rgba(13,75,105,0.78)_50%,rgba(58,155,197,0.32))]" />

      <div className="section-shell relative pb-16 pt-32 sm:pb-20 sm:pt-40">
        <p className="mb-5 inline-flex items-center gap-2 border-l-4 border-sky pl-4 text-sm font-bold uppercase tracking-[0.2em] text-sky">
          <Sparkles aria-hidden="true" className="size-4" />
          Our History
        </p>
        <h1 className="serif max-w-4xl text-balance text-5xl font-bold leading-[1.04] sm:text-7xl">
          From a 1765 ironworks to a Bible-believing church.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-white/82 sm:text-xl">
          The walls of our church building have stood through Revolution,
          industry, and revival. This is the story of Hope — and of the Gospel
          that gathers us here today.
        </p>
      </div>
    </section>
  );
}

function Era({
  era,
  accent,
}: {
  era: { period: string; paragraphs: readonly string[] };
  accent: "left" | "right";
}) {
  const bg = accent === "left" ? "bg-cream" : "bg-paper";
  return (
    <section className={`${bg} py-16 sm:py-24`}>
      <div className="section-shell">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.22em] text-clay">
              Chapter
            </p>
            <h2 className="serif mt-4 text-balance text-4xl font-bold leading-tight text-ink sm:text-5xl">
              {era.period}
            </h2>
          </div>
          <div className="grid gap-6">
            {era.paragraphs.map((paragraph, index) => (
              <p
                key={index}
                className="text-base leading-8 text-ink-soft sm:text-lg"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Today() {
  return (
    <section className="bg-ink py-16 text-white sm:py-20">
      <div className="section-shell text-center">
        <p className="text-sm font-black uppercase tracking-[0.22em] text-sky">
          Today
        </p>
        <h2 className="serif mx-auto mt-4 max-w-3xl text-balance text-4xl font-bold leading-tight sm:text-5xl">
          Still Water Christian Fellowship continues the legacy.
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/78">
          Today the same building rings with the preaching of God’s Word, the
          singing of saints, and the prayers of a church family in Hope, Rhode
          Island.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <Link
            href="/#visit"
            className="inline-flex items-center gap-2 bg-sky px-5 py-3 text-sm font-black uppercase tracking-[0.12em] text-ink transition hover:bg-white"
          >
            Plan Your Visit
          </Link>
          <Link
            href="/beliefs"
            className="inline-flex items-center gap-2 border border-white/42 px-5 py-3 text-sm font-black uppercase tracking-[0.12em] text-white transition hover:border-white hover:bg-white hover:text-ink"
          >
            What We Believe
          </Link>
        </div>
      </div>
    </section>
  );
}

function HistoryJsonLd() {
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
            name: "History",
            item: `${siteUrl}/history`,
          },
        ],
      },
      {
        "@type": "AboutPage",
        name: `Our History — ${site.name}`,
        url: `${siteUrl}/history`,
        description:
          "The story of Still Water Christian Fellowship, from the 1765 Hope Furnace ironworks to the 1875 founding of Hope Church.",
        inLanguage: "en-US",
        isPartOf: { "@id": `${siteUrl}/#website` },
        about: { "@id": `${siteUrl}/#church` },
        primaryImageOfPage: `${siteUrl}/stillwater/hero-water.jpg`,
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
