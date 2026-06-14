export const metadata = {
  title: "Sunday Saints | Still Water Christian Fellowship",
  description:
    "Photos, descriptions, dates, and highlights from the Sunday Worship Experience at Still Water Christian Fellowship.",
};

const worshipMoments = [
  {
    title: "Adult Sunday School",
    description:
      "A time of Bible teaching, discussion, and spiritual growth as adults gather around the Word of God.",
  },
  {
    title: "Children's Church",
    description:
      "A loving space for children to learn about Jesus through age-appropriate lessons, worship, and fellowship.",
  },
  {
    title: "Preaching and Praise",
    description:
      "The Still Water Family lifts up the name of the Lord through worship, prayer, praise, and the preached Word.",
  },
  {
    title: "Fellowship Feast",
    description:
      "After worship, the family continues in fellowship, sharing food, laughter, testimony, and encouragement.",
  },
];

const photoPlaceholders = [
  "Sunday worship moments",
  "Adult Sunday School",
  "Children's Church",
  "Preaching and Praise",
  "Fellowship Feast",
  "Special in-service events",
];

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
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {worshipMoments.map((moment) => (
              <article
                key={moment.title}
                className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm"
              >
                <h2 className="text-xl font-bold text-sky-950">{moment.title}</h2>
                <p className="mt-3 text-sm leading-6 text-stone-700">{moment.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-sky-800">
              Photo Gallery
            </p>
            <h2 className="mt-3 text-3xl font-bold text-stone-950">
              A place for photos, captions, descriptions, and dates
            </h2>
            <p className="mt-4 leading-7 text-stone-700">
              This section is prepared for Sunday photos and ministry highlights. Each update can include a photo, caption, description, date, and notes about special in-service events, guest speakers, celebrations, or fellowship moments.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {photoPlaceholders.map((title) => (
              <article
                key={title}
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
                  <h3 className="mt-2 text-xl font-bold text-sky-950">{title}</h3>
                  <p className="mt-3 text-sm leading-6 text-stone-700">
                    Add a caption, description, names, scripture theme, or brief testimony from this Sunday moment.
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto max-w-5xl rounded-3xl bg-sky-950 p-8 text-white shadow-lg md:p-12">
          <h2 className="text-3xl font-bold">Sunday highlights can include</h2>
          <div className="mt-6 grid gap-4 text-sky-100 sm:grid-cols-2">
            <p>Photos with captions</p>
            <p>Descriptions and dates</p>
            <p>Guest speakers</p>
            <p>Special in-service events</p>
            <p>Children&apos;s Church moments</p>
            <p>Fellowship Feast memories</p>
          </div>
        </div>
      </section>
    </main>
  );
}
