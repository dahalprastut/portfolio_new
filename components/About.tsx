"use client";

import { personalInfo, socialLinks } from "@/lib/data";
import SectionMarquee from "./SectionMarquee";
import TextReveal from "./TextReveal";
import RippleButton from "./RippleButton";
import { useInView } from "@/hooks/useInView";

export default function About() {
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.2 });

  return (
    <section id="about">
      <SectionMarquee text="ABOUT ME" variant="mixed" />

      <div
        className="mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16"
        style={{ padding: "0 clamp(1.5rem, 5vw, 6rem)", maxWidth: "1440px" }}
      >
        {/* Left — Statement */}
        <div>
          <TextReveal
            as="h2"
            className="font-[var(--font-display)] text-[clamp(2rem,3vw+0.5rem,3.5rem)] font-normal leading-tight text-[var(--color-ink)]"
          >
            {personalInfo.aboutStatement}
          </TextReveal>
        </div>

        {/* Right — Bio */}
        <div ref={ref} className="space-y-6">
          {personalInfo.aboutBio.map((paragraph, i) => (
            <p
              key={i}
              className="font-[var(--font-body)] text-[var(--text-body-lg)] text-[var(--color-ink-secondary)] leading-relaxed"
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0)" : "translateY(20px)",
                transition: `all 800ms cubic-bezier(0.16, 1, 0.3, 1) ${i * 60}ms`,
              }}
            >
              {paragraph}
            </p>
          ))}

          <div
            className="flex items-center gap-4 pt-4"
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? "translateY(0)" : "translateY(20px)",
              transition: `all 800ms cubic-bezier(0.16, 1, 0.3, 1) 300ms`,
            }}
          >
            <RippleButton
              href={personalInfo.resumeUrl}
              download="PrastutDahal_Resume.pdf"
              size="md"
            >
              Download Resume
            </RippleButton>

            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-[var(--font-body)] text-sm text-[var(--color-accent)] hover:underline transition-colors"
                data-cursor="pointer"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
