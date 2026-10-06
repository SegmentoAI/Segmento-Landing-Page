import { CoinsIcon, GaugeIcon, GlobeIcon, LayersIcon, Link2Icon, UserCheckIcon } from "lucide-react";
import { SectionLabel } from "./ui";

const METRICS = [
  {
    icon: CoinsIcon,
    title: "Fees Generated",
    desc: "See the actual protocol fees each KOL's audience generates — not impressions, real revenue.",
    featured: true,
  },
  {
    icon: LayersIcon,
    title: "TVL Deployed",
    desc: "Track total value locked attributed to each KOL's referred wallets in real time.",
    featured: true,
  },
  {
    icon: UserCheckIcon,
    title: "Real Users Acquired",
    desc: "We filter out farmers and sybil wallets. You see genuine, retained users only.",
    featured: true,
  },
  {
    icon: Link2Icon,
    title: "Retained Wallets",
    desc: "Which wallets stayed active after the campaign? Measure lasting impact, not just spikes.",
    featured: false,
  },
  {
    icon: GlobeIcon,
    title: "Cross-Protocol Activity",
    desc: "Understand user behaviour beyond your protocol — net worth, trade volume, DeFi footprint.",
    featured: false,
  },
  {
    icon: GaugeIcon,
    title: "KOL Performance Score",
    desc: "Compare KOLs side-by-side with a single composite score. Allocate budget with confidence.",
    featured: false,
  },
];

export const WhereWeHelpSection = () => {
  return (
    <section id="metrics" className="py-28 border-b border-line">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <SectionLabel index="01">What we track</SectionLabel>
        <h2 className="text-4xl sm:text-5xl font-semibold tracking-[-0.025em] text-paper leading-[1.05] mb-5 max-w-3xl">
          Know exactly what each KOL delivers
        </h2>
        <p className="text-mute text-lg max-w-2xl mb-16 leading-relaxed">
          KOL–wallet mapping via direct affiliate links and indirect on-chain activity. No more guessing — every
          metric verified on-chain.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-line border border-line rounded-xl overflow-hidden">
          {METRICS.map((m, i) => (
            <div key={m.title} className="bg-ink p-8 group hover:bg-ink-2 transition-colors">
              <div className="flex items-center justify-between mb-8">
                <m.icon
                  className={`w-5 h-5 ${m.featured ? "text-accent" : "text-mute"}`}
                  strokeWidth={1.5}
                />
                <span className="font-mono text-[11px] text-dim">0{i + 1}</span>
              </div>
              <h3 className="text-lg font-medium text-paper mb-2">{m.title}</h3>
              <p className="text-sm text-mute leading-relaxed">{m.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
