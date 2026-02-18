"use client";

import { useState } from "react";
import { personalInfo, socialLinks } from "@/lib/data";
import SectionMarquee from "./SectionMarquee";
import { useInView } from "@/hooks/useInView";

type FormState = "idle" | "loading" | "success" | "error";

export default function Contact() {
  const [sectionRef, inView] = useInView<HTMLDivElement>({ threshold: 0.1 });
  const [formState, setFormState] = useState<FormState>("idle");
  const [fields, setFields] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Partial<typeof fields>>({});

  function validate() {
    const e: Partial<typeof fields> = {};
    if (!fields.name.trim()) e.name = "Name is required";
    if (!fields.email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email))
      e.email = "Enter a valid email";
    if (!fields.message.trim()) e.message = "Message is required";
    return e;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setFormState("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fields),
      });
      if (!res.ok) throw new Error("Failed");
      setFormState("success");
      setFields({ name: "", email: "", message: "" });
    } catch {
      setFormState("error");
    }
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setFields((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  return (
    <section id="contact">
      <SectionMarquee text="SAY HI!!" variant="mixed" speed={15} />

      <div
        ref={sectionRef}
        className="mx-auto pb-[clamp(6rem,12vw,12rem)]"
        style={{ padding: "0 clamp(1.5rem, 5vw, 6rem)", maxWidth: "1440px" }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* ── Left: intro ────────────────────────────────────────────── */}
          <div
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? "translateY(0)" : "translateY(24px)",
              transition: "all 900ms cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            <p className="font-[var(--font-mono)] text-[11px] tracking-[0.2em] uppercase text-[var(--color-accent)] mb-6">
              Get in touch
            </p>
            <h2 className="font-[var(--font-display)] font-bold text-[clamp(2rem,4vw,4rem)] text-[var(--color-ink)] leading-tight tracking-tight mb-6">
              Let&apos;s build something&nbsp;great together.
            </h2>
            <p className="font-[var(--font-body)] text-[var(--text-body-lg)] text-[var(--color-ink-secondary)] leading-relaxed mb-10 max-w-sm">
              Have a project in mind, or just want to say hello? Fill in the
              form and I&apos;ll get back to you as soon as possible.
            </p>

            <a
              href={`mailto:${personalInfo.email}`}
              className="group inline-flex items-center gap-3 font-[var(--font-body)] text-[var(--color-ink-secondary)] hover:text-[var(--color-accent)] transition-colors duration-300"
              data-cursor="pointer"
            >
              <span className="w-8 h-px bg-current transition-all duration-300 group-hover:w-12" />
              {personalInfo.email}
            </a>

            <div className="flex gap-6 mt-8">
              {socialLinks.map((link, i) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-[var(--font-mono)] text-xs tracking-[0.1em] uppercase text-[var(--color-ink-tertiary)] hover:text-[var(--color-ink)] transition-colors duration-200"
                  data-cursor="pointer"
                  style={{
                    opacity: inView ? 1 : 0,
                    transform: inView ? "translateY(0)" : "translateY(16px)",
                    transition: `all 800ms cubic-bezier(0.16, 1, 0.3, 1) ${200 + i * 80}ms`,
                  }}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* ── Right: form ────────────────────────────────────────────── */}
          <div
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? "translateY(0)" : "translateY(24px)",
              transition: "all 900ms cubic-bezier(0.16, 1, 0.3, 1) 150ms",
            }}
          >
            {formState === "success" ? (
              <div className="flex flex-col items-start gap-4 py-12">
                <div className="w-12 h-12 rounded-full border border-[var(--color-accent)] flex items-center justify-center glass">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path
                      d="M4 10l4 4 8-8"
                      stroke="var(--color-accent)"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <h3 className="font-[var(--font-display)] font-bold text-2xl text-[var(--color-ink)]">
                  Message sent!
                </h3>
                <p className="font-[var(--font-body)] text-[var(--color-ink-secondary)]">
                  Thanks for reaching out. I&apos;ll get back to you soon.
                </p>
                <button
                  onClick={() => setFormState("idle")}
                  className="mt-4 font-[var(--font-mono)] text-xs tracking-[0.15em] uppercase text-[var(--color-ink-secondary)] hover:text-[var(--color-accent)] transition-colors duration-200"
                >
                  Send another →
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-6">

                {/* Full Name */}
                <ContactField label="Full Name" error={errors.name}>
                  <input
                    type="text"
                    name="name"
                    value={fields.name}
                    onChange={handleChange}
                    placeholder="Your full name"
                    disabled={formState === "loading"}
                    data-cursor="text"
                    className="contact-input"
                  />
                </ContactField>

                {/* Email */}
                <ContactField label="Email Address" error={errors.email}>
                  <input
                    type="email"
                    name="email"
                    value={fields.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    disabled={formState === "loading"}
                    data-cursor="text"
                    className="contact-input"
                  />
                </ContactField>

                {/* Message */}
                <ContactField label="Message" error={errors.message}>
                  <textarea
                    name="message"
                    value={fields.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project…"
                    rows={5}
                    disabled={formState === "loading"}
                    data-cursor="text"
                    className="contact-input resize-none"
                  />
                </ContactField>

                {/* Submit button — glassmorphism, square */}
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={formState === "loading"}
                    data-cursor="pointer"
                    className="
                      group relative overflow-hidden
                      inline-flex items-center gap-5
                      px-8 py-4
                      rounded-full
                      bg-white/10 backdrop-blur-[40px] [backdrop-filter:blur(40px)_saturate(180%)] [-webkit-backdrop-filter:blur(40px)_saturate(180%)]
                      border border-white/[0.18]
                      [box-shadow:inset_0_1px_0_0_rgba(255,255,255,0.15),0_4px_8px_rgba(0,0,0,0.12),0_8px_16px_rgba(0,0,0,0.10),0_16px_32px_rgba(0,0,0,0.08),0_32px_64px_rgba(0,0,0,0.06)]
                      hover:bg-white/15 hover:border-[var(--color-accent)]
                      hover:[box-shadow:inset_0_1px_0_0_rgba(255,255,255,0.15),0_0_20px_rgba(201,168,124,0.3),0_0_60px_rgba(201,168,124,0.1)]
                      active:scale-[0.98] active:translate-y-0
                      transition-all duration-[350ms] ease-[cubic-bezier(0.16,1,0.3,1)]
                      disabled:opacity-50 disabled:cursor-not-allowed
                    "
                  >
                    {/* Champagne fill on hover */}
                    <span
                      className="absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
                      style={{ backgroundColor: "var(--color-accent)" }}
                    />

                    {/* Text */}
                    <span className="relative z-10 font-[var(--font-body)] font-semibold text-[var(--color-ink)] group-hover:text-[var(--color-void)] transition-colors duration-300">
                      {formState === "loading" ? "Sending…" : "Send Message"}
                    </span>

                    {/* Arrow line */}
                    <span className="relative z-10 flex items-center gap-1.5">
                      <span className="block w-6 h-px bg-[var(--color-ink)] group-hover:bg-[var(--color-void)] group-hover:w-10 transition-all duration-400" />
                      <svg
                        width="8" height="8" viewBox="0 0 8 8" fill="none"
                        className="text-[var(--color-ink)] group-hover:text-[var(--color-void)] transition-colors duration-300"
                      >
                        <path d="M0 4h6M4 1l3 3-3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </button>

                  {formState === "error" && (
                    <p className="mt-4 font-[var(--font-mono)] text-[11px] text-[var(--color-error)]">
                      Something went wrong. Try again or email me directly.
                    </p>
                  )}
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Reusable form field wrapper ──────────────────────────────────────────── */
function ContactField({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="group/field space-y-2">
      <label className="block font-[var(--font-mono)] text-[11px] tracking-[0.18em] uppercase text-[var(--color-ink-secondary)] group-focus-within/field:text-[var(--color-accent)] transition-colors duration-200">
        {label}
      </label>

      {/* Glass input wrapper */}
      <div className="relative bg-white/6 backdrop-blur-md [backdrop-filter:blur(16px)_saturate(180%)] [-webkit-backdrop-filter:blur(16px)_saturate(180%)] border border-white/[0.12] [box-shadow:inset_0_1px_0_0_rgba(255,255,255,0.08)] rounded-[var(--radius-sm)] group-focus-within/field:border-[var(--color-accent)] group-focus-within/field:[box-shadow:inset_0_1px_0_0_rgba(255,255,255,0.12),0_0_12px_rgba(201,168,124,0.1)] transition-all duration-300">
        <style>{`
          .contact-input {
            width: 100%;
            background: transparent;
            padding: 0.875rem 1rem;
            font-family: var(--font-body);
            font-size: var(--text-body);
            color: var(--color-ink);
            outline: none;
          }
          .contact-input::placeholder {
            color: var(--color-ink-tertiary);
          }
        `}</style>
        {children}
      </div>

      {error && (
        <p className="font-[var(--font-mono)] text-[11px] text-[var(--color-error)]">
          {error}
        </p>
      )}
    </div>
  );
}
