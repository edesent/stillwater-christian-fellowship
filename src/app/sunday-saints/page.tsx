export const metadata = {
  title: "Sunday Saints | Still Water Christian Fellowship",
  description:
    "Photos, descriptions, dates, and highlights from the Sunday Worship Experience at Still Water Christian Fellowship.",
};

const gallerySections = [
  {
    title: "Adult Sunday School Gallery",
    description:
      "Adult Sunday School is an Integral Part of SWCF's Discipleship Program.",
  },
  {
    title: "Children's Church Gallery",
    description:
      "Children Learning about Jesus through age-appropriate Lessons, Activities, and Fellowship.",
  },
  {
    title: "Preaching and Praise Gallery",
    description:
      "SWCF's Worship is Centered upon The Saviour - The Lord Jesus Christ!",
  },
  {
    title: "Fellowship Feast Gallery",
    description:
      "The Still Water Family shares Food, Conversation, Encouragement, and Joyful Fellowship after our Sunday Morning Preaching and Praise Service.",
  },
  {
    title: "Sunday Specials Gallery",
    description:
      "We are often Blessed with opportunities to hear from Evangelists, Missionaries, and Special Ministries. We love to Celebrate God's Bestowed Blessings on His People.",
  },
];

const starterCards = ["Photo One", "Photo Two", "Photo Three"];

export default function SundaySaintsPage() {
  return (
    <main className="min-h-screen bg-stone-50 text-stone-900">
      <section className="bg-gradient-to-b from-sky-950 via-sky-900 to-sky-800 px-6 py-20 text-white">
        <div className="mx-auto max-w-5xl text-center">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.35em] text-amber-300">
            The Lord&apos;s Day at Still Water
          </p>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Sunday Saints
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-sky-100">
            Every Sunday, Still Water Christian Fellowship gathers in God&apos;s House to worship Him in all that we do.
          </p>
          <p className="mx-auto mt-4 max-w-3xl text-base leading-7 text-sky-100">
            On the Sunday Saints page, we will display as much as we can to give visitors to our website a taste of how the Still Water Family spends their Lord&apos;s Day.
          </p>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-sky-800">
              Sunday Photo Galleries
            </p>
            <h2 className="mt-3 text-3xl font-bold text-stone-950">
              Photos, captions, descriptions, and dates from the Lord&apos;s Day
            </h2>
            <p className="mt-4 leading-7 text-stone-700">
              Each gallery below is prepared to hold multiple Sunday Saints photo cards over time. Every card can include a photo, caption, date, description, scripture theme, names, guest speaker notes, or a brief testimony from that Sunday moment.
            </p>
          </div>

          <div className="mt-12 space-y-14">
            {gallerySections.map((section) => (
              <section key={section.title} className="rounded-3xl bg-white p-6 shadow-sm md:p-8">
                <div className="max-w-3xl">
                  <h2 className="text-2xl font-bold text-sky-950">{section.title}</h2>
                  <p className="mt-3 leading-7 text-stone-700">{section.description}</p>
                </div>

                <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {starterCards.map((card) => (
                    <article
                      key={`${section.title}-${card}`}
                      className="overflow-hidden rounded-3xl border border-stone-200 bg-stone-50 shadow-sm"
                    >
                      <div className="flex aspect-[4/3] items-center justify-center bg-gradient-to-br from-sky-100 to-amber-100 px-6 text-center">
                        <span className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-900">
                          Photo Coming Soon
                        </span>
                      </div>
                      <div className="p-6">
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-500">
                          Date to be added
                        </p>
                        <h3 className="mt-2 text-xl font-bold text-sky-950">{card}</h3>
                        <p className="mt-3 text-sm leading-6 text-stone-700">
                          Add a caption, description, names, scripture theme, or brief testimony from this Sunday moment.
                        </p>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
