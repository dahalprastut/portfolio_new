"use client";

import { useState } from "react";
import { Download, Menu, X } from "lucide-react";
import { useScrollDirection } from "@/hooks/useScrollDirection";
import GlassButton from "./GlassButton";
import MobileMenu from "./MobileMenu";
import { personalInfo } from "@/lib/data";

const navLinks = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const { direction, scrollY, isAtTop } = useScrollDirection();
  const [menuOpen, setMenuOpen] = useState(false);

  const isHidden = direction === "down" && scrollY > 300 && !menuOpen;
  const isScrolled = !isAtTop;

  return (
    <>
      <header
        className={`
          fixed top-0 left-0 right-0 z-30
          transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
          ${isHidden ? "-translate-y-full" : "translate-y-0"}
          ${
            isScrolled
              ? "bg-white/6 backdrop-blur-md border-b border-white/10 [box-shadow:inset_0_1px_0_0_rgba(255,255,255,0.08)]"
              : ""
          }
        `}
      >
        <nav
          className="mx-auto flex items-center justify-between h-20 md:h-20"
          style={{ padding: "0 clamp(1.5rem, 5vw, 6rem)" }}
        >
          {/* Logo */}
          <a
            href="/"
            className="font-[var(--font-body)] text-lg font-bold text-[var(--color-ink)] hover:text-[var(--color-accent)] transition-colors duration-200"
            data-cursor="pointer"
          >
            Prastut Dahal
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="group relative font-[var(--font-body)] text-sm font-medium tracking-wide text-[var(--color-ink-secondary)] hover:text-[var(--color-ink)] transition-colors"
                data-cursor="pointer"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-full h-px bg-[var(--color-ink)] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-350 ease-[cubic-bezier(0.16,1,0.3,1)]" />
              </a>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <GlassButton
              variant="outline"
              size="sm"
              href={personalInfo.resumeUrl}
              download="PrastutDahal_Resume.pdf"
              icon={<Download size={14} />}
              className="hidden md:inline-flex"
            >
              Resume
            </GlassButton>

            <GlassButton
              variant="accent"
              size="sm"
              href="mailto:dahalprastut@gmail.com"
              className="hidden md:inline-flex"
              dataCursor="action"
              dataCursorLabel="Hire Me"
            >
              Hire Me
            </GlassButton>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden flex items-center gap-2 text-[var(--color-ink)] font-[var(--font-body)] text-sm font-medium"
              data-cursor="pointer"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>
      </header>

      <MobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
