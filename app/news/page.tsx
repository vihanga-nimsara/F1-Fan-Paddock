import Link from "next/link";
import { Container, MediaFallback } from "@/components/f1kit";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import BlogList from "@/components/BlogList";
import { getBlogPosts, timeAgo } from "@/lib/blog";

export const metadata = {
  title: "F1 News — F1 Paddock SL",
};

export const dynamic = "force-dynamic";

export default async function NewsPage() {
  const posts = await getBlogPosts(13);
  const [featured, ...rest] = posts;

  return (
    <main className="w-full">
      <section className="border-b border-border bg-muted/40">
        <Container className="flex flex-col gap-10 py-10 md:py-14">
          <div className="flex flex-col gap-3">
            <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-f1red">
              F1 News Wire
            </span>
            <h1 className="m-0 max-w-[22ch] font-heading text-[clamp(2rem,5vw,3.5rem)] font-bold leading-[1.02] tracking-tight">
              Latest from across the web
            </h1>
            <p className="m-0 max-w-[60ch] text-[15px] leading-relaxed text-muted-foreground">
              Headlines and analysis gathered in one place — the fastest way to
              stay across the Formula 1 story.
            </p>
          </div>
        </Container>
      </section>

      <Container className="flex flex-col gap-12 py-10 md:py-12">
        {featured ? (
          <Link
            href={featured.link}
            target={featured.link.startsWith("http") ? "_blank" : undefined}
            rel={
              featured.link.startsWith("http")
                ? "noopener noreferrer"
                : undefined
            }
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
                <MediaFallback label={featured.source?.[0]} sublabel={featured.source} />
              )}
              <Badge className="absolute left-4 top-4 bg-f1red text-white hover:bg-f1red-dark">
                Featured · {featured.source}
              </Badge>
            </div>
            <div className="flex flex-col justify-center gap-3 p-6 md:p-10">
              <h2 className="m-0 font-heading text-[clamp(1.4rem,3vw,2.2rem)] font-bold leading-[1.08] tracking-tight group-hover:text-f1red">
                {featured.title}
              </h2>
              <p className="m-0 line-clamp-4 text-[14px] leading-relaxed text-muted-foreground">
                {featured.description}
              </p>
              <span className="text-[12px] font-medium text-muted-foreground">
                {featured.author} · {timeAgo(featured.pubDate)} ago
              </span>
              <Button asChild variant="outline" size="sm" className="mt-1 w-fit">
                <Link href={featured.link} target={featured.link.startsWith("http") ? "_blank" : undefined} rel={featured.link.startsWith("http") ? "noopener noreferrer" : undefined}>
                  Read more
                </Link>
              </Button>
            </div>
          </Link>
        ) : null}

        <section className="flex flex-col gap-5">
          <div className="flex items-end justify-between gap-4 border-b border-border pb-3">
            <div>
              <span className="mb-1 block text-[11px] font-semibold uppercase tracking-[0.18em] text-f1red">
                Latest
              </span>
              <h2 className="m-0 font-heading text-2xl font-bold tracking-tight">
                More from the wire
              </h2>
            </div>
          </div>
          <BlogList posts={rest} />
        </section>
      </Container>
    </main>
  );
}