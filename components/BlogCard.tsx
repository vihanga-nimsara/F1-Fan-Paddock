import Link from "next/link";
import { MediaFallback } from "@/components/f1kit";
import { timeAgo } from "@/lib/blog";

export default function BlogCard({
  post,
}: {
  post: {
    id?: string;
    title: string;
    description?: string;
    image?: string;
    author: string;
    pubDate: string;
    source: string;
    link: string;
  };
}) {
  const href = `/stories/${encodeURIComponent(post.id || post.link)}`;

  return (
    <Link
      href={href}
      className="group flex flex-col overflow-hidden rounded-xl bg-pebble-5 transition-colors duration-200 hover:bg-pebble-8"
    >
      <div className="relative w-full overflow-hidden aspect-[16/9]">
        {post.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={post.image}
            alt=""
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <MediaFallback label="F" sublabel="Facebook" />
        )}
        <span className="absolute left-3 top-3 flex items-center gap-1 rounded-md bg-f1red px-2 py-1 font-display text-[10px] font-semibold tracking-[0.1em] text-white">
          Facebook
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-2 p-5">
        <h3 className="m-0 font-display text-[17px] font-semibold leading-[1.2] tracking-[0.01em] text-pebble transition-colors group-hover:text-f1red">
          {post.title}
        </h3>
        {post.description && (
          <p className="m-0 line-clamp-3 text-[13px] leading-[1.5] text-pebble-80">
            {post.description}
          </p>
        )}
        <span className="mt-auto flex items-center gap-2 pt-2 text-[11px] text-pebble-80">
          <span>{post.author}</span>
          <span aria-hidden="true">·</span>
          <span>{timeAgo(post.pubDate)}</span>
        </span>
      </div>
    </Link>
  );
}
