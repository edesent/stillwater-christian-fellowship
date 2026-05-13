import type { Metadata } from "next";
import Link from "next/link";
import { MessageCircleHeart, Sparkles } from "lucide-react";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { pastorLetter, site, siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: `From The Pastor — ${site.name}`,
  description:
    "A message of Gospel hope from Pastor Bob Levesque of Still Water Christian Fellowship in Hope, Rhode Island.",
  alternates: { canonical: `${siteUrl}/from-the-pastor` },
};

export default function FromThePastorPage() {
  return (
    <>
      <FromThePastorJsonLd />
      <main className="overflow-hidden bg-paper">
        <Header />
        <Hero />
        <Letter />
        <Invitation />
      </main>
      <Footer />
    </>
  );
}

function Hero() {
  return (
    <section className="relative bg-ink text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(94,183,222,0.34),transparent_34%),linear-gradient(90deg,rgba(8,43,62,0.98),rgba(13,75,105,0.82)_52%,rgba(58,155,197,0.36))]" />
      <div className="section-shell relative pb-16 pt-32 sm:pb-20 sm:pt-40">
        <div className="grid items-center gap-10 lg:grid-cols-[1.08fr_0.92fr]">
          <div>
            <p className="mb-5 inline-flex items-center gap-2 border-l-4 border-sky pl-4 text-sm font-bold uppercase tracking-[0.2em] text-sky">
              <Sparkles aria-hidden="true" className="size-4" />
              {pastorLetter.eyebrow}
            </p>
            <h1 className="serif max-w-4xl text-balance text-5xl font-bold leading-[1.04] sm:text-7xl">
              From The Pastor
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/82 sm:text-xl">
              A message of Gospel Hope from Pastor Bob Levesque to our Neighbors in
              Hope and the surrounding Community.
            </p>
            <blockquote className="mt-6 max-w-2xl border-l-4 border-sky pl-5 text-lg leading-8 text-white/82 sm:text-xl">
              <p>
                “ye were without Christ.. having no hope, and without God in the world”
              </p>
              <footer className="mt-2 text-sm font-bold uppercase tracking-[0.18em] text-sky">
                - Ephesians 2:12
              </footer>
            </blockquote>
          </div>
          <img
            src="/stillwater/from-the-pastor-bob-8-10-25.jpg"
            alt="Pastor Bob Levesque preaching at Still Water Christian Fellowship"
            className="w-full rounded-sm border border-white/20 object-cover shadow-2xl"
          />
        </div>
      </div>
    </section>
  );
}

function Letter() {
  return (
    <section className="bg-cream py-16 sm:py-24">
      <div className="section-shell">
        <article className="mx-auto max-w-4xl border border-rule bg-paper p-7 shadow-sm sm:p-10 lg:p-14">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-clay">
            {pastorLetter.openingVerse.reference}
          </p>
          <blockquote className="mt-4 border-l-4 border-sky pl-5">
            <p className="serif text-balance text-2xl font-semibold italic leading-tight text-ink sm:text-3xl">
              “{pastorLetter.openingVerse.text}”
            </p>
          </blockquote>

          <div className="mt-10 grid gap-6">
            {pastorLetter.paragraphs.map((paragraph) => (
              <p
                key={paragraph}
                className="text-base leading-8 text-ink-soft sm:text-lg"
              >
                {paragraph}
              </p>
            ))}
          </div>

          <blockquote className="mt-10 border-l-4 border-sky pl-5">
            <p className="text-sm font-black uppercase tracking-[0.22em] text-clay">
              {pastorLetter.closingVerse.reference}
            </p>
            <p className="serif mt-3 text-balance text-2xl font-semibold italic leading-tight text-ink sm:text-3xl">
              “{pastorLetter.closingVerse.text}”
            </p>
          </blockquote>

          <p className="mt-10 text-base leading-8 text-ink-soft sm:text-lg">
            {pastorLetter.benediction}
          </p>
          <div className="mt-8">
            <p className="text-base leading-7 text-ink-soft">
              {pastorLetter.signOff}
            </p>
            <p className="serif mt-2 text-3xl font-bold text-ink">
              {pastorLetter.signature}
            </p>
          </div>
        </article>
      </div>
    </section>
  );
}

function Invitation() {
  return (
    <section className="bg-ink py-16 text-white sm:py-20">
      <div className="section-shell text-center">
        <MessageCircleHeart aria-hidden="true" className="mx-auto size-10 text-sky" />
        <h2 className="serif mx-auto mt-5 max-w-3xl text-balance text-4xl font-bold leading-tight sm:text-5xl">
          Come and see what Christ has done.
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/78">
          We would be honored to welcome you to Still Water Christian
          Fellowship, answer your questions, and share the hope found only in
          Jesus Christ.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <Link
            href="/#visit"
            className="inline-flex items-center gap-2 bg-sky px-5 py-3 text-sm font-black uppercase tracking-[0.12em] text-ink transition hover:bg-white"
          >
            Plan Your Visit
          </Link>
          <Link
            href="/steps-to-salvation"
            className="inline-flex items-center gap-2 border border-white/42 px-5 py-3 text-sm font-black uppercase tracking-[0.12em] text-white transition hover:border-white hover:bg-white hover:text-ink"
          >
            Steps to Salvation
          </Link>
        </div>
      </div>
    </section>
  );
}

function FromThePastorJsonLd() {
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
            name: "From The Pastor",
            item: `${siteUrl}/from-the-pastor`,
          },
        ],
      },
      {
        "@type": "WebPage",
        name: `From The Pastor — ${site.name}`,
        url: `${siteUrl}/from-the-pastor`,
        description:
          "A message of Gospel hope from Pastor Bob Levesque of Still Water Christian Fellowship.",
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
