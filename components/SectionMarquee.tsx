"use client";

interface SectionMarqueeProps {
  text: string;
  speed?: number;
  direction?: "left" | "right";
  variant?: "filled" | "outline" | "mixed";
}

export default function SectionMarquee({
  text,
  speed = 20,
  direction = "left",
  variant = "mixed",
}: SectionMarqueeProps) {
  const items = Array.from({ length: 8 }, (_, i) => i);

  const renderItem = (index: number) => {
    const isOutline =
      variant === "outline" || (variant === "mixed" && index % 2 === 1);

    return (
      <span
        key={index}
        className={`
          shrink-0 font-[var(--font-display)]
          text-[clamp(2.5rem,5vw+1rem,6rem)] uppercase tracking-tight
          ${
            isOutline
              ? "text-transparent [-webkit-text-stroke:1.5px_var(--color-ink)]"
              : "text-[var(--color-ink)]"
          }
        `}
      >
        {text}
        <span className="mx-[3rem] text-[var(--color-ink-ghost)]">&mdash;</span>
      </span>
    );
  };

  return (
    <div className="overflow-hidden w-full py-[clamp(4rem,8vw,8rem)]">
      <div
        className="flex whitespace-nowrap will-change-transform"
        style={{
          animation: `marquee ${speed}s linear infinite`,
          animationDirection: direction === "right" ? "reverse" : "normal",
        }}
      >
        {items.map(renderItem)}
      </div>
    </div>
  );
}
