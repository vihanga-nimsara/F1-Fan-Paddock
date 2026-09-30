import Link from "next/link";
import { Container } from "@/components/f1kit";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import PostCard from "@/components/PostCard";
import { getOwnPosts } from "@/lib/own-posts";
import { getAuthoredBlogs } from "@/lib/authored-blogs";
import { timeAgo } from "@/lib/blog";
import { ArrowRight } from "lucide-react";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ title: "The Paddock Blog", path: "/stories" });

export default async function StoriesPage() {
  const [ownPosts, authoredBlogs] = await Promise.all([
    Promise.resolve(getOwnPosts()),
    getAuthoredBlogs(),
  ]);
  const posts = [...authoredBlogs, ...ownPosts].sort(
    (a, b) => +new Date(b.pubDate) - +new Date(a.pubDate)
  );
  const [featured, ...rest] = posts;

  return (
    <main className="w-full">
      <section className="bg-muted/40">
        <Container className="flex flex-col gap-10 py-10 md:py-14">
          <div className="flex flex-col gap-3">
            <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-f1red">
              The Paddock Blog
            </span>
            <h1 className="m-0 max-w-[22ch] font-heading-big text-[clamp(2rem,5vw,3.5rem)] font-bold leading-[1.02] tracking-tight">
              Stories from the grid
            </h1>
            <p className="m-0 max-w-[60ch] text-[15px] leading-relaxed text-muted-foreground">
              Race chat, behind-the-scenes tales and the 2026 story written in
              full — in Sinhala and English.
            </p>
          </div>
        </Container>
      </section>

      <Container className="flex flex-col gap-12 py-10 md:py-12">
        {featured ? (
          <Link
            href={`/stories/${featured.id}`}
            className="group grid overflow-hidden rounded-2xl border border-border bg-card transition-all duration-200 hover:shadow-xl hover:shadow-foreground/5 md:grid-cols-2"
          >
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted md:aspect-auto">
              {featured.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={featured.image}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              ) : (
                <div className="absolute inset-0" />
              )}
              <Badge className="absolute left-4 top-4 bg-f1red text-white hover:bg-f1red-dark">
                Latest
              </Badge>
            </div>
            <div className="flex flex-col justify-center gap-3 p-6 md:p-10">
              <span className="text-[12px] font-medium text-muted-foreground">
                {featured.author.name} · {timeAgo(featured.pubDate)} · {featured.readTime}
              </span>
              <h2 className="m-0 font-heading-big text-[clamp(1.4rem,3vw,2.2rem)] font-bold leading-[1.08] tracking-tight group-hover:text-f1red">
                {featured.title}
              </h2>
              <p className="m-0 line-clamp-3 text-[14px] leading-relaxed text-muted-foreground">
                {featured.excerpt}
              </p>
              <Button asChild className="mt-1 w-fit gap-2 bg-f1red text-white hover:bg-f1red-dark">
                <Link href={`/stories/${featured.id}`} className="gap-1.5">
                  Read the story
                  <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true" />
                </Link>
              </Button>
            </div>
          </Link>
        ) : null}

        {rest.length > 0 ? (
          <section className="flex flex-col gap-5">
            <div className="flex items-end justify-between gap-4 border-b border-border pb-3">
              <h2 className="m-0 font-heading-big text-2xl font-bold tracking-tight">
                More stories
              </h2>
              <span className="text-[12px] font-medium text-muted-foreground">
                {posts.length} posts
              </span>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {rest.map((p) => (
                <PostCard
                  key={p.id}
                  href={`/stories/${p.id}`}
                  image={p.image}
                  tag="Paddock"
                  title={p.title}
                  excerpt={p.excerpt}
                  meta={
                    <>
                      <span>{p.author.name}</span>
                      <span aria-hidden="true">·</span>
                      <span>{timeAgo(p.pubDate)}</span>
                      <span aria-hidden="true">·</span>
                      <span>{p.readTime}</span>
                    </>
                  }
                />
              ))}
            </div>
          </section>
        ) : (
          <p className="rounded-2xl border border-dashed p-10 text-center text-sm text-muted-foreground">
            No posts yet — check back soon.
          </p>
        )}
      </Container>
    </main>
  );
}