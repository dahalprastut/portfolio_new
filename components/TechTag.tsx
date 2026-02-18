interface TechTagProps {
  children: string;
  variant?: "default" | "blue";
}

const variantStyles = {
  default:
    "bg-white/3 border-white/6 text-[var(--color-ink-secondary)]",
  blue:
    "bg-[var(--color-accent-blue-soft)] border-[rgba(138,138,138,0.2)] text-[var(--color-accent-blue)]",
};

export default function TechTag({ children, variant = "default" }: TechTagProps) {
  return (
    <span
      className={`
        inline-flex items-center
        px-2.5 py-1 rounded-full border
        font-[var(--font-mono)] text-xs font-medium tracking-[0.05em] uppercase
        ${variantStyles[variant]}
      `}
    >
      {children}
    </span>
  );
}
