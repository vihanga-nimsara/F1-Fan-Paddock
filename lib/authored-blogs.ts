import type { OwnPost } from "./own-posts";
import { supabase } from "./supabase";

type AuthoredBlogRow = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  image: string | null;
  published: boolean;
  created_at: string;
  updated_at?: string | null;
  author?: string | null;
};

function estimateReadTime(content: string): string {
  const words = content
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} min read`;
}

function toOwnPost(row: AuthoredBlogRow): OwnPost {
  const paragraphs = row.content
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean);
  return {
    id: row.slug || row.id,
    title: row.title,
    excerpt: row.excerpt ?? "",
    content: paragraphs.length
      ? paragraphs
      : [row.content],
    image: row.image ?? undefined,
    author: {
      name: row.author ?? "F1 Paddock SL",
      role: "Author",
      bio: `Written by ${(row.author ?? "F1 Paddock SL").split("@")[0]} for F1 Paddock SL.`,
      avatar: undefined,
    },
    pubDate: row.created_at,
    readTime: estimateReadTime(row.content),
    comments: [],
  };
}

export async function getAuthoredBlogs(): Promise<OwnPost[]> {
  if (!supabase) return [];
  try {
    const { data, error } = await supabase
      .from("blogs")
      .select("id,title,slug,excerpt,content,image,published,created_at,updated_at,author")
      .eq("published", true)
      .order("created_at", { ascending: false })
      .limit(50);
    if (error || !data) return [];
    return (data as AuthoredBlogRow[]).map(toOwnPost);
  } catch {
    return [];
  }
}

export async function getAuthoredBlogBySlug(
  slug: string
): Promise<OwnPost | undefined> {
  if (!supabase) return undefined;
  try {
    const { data, error } = await supabase
      .from("blogs")
      .select("id,title,slug,excerpt,content,image,published,created_at,updated_at,author")
      .eq("slug", slug)
      .eq("published", true)
      .limit(1);
    if (error || !data || data.length === 0) return undefined;
    return toOwnPost(data[0] as AuthoredBlogRow);
  } catch {
    return undefined;
  }
}