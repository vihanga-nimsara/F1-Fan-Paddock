import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import { MediaFallback } from "@/components/f1kit";
import { getCachedPostById } from "@/lib/blog-cache";
import { getOwnPostById } from "@/lib/own-posts";
import { getComments } from "@/lib/comments";
import CommentSection from "@/components/CommentSection";
import { timeAgo } from "@/lib/blog";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const own = getOwnPostById(id);
  const post = own ?? (await getCachedPostById(id));
  return {
    title: post ? `${post.title} — F1 Fan Paddock` : "Blog Post — F1 Fan Paddock",
  };}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const own = getOwnPostById(id);
  const post = await getCachedPostById(id);
  const userComments = getComments(id);

  if (!own && !post) notFound();

  if (own) {
    const photo = own.image;
    const comments = [
      ...own.comments.map((c) => ({
        id: `sample-${c.id}`,
        author: c.author,
        date: c.date,
        text: c.text,
      })),
      ...userComments,
    ];
    return (
      <main className="relative w-full">
        <div className="mx-auto flex w-full max-w-[720px] flex-col gap-8 px-4 py-8">
          <Link
            href="/stories"
            className="flex w-fit items-center gap-2 font-display text-[12px] font-semibold uppercase tracking-[0.08em] text-pebble-80 transition-colors hover:text-f1red"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to the blog
          </Link>

          <article className="flex flex-col gap-6">
            <div className="flex flex-col gap-3">
              <span className="inline-flex w-fit items-center gap-2 rounded-xl bg-f1red px-2.5 py-1 font-display text-[10px] font-semibold tracking-[0.12em] text-white">
                Paddock Vlog
              </span>
              <h1 className="m-0 max-w-[40ch] font-headline text-[clamp(24px,4vw,44px)] font-semibold leading-[1.02] tracking-[-0.01em] text-pebble">
                {own.title}
              </h1>
              <p className="m-0 max-w-[60ch] text-sm leading-[1.5] text-pebble-80">
                {own.excerpt}
              </p>
            </div>

            {/* Author — who wrote the vlog */}
            <div className="flex items-center gap-3 border-y border-pebble-15 py-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-f1red font-display text-sm font-semibold text-white">
                {own.author.avatar ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={own.author.avatar} alt="" className="h-full w-full object-cover" />
                ) : (
                  own.author.name.charAt(0)
                )}
              </span>
              <div className="flex flex-col">
                <span className="font-display text-sm font-semibold text-pebble">
                  {own.author.name}
                </span>
                <span className="text-[11px] text-pebble-80">
                  {own.author.role} · {own.readTime} · {timeAgo(own.pubDate)} ago
                </span>
              </div>
            </div>

            {/* Featured photo */}
            {photo ? (
              <div className="relative w-full overflow-hidden rounded-xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={photo} alt="" className="h-full w-full object-cover" />
              </div>
            ) : (
              <MediaFallback label="P" sublabel="Paddock" />
            )}

            {/* Author bio */}
            <div className="rounded-xl bg-pebble-5 p-4 text-sm leading-[1.6] text-pebble-80">
              <span className="font-display font-semibold text-pebble">
                About {own.author.name}
              </span>
              <span className="block">{own.author.bio}</span>
            </div>

            {/* Full text */}
            <div className="flex flex-col gap-5">
              {own.content.map((paragraph, i) => (
                <p
                  key={i}
                  className="m-0 text-[16px] leading-[1.7] text-pebble"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </article>

          {/* Comments */}
          <CommentSection postId={own.id} initialComments={comments} />
        </div>
      </main>
    );
  }

  if (!post) notFound();

  const photos = post.images?.length
    ? post.images
    : post.image
      ? [post.image]
      : [];

  return (
    <main className="relative w-full">
      <div className="mx-auto flex w-full max-w-[720px] flex-col gap-8 px-4 py-8">
        <Link
          href="/stories"
          className="flex w-fit items-center gap-2 font-display text-[12px] font-semibold uppercase tracking-[0.08em] text-pebble-80 transition-colors hover:text-f1red"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to the blog
        </Link>

        <article className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <span className="inline-flex w-fit items-center gap-2 rounded-xl bg-f1red px-2.5 py-1 font-display text-[10px] font-semibold tracking-[0.12em] text-white">
              Facebook
            </span>
            <h1 className="m-0 max-w-[40ch] font-headline text-[clamp(24px,4vw,44px)] font-semibold leading-[1.02] tracking-[-0.01em] text-pebble">
              {post.title}
            </h1>
          </div>

          {/* Author — who wrote the blog */}
          <div className="flex items-center gap-3 border-y border-pebble-15 py-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-f1red font-display text-sm font-semibold text-white">
              F
            </span>
            <div className="flex flex-col">
              <span className="font-display text-sm font-semibold text-pebble">
                {post.author}
              </span>
              <span className="text-[11px] text-pebble-80">
                {timeAgo(post.pubDate)} ago
                {post.link && post.link !== "#" ? (
                  <>
                    {" · "}
                    <a
                      href={post.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline transition-colors hover:text-f1red"
                    >
                      View on Facebook
                    </a>
                  </>
                ) : null}
              </span>
            </div>
          </div>

          {/* Featured photo */}
          {photos[0] ? (
            <div className="relative w-full overflow-hidden rounded-xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={photos[0]}
                alt=""
                className="h-full w-full object-cover"
              />
            </div>
          ) : (
            <MediaFallback label="F" sublabel="Facebook" />
          )}

          {/* Full text */}
          <p className="m-0 whitespace-pre-line text-[16px] leading-[1.7] text-pebble">
            {post.description}
          </p>

          {/* Extra photos */}
          {photos.length > 1 ? (
            <div className="grid gap-3 sm:grid-cols-2">
              {photos.slice(1).map((img, i) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={i}
                  src={img}
                  alt=""
                  className="w-full rounded-xl object-cover"
                />
              ))}
            </div>
          ) : null}
        </article>

        {/* Comments */}
        <CommentSection postId={id} initialComments={userComments} />
      </div>
    </main>
  );
}