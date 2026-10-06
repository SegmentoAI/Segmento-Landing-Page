import { SectionLabel } from "./ui";

const STEPS = [
  {
    num: "01",
    title: "Propose a budget",
    desc: "You set a campaign budget (e.g. $10k). Segmento activates a curated set of KOLs against that budget.",
    note: null,
  },
  {
    num: "02",
    title: "Segmento expands your KOL roster",
    desc: "Your existing KOLs are onboarded to Segmento for tracking. We then add more KOLs to your list — extending your reach while keeping everything measured in one place.",
    note: null,
  },
  {
    num: "03",
    title: "KOLs do their magic",
    desc: "KOLs run their campaigns. Every referred wallet is tracked from first click to on-chain activity.",
    note: null,
  },
  {
    num: "04",
    title: "Segmento monitors results",
    desc: "Real-time dashboard shows fees, TVL, new users, and farmer-filtered wallet counts per KOL.",
    note: null,
  },
  {
    num: "05",
    title: "Project collects fees, campaign pays for itself",
    desc: "Final budget allocation is limited to half the fees the campaign generates — meaning the fees collected can fully cover the cost of the campaign.",
    note: "Campaign can fully pay for itself",
  },
];

export const SolutionSection = () => {
  return (
    <section id="flywheel" className="py-28 border-b border-line">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-16">
        <div className="lg:sticky lg:top-28 self-start">
          <SectionLabel index="02">The process</SectionLabel>
          <h2 className="text-4xl sm:text-5xl font-semibold tracking-[-0.025em] text-paper leading-[1.05] mb-5">
            Turn marketing into a <span className="text-accent">self-propelling flywheel</span>
          </h2>
          <p className="text-mute text-lg leading-relaxed">
            Budget is tied to results. Final spend is capped at half of fees collected — campaign can fully pay for
            itself.
          </p>
        </div>
        <ol className="border-l border-line">
          {STEPS.map((step) => (
            <li key={step.num} className="relative pl-10 pb-12 last:pb-0">
              <span className="absolute -left-[5px] top-1.5 w-[9px] h-[9px] rounded-full bg-ink border border-accent" />
              <div className="font-mono text-xs text-accent mb-2">{step.num}</div>
              <h3 className="text-xl font-medium text-paper mb-2">{step.title}</h3>
              <p className="text-sm text-mute leading-relaxed max-w-lg">{step.desc}</p>
              {step.note && (
                <span className="inline-block mt-4 font-mono text-[11px] uppercase tracking-wider text-ink bg-accent px-3 py-1 rounded">
                  {step.note}
                </span>
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};
