export type Sermon = {
  id: string;
  title: string;
  speaker: string;
  description: string;
  audioUrl: string;
  pubDate: string;
  durationSeconds: number;
  durationLabel: string;
  sermonAudioUrl: string;
};

const FEED_URL = "https://feed.sermonaudio.com/broadcasters/stillwaterri";

export async function getSermons(): Promise<Sermon[]> {
  const res = await fetch(FEED_URL, { next: { revalidate: 3600 } });
  if (!res.ok) return [];
  const xml = await res.text();
  return parseFeed(xml);
}

function parseFeed(xml: string): Sermon[] {
  const items = xml.match(/<item>[\s\S]*?<\/item>/g) ?? [];
  return items.map(parseItem).filter((s): s is Sermon => s !== null);
}

function parseItem(itemXml: string): Sermon | null {
  const title = pick(itemXml, "title");
  const link = pick(itemXml, "link");
  const audioUrl = pickAttr(itemXml, "enclosure", "url");
  const pubDate = pick(itemXml, "pubDate");
  const speaker = pick(itemXml, "itunes:author") || pick(itemXml, "itunes:subtitle");
  const description = pick(itemXml, "description");
  const duration = pick(itemXml, "itunes:duration");

  if (!title || !audioUrl || !pubDate) return null;

  const id = link.split("/").filter(Boolean).pop() ?? audioUrl;
  const durationSeconds = parseDuration(duration);

  return {
    id,
    title: decode(title),
    speaker: decode(speaker) || "Still Water Christian Fellowship",
    description: decode(description),
    audioUrl: decode(audioUrl),
    pubDate,
    durationSeconds,
    durationLabel: formatDuration(durationSeconds),
    sermonAudioUrl: decode(link),
  };
}

function pick(xml: string, tag: string): string {
  const escaped = tag.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = xml.match(new RegExp(`<${escaped}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${escaped}>`));
  if (!match) return "";
  return match[1].replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1").trim();
}

function pickAttr(xml: string, tag: string, attr: string): string {
  const match = xml.match(new RegExp(`<${tag}\\b[^>]*\\b${attr}="([^"]*)"`));
  return match ? match[1] : "";
}

function decode(s: string): string {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'");
}

function parseDuration(value: string): number {
  if (!value) return 0;
  const parts = value.split(":").map((p) => parseInt(p, 10));
  if (parts.some(Number.isNaN)) return 0;
  if (parts.length === 3) return parts[0] * 3600 + parts[1] * 60 + parts[2];
  if (parts.length === 2) return parts[0] * 60 + parts[1];
  return parts[0] ?? 0;
}

function formatDuration(seconds: number): string {
  if (!seconds) return "";
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  if (h > 0) return `${h}h ${m}m`;
  return `${m} min`;
}

export function formatSermonDate(pubDate: string): string {
  const date = new Date(pubDate);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}
