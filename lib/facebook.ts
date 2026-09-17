export type FacebookPost = {
  id: string;
  message?: string;
  description?: string;
  story?: string;
  created_time: string;
  permalink_url?: string;
  full_picture?: string;
  picture?: string;
  attachments?: {
    data?: Array<{
      title?: string;
      description?: string;
      media?: { image?: { src?: string } };
      target?: { url?: string };
      type?: string;
    }>;
  };
  child_attachments?: {
    data?: Array<{
      title?: string;
      description?: string;
      picture?: string;
      media?: { image?: { src?: string } };
      target?: { url?: string };
      type?: string;
    }>;
  };
};

const API_VERSION = process.env.FB_API_VERSION ?? "v22.0";

export type FetchedPost = {
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

export type FacebookPageStats = {
  id?: string;
  name?: string;
  fan_count?: number;
  followers_count?: number;
};

// Reads the live follower/like count of the managed Facebook Page using the
// same Graph API credentials as the posts feed (FB_PAGE_ID + token in .env.local).
export async function getFacebookPageStats(): Promise<FacebookPageStats | null> {
  const pageId = process.env.FB_PAGE_ID;
  const token = process.env.FB_PAGE_ACCESS_TOKEN;
  if (!pageId || !token) return null;

  const fields = ["id", "name", "fan_count", "followers_count"].join(",");
  const url =
    `https://graph.facebook.com/${API_VERSION}/${encodeURIComponent(pageId)}` +
    `?fields=${encodeURIComponent(fields)}` +
    `&access_token=${encodeURIComponent(token)}`;

  try {
    const res = await fetch(url, {
      headers: { "User-Agent": "paddock-bulletin/1.0" },
      next: { revalidate: 1800 },
    });
    if (!res.ok) return null;
    const json = (await res.json()) as FacebookPageStats & { error?: any };
    if (json.error) return null;
    return json;
  } catch {
    return null;
  }
}

function extractImage(post: FacebookPost): string | undefined {
  if (post.full_picture) return post.full_picture;
  if (post.picture) return post.picture;
  const media = post.attachments?.data?.find((a) => a.media?.image?.src);
  if (media?.media?.image?.src) return media.media.image.src;
  return undefined;
}

// Facebook CDN image URLs are time-limited and often hotlink-blocked in the
// browser, so we route them through our own server proxy (/api/fbimg) which
// fetches the (still-fresh) URL server-side and streams it back.
function proxiedImage(url?: string): string | undefined {
  if (!url) return undefined;
  if (/fbcdn\.net|facebook\.com/.test(url)) {
    return `/api/fbimg?u=${encodeURIComponent(url)}`;
  }
  return url;
}

function toBlogPost(post: FacebookPost, pageName: string): FetchedPost {
  const message = post.message?.trim() ?? "";
  const description = post.description?.trim() ?? "";
  const story = post.story?.trim() ?? "";

  const attachment = post.attachments?.data?.[0];

  const link = post.permalink_url ?? attachment?.target?.url ?? "#";

  const heading =
    message.split("\n")[0].trim() ||
    description.split("\n")[0].trim() ||
    attachment?.title ||
    story ||
    `New post from ${pageName}`;
  const title = heading.slice(0, 110);

  const body = [message, description, story]
    .filter(Boolean)
    .join("\n\n")
    .trim() ||
    attachment?.description ||
    attachment?.title ||
    "";

  const images = [
    proxiedImage(extractImage(post)),
    ...(post.child_attachments?.data ?? [])
      .map((c) => proxiedImage(c.picture ?? c.media?.image?.src))
      .filter(Boolean),
  ].filter(Boolean) as string[];

  return {
    id: post.id,
    title,
    description: body,
    link,
    author: pageName,
    pubDate: post.created_time,
    source: "Facebook",
    image: images[0],
    images,
  };
}

// Reads published posts from a Facebook Page you manage using the Graph API.
// Requires FB_PAGE_ID and a FB_PAGE_ACCESS_TOKEN in .env.local.
// A Page Access Token is generated from:
//   Meta App → your Page → Permissions (pages_read_engagement) → Token tool.
export async function getFacebookPosts(limit = 10): Promise<FetchedPost[]> {
  const pageId = process.env.FB_PAGE_ID;
  const token = process.env.FB_PAGE_ACCESS_TOKEN;
  if (!pageId || !token) return [];

  const fields = [
    "id",
    "message",
    "story",
    "created_time",
    "permalink_url",
    "full_picture",
    "picture",
    "attachments{media,target,type}",
  ].join(",");

  const url =
    `https://graph.facebook.com/${API_VERSION}/${encodeURIComponent(pageId)}/posts` +
    `?fields=${encodeURIComponent(fields)}` +
    `&limit=${limit}` +
    `&access_token=${encodeURIComponent(token)}`;

  try {
    const res = await fetch(url, {
      headers: { "User-Agent": "paddock-bulletin/1.0" },
      next: { revalidate: 600 },
    });
    if (!res.ok) return [];
    const json = (await res.json()) as { data?: FacebookPost[]; error?: any };
    if (!json.data || json.error) return [];

    const pageName = process.env.FB_PAGE_NAME ?? "Facebook";
    return json.data
      .filter((p) => p.message || p.attachments?.data?.length)
      .map((p) => toBlogPost(p, pageName));
  } catch {
    return [];
  }
}
