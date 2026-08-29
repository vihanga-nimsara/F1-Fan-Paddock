import { Container } from "@/components/f1kit";
import BlogCard from "@/components/BlogCard";
import { getCachedBlogPosts } from "@/lib/blog-cache";

export const metadata = {
  title: "The Paddock Blog — F1 Fan Paddock",
};

export const revalidate = 300;

export default async function StoriesPage() {
  const posts = await getCachedBlogPosts(24);

  return (
    <main className="relative w-full">
      <Container className="flex flex-col gap-10 py-8">
        <div className="flex flex-col gap-3">
          <h1 className="m-0 max-w-[20ch] font-headline text-[clamp(28px,5vw,56px)] font-semibold uppercase leading-[0.92] tracking-[0.01em] text-pebble">
            The Paddock Blog
          </h1>
          <p className="m-0 max-w-[60ch] text-sm leading-[1.4] text-pebble-80">
            Updates, race chat and behind-the-scenes posts straight from our
            Facebook page.
          </p>
        </div>

        {posts.length === 0 ? (
          <div className="flex w-full flex-col items-center gap-2 rounded-xl bg-pebble-5 p-10 text-center">
            <span className="text-3xl">🏁</span>
            <p className="m-0 font-body text-sm text-pebble-80">
              No posts yet — check back soon.
            </p>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((p) => (
              <BlogCard key={p.id || p.link} post={p} />
            ))}
          </div>
        )}
      </Container>
    </main>
  );
}
