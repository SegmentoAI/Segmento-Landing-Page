import type { ReactNode } from "react";

// "segmento" wordmark: two stacked copies, top keeps 0–60% of the line box, bottom keeps 64–100%,
// leaving an empty 0.04em gap. Side/outer insets are negative so glyph overhang (g descender) isn't cut.
export const SplitWordmark = ({ className = "text-2xl" }: { className?: string }) => (
  <span
    role="img"
    aria-label="segmento"
    className={`relative inline-block font-[Geist] font-semibold tracking-[-0.04em] leading-none ${className}`}
  >
    <span aria-hidden className="block [clip-path:inset(-0.5em_-0.2em_40%_-0.2em)]">
      segmento
    </span>
    <span aria-hidden className="absolute inset-0 [clip-path:inset(64%_-0.2em_-0.5em_-0.2em)]">
      segmento
    </span>
  </span>
);

export const Logo = ({ className = "text-2xl" }: { className?: string }) => (
  <a href="/" className="flex items-center shrink-0 text-paper" aria-label="Segmento">
    <SplitWordmark className={className} />
  </a>
);

export const SectionLabel = ({ index, children }: { index: string; children: ReactNode }) => (
  <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-mute mb-5 flex items-center gap-3">
    <span className="text-accent">[{index}]</span>
    {children}
  </div>
);

export const btnPrimary =
  "inline-flex items-center justify-center gap-2 bg-paper text-ink px-5 py-2.5 rounded-md text-sm font-semibold hover:bg-accent transition-colors";
export const btnGhost =
  "inline-flex items-center justify-center gap-2 border border-line-2 text-paper px-5 py-2.5 rounded-md text-sm font-medium hover:border-accent hover:text-accent transition-colors";
