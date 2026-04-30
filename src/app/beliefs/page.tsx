import type { Metadata } from "next";
import Image from "next/image";
import { Sparkles } from "lucide-react";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { site, siteUrl, statementOfFaith } from "@/lib/site";

export const metadata: Metadata = {
  title: `What We Believe — ${site.name}`,
  description: `Statement of Faith for ${site.name} — the doctrines that anchor every sermon, prayer, and ministry.`,
  alternates: { canonical: `${siteUrl}/beliefs` },
};

export default function BeliefsPage() {
  return (
    <>
      <BeliefsJsonLd />
      <main className="overflow-hidden bg-paper">
        <Header />
        <Hero />
        <Articles />
      </main>
      <Footer />
    </>
  );
}

function BeliefsJsonLd() {
  const churchId = `${siteUrl}/#church`;
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: siteUrl,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "What We Believe",
            item: `${siteUrl}/beliefs`,
          },
        ],
      },
      {
        "@type": "WebPage",
        name: `What We Believe — ${site.name}`,
        url: `${siteUrl}/beliefs`,
        description: `Statement of Faith for ${site.name} in Hope, Rhode Island.`,
        inLanguage: "en-US",
        isPartOf: { "@id": `${siteUrl}/#website` },
        about: { "@id": churchId },
        primaryImageOfPage: `${siteUrl}/stillwater/bible-study.jpg`,
        mainEntity: {
          "@type": "ItemList",
          name: "Statement of Faith",
          numberOfItems: statementOfFaith.length,
          itemListElement: statementOfFaith.map((article, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: article,
          })),
        },
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

function Hero() {
  return (
    <section className="relative bg-ink text-white">
      <Image
        src="/stillwater/bible-study.jpg"
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
          Statement of Faith
        </p>
        <h1 className="serif max-w-4xl text-balance text-5xl font-bold leading-[1.04] sm:text-7xl">
          What We Believe
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-white/82 sm:text-xl">
          The doctrines below are the convictions that anchor every sermon,
          prayer, and ministry at Still Water.
        </p>
      </div>
    </section>
  );
}

function Articles() {
  return (
    <section className="bg-paper py-16 sm:py-24">
      <div className="section-shell">
        <ol className="grid gap-3">
          {statementOfFaith.map((article, index) => (
            <li
              key={index}
              className="flex gap-5 border border-rule bg-cream p-6 sm:gap-7 sm:p-8"
            >
              <span
                className="serif shrink-0 text-3xl font-bold leading-none text-clay sm:text-4xl"
                aria-hidden="true"
              >
                {(index + 1).toString().padStart(2, "0")}
              </span>
              <p className="text-base leading-8 text-ink-soft sm:text-lg">
                {article}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
