export const siteUrl = "https://www.stillwaterri.org";

export const site = {
  name: "Still Water Christian Fellowship",
  shortName: "Still Water",
  description:
    "Still Water Christian Fellowship is a Bible-believing, Christ-honoring, Independent Baptist Church in the Village of Hope, Rhode Island.",
  address: "51 Main St, Hope, RI",
  addressNote: "At the corner of Rt 115 & 116",
  phone: "(401) 615-1956",
  email: "info@stillwaterri.org",
  sermonAudio: "https://www.sermonaudio.com/broadcasters/stillwaterri/",
  facebook: "https://www.facebook.com/groups/671903697328042",
  give: "https://tithe.ly/give?c=1383729",
};

export const siteVerse = {
  reference: "Acts 26:18",
  text: "...to open their eyes, and to turn them from darkness to light, and from the power of Satan unto God, that they may receive forgiveness of sins, and inheritance among them which are sanctified by faith that is in me.",
};

export const churchVerses = {
  mission: {
    label: "Mission Statement",
    reference: "Acts 26:18",
    text: "...to open their eyes, and to turn them from darkness to light, and from the power of Satan unto God, that they may receive forgiveness of sins, and inheritance among them which are sanctified by faith that is in me.",
  },
  theme: {
    label: "2026 Theme",
    reference: "Hosea 6:3",
    text: "Then shall we know, if we follow on to know the Lord: his going forth is prepared as the morning; and he shall come unto us as the rain, as the latter and former rain unto the earth.",
    pullQuote: "Follow on to know the Lord.",
  },
} as const;

export type NavLink = readonly [string, string];
export type NavDropdown = {
  readonly label: string;
  readonly children: readonly NavLink[];
};
export type NavItem = NavLink | NavDropdown;

export function isDropdown(item: NavItem): item is NavDropdown {
  return typeof item === "object" && !Array.isArray(item);
}

export const navItems: readonly NavItem[] = [
  ["Visit", "/#visit"],
  ["Ministries", "/#ministries"],
  ["Sermons", "/sermons"],
  { label: "About", children: [["Beliefs", "/beliefs"], ["History", "/history"]] },
  ["Give", "/give"],
  ["Contact", "/#contact"],
];

export const churchHistory = {
  furnace: {
    period: "The Hope Furnace ca. 1765",
    paragraphs: [
      "The history of our church building begins with the Hope Furnace Mill in Hope, RI. The Hope Furnace was founded by the Brown Brothers (Nicholas, Joseph, John and Moses) who were co-partners in the business with Stephen Hopkins, Israel Wilkinson, Job Hawkins, and Caleb Arnold. The Hope Furnace was an iron furnace mill producing tea kettles, hollowware, nails, hinges, and iron hoops.",
      "Located on the Pawtuxet River south of Salmon Hole, the river provided power for the massive bellows used to heat the furnaces. The surrounding woodlands were used for charcoal production and local farmers provided the stone that was heated and melted with the ore from Oaklawn Ave in Cranston. The ore, charcoal, and limestone were carted uphill in horse-drawn wagons. At this time about seventy men were employed there as founders, colliers (coalminers), woodchoppers, molders, firemen, carters and coalers of wood, diggers and carters of ore. Workers were paid poorly receiving about 1/4 of their pay in goods.",
      "By 1768 the Furnace was producing pig iron which was sold in England in exchange for English goods. Seventy-six cannons were cast for the war effort. One of these original cannons remains in front of the Hope Library.",
      "In 1806, Hope Furnace was sold at auction to Silvanus Hopkins and Jabez Bowen who renamed the mill the Hope Manufacturing Company. The Hope Manufacturing Company functioned as a cotton spinning mill. In 1820, power looms were introduced at the mill and by 1832 the Hope Manufacturing Company employed fifteen hundred workers with nearly a third being women and another third children and teenagers as young as age nine.",
      "In 1821 the mill was purchased by Ephraim Talbot with \"all lands, tenements, factories, building, privileges of water, also all the machinery, looms, tools or apparatus attached to the factory, die House, machine shop, weaving room, picking house, grist mill and the other buildings hereby conveyed, and about 29 acres\" included.",
      "By 1844, John Carter Brown, Moses B. Ives, Robert H. Ives, Charlotte R. Goddard and William Kelly bought the company. All were descendants of the Nicholas Brown family and built upon the Brown & Ives holdings that included the Blackstone Company in North Smithfield, the Lonsdale Water Power Company and the Lonsdale Mills in Lincoln. In 1847 the mill was incorporated as the Hope Company.",
    ],
  },
  church: {
    period: "Hope Church Founded ca. 1875",
    paragraphs: [
      "Hope Church was the vision of Superintendent Samuel G. Allen, a devout Methodist. Before its construction, early religious services by ministers of various denominations, including George Champlain, a black preacher and elder of the Warwick and East Greenwich Free Will Baptist Church, were held in the Old Picker House at the mill complex.",
    ],
  },
} as const;

export const services = [
  {
    day: "Sunday",
    time: "9:15 AM",
    title: "Adult Discipleship Class",
  },
  {
    day: "Sunday",
    time: "10:30 AM",
    title: "Worship Service",
  },
  {
    day: "Sunday",
    time: "6:00 PM",
    title: "Prayer Meeting",
  },
  {
    day: "Wednesday",
    time: "7:00 PM",
    title: "Bible Study",
  },
] as const;

export const visitorNotes = [
  {
    title: "Bible-believing",
    body: "You will find people and a pastor who love the Bible and take seriously the command to teach and preach God's Word to every person.",
  },
  {
    title: "Christ-honoring",
    body: "Our desire is to shine the light of the Gospel to Hope and the surrounding area with joy, conviction, and compassion.",
  },
  {
    title: "A church family",
    body: "SWCF is a family of imperfect people who have experienced our mighty Lord do the miraculous.",
  },
] as const;

export const ministries = [
  {
    title: "Steps To Salvation",
    image: "/stillwater/bible-study.jpg",
    body: "A clear, Scripture-rooted walk through the Gospel — sharing how anyone can come to know Jesus Christ as Savior.",
  },
  {
    title: "Youth Ministry",
    image: "/stillwater/youth.jpg",
    body: "Helping students grow in their knowledge of and relationship with Jesus Christ through teaching, discipleship, and service.",
  },
  {
    title: "Still Water Kids",
    image: "/stillwater/kids.jpg",
    body: "A fun, interactive children's ministry connecting kids to God, to one another, and to caring leaders.",
  },
  {
    title: "Men's & Women's Ministries",
    image: "/stillwater/community.jpg",
    body: "Monthly gatherings, friendships, prayer, and Christ-centered encouragement for adults.",
  },
  {
    title: "Providence Rescue Mission",
    image: "/stillwater/mission.jpg",
    body: "Serving a home-cooked meal and sharing the life-changing Gospel with neighbors in Providence.",
  },
  {
    title: "Child Evangelism Fellowship",
    image: "/stillwater/New-CEF-1-645x1024.jpg",
    imageContain: true,
    body: "Partnering with CEF to reach boys and girls with the Good News of Jesus Christ through Good News Clubs and Bible-centered teaching.",
  },
] as const;

export const statementOfFaith = [
  "That the Old and New Testaments are verbally inspired by God, inerrant and preserved; and they are of supreme and final authority in faith and life.",
  "In one God, eternally existing in three persons: Father, Son, and the Holy Spirit.",
  "That Jesus Christ was begotten by the Holy Spirit, born of Mary, a virgin, and is true God and true man.",
  "That man was created in the image of God, that he sinned, and thereby, incurred not only physical death, but also the spiritual death (separation from God). That all human beings are born with a sinful nature and are sinners in thought, word, and deed.",
  "That the Lord Jesus Christ died for our sins according to the Scriptures as a representative and substitutionary sacrifice, and that all who believe in Him are justified on the grounds of His shed blood.",
  "In the \"eternal security\" of the believer: that it is impossible for one born into the family of God ever to be lost.",
  "In the resurrection of the crucified body of our Lord, in His ascension into heaven, and in his present life there as High Priest and Advocate.",
  "In \"that blessed hope\" — the personal, pre-millennial, pretribulation, and imminent return of our Lord and Savior Jesus Christ when the church will be \"gathered together unto Him.\"",
  "In the literal fulfillment of the prophecies and promises of the Scriptures which foretell and assure the future regeneration and restoration of Israel as a nation.",
  "That all who receive, by faith, the Lord Jesus Christ are born again of the Holy Spirit, and thereby, children of God.",
  "In the bodily resurrection of the just and the unjust, the everlasting blessedness of the saved and the everlasting punishment of the lost.",
  "That the Scriptural ordinances of the church are Baptism and the Lord's Supper, and are to be administered by the local church; that Baptism by immersion should be administered to believers only as a symbol of their belief in the death, burial, and resurrection of our Lord and Savior Jesus Christ, and as a testimony to the world of that believer's identification with Christ.",
] as const;

export const pastors = [
  {
    name: "Robert Levesque",
    role: "Senior Pastor",
    image: "/stillwater/pastor-stillwater.png",
  },
  { name: "Joseph Campbell", role: "Assistant Pastor" },
] as const;

export const elders = [
  { name: "Joseph Hadfield" },
  { name: "Carl Riecke" },
  { name: "Roger Lavoie" },
] as const;
