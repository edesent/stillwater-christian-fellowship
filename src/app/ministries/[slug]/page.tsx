import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { ministries } from "@/lib/site";

export function generateStaticParams() {
  return ministries.map((ministry) => ({
    slug: ministry.slug,
  }));
}

export default async function MinistryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const ministry = ministries.find((item) => item.slug === slug);

  if (!ministry) {
    notFound();
  }

  const ministryScripture =
    ministry.slug === "visitation-ministry"
      ? {
          text: "God, that comforteth those that are cast down, comforted us by the coming of Titus",
          reference: "2 Corinthians 7:6",
        }
      : {
          text: "And let us consider one another to provoke unto love and to good works.",
          reference: "Hebrews 10:24",
        };

  return (
    <>
      <Header />
      <main className="bg-paper text-ink">
        <section className="relative min-h-[52svh] overflow-hidden bg-ink text-white">
          <Image
            src={ministry.image}
            alt={ministry.title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />

          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,43,62,0.92),rgba(8,43,62,0.62),rgba(8,43,62,0.38))]" />

          <div className="section-shell relative flex min-h-[52svh] flex-col justify-end py-16">
            <Link
              href="/#ministries"
              className="mb-8 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.14em] text-sky transition hover:text-white"
            >
              <ArrowLeft className="size-4" />
              Back to Ministries
            </Link>

            <p className="text-sm font-black uppercase tracking-[0.22em] text-sky">
              Ministry of Still Water Christian Fellowship
            </p>

            <h1 className="serif mt-5 max-w-5xl text-balance text-5xl font-bold leading-tight sm:text-7xl">
              {ministry.title}
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-white/82 sm:text-xl">
              {ministry.body}
            </p>
          </div>
        </section>

        <section className="bg-cream py-20 sm:py-24">
          <div className="section-shell">
            <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.22em] text-clay">
                  About This Ministry
                </p>
                <h2 className="serif mt-4 text-balance text-4xl font-bold leading-tight text-ink sm:text-5xl">
                  A Place for Fellowship, Service, and Growth
                </h2>
                <p className="mt-6 text-lg leading-8 text-ink-soft">
                  This section is ready for expanded ministry information, testimony, outreach details, schedules, announcements, and future ministry updates.
                </p>

                {"verse" in ministry && ministry.verse ? (
                  <blockquote className="mt-8 border-l-4 border-sky pl-5">
                    <p className="serif text-xl italic leading-relaxed text-ink sm:text-2xl">
                      {ministry.verse}
                    </p>
                  </blockquote>
                ) : null}
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <figure className="border border-rule bg-paper p-3">
                  <div className="relative aspect-[4/3] overflow-hidden bg-mist">
                    <Image
                      src={ministry.image}
                      alt={ministry.title}
                      fill
                      sizes="(min-width: 1024px) 30vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                  <figcaption className="mt-3 text-sm italic leading-6 text-ink-soft">
                    Placeholder caption for future ministry photos and event highlights.
                  </figcaption>
                </figure>

                <figure className="border border-rule bg-paper p-3">
                  <div className="relative aspect-[4/3] overflow-hidden bg-mist">
                    <Image
                      src={ministry.image}
                      alt={ministry.title}
                      fill
                      sizes="(min-width: 1024px) 30vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                  <figcaption className="mt-3 text-sm italic leading-6 text-ink-soft">
                    Additional placeholder image area for ministry activities and fellowship.
                  </figcaption>
                </figure>
              </div>
            </div>

            <div className="mt-16 border-l-4 border-sky bg-paper p-8">
              <p className="text-sm font-black uppercase tracking-[0.22em] text-clay">
                Ministry Scripture
              </p>

              <blockquote className="mt-5">
                <p className="serif text-2xl italic leading-relaxed text-ink sm:text-3xl">
                  “And let us consider one another to provoke unto love and to good works.”
                </p>
                <cite className="mt-4 block text-sm font-black uppercase tracking-[0.16em] text-clay not-italic">
                  Hebrews 10:24
                </cite>
              </blockquote>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
