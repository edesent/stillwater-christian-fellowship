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

  const ministryDescription =
    ministry.slug === "childrens-ministry-vbs"
      ? <>Along with their Parents and Guardians, the Church Family is called upon to help to raise the children, <em>"in the fear and admonition of the Lord."</em> We are reminded in the Scriptures to, <em>"Train up a child in the way he should go.."</em> Ms. Carol and her Staff do a Wonderful job of carrying out that Godly Commission. The SWCF Family is whole-heartedly committed to Supporting those Efforts!</>
      : ministry.slug === "soul-winners-ministry"
        ? <>Jesus commanded His followers to, <em>"Go into all the world, and preach the gospel to every creature."</em><br />God's Word reminds us also, that <em>"he who winneth souls is wise"</em> The saints of SWCF are committed to this Commission.</>
        : ministry.slug === "providence-rescue-mission"
          ? <>The Bible tells us that it is <em>"more blessed to give than to receive."</em> The Rescue Mission has taken that Truth to Heart and is all about Giving. They are not just <em>"hearers of the Word, but doers also."</em><br />Jesus reminds us in Luke 3:11 - <em>"..He that hath two coats, let him impart to him that hath none; and he that hath meat, let him do likewise.."</em> This is Truly living out the command to <em>"do for the least!"</em><br />SWCF whole-heartedly supports this Blessing Ministry.</>
          : "This section is ready for expanded ministry information, testimony, outreach details, schedules, announcements, and future ministry updates.";

  const ministryScripture =
    ministry.slug === "visitation-ministry"
      ? {
          text: "God, that comforteth those that are cast down, comforted us by the coming of Titus",
          reference: "2 Corinthians 7:6",
        }
      : ministry.slug === "ladies-caring-sharing-ministry"
        ? {
            text: "certain women, which had been healed of evil spirits and infirmities.. ministered unto him of their substance.",
            reference: "Luke 8:2-3",
          }
        : ministry.slug === "childrens-ministry-vbs"
          ? {
              text: "Suffer the little children to come unto me, and forbid them not: for of such is the kingdom of God.",
              reference: "Mark 10:14",
            }
          : ministry.slug === "soul-winners-ministry"
            ? {
                text: "..Go out into the highways and hedges, and compel them to come in, that my house may be filled",
                reference: "Luke 14:23",
              }
            : ministry.slug === "mens-discipleship-breakfast-ministry"
              ? {
                  text: "Iron sharpeneth iron; so a man sharpeneth the countenance of his friend.",
                  reference: "Proverbs 27:17",
                }
              : ministry.slug === "providence-rescue-mission"
              ? {
                  text: "when thou makest a feast, call the poor, the maimed, the lame, the blind.. for they cannot recompense thee..",
                  reference: "Luke 14:13-14",
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
                  {ministryDescription}
                </p>

              </div>

              {ministry.slug === "childrens-ministry-vbs" ? (
                <figure className="border border-rule bg-paper p-3">
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="relative aspect-[3/4] overflow-hidden bg-mist">
                      <Image
                        src="/uploads/childrens-armour-of-god-1.jpg"
                        alt="Child wearing armour for Children's Ministry"
                        fill
                        sizes="(min-width: 1024px) 16vw, 50vw"
                        className="object-cover"
                      />
                    </div>
                    <div className="relative aspect-[3/4] overflow-hidden bg-mist">
                      <Image
                        src="/uploads/childrens-armour-of-god-2.jpg"
                        alt="Child wearing armour for Children's Ministry"
                        fill
                        sizes="(min-width: 1024px) 16vw, 50vw"
                        className="object-cover"
                      />
                    </div>
                  </div>
                  <figcaption className="mt-4 text-center text-sm italic leading-6 text-ink-soft">
                    “Put on the whole armour of God, that ye may be able to stand against the wiles of the devil.”<br />
                    <span className="font-bold not-italic">- Ephesians 6:11</span>
                  </figcaption>
                </figure>
              ) : (
                <div className="grid gap-6 sm:grid-cols-2">
                  <figure className="border border-rule bg-paper p-3">
                    <div className="relative aspect-[4/3] overflow-hidden bg-mist">
                      <Image
                        src={ministry.slug === "soul-winners-ministry" ? "/uploads/tractfolding6-25.jpg" : ministry.image}
                        alt={ministry.slug === "soul-winners-ministry" ? "Tract Folding and Door Hanger Prep" : ministry.title}
                        fill
                        sizes="(min-width: 1024px) 30vw, 100vw"
                        className="object-cover"
                      />
                    </div>
                    <figcaption className="mt-3 text-sm italic leading-6 text-ink-soft">
                      {ministry.slug === "soul-winners-ministry" ? "Tract Folding and Door Hanger Prep" : "Placeholder caption for future ministry photos and event highlights."}
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
              )}
            </div>

            <div className="mt-16 border-l-4 border-sky bg-paper p-8">
              <p className="text-sm font-black uppercase tracking-[0.22em] text-clay">
                Ministry Scripture
              </p>

              <blockquote className="mt-5">
                <p className="serif text-2xl italic leading-relaxed text-ink sm:text-3xl">
                  “{ministryScripture.text}”
                </p>
                <cite className="mt-4 block text-sm font-black uppercase tracking-[0.16em] text-clay not-italic">
                  {ministryScripture.reference}
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
