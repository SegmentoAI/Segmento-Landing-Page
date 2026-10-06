import type { ReactNode } from "react";

const wordmarkMask = {
  maskImage: "url(/brand/wordmark.png)",
  WebkitMaskImage: "url(/brand/wordmark.png)",
  maskSize: "100% 100%",
  WebkitMaskSize: "100% 100%",
};

// "segmento" wordmark split horizontally like the S mark
export const SplitWordmark = ({ className = "h-[22px]" }: { className?: string }) => (
  <span role="img" aria-label="segmento" className={`relative inline-block aspect-[640/119] ${className}`}>
    <span className="absolute inset-0 bg-paper [clip-path:inset(0_0_58%_0)]" style={wordmarkMask} />
    <span className="absolute inset-0 bg-paper [clip-path:inset(52%_0_0_0)]" style={wordmarkMask} />
  </span>
);

export const Logo = ({ className = "h-[22px]" }: { className?: string }) => (
  <a href="/" className="flex items-center shrink-0" aria-label="Segmento">
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
