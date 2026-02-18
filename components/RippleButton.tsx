"use client";

import { type ReactNode } from "react";

interface RippleButtonProps {
  children: ReactNode;
  color?: string;
  href?: string;
  onClick?: () => void;
  size?: "md" | "lg";
  className?: string;
  download?: string;
}

const sizeStyles = {
  md: "px-7 py-3 text-[var(--text-body)]",
  lg: "px-10 py-4 text-[var(--text-body-lg)]",
};

export default function RippleButton({
  children,
  color = "var(--color-accent)",
  href,
  onClick,
  size = "md",
  className = "",
  download,
}: RippleButtonProps) {
  const baseClasses = `
    group/ripple relative inline-flex items-center justify-center
    rounded-full font-[var(--font-body)] font-semibold
    bg-[var(--color-surface-subtle)] text-[var(--color-ink)]
    overflow-hidden
    transition-all duration-350 ease-[cubic-bezier(0.16,1,0.3,1)]
    focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]
    ${sizeStyles[size]}
    ${className}
  `.trim();

  const content = (
    <>
      {/* Ripple fill background */}
      <span
        className="absolute inset-0 translate-y-full group-hover/ripple:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{ backgroundColor: color }}
      />
      {/* Text with slide effect */}
      <span className="relative overflow-hidden h-[1.2em]">
        <span className="flex flex-col transition-transform duration-350 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/ripple:-translate-y-1/2">
          <span className="block">{children}</span>
          <span className="block text-[var(--color-void)]">{children}</span>
        </span>
      </span>
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        className={baseClasses}
        download={download}
        data-cursor="action"
        data-cursor-label="View"
      >
        {content}
      </a>
    );
  }

  return (
    <button
      onClick={onClick}
      className={baseClasses}
      data-cursor="action"
      data-cursor-label="View"
    >
      {content}
    </button>
  );
}
