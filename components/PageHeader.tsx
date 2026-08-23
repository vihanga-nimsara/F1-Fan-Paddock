export default function PageHeader({
  title,
  accent,
  description,
}: {
  title: string;
  accent: string;
  description?: string;
}) {
  return (
    <div className="flex w-full flex-col items-start gap-3 py-10">
      <h1 className="m-0 font-headline text-[clamp(28px,4.5vw,52px)] font-normal uppercase leading-[0.9] tracking-[0.01em] text-pebble">
        {title} <span className="text-f1red">{accent}</span>
      </h1>
      {description && (
        <p className="m-0 max-w-[70ch] text-base leading-[1.25] text-pebble-80">
          {description}
        </p>
      )}
    </div>
  );
}