import { NextResponse } from "next/server";
import { getBlogPosts, timeAgo } from "@/lib/blog";

export const revalidate = 300;

export async function GET() {
  try {
    const posts = await getBlogPosts(6);
    const news = posts
      .filter((p) => p.source !== "Facebook")
      .slice(0, 5)
      .map((p) => ({
        id: p.id ?? p.link,
        title: p.title,
        link: p.link,
        source: p.source,
        image: p.image,
        description: (p.description ?? "").slice(0, 160),
        ago: timeAgo(p.pubDate),
      }));
    return NextResponse.json({ posts: news });
  } catch {
    return NextResponse.json({ posts: [] });
  }
}
