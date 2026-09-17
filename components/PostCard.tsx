import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { MediaFallback } from "@/components/f1kit";
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
        "group flex flex-col overflow-hidden rounded-xl bg-card text-card-foreground ring-1 ring-foreground/10 transition-all duration-500 ease-out hover:-translate-y-0.5 hover:shadow-lg hover:shadow-foreground/5 hover:ring-foreground/20",
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
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />
        ) : (
          <MediaFallback label={tag?.[0]} sublabel={tag} />
        )}
        {tag && (
          <Badge className="absolute left-3 top-3 bg-f1red text-white hover:bg-f1red-dark">
            {tag}
          </Badge>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="m-0 line-clamp-2 font-heading text-[17px] font-bold leading-snug tracking-tight group-hover:text-f1red">
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