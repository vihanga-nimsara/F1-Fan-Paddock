import Link from "next/link";
import { MediaFallback } from "@/components/f1kit";
import { SourceBadge } from "@/components/source-badge";
import { cn } from "@/lib/utils";

export default function PostCard({
  href,
  image,
  tag,
  title,
  excerpt,
  meta,
  className,
  imageClassName,
}: {
  href: string;
  image?: string;
  tag?: string;
  title: string;
  excerpt?: string;
  meta?: React.ReactNode;
  className?: string;
  imageClassName?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group flex flex-col overflow-hidden rounded-xl bg-card text-card-foreground ring-1 ring-foreground/10 transition-colors duration-200 hover:ring-foreground/20",
        className,
      )}
    >
      <div className={cn("relative w-full overflow-hidden bg-muted", imageClassName ?? "aspect-[16/9]")}>
        {image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={image}
            alt=""
            loading="lazy"
            className="h-full w-full object-cover"
          />
        ) : (
          <MediaFallback label={tag?.[0]} sublabel={tag} />
        )}
        {tag && <SourceBadge tag={tag} className="absolute left-3 top-3 z-10" />}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="m-0 line-clamp-2 font-heading text-[17px] font-bold leading-snug tracking-tight">
          {title}
        </h3>
        {excerpt && (
          <p className="m-0 line-clamp-2 text-[13px] leading-relaxed text-muted-foreground">
            {excerpt}
          </p>
        )}
        {meta && (
          <div className="mt-auto flex items-center gap-2 pt-2 text-[12px] text-muted-foreground">
            {meta}
          </div>
        )}
      </div>
    </Link>
  );
}