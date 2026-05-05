
function ChatMsg({ from, text }: { from: "them" | "us"; text: string }) {
  return (
    <div className={`flex flex-col max-w-[80%] ${from === "us" ? "self-end items-end" : "self-start items-start"}`}>
      <div
        className={`px-4 py-2 rounded-xl text-sm leading-snug ${
          from === "them"
            ? "bg-slate-800 text-slate-300 rounded-bl-sm"
            : "bg-blue-600 text-white rounded-br-sm"
        }`}
      >
        {text}
      </div>
    </div>
  );
}

export const HeroSection = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 lg:px-8 py-24 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
      <div>
        <div className="inline-block text-[11px] font-semibold uppercase tracking-[0.25em] text-emerald-300 border border-emerald-900 bg-emerald-950/40 px-3 py-1 rounded-full mb-6">
          Web3 KOL Attribution · Live
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold leading-[1.15] tracking-tight text-slate-50 mb-5">
          <span className="whitespace-nowrap">Measure ROI per KOL,</span>
          <br />
          <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            Do Not Guess.
          </span>
        </h1>
        <p className="text-slate-400 text-base leading-relaxed mb-8">
          Turn community into a revenue channel.
          <br />
          <br />
          <strong className="text-slate-300">200+ KOL pitches in your inbox.</strong> No deliverables, no
          accountability — just <em>"2 tweets for $100."</em>
          <br />
          <br />
          We built Segmento: the first platform that ties every KOL directly to verified on-chain results.
        </p>
        <div className="flex flex-wrap gap-3">
          <a
            href="#cta"
            className="bg-gradient-to-r from-blue-500 to-violet-700 text-white px-7 py-3 rounded-lg text-sm font-semibold"
          >
            Book a Demo
          </a>
          <a href="#metrics" className="border border-slate-700 text-slate-400 px-7 py-3 rounded-lg text-sm font-medium">
            How it works →
          </a>
        </div>
      </div>

      <div>
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
          <div className="bg-slate-800 px-5 py-3 flex items-center gap-3 border-b border-slate-900">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-violet-700 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
              K
            </div>
            <div>
              <div className="text-sm font-semibold text-slate-200">KOL_alpha.eth</div>
              <div className="text-xs text-green-400">● Online</div>
            </div>
            <span className="ml-auto text-[10px] text-slate-500 uppercase tracking-wider">+199 similar messages</span>
          </div>
          <div className="px-5 py-5 flex flex-col gap-3">
            <ChatMsg from="them" text="I will do 2 tweets for $500. Last offer!" />
            <ChatMsg from="us" text="What users, fees, or TVL do I get?" />
            <ChatMsg from="them" text="2 tweets. Big audience. Trust me 🚀" />
            <ChatMsg from="us" text="I need the on-chain numbers. Even for $5 — I need to know the ROI." />
            <ChatMsg from="them" text="3 tweets, $250. Final offer!" />
          </div>
          <div className="bg-slate-800 border-t border-slate-900 px-5 py-3 flex items-center gap-2">
            <span className="bg-violet-700 text-white text-xs font-bold px-2.5 py-0.5 rounded-full">200+</span>
            <span className="text-xs text-slate-500">KOL pitches with zero accountability</span>
          </div>
        </div>
        <div className="mt-3 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-slate-700 rounded-xl p-4 flex items-start gap-3">
          <span className="text-xl flex-shrink-0">⛓</span>
          <p className="text-sm text-slate-400 leading-relaxed">
            <strong className="text-emerald-300">Segmento changes this.</strong> Every KOL mapped to real wallet
            activity — fees collected, TVL deployed, genuine users vs. farmers.
          </p>
        </div>
      </div>
    </section>
  );
};
