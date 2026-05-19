export type Sermon = {
  id: string;
  title: string;
  speaker: string;
  bibleText: string;
  eventType: string;
  description: string;
  audioUrl: string;
  videoUrl: string;
  hasVideo: boolean;
  thumbnailUrl: string;
  pubDate: string;
  durationSeconds: number;
  durationLabel: string;
  sermonAudioUrl: string;
};

export type LiveWebcast = {
  id: string;
  title: string;
  eventType: string;
  startTime: string;
  previewImageURL: string;
  webcastUrl: string;
};

export type SermonFeed = {
  coverImage: string;
  bannerImage: string;
  sermons: Sermon[];
  live: LiveWebcast | null;
  page: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
};

export const SERMONS_PER_PAGE = 25;

const BROADCASTER_ID = "stillwaterri";
const API_BASE = "https://api.sermonaudio.com/v2";
const FALLBACK_COVER =
  "https://media.sermonaudio.com/images/broadcasters/stillwaterri.1744304730.jpg";
const FALLBACK_BANNER =
  "https://media.sermonaudio.com/images/broadcasters/banners/custom/stillwaterri.1744305442.jpg";

type Media = {
  mediaType?: string;
  streamURL?: string | null;
  downloadURL?: string | null;
  thumbnailImageURL?: string | null;
  bitrate?: number | null;
  duration?: number | null;
  language?: string | null;
};

type ApiSermon = {
  sermonID: string;
  displayTitle: string;
  fullTitle?: string;
  bibleText?: string | null;
  eventType?: string | null;
  displayEventType?: string | null;
  keywords?: string | null;
  preachDate: string;
  publishDate?: string;
  audioDurationSeconds?: number | null;
  videoDurationSeconds?: number | null;
  hasAudio?: boolean;
  hasVideo?: boolean;
  media?: { audio?: Media[]; video?: Media[] };
  speaker?: { displayName?: string };
  broadcaster?: { imageURL?: string; bannerImageURL?: string };
};

type ApiWebcast = {
  webcastID?: number;
  id?: number;
  title?: string;
  displayTitle?: string;
  eventType?: string;
  startTime?: number | string | null;
  startTimestamp?: number | null;
  previewImageURL?: string | null;
  streamURL?: string | null;
  broadcaster?: { broadcasterID?: string };
};

async function api<T>(path: string): Promise<T | null> {
  const key = process.env.SERMONAUDIO_API_KEY;
  if (!key) {
    console.warn("SERMONAUDIO_API_KEY missing — sermons will be empty");
    return null;
  }
  const url = path.startsWith("http") ? path : `${API_BASE}${path}`;
  const res = await fetch(url, {
    headers: { "X-API-Key": key, Accept: "application/json" },
    next: { revalidate: 300 },
  });
  if (!res.ok) {
    console.warn(`SermonAudio API ${res.status} for ${url}`);
    return null;
  }
  return (await res.json()) as T;
}

export async function getSermons(page = 1): Promise<SermonFeed> {
  const safePage = Math.max(1, Math.floor(page));
  const [list, webcasts] = await Promise.all([
    api<{ results: ApiSermon[]; totalCount: number }>(
      `/node/sermons?broadcasterID=${BROADCASTER_ID}&sortBy=newest&pageSize=${SERMONS_PER_PAGE}&page=${safePage}`
    ),
    safePage === 1
      ? api<{ results: ApiWebcast[] }>(
          `/node/webcasts?broadcasterID=${BROADCASTER_ID}`
        )
      : Promise.resolve(null),
  ]);

  const sermons = (list?.results ?? []).map(toSermon);
  const live = webcasts?.results?.[0]
    ? toLiveWebcast(webcasts.results[0])
    : null;

  const broadcaster = list?.results?.[0]?.broadcaster;
  const totalCount = list?.totalCount ?? sermons.length;
  const totalPages = Math.max(1, Math.ceil(totalCount / SERMONS_PER_PAGE));

  return {
    coverImage: broadcaster?.imageURL || FALLBACK_COVER,
    bannerImage: broadcaster?.bannerImageURL || FALLBACK_BANNER,
    sermons,
    live,
    page: safePage,
    pageSize: SERMONS_PER_PAGE,
    totalCount,
    totalPages,
  };
}

function toSermon(s: ApiSermon): Sermon {
  const audio = pickAudio(s.media?.audio ?? []);
  const video = pickVideo(s.media?.video ?? []);
  const playableVideo = pickPlayableVideo(s.media?.video ?? []);
  const duration =
    s.audioDurationSeconds || s.videoDurationSeconds || audio?.duration || 0;
  const thumbnailUrl =
    video?.thumbnailImageURL ||
    `https://media.sermonaudio.com/thumbnails/${s.sermonID}.jpg` ||
    FALLBACK_COVER;
  const title = s.displayTitle || s.fullTitle || "";

  return {
    id: s.sermonID,
    title: title.replace(/\bDestina\b/g, "Destinations"),
    speaker: s.speaker?.displayName ?? "",
    bibleText: title === "Destina" && !s.bibleText ? "Luke 16:19-26" : s.bibleText ?? "",
    eventType: s.displayEventType ?? s.eventType ?? "",
    description: (s.keywords ?? "").replace(/\s+/g, " ").trim(),
    audioUrl: audio?.streamURL ?? audio?.downloadURL ?? "",
    videoUrl: playableVideo,
    hasVideo: Boolean(s.hasVideo),
    thumbnailUrl,
    pubDate: s.preachDate || s.publishDate || "",
    durationSeconds: duration,
    durationLabel: formatDuration(duration),
    sermonAudioUrl: `https://www.sermonaudio.com/sermon/${s.sermonID}`,
  };
}

function pickPlayableVideo(video: Media[]): string {
  for (const v of video) {
    const dl = v.downloadURL;
    if (dl && /\.mp4(\?|$)/i.test(dl)) {
      return dl.replace(/([?&])download=true(&|$)/, (_, pre, post) =>
        post === "&" ? pre : ""
      ).replace(/[?&]$/, "");
    }
  }
  return "";
}

function toLiveWebcast(w: ApiWebcast): LiveWebcast {
  const id = String(w.webcastID ?? w.id ?? "");
  const startRaw = w.startTime ?? w.startTimestamp ?? "";
  const startTime =
    typeof startRaw === "number"
      ? new Date(startRaw * 1000).toISOString()
      : String(startRaw || "");
  return {
    id,
    title: w.displayTitle || w.title || "Live Now",
    eventType: w.eventType || "",
    startTime,
    previewImageURL: w.previewImageURL || FALLBACK_COVER,
    webcastUrl: `https://www.sermonaudio.com/broadcasters/${BROADCASTER_ID}/`,
  };
}

function pickAudio(audio: Media[]): Media | undefined {
  if (audio.length === 0) return undefined;
  return [...audio].sort((a, b) => (b.bitrate ?? 0) - (a.bitrate ?? 0))[0];
}

function pickVideo(video: Media[]): Media | undefined {
  if (video.length === 0) return undefined;
  return (
    video.find((v) => v.thumbnailImageURL) ?? video[0]
  );
}

function formatDuration(seconds: number): string {
  if (!seconds) return "";
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  if (h > 0) return `${h}h ${m}m`;
  return `${m} min`;
}

export function formatSermonDate(pubDate: string): string {
  if (!pubDate) return "";
  const date = new Date(pubDate);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}
