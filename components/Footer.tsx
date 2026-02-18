export default function Footer() {
  return (
    <footer className="border-t border-white/6">
      <div
        className="mx-auto flex flex-col sm:flex-row justify-between items-center py-8 gap-4"
        style={{ padding: "2rem clamp(1.5rem, 5vw, 6rem)" }}
      >
        <span className="font-[var(--font-mono)] text-xs text-[var(--color-ink-tertiary)]">
          &copy; 2026 Prastut Dahal
        </span>
        <span className="font-[var(--font-mono)] text-xs text-[var(--color-ink-tertiary)]">
          Built with Next.js
        </span>
      </div>
    </footer>
  );
}
