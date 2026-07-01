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

const quickLinks = [
  ["Home", "/"],
  ["Visit", "/#visit"],
  ["Events", "/events"],
  ["Ministries", "/#ministries"],
  ["Sermons", "/sermons"],
  ["Contact", "/#contact"],
];

const starterCards = ["Photo One", "Photo Two", "Photo Three"];

const adultSundaySchoolPhotos = {
  "Photo One": {
    images: [
      {
        src: "/sunday-saints/6-28-26-joeteaching.jpg",
        alt: "Adult Sunday School gathering at Still Water Christian Fellowship",
      },
    ],
    date: "Sunday Morning",
    title: "Adult Sunday School",
    description:
      "Our Adult Sunday School class gathers around the Word of God as part of SWCF's discipleship ministry.",
  },
  "Photo Two": {
    images: [
      {
        src: "/sunday-saints/6-28-26-studiousbunch1.jpg",
        alt: "Adult Sunday School fellowship and Bible teaching at Still Water Christian Fellowship",
      },
    ],
    date: "Sunday Morning",
    title: "Adult Sunday School",
    description:
      "A time of Bible study, fellowship, and spiritual growth before the morning preaching service.",
  },
  "Photo Three": {
    images: [
      {
        src: "/sunday-saints/6-28-26-studiousbunch2.jpg",
        alt: "Adult Sunday School ministry at Still Water Christian Fellowship",
      },
    ],
    date: "Sunday Morning",
    title: "Adult Sunday School",
    description:
      "Still Water saints growing together through the teaching and application of Scripture.",
  },
};

const sundaySpecialsPhotoOne = {
  images: [
    {
      src: "/graceparentssanctuary2-6-14-26.jpeg",
      alt: "David, Elizabeth, and Baby Grace visiting Still Water Christian Fellowship",
    },
    {
      src: "/gracecake-6-14-26-special.jpg",
      alt: "Celebration cake for Baby Grace at Still Water Christian Fellowship",
    },
  ],
  date: "June 14, 2026",
  title: "Photo One",
  description:
    "It was a Blessing to Welcome and hear from David, Elizabeth, and Baby Grace. - Such a Comfort to see the Fruit of Answered Prayer!",
};

const sundaySpecialsPhotoTwo = {
  images: [
    {
      src: "/acaciarach2-6-14-26.jpg",
      alt: "Acacia celebrating her first birthday at Still Water Christian Fellowship",
    },
    {
      src: "/acaciabdaycake-6-14-26-special.jpg",
      alt: "Acacia's first birthday cake celebration at Still Water Christian Fellowship",
    },
  ],
  date: "June 14, 2026",
  title: "Photo Two",
  description: "Happy 1st Birthday Acacia!",
};

export default function SundaySaintsPage() {
  return (
    <main className="min-h-screen bg-paper text-ink">
      <section className="relative overflow-hidden bg-gradient-to-b from-ink via-fern to-moss px-6 py-20 text-white">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[url('/uploads/backgroundlayerimage.png')] bg-cover bg-center opacity-45 mix-blend-overlay"
        />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-ink/92 via-fern/86 to-moss/96" />
        <div className="relative z-10 mx-auto max-w-5xl text-center">
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
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {quickLinks.map(([label, href]) => (
              <a
                key={label}
                href={href}
                className="rounded-full border border-white/25 px-5 py-2.5 text-sm font-bold uppercase tracking-[0.12em] text-white transition hover:bg-white hover:text-sky-950"
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-sky-800">
              Sunday Photo Galleries
            </p>
            <h2 className="mt-3 text-3xl font-bold text-stone-950">
              SWCF Loves To Celebrate Its Saints
            </h2>
            <p className="mt-4 leading-7 text-stone-700">
              Please peruse all of Our Galleries. Take some time to enjoy our Saints. The Pictures will hopefully Reflect the work that the Grace of God has done in all of us who have Trusted Jesus Christ as Saviour!
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
                  {starterCards.map((card) => {
                    const sundaySpecialsPhoto =
                      section.title === "Adult Sunday School Gallery"
                        ? adultSundaySchoolPhotos[card as keyof typeof adultSundaySchoolPhotos]
                        : section.title === "Sunday Specials Gallery" && card === "Photo One"
                          ? sundaySpecialsPhotoOne
                          : section.title === "Sunday Specials Gallery" && card === "Photo Two"
                            ? sundaySpecialsPhotoTwo
                            : null;

                    return (
                      <article
                        key={`${section.title}-${card}`}
                        className="overflow-hidden rounded-3xl border border-stone-200 bg-stone-50 shadow-sm"
                      >
                        {sundaySpecialsPhoto ? (
                          <div className="grid aspect-[4/3] grid-cols-2 gap-1 bg-stone-100 p-1">
                            {sundaySpecialsPhoto.images.map((image) => (
                              <img
                                key={image.src}
                                src={image.src}
                                alt={image.alt}
                                className="h-full w-full object-contain"
                              />
                            ))}
                          </div>
                        ) : (
                          <div className="flex aspect-[4/3] items-center justify-center bg-gradient-to-br from-cream to-gold/35 px-6 text-center">
                            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-ink">
                              Photo Coming Soon
                            </span>
                          </div>
                        )}
                        <div className="p-6">
                          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-500">
                            {sundaySpecialsPhoto ? sundaySpecialsPhoto.date : "Date to be added"}
                          </p>
                          <h3 className="mt-2 text-xl font-bold text-sky-950">
                            {sundaySpecialsPhoto ? sundaySpecialsPhoto.title : card}
                          </h3>
                          <p className="mt-3 text-sm leading-6 text-stone-700">
                            {sundaySpecialsPhoto
                              ? sundaySpecialsPhoto.description
                              : "Add a caption, description, names, scripture theme, or brief testimony from this Sunday moment."}
                          </p>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </section>
            ))}
          </div>

          <div className="mt-14 rounded-3xl bg-sky-950 p-6 text-white shadow-sm md:p-8">
            <h2 className="text-2xl font-bold">Continue Exploring Still Water</h2>
            <p className="mt-3 max-w-3xl text-sky-100">
              Return to the homepage or visit another area of the website.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              {quickLinks.map(([label, href]) => (
                <a
                  key={label}
                  href={href}
                  className="rounded-full border border-white/25 px-5 py-2.5 text-sm font-bold uppercase tracking-[0.12em] text-white transition hover:bg-white hover:text-sky-950"
                >
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
