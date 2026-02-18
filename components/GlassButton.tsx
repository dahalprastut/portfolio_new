"use client";

import { type ReactNode } from "react";

interface GlassButtonProps {
  children: ReactNode;
  variant?: "default" | "accent" | "outline";
  size?: "sm" | "md" | "lg";
  href?: string;
  onClick?: () => void;
  icon?: ReactNode;
  className?: string;
  download?: string;
  dataCursor?: string;
  dataCursorLabel?: string;
}

const variantStyles = {
  default:
    "bg-white/[0.06] border-white/10 text-[var(--color-ink)] hover:bg-white/[0.10] hover:border-white/[0.18]",
  accent:
    "bg-[var(--color-accent-soft)] border-[rgba(201,168,124,0.35)] text-[var(--color-accent)] hover:bg-[rgba(201,168,124,0.22)] hover:border-[rgba(201,168,124,0.55)]",
  outline:
    "bg-transparent border-white/[0.18] text-[var(--color-ink)] hover:bg-white/[0.06] hover:border-white/[0.28]",
};

const sizeStyles = {
  sm: "px-4 py-2 text-[var(--text-body-sm)] h-9",
  md: "px-6 py-3 text-[var(--text-body)] h-11",
  lg: "px-8 py-4 text-[var(--text-body-lg)] h-[52px]",
};

export default function GlassButton({
  children,
  variant = "default",
  size = "md",
  href,
  onClick,
  icon,
  className = "",
  download,
  dataCursor = "pointer",
  dataCursorLabel,
}: GlassButtonProps) {
  const baseClasses = `
    inline-flex items-center justify-center gap-2
    rounded-full font-[var(--font-body)] font-medium
    border backdrop-blur-[16px]
    [box-shadow:inset_0_1px_0_0_rgba(255,255,255,0.08),0_1px_2px_rgba(0,0,0,0.2),0_2px_4px_rgba(0,0,0,0.15)]
    hover:-translate-y-px hover:shadow-md
    active:translate-y-0 active:scale-[0.98]
    transition-all duration-350 ease-[cubic-bezier(0.16,1,0.3,1)]
    focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]
    ${variantStyles[variant]}
    ${sizeStyles[size]}
    ${className}
  `.trim();

  const content = (
    <>
      {children}
      {icon && <span className="ml-1">{icon}</span>}
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        className={baseClasses}
        download={download}
        data-cursor={dataCursor}
        data-cursor-label={dataCursorLabel}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      onClick={onClick}
      className={baseClasses}
      data-cursor={dataCursor}
      data-cursor-label={dataCursorLabel}
    >
      {content}
    </button>
  );
}
