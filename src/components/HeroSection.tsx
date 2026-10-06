import { btnGhost, btnPrimary } from "./ui";

function ChatMsg({ from, text }: { from: "them" | "us"; text: string }) {
  return (
    <div
      className={`flex flex-col max-w-[80%] ${from === "us" ? "self-end items-end" : "self-start items-start"}`}
    >
      <div
        className={`px-4 py-2 rounded-lg text-sm leading-snug ${
          from === "them"
            ? "bg-accent-soft text-paper/80 rounded-bl-sm"
            : "bg-accent text-ink font-medium rounded-br-sm"
        }`}
      >
        {text}
      </div>
    </div>
  );
}

export const HeroSection = () => {
  return (
    <section className="relative overflow-hidden border-b border-line">
      <div className="absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_at_top_left,black_20%,transparent_70%)]" />
      <div className="absolute -top-40 -right-40 w-[520px] h-[520px] rounded-full bg-accent/10 blur-[120px]" />
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-24 lg:py-32 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
        <div>
          <div className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-mute border border-line-2 px-3 py-1.5 rounded-full mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            Web3 KOL Attribution · Live
          </div>
          <h1 className="text-[2.6rem] sm:text-6xl font-semibold leading-[1.02] tracking-[-0.025em] text-paper mb-7">
            <span className="sm:whitespace-nowrap">Measure ROI per KOL,</span>
            <br />
            <span className="text-accent">Do Not Guess.</span>
          </h1>
          <p className="text-mute text-base leading-relaxed mb-10 max-w-lg">
            Turn community into a revenue channel.
            <br />
            <br />
            <strong className="text-paper font-medium">200+ KOL pitches in your inbox.</strong>{" "}
            No deliverables, no accountability — just <em>"2 tweets for $100."</em>
            <br />
            <br />
            We built Segmento: the first platform that ties every KOL directly to
            verified on-chain results.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="https://app.segmento.tech"
              target="_blank"
              rel="noopener noreferrer"
              className={btnPrimary}
            >
              Launch App
            </a>
            <a href="#cta" className={btnGhost}>
              Book a Demo →
            </a>
          </div>
        </div>

        <div>
          <div className="bg-ink-2 border border-line rounded-xl overflow-hidden">
            <div className="px-5 py-3 flex items-center gap-3 border-b border-line">
              <div className="w-8 h-8 rounded-full bg-ink-3 border border-line-2 flex items-center justify-center text-paper text-sm font-semibold shrink-0">
                K
              </div>
              <div>
                <div className="text-sm font-medium text-paper">KOL_alpha.eth</div>
                <div className="font-mono text-[10px] text-emerald-400">● online</div>
              </div>
              <span className="ml-auto font-mono text-[10px] text-dim uppercase tracking-wider">
                +199 similar messages
              </span>
            </div>
            <div className="px-5 py-6 flex flex-col gap-3">
              <ChatMsg from="them" text="I will do 2 tweets for $500. Last offer!" />
              <ChatMsg from="us" text="What users, fees, or TVL do I get?" />
              <ChatMsg from="them" text="2 tweets. Big audience. Trust me 🚀" />
              <ChatMsg
                from="us"
                text="I need the on-chain numbers. Even for $5 — I need to know the ROI."
              />
              <ChatMsg from="them" text="3 tweets, $250. Final offer!" />
            </div>
            <div className="border-t border-line px-5 py-3 flex items-center gap-3">
              <span className="font-mono text-xs text-accent">200+</span>
              <span className="font-mono text-[11px] text-dim">
                KOL pitches with zero accountability
              </span>
            </div>
          </div>
          <div className="mt-3 border border-accent/30 bg-accent-soft rounded-xl p-4 flex items-start gap-3">
            <img src="/brand/mark.png" alt="" className="h-5 mt-0.5 shrink-0" />
            <p className="text-sm text-mute leading-relaxed">
              <strong className="text-paper font-medium">Segmento changes this.</strong>{" "}
              Every KOL mapped to real wallet activity — fees collected, TVL
              deployed, genuine users vs. farmers.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
