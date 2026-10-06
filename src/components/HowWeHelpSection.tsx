import { SectionLabel } from "./ui";

const KOL_POINTS = [
  "Get your own KOL impact dashboard with real attribution data",
  "Build a portfolio of verified on-chain case studies",
  "Stand out to projects that pay for results, not promises",
  "Earn performance bonuses tied to real fees and TVL",
];

const KOL_REPORT_ROWS = [
  { label: "Campaign", value: "Protocol X · Apr 2026", color: "" },
  { label: "Users acquired", value: "720 real users", color: "text-emerald-400" },
  { label: "Farmers filtered", value: "24.2% removed", color: "text-red-400" },
  { label: "TVL generated", value: "$8.35M", color: "text-emerald-400" },
  { label: "Fees collected", value: "$42,800", color: "text-emerald-400" },
  { label: "Avg user net worth", value: "$11,500", color: "text-accent" },
];

export const HowWeHelpSection = () => {
  return (
    <section id="for-kols" className="py-28 border-b border-line">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div>
          <SectionLabel index="03">For KOLs</SectionLabel>
          <h2 className="text-4xl sm:text-5xl font-semibold tracking-[-0.025em] text-paper leading-[1.05] mb-5">
            Prove your real impact. <span className="text-accent">Earn what you're worth.</span>
          </h2>
          <p className="text-mute text-base leading-relaxed mb-10 max-w-md">
            Anyone can claim followers and impressions. Segmento gives you verified on-chain case studies that show
            exactly what you delivered — so you can command better deals and build a reputation that compounds.
          </p>
          <ul className="border-t border-line">
            {KOL_POINTS.map((point) => (
              <li
                key={point}
                className="flex items-start gap-4 py-4 border-b border-line text-paper/80 text-sm leading-relaxed"
              >
                <span className="font-mono text-accent shrink-0">→</span>
                {point}
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-ink-2 border border-line rounded-xl">
          <div className="flex items-center justify-between px-6 py-4 border-b border-line">
            <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-mute">KOL Report</span>
            <span className="font-mono text-[11px] text-accent">@alpha.eth</span>
          </div>
          <div className="px-6 py-2">
            {KOL_REPORT_ROWS.map((row, i) => (
              <div
                key={row.label}
                className={`flex justify-between items-center py-4 ${i < KOL_REPORT_ROWS.length - 1 ? "border-b border-dashed border-line-2" : ""}`}
              >
                <span className="text-sm text-mute">{row.label}</span>
                <span className={`font-mono text-sm ${row.color || "text-paper"}`}>{row.value}</span>
              </div>
            ))}
          </div>
          <div className="px-6 py-3 border-t border-line font-mono text-[10px] uppercase tracking-wider text-dim">
            ● Verified on-chain
          </div>
        </div>
      </div>
    </section>
  );
};
