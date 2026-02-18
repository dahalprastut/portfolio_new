export default function GlobeFallback() {
  return (
    <div className="w-full h-full min-h-[400px] flex items-center justify-center">
      <div className="relative">
        {/* Pulsing circle placeholder */}
        <div className="w-48 h-48 rounded-full border border-white/10 animate-pulse" />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-[var(--font-mono)] text-xs text-[var(--color-ink-tertiary)] tracking-wide uppercase">
            Loading Globe...
          </span>
        </div>
      </div>
    </div>
  );
}
