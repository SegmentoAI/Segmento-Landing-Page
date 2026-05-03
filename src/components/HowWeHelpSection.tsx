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
  { label: "Avg user net worth", value: "$11,500", color: "text-violet-300" },
];

export const HowWeHelpSection = () => {
  return (
    <section id="for-kols" className="bg-[#080d1a] py-24 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-[0.25em] text-purple-400 mb-4">For KOLs</div>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-50 leading-tight mb-5">
            Prove your real impact.{" "}
            <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              Earn what you're worth.
            </span>
          </h2>
          <p className="text-slate-500 text-base leading-relaxed mb-8 max-w-md">
            Anyone can claim followers and impressions. Segmento gives you verified on-chain case studies that show
            exactly what you delivered — so you can command better deals and build a reputation that compounds.
          </p>
          <ul className="space-y-4">
            {KOL_POINTS.map((point) => (
              <li key={point} className="flex items-start gap-3 text-slate-400 text-sm leading-relaxed">
                <span className="text-purple-400 font-bold flex-shrink-0 mt-0.5">→</span>
                {point}
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-7">
          <div className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-500 mb-5">
            KOL Report — @alpha.eth
          </div>
          {KOL_REPORT_ROWS.map((row, i) => (
            <div
              key={row.label}
              className={`flex justify-between items-center py-3 ${i < KOL_REPORT_ROWS.length - 1 ? "border-b border-slate-800" : ""}`}
            >
              <span className="text-sm text-slate-500">{row.label}</span>
              <span className={`text-sm font-bold ${row.color || "text-slate-200"}`}>{row.value}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
