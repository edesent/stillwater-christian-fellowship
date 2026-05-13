import type { Metadata } from "next";
import Image from "next/image";
import {
  BookOpen,
  Mail,
  MessageCircleHeart,
  Phone,
  Sparkles,
} from "lucide-react";
import { ChatButton } from "@/components/chat-button";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import {
  pastorLetter,
  pastors,
  romansRoad,
  site,
  siteUrl,
} from "@/lib/site";

export const metadata: Metadata = {
  title: `Steps to Salvation — ${site.name}`,
  description:
    "The Romans Road to salvation — a clear, Scripture-rooted walk through the Gospel from Pastor Bob Levesque and Still Water Christian Fellowship in Hope, Rhode Island.",
  alternates: { canonical: `${siteUrl}/steps-to-salvation` },
  openGraph: {
    title: `Steps to Salvation — ${site.name}`,
    description:
      "The Romans Road to salvation — a clear, Scripture-rooted walk through the Gospel.",
    url: `${siteUrl}/steps-to-salvation`,
    type: "article",
  },
};

export default function StepsToSalvationPage() {
  return (
    <>
      <StepsJsonLd />
      <main className="overflow-hidden bg-paper">
        <Header />
        <Hero />
        <RomansRoad />
        <PastorInvitation />
        <NextSteps />
      </main>
      <Footer />
    </>
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
          Hope From Hope
        </p>
        <h1 className="serif max-w-4xl text-balance text-5xl font-bold leading-[1.04] sm:text-7xl">
          Steps To Salvation
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-white/82 sm:text-xl">
          A clear, Scripture-rooted walk through the Gospel — the Romans Road —
          showing how anyone can come to know Jesus Christ as Saviour.
        </p>
        <blockquote className="mt-6 max-w-2xl border-l-4 border-sky pl-5 text-lg leading-8 text-white/82 sm:text-xl">
          <p>
            “Look unto me, and be ye saved, all the ends of the earth..”
          </p>
          <footer className="mt-2 text-sm font-bold uppercase tracking-[0.18em] text-sky">
            - Isaiah 45:22
          </footer>
        </blockquote>
        <blockquote className="mt-6 max-w-2xl border-l-4 border-sky pl-5 text-lg leading-8 text-white/82 sm:text-xl">
          <p>
            “through His (Christ&rsquo;s) name whosoever believeth in him shall
            receive remission of sins.”
          </p>
          <footer className="mt-2 text-sm font-bold uppercase tracking-[0.18em] text-sky">
            - Acts 10:43
          </footer>
        </blockquote>
        <div className="mt-9 flex flex-wrap gap-3">
          <a
            href="#romans-road"
            className="inline-flex items-center gap-2 bg-sky px-5 py-3 text-sm font-black uppercase tracking-[0.12em] text-ink transition hover:bg-white"
          >
            <BookOpen aria-hidden="true" className="size-4" />
            Begin the Romans Road
          </a>
          <a
            href="#next-steps"
            className="inline-flex items-center gap-2 border border-white/42 px-5 py-3 text-sm font-black uppercase tracking-[0.12em] text-white transition hover:border-white hover:bg-white hover:text-ink"
          >
            <MessageCircleHeart aria-hidden="true" className="size-4" />
            Talk to Pastor Bob
          </a>
        </div>
      </div>
    </section>
  );
}

function PastorInvitation() {
  const pastor = pastors[0];

  return (
    <section className="bg-cream py-20 sm:py-28">
      <div className="section-shell">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div>
            <div className="relative aspect-square overflow-hidden bg-mist soft-shadow">
              <Image
                src={pastor.image}
                alt={`${pastor.name}, ${pastor.role}`}
                fill
                sizes="(min-width: 1024px) 38vw, 100vw"
                className="object-cover object-[50%_38%]"
              />
            </div>
            <article className="mt-6 border border-rule bg-paper p-6">
              <p className="text-xs font-black uppercase tracking-[0.22em] text-clay">
                A Word From
              </p>
              <h3 className="serif mt-3 text-2xl font-bold leading-tight text-ink">
                Pastor Bob Levesque
              </h3>
              <p className="mt-2 text-xs font-black uppercase tracking-[0.18em] text-fern">
                Senior Pastor
              </p>
            </article>
          </div>

          <div>
            <p className="text-sm font-black uppercase tracking-[0.22em] text-clay">
              {pastorLetter.eyebrow}
            </p>
            <h2 className="serif mt-4 text-balance text-5xl font-bold leading-tight text-ink sm:text-6xl">
              An invitation from a pastor who hopes you’ll{" "}
              <span className="underline decoration-sky decoration-4 underline-offset-[6px]">
                come and see
              </span>
              .
            </h2>

            <blockquote className="mt-9 border-l-4 border-sky pl-6">
              <p className="serif text-balance text-2xl font-semibold italic leading-snug text-ink sm:text-3xl">
                “{pastorLetter.openingVerse.text}”
              </p>
              <footer className="mt-3 text-xs font-black uppercase tracking-[0.22em] text-clay">
                {pastorLetter.openingVerse.reference}
              </footer>
            </blockquote>

            <div className="mt-9 space-y-5 text-lg leading-8 text-ink-soft">
              {pastorLetter.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            <blockquote className="mt-9 border-l-4 border-clay pl-6">
              <p className="serif text-balance text-xl font-semibold italic leading-relaxed text-ink sm:text-2xl">
                Jesus said, “{pastorLetter.closingVerse.text}”
              </p>
              <footer className="mt-3 text-xs font-black uppercase tracking-[0.22em] text-clay">
                {pastorLetter.closingVerse.reference}
              </footer>
            </blockquote>

            <p className="serif mt-9 text-lg italic leading-8 text-ink">
              {pastorLetter.benediction}
            </p>
            <p className="mt-8 text-sm font-bold uppercase tracking-[0.2em] text-clay">
              {pastorLetter.signOff}
            </p>
            <p className="serif mt-2 text-3xl font-bold text-ink">
              {pastorLetter.signature}
            </p>
            <p className="mt-1 text-xs font-black uppercase tracking-[0.18em] text-fern">
              Senior Pastor — {site.shortName}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function RomansRoad() {
  return (
    <section id="romans-road" className="bg-paper py-20 sm:py-28">
      <div className="section-shell">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.22em] text-clay">
              The Romans Road
            </p>
            <h2 className="serif mt-4 max-w-3xl text-balance text-5xl font-bold leading-tight text-ink sm:text-6xl">
              Seven verses that mark the way home.
            </h2>
          </div>
          <p className="max-w-xl text-lg leading-8 text-ink-soft">
            Walk the Romans Road one verse at a time. Each step tells the same
            story Scripture has always told: a holy God, a sinful people, and a
            Saviour who paid it all so that whosoever will may come.
          </p>
        </div>

        <ol className="mt-14 space-y-6">
          {romansRoad.map((step, i) => (
            <li
              key={step.reference}
              className="relative grid gap-6 border border-rule bg-cream p-7 sm:grid-cols-[auto_1fr] sm:gap-9 sm:p-10"
            >
              <div className="flex items-baseline gap-5 sm:flex-col sm:items-start sm:gap-3">
                <span
                  className="serif text-5xl font-bold leading-none text-clay sm:text-6xl"
                  aria-hidden="true"
                >
                  {(i + 1).toString().padStart(2, "0")}
                </span>
                <span className="inline-flex items-center gap-2 border-l-4 border-sky pl-3 text-xs font-black uppercase tracking-[0.2em] text-fern sm:pl-4 sm:text-sm">
                  {step.reference}
                </span>
              </div>

              <div>
                <p className="text-xs font-black uppercase tracking-[0.22em] text-clay">
                  {step.subheading}
                </p>
                <h3 className="serif mt-3 text-balance text-3xl font-bold leading-tight text-ink sm:text-4xl">
                  {step.heading}
                </h3>
                <blockquote className="mt-5 border-l-4 border-rule pl-5">
                  <p className="serif text-balance text-lg italic leading-relaxed text-ink-soft sm:text-xl">
                    “{step.verse}”
                  </p>
                </blockquote>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-14 border-l-4 border-sky bg-mist/55 p-7 sm:p-10">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-fern">
            A Prayer of Faith
          </p>
          <p className="serif mt-4 text-balance text-2xl italic leading-snug text-ink sm:text-3xl">
            “Lord Jesus, I know that I am a sinner and that I cannot save
            myself. I believe You died for my sins and rose again. I now turn
            from my sin and trust You alone as my Saviour. Thank You for the
            gift of eternal life. Amen.”
          </p>
          <p className="mt-5 text-base leading-7 text-ink-soft">
            A prayer does not save — Jesus does. But if you have called on Him
            in faith from your heart, the Bible promises you are saved. We
            would love to rejoice with you and help you take the next step.
          </p>
        </div>
      </div>
    </section>
  );
}

function NextSteps() {
  return (
    <section id="next-steps" className="bg-ink py-20 text-white sm:py-28">
      <div className="section-shell">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.22em] text-sky">
              What’s Next
            </p>
            <h2 className="serif mt-4 text-balance text-5xl font-bold leading-tight sm:text-6xl">
              Have you trusted Christ? Tell someone.
            </h2>
          </div>
          <p className="max-w-xl text-lg leading-8 text-white/72">
            Whether you placed your faith in Jesus today, you have questions,
            or you simply want to talk it through — Pastor Bob would count it a
            joy to hear from you and pray with you.
          </p>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          <article className="flex flex-col border border-white/14 bg-white/5 p-7 backdrop-blur-sm">
            <div className="grid size-12 place-items-center border border-sky/55 bg-white/8 text-sky">
              <MessageCircleHeart aria-hidden="true" className="size-6" />
            </div>
            <h3 className="serif mt-7 text-2xl font-bold leading-tight">
              Start a chat
            </h3>
            <p className="mt-3 text-sm leading-7 text-white/72">
              Send a private message and Pastor Bob will personally reply,
              usually within a day.
            </p>
            <div className="mt-6">
              <ChatButton />
            </div>
          </article>

          <article className="flex flex-col border border-white/14 bg-white/5 p-7 backdrop-blur-sm">
            <div className="grid size-12 place-items-center border border-sky/55 bg-white/8 text-sky">
              <Mail aria-hidden="true" className="size-6" />
            </div>
            <h3 className="serif mt-7 text-2xl font-bold leading-tight">
              Email the pastor
            </h3>
            <p className="mt-3 text-sm leading-7 text-white/72">
              Write a note about your decision, your questions, or a prayer
              request — Pastor Bob reads every one.
            </p>
            <a
              href={`mailto:${site.email}?subject=Steps to Salvation`}
              className="mt-6 inline-flex items-center gap-2 border border-white/42 px-5 py-3 text-sm font-black uppercase tracking-[0.12em] text-white transition hover:border-white hover:bg-white hover:text-ink"
            >
              <Mail aria-hidden="true" className="size-4" />
              {site.email}
            </a>
          </article>

          <article className="flex flex-col border border-white/14 bg-white/5 p-7 backdrop-blur-sm">
            <div className="grid size-12 place-items-center border border-sky/55 bg-white/8 text-sky">
              <Phone aria-hidden="true" className="size-6" />
            </div>
            <h3 className="serif mt-7 text-2xl font-bold leading-tight">
              Call the church
            </h3>
            <p className="mt-3 text-sm leading-7 text-white/72">
              Prefer to talk? Reach the church office and we will return your
              call as soon as possible.
            </p>
            <a
              href={`tel:${site.phone.replace(/[^0-9]/g, "")}`}
              className="mt-6 inline-flex items-center gap-2 border border-white/42 px-5 py-3 text-sm font-black uppercase tracking-[0.12em] text-white transition hover:border-white hover:bg-white hover:text-ink"
            >
              <Phone aria-hidden="true" className="size-4" />
              {site.phone}
            </a>
          </article>
        </div>

      </div>
    </section>
  );
}

function StepsJsonLd() {
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
            name: "Steps to Salvation",
            item: `${siteUrl}/steps-to-salvation`,
          },
        ],
      },
      {
        "@type": "WebPage",
        name: `Steps to Salvation — ${site.name}`,
        url: `${siteUrl}/steps-to-salvation`,
        description:
          "The Romans Road to salvation — a clear, Scripture-rooted walk through the Gospel.",
        inLanguage: "en-US",
        isPartOf: { "@id": `${siteUrl}/#website` },
        about: { "@id": churchId },
        primaryImageOfPage: `${siteUrl}/stillwater/bible-study.jpg`,
        mainEntity: {
          "@type": "HowTo",
          name: "Steps to Salvation — The Romans Road",
          description:
            "Seven Scripture passages from the book of Romans that explain the Gospel of Jesus Christ.",
          step: romansRoad.map((step, i) => ({
            "@type": "HowToStep",
            position: i + 1,
            name: step.heading,
            text: `${step.verse} (${step.reference})`,
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