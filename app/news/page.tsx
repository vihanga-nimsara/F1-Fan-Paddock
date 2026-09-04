import Link from "next/link";
import { Container, SectionHeading, MediaFallback } from "@/components/f1kit";
import BlogList from "@/components/BlogList";
import { getBlogPosts, timeAgo } from "@/lib/blog";

export const metadata = {
  title: "F1 News — F1 Fan Paddock",
};

export const dynamic = "force-dynamic";

export default async function NewsPage() {
  const posts = await getBlogPosts(13);
  const [featured, ...rest] = posts;

  return (
    <main className="relative w-full">
      <Container className="flex flex-col gap-12 py-8">
        <div className="flex flex-col gap-3">
          <h1 className="m-0 max-w-[20ch] font-headline text-[clamp(28px,5vw,56px)] font-semibold uppercase leading-[0.92] tracking-[0.01em] text-pebble">
            F1 News Wire
          </h1>
          <p className="m-0 max-w-[60ch] text-sm leading-[1.4] text-pebble-80">
            The latest from across the Formula 1 web, gathered in one place.
          </p>
        </div>

        {featured ? (
          <Link
            href={featured.link}
            className="group grid overflow-hidden rounded-xl bg-pebble-5 md:grid-cols-2"
          >
            <div className="relative aspect-[16/9] w-full overflow-hidden md:aspect-auto md:min-h-[360px]">
              {featured.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={featured.image}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              ) : (
                <MediaFallback
                  label={featured.source?.[0]}
                  sublabel={featured.source}
                />
              )}
            </div>
            <div className="flex flex-col justify-center gap-3 p-6 md:p-10">
              <span className="inline-flex w-fit items-center gap-2 rounded-xl bg-f1red px-2.5 py-1 font-display text-[10px] font-semibold tracking-[0.12em] text-white">
                Featured · {featured.source}
              </span>
              <h2 className="m-0 font-headline text-[clamp(20px,3vw,34px)] font-semibold leading-[1] tracking-[-0.01em] text-pebble transition-colors group-hover:text-f1red">
                {featured.title}
              </h2>
              <p className="m-0 line-clamp-4 text-sm leading-[1.4] text-pebble-80">
                {featured.description}
              </p>
              <span className="mt-1 font-display text-[11px] font-semibold tracking-[0.08em] text-pebble-50">
                {featured.author} · {timeAgo(featured.pubDate)} ago
              </span>
            </div>
          </Link>
        ) : null}

        <section className="flex flex-col gap-5">
          <SectionHeading
            kicker="Latest"
            title="More From The Wire"
            href="/news"
            linkLabel="All posts"
          />
          <BlogList posts={rest} />
        </section>
      </Container>
    </main>
  );
}
