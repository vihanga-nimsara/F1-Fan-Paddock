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

export type FbComment = {
  id: string;
  name?: string;
  avatar?: string;
  message?: string;
  created_time?: string;
  replies: FbComment[];
};

export type FbChatThread = {
  postId: string;
  postMessage: string;
  postTime: string;
  link?: string;
  postImage?: string;
  author: string;
  pageAvatar?: string;
  comments: FbComment[];
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

type GraphComment = {
  id?: string;
  from?: {
    name?: string;
    picture?: { data?: { url?: string; is_silhouette?: boolean } };
  };
  message?: string;
  created_time?: string;
  comments?: { data?: GraphComment[] };
};

type GraphPost = FacebookPost & {
    comments?: { data?: GraphComment[] };
    attachments?: { data?: { media?: { image?: { src?: string } } }[] };
  };

function mapComment(c: GraphComment): FbComment {
  const avatarUrl = c.from?.picture?.data?.url;
  return {
    id: c.id ?? "",
    name: c.from?.name,
    avatar:
      avatarUrl && !c.from?.picture?.data?.is_silhouette
        ? `/api/fbimg?u=${encodeURIComponent(avatarUrl)}`
        : undefined,
    message: c.message,
    created_time: c.created_time,
    replies: (c.comments?.data ?? []).map(mapComment),
  };
}

// Fetches the latest Page posts together with their comment threads so the
// homepage can render a Messenger-style "live chat" widget. Requires the same
// FB_PAGE_ID / FB_PAGE_ACCESS_TOKEN as the posts feed.
export async function getFacebookChat(limit = 40): Promise<FbChatThread[]> {
  const pageId = process.env.FB_PAGE_ID;
  const token = process.env.FB_PAGE_ACCESS_TOKEN;
  if (!pageId || !token) return [];

  const commentFields = [
    "id",
    "from{name,picture.width(64).height(64)}",
    "message",
    "created_time",
    "comments.summary(true).limit(3){id,from{name,picture.width(64).height(64)},message,created_time}",
  ].join(",");
  const fields = [
    "id",
    "message",
    "created_time",
    "permalink_url",
    "full_picture",
    "attachments{media{image}}",
    `comments.summary(true).limit(6){${commentFields}}`,
  ].join(",");

  try {
    const posts = await Promise.all([
      fetch(
        `https://graph.facebook.com/${API_VERSION}/${encodeURIComponent(pageId)}/posts` +
          `?fields=${encodeURIComponent(fields)}&limit=${limit}` +
          `&access_token=${encodeURIComponent(token)}`,
        {
          headers: { "User-Agent": "paddock-bulletin/1.0" },
          cache: "no-store",
        },
      ).then((r) => r.json() as Promise<{ data?: GraphPost[]; error?: any }>),
      fetch(
        `https://graph.facebook.com/${API_VERSION}/${encodeURIComponent(pageId)}` +
          `?fields=picture.width(120).height(120),name` +
          `&access_token=${encodeURIComponent(token)}`,
        {
          headers: { "User-Agent": "paddock-bulletin/1.0" },
          cache: "no-store",
        },
      ).then((r) =>
        r.json() as Promise<{ name?: string; picture?: { data?: { url?: string } } }>,
      ),
    ]);

    const data = posts[0].data;
    const pageMeta = posts[1];
    if (!data) return [];

    const pageName = pageMeta?.name ?? process.env.FB_PAGE_NAME ?? "Facebook";
    const pageAvatar = pageMeta?.picture?.data?.url
      ? `/api/fbimg?u=${encodeURIComponent(pageMeta.picture.data.url)}`
      : undefined;

    return data
      .filter(
        (p) =>
          p.message ||
          p.full_picture ||
          p.attachments?.data?.[0]?.media?.image?.src,
      )
      .map((p) => {
        const mediaImage = p.attachments?.data?.[0]?.media?.image?.src;
        const picture = p.full_picture || mediaImage;
        return {
          postId: p.id ?? "",
          postMessage:
            p.message?.trim() ??
            (picture ? "\u{1F4F7} Photo post" : ""),
          postTime: p.created_time,
          link: p.permalink_url,
          postImage: picture
            ? `/api/fbimg?u=${encodeURIComponent(picture)}`
            : undefined,
          author: pageName,
          pageAvatar,
          comments: (p.comments?.data ?? []).map(mapComment),
        };
      });
  } catch {
    return [];
  }
}
