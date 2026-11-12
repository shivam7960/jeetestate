export default function SectionHeading({
  title,
  intro,
  align = "left",
  tone = "dark",
  as: Tag = "h2",
}: {
  title: string;
  intro?: string;
  align?: "left" | "center";
  tone?: "dark" | "light";
  as?: "h1" | "h2";
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <Tag
        className={`font-display text-3xl leading-tight sm:text-4xl ${
          tone === "light" ? "text-white" : "text-ink"
        }`}
      >
        {title}
      </Tag>
      <span className="mt-4 block h-px w-14 bg-gold" aria-hidden="true" />
      {intro && (
        <p className={`mt-4 text-base leading-relaxed ${tone === "light" ? "text-white/75" : "text-slate"}`}>
          {intro}
        </p>
      )}
    </div>
  );
}
