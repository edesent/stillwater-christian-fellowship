import type { Metadata } from "next";
import Image from "next/image";
import { Sparkles } from "lucide-react";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { elders, leadershipPortraits, pastors, site, siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: `Leadership — ${site.name}`,
  description: `Meet the pastor and elders of ${site.name} in Hope, Rhode Island — faithful men shepherding the flock with Scripture and care.`,
  alternates: { canonical: `${siteUrl}/leadership` },
};

export default function LeadershipPage() {
  return (
    <>
      <LeadershipJsonLd />
      <main className="overflow-hidden bg-paper">
        <Header />
        <Hero />
        <Portraits />
        <FullTeam />
      </main>
      <Footer />
    </>
  );
}

function Hero() {
  return (
    <section className="relative bg-ink text-white">
      <Image
        src="/stillwater/5-3-26_PastorBobCherylLevesque.jpeg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-center opacity-35"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,43,62,0.96),rgba(13,75,105,0.78)_50%,rgba(58,155,197,0.32))]" />

      <div className="section-shell relative pb-16 pt-32 sm:pb-20 sm:pt-40">
        <p className="mb-5 inline-flex items-center gap-2 border-l-4 border-sky pl-4 text-sm font-bold uppercase tracking-[0.2em] text-sky">
          <Sparkles aria-hidden="true" className="size-4" />
          Pastor &amp; Elders
        </p>
        <h1 className="serif max-w-4xl text-balance text-5xl font-bold leading-[1.04] sm:text-7xl">
          Leadership at Still Water
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-white/82 sm:text-xl">
          Faithful men — with their wives serving alongside them — shepherding
          the flock with Scripture, prayer, and care.
        </p>
      </div>
    </section>
  );
}

function Portraits() {
  return (
    <section className="bg-paper py-16 sm:py-24">
      <div className="section-shell space-y-16 sm:space-y-24">
        {leadershipPortraits.map((person, i) => {
          const reverse = i % 2 === 1;
          return (
            <article
              key={person.name}
              className={`grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center ${
                reverse ? "lg:[&>div:first-child]:order-2" : ""
              }`}
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-mist soft-shadow">
                <Image
                  src={person.image}
                  alt={person.name}
                  fill
                  sizes="(min-width: 1024px) 48vw, 100vw"
                  className="object-cover object-center"
                />
              </div>

              <div>
                <p className="text-xs font-black uppercase tracking-[0.22em] text-fern">
                  {person.role}
                </p>
                <h2 className="serif mt-4 text-balance text-4xl font-bold leading-tight text-ink sm:text-5xl">
                  {person.name}
                </h2>
                <p className="mt-6 text-lg leading-8 text-ink-soft">
                  {person.body}
                </p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function FullTeam() {
  const assistant = pastors[1];
  const otherElders = elders.filter(
    (e) =>
      !leadershipPortraits.some((p) => p.name.toLowerCase().includes(e.name.split(" ").pop()!.toLowerCase()))
  );

  return (
    <section className="bg-cream py-16 sm:py-20">
      <div className="section-shell">
        <p className="text-sm font-black uppercase tracking-[0.22em] text-clay">
          Serving Alongside
        </p>
        <h2 className="serif mt-4 text-balance text-4xl font-bold leading-tight text-ink sm:text-5xl">
          A team that loves this church.
        </h2>
        <p className="mt-5 max-w-2xl text-base leading-7 text-ink-soft">
          Still Water is also blessed with an assistant pastor and faithful
          elders who labor in the Word and care for the flock.
        </p>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {assistant ? (
            <article className="border border-rule bg-paper p-6">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-fern">
                {assistant.role}
              </p>
              <h3 className="serif mt-3 text-2xl font-bold leading-tight text-ink">
                {assistant.name}
              </h3>
            </article>
          ) : null}

          {otherElders.map((elder) => (
            <article
              key={elder.name}
              className="border border-rule bg-paper p-6"
            >
              <p className="text-xs font-black uppercase tracking-[0.18em] text-fern">
                Elder
              </p>
              <h3 className="serif mt-3 text-2xl font-bold leading-tight text-ink">
                {elder.name}
              </h3>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function LeadershipJsonLd() {
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
            name: "Leadership",
            item: `${siteUrl}/leadership`,
          },
        ],
      },
      {
        "@type": "WebPage",
        name: `Leadership — ${site.name}`,
        url: `${siteUrl}/leadership`,
        description: `Meet the pastor and elders of ${site.name}.`,
        inLanguage: "en-US",
        isPartOf: { "@id": `${siteUrl}/#website` },
        about: { "@id": churchId },
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
