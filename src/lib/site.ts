export const siteUrl = "https://www.stillwaterri.org";

export const site = {
  name: "Still Water Christian Fellowship",
  shortName: "Still Water",
  description:
    "A modern church website concept for Still Water Christian Fellowship in Hope, Rhode Island.",
  address: "51 Main St, Hope, RI",
  addressNote: "At the corner of Rt 115 & 116",
  phone: "(401) 615-1956",
  email: "info@stillwaterri.org",
  sermonAudio: "https://www.sermonaudio.com/",
  facebook: "https://www.facebook.com/",
};

export const navItems = [
  ["Visit", "#visit"],
  ["Ministries", "#ministries"],
  ["Worship", "#worship"],
  ["Leadership", "#leadership"],
  ["Contact", "#contact"],
] as const;

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
    title: "Clear Bible teaching",
    body: "Sunday mornings center on God's Word shared in a simple, relevant, and understandable way.",
  },
  {
    title: "Room for every generation",
    body: "Blended worship honors the church's musical roots while welcoming current expressions of praise.",
  },
  {
    title: "Fellowship after service",
    body: "Church fellowship follows the Sunday morning service, giving guests an easy next step to meet people.",
  },
] as const;

export const ministries = [
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
] as const;

export const beliefs = [
  "The Bible is God's all-sufficient truth for life and conduct.",
  "Jesus Christ is the eternal Son of God, our forgiveness, redemption, hope, and salvation.",
  "The Holy Spirit cleanses, renews, and empowers believers to live an overcoming life.",
  "The church is called to reveal God's love, grace, and mercy in the world.",
] as const;

export const leaders = [
  {
    name: "Ryan Baker",
    role: "Pastor",
    image: "/stillwater/pastor-ryan.jpg",
  },
  {
    name: "Joe Campbell",
    role: "Worship Pastor / Elder",
    image: "/stillwater/worship.jpg",
  },
  {
    name: "Joe Hadfield",
    role: "Elder",
    image: "/stillwater/bible-study.jpg",
  },
] as const;
