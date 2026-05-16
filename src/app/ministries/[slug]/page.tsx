import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { LightboxImage } from "@/components/lightbox-image";
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
        ? <>Jesus commanded His followers to, <em>"Go into all the world, and preach the gospel to every creature."</em><br />God's Word reminds us also, that <em>"he who winneth souls is wise"</em> The saints of SWCF are committed to this Commission.<br /><em>".. as my Father hath sent me, even so send I you."</em><br />- John 20:21</>
        : ministry.slug === "providence-rescue-mission"
          ? <>The Bible tells us that it is <em>"more blessed to give than to receive."</em> The Rescue Mission has taken that Truth to Heart and is all about Giving. They are not just <em>"hearers of the Word, but doers also."</em><br />Jesus reminds us in Luke 3:11 - <em>"..He that hath two coats, let him impart to him that hath none; and he that hath meat, let him do likewise.."</em> This is Truly living out the command to <em>"do for the least!"</em><br />SWCF whole-heartedly supports this Blessing Ministry.</>
          : ministry.slug === "ladies-caring-sharing-ministry"
            ? <>The Bible reminds us that our Search for The Truth of Christ, we will not be ashamed.<br />It is declared concerning that Great Wisdom of the Scriptures, Christ, that - <em>"..those that seek me early shall find me."</em><br />The Ladies of SWCF certainly Seek after the Lord with a Great Love and Zeal.. All rooted in an Unshakeable Faith.</>
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
            src={
              ministry.slug === "childrens-ministry-vbs"
                ? "/uploads/day3-batch1-start-teaching4.jpg"
                : ministry.image
            }
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
                <h2 className="serif mt-4 text-balance text-4xl font-bold italic leading-tight text-ink sm:text-5xl">
                  {ministry.slug === "soul-winners-ministry" ? (
                    <>
                      “..how shall they hear without a preacher?.. and how shall they preach, except they be sent?”<br />
                      <span className="text-2xl sm:text-3xl">- Romans 10:14-15</span>
                    </>
                  ) : ministry.slug === "ladies-caring-sharing-ministry" ? (
                    <>
                      “..the angel.. said unto the women, Fear not ye: for I know that ye seek Jesus..”<br />
                      <span className="text-2xl sm:text-3xl">- Matthew 28:5</span>
                    </>
                  ) : ministry.slug === "mens-discipleship-breakfast-ministry" ? (
                    <>
                      “..If ye continue in my word, then are ye my disciples indeed”<br />
                      <span className="text-2xl sm:text-3xl">- John 8:31</span>
                    </>
                  ) : (
                    "A Place for Fellowship, Service, and Growth"
                  )}
                </h2>
                <p className="mt-6 text-lg leading-8 text-ink-soft">
                  {ministryDescription}
                </p>

              </div>

              {ministry.slug === "childrens-ministry-vbs" ? (
                <figure className="border border-rule bg-paper p-3">
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="relative aspect-[3/4] overflow-hidden bg-mist">
                      <LightboxImage
                        src="/uploads/img1.jpg"
                        alt="Child wearing armour for Children's Ministry"
                        fill
                        sizes="(min-width: 1024px) 16vw, 50vw"
                        className="object-contain object-top"
                        title="Children's Ministry — The Armour of God"
                        description={
                          <>
                            <p>
                              The children of SWCF learning what it means to
                              put on the whole armour of God.
                            </p>
                            <p className="mt-3 italic">
                              “Put on the whole armour of God, that ye may be
                              able to stand against the wiles of the devil.”
                              <br />
                              <span className="font-bold not-italic">
                                — Ephesians 6:11
                              </span>
                            </p>
                          </>
                        }
                      />
                    </div>
                    <div className="relative aspect-[3/4] overflow-hidden bg-mist">
                      <LightboxImage
                        src="/uploads/img2.jpg"
                        alt="Child wearing armour for Children's Ministry"
                        fill
                        sizes="(min-width: 1024px) 16vw, 50vw"
                        className="object-contain object-top"
                        title="Children's Ministry — The Armour of God"
                        description={
                          <>
                            <p>
                              Suited up and ready to stand — our children
                              learning the Christian soldier's armour piece by
                              piece.
                            </p>
                            <p className="mt-3 italic">
                              “Put on the whole armour of God, that ye may be
                              able to stand against the wiles of the devil.”
                              <br />
                              <span className="font-bold not-italic">
                                — Ephesians 6:11
                              </span>
                            </p>
                          </>
                        }
                      />
                    </div>
                  </div>
                  <figcaption className="mt-4 text-center text-sm italic leading-6 text-ink-soft">
                    “Put on the whole armour of God, that ye may be able to stand against the wiles of the devil.”<br />
                    <span className="font-bold not-italic">- Ephesians 6:11</span>
                  </figcaption>

                  <figure className="mt-8 border-t border-rule pt-6">
                    <div className="relative aspect-[5/3] overflow-hidden bg-mist">
                      <LightboxImage
                        src="/uploads/day3-batch1-start-teaching4.jpg"
                        alt="Children hearing God's Word during VBS"
                        fill
                        sizes="(min-width: 1024px) 36vw, 100vw"
                        className="object-cover"
                        title="VBS — Teaching God's Word"
                        description={
                          <>
                            <p>
                              Children hearing the Word of God preached during
                              Vacation Bible School at Still Water.
                            </p>
                            <p className="mt-3 italic">
                              “faith cometh by hearing, and hearing by the word
                              of God”
                              <br />
                              <span className="font-bold not-italic">
                                — Romans 10:17
                              </span>
                            </p>
                          </>
                        }
                      />
                    </div>
                    <figcaption className="mt-4 text-center text-sm italic leading-6 text-ink-soft">
                      “faith cometh by hearing, and hearing by the word of God”<br />
                      <span className="font-bold not-italic">- Romans 10:17</span>
                    </figcaption>
                  </figure>
                </figure>
              ) : ministry.slug === "soul-winners-ministry" ? (
                <div className="space-y-6">
                  <div className="grid gap-6 sm:grid-cols-2">
                  <figure className="border border-rule bg-paper p-3">
                    <div className="relative aspect-[4/3] overflow-hidden bg-mist">
                      <LightboxImage
                        src="/uploads/tractfolding6-25.jpg"
                        alt="Tract Folding and Door Hanger Prep"
                        fill
                        sizes="(min-width: 1024px) 30vw, 100vw"
                        className="object-cover"
                        title="Soul Winners — Tract & Door Hanger Prep"
                        description={
                          <>
                            <p>
                              Members of SWCF folding gospel tracts and
                              preparing door hangers ahead of going out into
                              Hope and the surrounding area.
                            </p>
                            <p className="mt-3 italic">
                              “Go ye into all the world, and preach the gospel
                              to every creature.”
                              <br />
                              <span className="font-bold not-italic">
                                — Mark 16:15
                              </span>
                            </p>
                          </>
                        }
                      />
                    </div>
                    <figcaption className="mt-3 text-sm italic leading-6 text-ink-soft">
                      Tract Folding and Door Hanger Prep
                    </figcaption>
                  </figure>

                  <figure className="border border-rule bg-paper p-3">
                    <div className="relative aspect-[4/3] overflow-hidden bg-mist">
                      <LightboxImage
                        src={ministry.image}
                        alt={ministry.title}
                        fill
                        sizes="(min-width: 1024px) 30vw, 100vw"
                        className="object-cover"
                        title="Soul Winners — Sharing the Truth"
                        description={
                          <>
                            <p>
                              The saints of Still Water going out to share the
                              life-changing truth of Jesus Christ.
                            </p>
                            <p className="mt-3 italic">
                              “ye shall know the truth, and the truth shall
                              make you free.”
                              <br />
                              <span className="font-bold not-italic">
                                — John 8:32
                              </span>
                            </p>
                          </>
                        }
                      />
                    </div>
                    <figcaption className="mt-3 text-sm italic leading-6 text-ink-soft">
                      “ye shall know the truth, and the truth shall make you free.”<br />
                      <span className="font-bold not-italic">- John 8:32</span>
                    </figcaption>
                  </figure>
                  </div>

                  <figure className="border border-rule bg-paper p-3">
                    <div className="relative aspect-[16/9] overflow-hidden bg-mist">
                      <LightboxImage
                        src="/uploads/ministrytable.jpg"
                        alt="Soul Winners Ministry outreach table"
                        fill
                        sizes="100vw"
                        className="object-cover"
                        title="Soul Winners — Give ’Em Heaven!"
                        description={
                          <>
                            <p>
                              The “Give ’Em Heaven” outreach table — meeting
                              our neighbors with the message of salvation,
                              gospel tracts in hand and the love of Christ in
                              our hearts.
                            </p>
                            <p className="mt-3 italic">
                              “..Go out into the highways and hedges, and
                              compel them to come in, that my house may be
                              filled.”
                              <br />
                              <span className="font-bold not-italic">
                                — Luke 14:23
                              </span>
                            </p>
                          </>
                        }
                      />
                    </div>
                    <figcaption className="mt-3 text-center text-sm italic leading-6 text-ink-soft">
                      “Give 'Em Heaven!”
                    </figcaption>
                  </figure>
                </div>
              ) : (
                <div className="grid gap-6 sm:grid-cols-2">
                  {ministry.slug === "mens-discipleship-breakfast-ministry" && (
                    <figure className="border border-rule bg-paper p-3 sm:col-span-2">
                      <div className="relative aspect-[4/3] overflow-hidden bg-mist sm:aspect-[16/9]">
                        <LightboxImage
                          src="/uploads/5-16-26-longshotgroup.jpg"
                          alt="Men gathered for fellowship and study at Men's Discipleship Breakfast"
                          fill
                          sizes="(min-width: 1024px) 60vw, 100vw"
                          className="object-contain"
                          title="Men's Discipleship Breakfast — Fellowship and Study"
                          description={<p>5/16/26 - Fellowship and Study</p>}
                        />
                      </div>
                      <figcaption className="mt-3 text-sm italic leading-6 text-ink-soft">
                        5/16/26 - Fellowship and Study
                      </figcaption>
                    </figure>
                  )}

                  <figure className="border border-rule bg-paper p-3">
                    <div className="relative aspect-[3/4] overflow-hidden bg-mist sm:aspect-[4/5]">
                      <LightboxImage
                        src={ministry.slug === "mens-discipleship-breakfast-ministry" ? "/uploads/5-16-26-cyrusfrnchtst.jpg" : ministry.slug === "ladies-caring-sharing-ministry" ? "/uploads/5-2-26-missionaryreport-editcopy.jpg" : ministry.image}
                        alt={ministry.slug === "ladies-caring-sharing-ministry" ? "Brazil Mission Trip Report" : ministry.title}
                        fill
                        sizes="(min-width: 1024px) 30vw, 100vw"
                        className="object-contain"
                        title={ministry.slug === "ladies-caring-sharing-ministry" ? "Ladies Ministry — Brazil Mission Trip Report" : ministry.title}
                        description={
                          ministry.slug === "ladies-caring-sharing-ministry" ? (
                            <>
                              <p>
                                The Ladies Caring & Sharing fellowship hearing
                                a missionary report from Brazil — encouraging
                                one another in the worldwide work of the
                                Gospel.
                              </p>
                              <p className="mt-3 italic">
                                “How beautiful are the feet of them that preach
                                the gospel of peace.”
                                <br />
                                <span className="font-bold not-italic">
                                  — Romans 10:15
                                </span>
                              </p>
                            </>
                          ) : (
                            <p>{ministry.body}</p>
                          )
                        }
                      />
                    </div>
                    <figcaption className="mt-3 text-sm italic leading-6 text-ink-soft">
                      {ministry.slug === "mens-discipleship-breakfast-ministry" ? "The French Toast Didn't Stand a Chance!" : ministry.slug === "ladies-caring-sharing-ministry" ? "Brazil Mission Trip Report" : "Placeholder caption for future ministry photos and event highlights."}
                    </figcaption>
                  </figure>

                  <figure className="border border-rule bg-paper p-3">
                    <div className="relative aspect-[3/4] overflow-hidden bg-mist sm:aspect-[4/5]">
                      <LightboxImage
                        src={ministry.slug === "mens-discipleship-breakfast-ministry" ? "/uploads/5-16-26-scottleading.jpg" : ministry.image}
                        alt={ministry.slug === "mens-discipleship-breakfast-ministry" ? "Brother Scott leads the Men's Discipleship Breakfast study" : ministry.title}
                        fill
                        sizes="(min-width: 1024px) 30vw, 100vw"
                        className="object-contain"
                        title={ministry.slug === "mens-discipleship-breakfast-ministry" ? "Men's Discipleship Breakfast — Brother Scott Leads the Study" : ministry.title}
                        description={
                          ministry.slug === "mens-discipleship-breakfast-ministry" ? (
                            <p>5/16/26... Brother Scott leads the Study</p>
                          ) : (
                            <>
                              <p>{ministry.body}</p>
                              <p className="mt-3 italic">
                                “{ministryScripture.text}”
                                <br />
                                <span className="font-bold not-italic">
                                  — {ministryScripture.reference}
                                </span>
                              </p>
                            </>
                          )
                        }
                      />
                    </div>
                    <figcaption className="mt-3 text-sm italic leading-6 text-ink-soft">
                      {ministry.slug === "mens-discipleship-breakfast-ministry" ? "5/16/26... Brother Scott leads the Study" : "Additional placeholder image area for ministry activities and fellowship."}
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
