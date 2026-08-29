import fs from "fs";
import path from "path";
import { getBlogPosts, type BlogPost } from "./blog";

const CACHE_DIR = path.join(process.cwd(), "data");
const CACHE_FILE = path.join(CACHE_DIR, "fb-posts.json");
const POSTS_DIR = path.join(CACHE_DIR, "posts");

function safeId(id?: string): string {
  const s = (id ?? "").replace(/[^a-zA-Z0-9_-]/g, "_");
  return s || "unknown";
}

function readCache(): BlogPost[] {
  try {
    if (fs.existsSync(CACHE_FILE)) {
      const raw = fs.readFileSync(CACHE_FILE, "utf8");
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed as BlogPost[];
    }
  } catch {
    // ignore corrupt cache
  }
  return [];
}

function writeCache(posts: BlogPost[]) {
  try {
    fs.mkdirSync(CACHE_DIR, { recursive: true });
    fs.writeFileSync(CACHE_FILE, JSON.stringify(posts, null, 2));
  } catch {
    // ignore write failures (e.g. read-only FS)
  }
}

// Each blog post is also saved as its own permanent file so it survives even
// when the merged cache is rebuilt or Facebook is unavailable.
function writePostFile(post: BlogPost) {
  if (!post.id) return;
  try {
    fs.mkdirSync(POSTS_DIR, { recursive: true });
    fs.writeFileSync(
      path.join(POSTS_DIR, `${safeId(post.id)}.json`),
      JSON.stringify(post, null, 2),
    );
  } catch {
    // ignore
  }
}

function readPostFile(id: string): BlogPost | undefined {
  try {
    const f = path.join(POSTS_DIR, `${safeId(id)}.json`);
    if (fs.existsSync(f)) return JSON.parse(fs.readFileSync(f, "utf8"));
  } catch {
    // ignore
  }
  return undefined;
}

function dedupeKey(p: BlogPost): string {
  return p.id || p.link || p.title;
}

// Returns blog posts from the local cache. When the Facebook connection is
// available it refreshes the cache with the latest posts; when it's down the
// previously cached posts are returned, so the blog stays permanent.
export async function getCachedBlogPosts(limit = 20): Promise<BlogPost[]> {
  const cached = readCache();

  try {
    const live = await getBlogPosts(30, "Facebook");
    if (live.length) {
      const map = new Map<string, BlogPost>();
      for (const p of [...live, ...cached]) {
        const key = dedupeKey(p);
        if (key && !map.has(key)) map.set(key, p);
      }
      const merged = Array.from(map.values()).sort(
        (a, b) =>
          new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime(),
      );
      writeCache(merged);
      merged.forEach(writePostFile);
      return merged.slice(0, limit);
    }
  } catch {
    // live fetch failed — fall back to cache
  }

  return cached
    .slice()
    .sort(
      (a, b) =>
        new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime(),
    )
    .slice(0, limit);
}

export async function getCachedPostById(
  id: string,
): Promise<BlogPost | undefined> {
  const key = decodeURIComponent(id);
  const match = (posts: BlogPost[]) =>
    posts.find((p) => p.id === key || p.id === id) ??
    posts.find((p) => (p.link || "") === key);

  // 1) Permanent per-post file (fast + survives FB outages)
  const file = readPostFile(key) ?? readPostFile(id);
  if (file) return file;

  // 2) Merged cache
  const cached = readCache();
  const found = match(cached);
  if (found) {
    writePostFile(found);
    return found;
  }

  // 3) Cache miss — try a live refresh (Facebook) then look again, so direct
  // visits to a detail page still resolve even when the cache was empty.
  try {
    const refreshed = await getCachedBlogPosts(30);
    return match(refreshed);
  } catch {
    return undefined;
  }
}
