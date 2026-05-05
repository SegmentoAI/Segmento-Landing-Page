const METRICS = [
  {
    icon: "💰",
    title: "Fees Generated",
    desc: "See the actual protocol fees each KOL's audience generates — not impressions, real revenue.",
    featured: true,
  },
  {
    icon: "📊",
    title: "TVL Deployed",
    desc: "Track total value locked attributed to each KOL's referred wallets in real time.",
    featured: true,
  },
  {
    icon: "👤",
    title: "Real Users Acquired",
    desc: "We filter out farmers and sybil wallets. You see genuine, retained users only.",
    featured: true,
  },
  {
    icon: "🔗",
    title: "Retained Wallets",
    desc: "Which wallets stayed active after the campaign? Measure lasting impact, not just spikes.",
    featured: false,
  },
  {
    icon: "🌐",
    title: "Cross-Protocol Activity",
    desc: "Understand user behaviour beyond your protocol — net worth, trade volume, DeFi footprint.",
    featured: false,
  },
  {
    icon: "📈",
    title: "KOL Performance Score",
    desc: "Compare KOLs side-by-side with a single composite score. Allocate budget with confidence.",
    featured: false,
  },
];

export const WhereWeHelpSection = () => {
  return (
    <section id="metrics" className="bg-[#080d1a] py-24 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-[11px] font-semibold uppercase tracking-[0.25em] text-emerald-300 mb-4">
          What we track
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold text-slate-50 leading-tight mb-4">
          Know exactly what each KOL delivers
        </h2>
        <p className="text-slate-500 text-lg max-w-2xl mb-14 leading-relaxed">
          KOL–wallet mapping via direct affiliate links and indirect on-chain activity. No more guessing — every
          metric verified on-chain.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {METRICS.map((m) => (
            <div
              key={m.title}
              className={`rounded-2xl border p-7 ${
                m.featured
                  ? "bg-gradient-to-br from-blue-500/10 to-violet-500/10 border-violet-500/30"
                  : "bg-slate-900 border-slate-800"
              }`}
            >
              <span className="text-2xl mb-4 block">{m.icon}</span>
              <h3 className={`text-base font-bold mb-2 ${m.featured ? "text-violet-300" : "text-slate-200"}`}>
                {m.title}
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed">{m.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
