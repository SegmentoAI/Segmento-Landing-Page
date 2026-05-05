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
    <section id="flywheel" className="py-24 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="text-[11px] font-semibold uppercase tracking-[0.25em] text-emerald-300 mb-4">
            The process
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-50 leading-tight mb-4">
            Turn marketing into a{" "}
            <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              self-propelling flywheel
            </span>
          </h2>
          <p className="text-slate-500 text-lg max-w-xl mx-auto leading-relaxed">
            Budget is tied to results. Final spend is capped at half of fees collected — campaign can fully pay for
            itself.
          </p>
        </div>
        <div className="max-w-2xl mx-auto divide-y divide-slate-800">
          {STEPS.map((step) => (
            <div key={step.num} className="flex gap-6 py-7">
              <div className="flex-shrink-0 w-11 h-11 rounded-full bg-gradient-to-br from-blue-900 to-indigo-900 border border-slate-700 flex items-center justify-center text-sm font-bold text-blue-300">
                {step.num}
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-200 mb-2">{step.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{step.desc}</p>
                {step.note && (
                  <span className="inline-block mt-3 text-xs text-emerald-300 border border-emerald-900 bg-emerald-950/40 px-3 py-1 rounded-full">
                    {step.note}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
