import Parser from "rss-parser";
import { getFacebookPosts } from "./facebook";

export type BlogPost = {
  id?: string;
  title: string;
  description: string;
  link: string;
  author: string;
  pubDate: string;
  source: string;
  image?: string;
  images?: string[];
};

const parser = new Parser({
  timeout: 8000,
  headers: {
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
  },
});

const SOURCES: { name: string; url: string }[] = [
  { name: "Formula1.com", url: "https://www.formula1.com/en/latest/all.xml" },
  { name: "ESPN F1", url: "https://www.espn.com/espn/rss/f1/news" },
  { name: "BBC Sport", url: "https://feeds.bbci.co.uk/sport/formula1/rss.xml" },
];

// Optional: drop a Facebook-page RSS feed URL (from rss.app / fetchrss / etc.)
// into FB_RSS_URL in .env.local and FB posts flow into The Blog automatically.
// If the Graph API is configured (FB_PAGE_ID + FB_PAGE_ACCESS_TOKEN) we use that
// instead, so we skip the RSS source to avoid duplicate posts.
const FB_PLACEHOLDER = /^(your_|YOUR_|<|>)/;
const fbGraphConfigured = !!(
  process.env.FB_PAGE_ID &&
  process.env.FB_PAGE_ACCESS_TOKEN &&
  !FB_PLACEHOLDER.test(process.env.FB_PAGE_ID) &&
  !FB_PLACEHOLDER.test(process.env.FB_PAGE_ACCESS_TOKEN)
);
if (process.env.FB_RSS_URL && !fbGraphConfigured) {
  SOURCES.push({ name: "Facebook", url: process.env.FB_RSS_URL });
}

// Optional JSON news API (NewsAPI / GNews compatible — both return `articles[]`
// with title, description, url, urlToImage, publishedAt, source.name).
// Set NEWS_API_URL in .env.local, e.g.:
//   NEWS_API_URL=https://newsapi.org/v2/everything?q=formula%201&sortBy=publishedAt&apiKey=YOUR_KEY
//   NEWS_API_URL=https://gnews.io/api/v4/search?q=formula%201&apikey=YOUR_KEY
async function getApiNews(): Promise<BlogPost[]> {
  const url = process.env.NEWS_API_URL;
  if (!url) return [];
  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      },
    });
    if (!res.ok) return [];
    const json = await res.json();
    const articles: any[] = json.articles ?? json.data ?? [];
    return articles.slice(0, 15).map((a) => {
      const title = a.title ?? "";
      const src = a.source?.name ?? a.source ?? "News";
      return {
        id: a.url ?? a.link ?? title,
        title,
        description: stripHtml(a.description ?? a.content ?? ""),
        link: a.url ?? a.link ?? "#",
        author: src,
        pubDate: a.publishedAt ?? new Date().toISOString(),
        source: src,
        image: a.urlToImage ?? a.image ?? pickFallback(title + src),
      } as BlogPost;
    });
  } catch {
    return [];
  }
}

// Local F1 photos used when an RSS item has no image of its own.
const FALLBACK_IMAGES = Array.from(
  { length: 20 },
  (_, i) => `/images/f1-${i + 1}.jpg`,
);

function pickFallback(seed: string): string {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  return FALLBACK_IMAGES[h % FALLBACK_IMAGES.length];
}

function stripHtml(input: string): string {
  return input
    .replace(/<[^>]+>/g, "")
    .replace(/<!\[CDATA\[|\]\]>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ")
    .trim();
}

function extractImage(input: string): string | undefined {
  const m = input.match(/<img[^>]+src=["']([^"']+)["']/);
  return m ? m[1] : undefined;
}

export async function getBlogPosts(
  limit = 12,
  source?: string,
): Promise<BlogPost[]> {
  const rssPosts: BlogPost[] = [];

  await Promise.all(
    SOURCES.map(async (source) => {
      try {
        const feed = await parser.parseURL(source.url);
        for (const item of feed.items.slice(0, 8)) {
          const title = item.title ?? "";
          const description = stripHtml(
            item.contentSnippet ?? item.content ?? item.summary ?? "",
          );
          const raw = (item.content ?? item.summary ?? "") as string;
          rssPosts.push({
            id: item.guid ?? item.link ?? title,
            title,
            description,
            link: item.link ?? "#",
            author: item.creator ?? source.name,
            pubDate: item.pubDate ?? new Date().toISOString(),
            source: source.name,
            image: extractImage(raw) ?? pickFallback(title + source.name),
          });
        }
      } catch {
        // skip failed source
      }
    }),
  );

  const apiPosts = process.env.NEWS_API_URL ? await getApiNews() : [];
  const fbPosts = fbGraphConfigured ? await getFacebookPosts(10) : [];
  const seen = new Set<string>();
  const combined = [...apiPosts, ...fbPosts, ...rssPosts].filter((p) => {
    if (!p.title) return false;
    const key = p.link || p.title;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  const filtered = source
    ? combined.filter((p) => p.source === source)
    : combined;

  return filtered
    .sort(
      (a, b) =>
        new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime(),
    )
    .slice(0, limit);
}

export function timeAgo(iso: string): string {
  const date = new Date(iso);
  const diff = Date.now() - date.getTime();
  const mins = Math.floor(diff / 60_000);
  if (mins < 60) return `${Math.max(1, mins)}m`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d`;
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}