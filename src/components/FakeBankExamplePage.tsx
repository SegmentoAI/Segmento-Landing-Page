export function FakeBankExamplePage() {
  return (
    <div
      style={
        {
          "--fb-bg": "#f3f6fb",
          "--fb-ink": "#0f172a",
          "--fb-muted": "#4b5563",
          "--fb-accent": "#0ea5e9",
          "--fb-accent-2": "#22c55e",
          "--fb-pop": "#f97316",
        } as React.CSSProperties
      }
      className="min-h-screen text-[var(--fb-ink)]"
    >
      <div className="min-h-screen bg-[var(--fb-bg)]">
        <main className="w-full px-5 sm:px-8 py-10 sm:py-14">
          <section className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_25px_80px_rgba(15,23,42,0.08)]">
            <div className="absolute -top-20 -right-24 h-72 w-72 rounded-full bg-sky-200/50 blur-3xl" />
            <div className="absolute -bottom-24 -left-20 h-72 w-72 rounded-full bg-emerald-200/50 blur-3xl" />
            <div className="relative p-7 sm:p-10 grid gap-7 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
              <div>
                <p className="text-sm font-semibold tracking-[0.16em] uppercase text-sky-700">
                  FakeBank
                </p>
                <h1
                  className="mt-3 text-4xl sm:text-5xl font-black leading-tight"
                  style={{ fontFamily: "'Space Grotesk', 'Sora', sans-serif" }}
                >
                  <span className="block">
                    You have{" "}
                    <span className="text-[var(--fb-pop)]">crypto</span>? Come
                    for
                  </span>
                  <span className="block text-center text-[var(--fb-pop)]">
                    ₿etter mortgage rates!
                  </span>
                </h1>
                <p className="mt-4 max-w-2xl text-base sm:text-lg text-[var(--fb-muted)]">
                  FakeBank offers a <strong>0.1% discount</strong> on interest
                  for new mortgages and mortgage refinancing{" "}
                  <strong>for customers who hold any crypto assets</strong>.
                </p>

                <div className="mt-8 grid gap-4 sm:grid-cols-3">
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <p className="text-xs uppercase tracking-[0.12em] text-slate-500">
                      Standard Rate
                    </p>
                    <p className="mt-1 text-3xl font-bold">4.20%</p>
                  </div>
                  <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
                    <p className="text-xs uppercase tracking-[0.12em] text-emerald-700">
                      Crypto Holder Benefit
                    </p>
                    <p className="mt-1 text-3xl font-bold text-emerald-700">-0.10%</p>
                  </div>
                  <div className="rounded-2xl border border-sky-200 bg-sky-50 p-4">
                    <p className="text-xs uppercase tracking-[0.12em] text-sky-700">
                      Crypto Holder Rate
                    </p>
                    <p className="mt-1 text-3xl font-bold text-sky-700">4.10%</p>
                  </div>
                </div>
              </div>
              <div className="self-start lg:justify-self-end lg:mt-10 w-full max-w-md">
                <div className="flex justify-end mb-3">
                  <button className="rounded-xl bg-[var(--fb-accent)] text-white px-5 py-2.5 font-semibold shadow-sm hover:brightness-110 transition">
                    Apply Now
                  </button>
                </div>
                <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm bg-slate-100">
                <img
                  src="/images/people/person-1.png"
                  alt="Customer reviewing mortgage options"
                  className="h-80 w-full object-cover object-[50%_16%]"
                />
                <div className="p-4 bg-white">
                  <p className="text-sm font-semibold">A better rate for modern savers</p>
                  <p className="text-sm text-[var(--fb-muted)] mt-1">
                    Crypto ownership now unlocks lower borrowing cost at FakeBank.
                  </p>
                </div>
              </div>
              </div>
            </div>
          </section>

          <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-7 sm:p-8 shadow-sm">
            <h3 className="text-2xl font-bold">Rate Impact</h3>
            <p className="mt-2 text-[var(--fb-muted)]">
              Same credit profile, same loan term (30 years), lower monthly
              payment for customers holding crypto assets.
            </p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-sm text-slate-500">Standard offer</p>
                <p className="mt-1 text-xl font-bold">$400,000 mortgage</p>
                <p className="mt-3 text-sm text-slate-500">Interest rate</p>
                <p className="text-lg font-semibold text-slate-900">4.2%</p>
                <p className="mt-3 text-sm text-slate-500">Estimated monthly payment</p>
                <p className="text-lg font-semibold text-slate-900">$1,956</p>
              </div>
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-sm text-slate-500">Crypto-holder offer</p>
                <p className="mt-1 text-xl font-bold">$400,000 mortgage</p>
                <p className="mt-3 text-sm text-slate-500">Interest rate</p>
                <p className="text-lg font-semibold text-emerald-700">4.1%</p>
                <p className="mt-3 text-sm text-slate-500">Estimated monthly payment</p>
                <p className="text-lg font-semibold text-emerald-700">$1,933</p>
              </div>
            </div>
          </section>

          <section className="mt-6 rounded-3xl border border-slate-200 bg-gradient-to-br from-sky-50 to-emerald-50 p-7 sm:p-8 shadow-sm">
            <h3 className="text-2xl font-bold">Why This Offer Exists</h3>
            <div className="mt-4 grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
              <div className="grid gap-3">
                <article className="rounded-xl border border-slate-200/80 bg-white/70 p-4">
                  <p className="font-semibold text-slate-800">Crypto is becoming mainstream.</p>
                  <p className="mt-1 text-[var(--fb-muted)]">
                    Use it to unlock better borrowing terms.
                  </p>
                </article>
                <article className="rounded-xl border border-slate-200/80 bg-white/70 p-4">
                  <p className="font-semibold text-slate-800">
                    Your digital assets should work for you.
                  </p>
                  <p className="mt-1 text-[var(--fb-muted)]">
                    Especially in real-life financial products like mortgages.
                  </p>
                </article>
                <article className="rounded-xl border border-slate-200/80 bg-white/70 p-4">
                  <p className="font-semibold text-slate-800">Adoption is rising fast.</p>
                  <p className="mt-1 text-[var(--fb-muted)]">
                    Modern finance should reward modern users.
                  </p>
                </article>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <img
                  src="/images/people/person-2.png"
                  alt="Customer using banking app"
                  className="h-36 w-full rounded-xl object-cover object-[50%_14%] border border-slate-200"
                />
                <img
                  src="/images/people/person-3.png"
                  alt="Customer planning finances"
                  className="h-36 w-full rounded-xl object-cover object-[50%_14%] border border-slate-200"
                />
              </div>
            </div>
          </section>

          <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-7 sm:p-8 shadow-sm">
            <h3 className="text-2xl font-bold">Who This Helps</h3>
            <div className="mt-5 grid gap-4 md:grid-cols-3">
              <article className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <img
                  src="/images/people/person-4.png"
                  alt="Young professional buying first home"
                  className="h-72 w-full rounded-xl object-cover object-[50%_8%]"
                />
                <p className="mt-3 font-semibold">First-home buyer</p>
                <p className="mt-1 text-sm text-[var(--fb-muted)]">
                  Uses crypto savings and wants lower monthly mortgage cost.
                </p>
              </article>
              <article className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <img
                  src="/images/people/person-5.png"
                  alt="Family reviewing refinancing offer"
                  className="h-72 w-full rounded-xl object-cover object-[50%_8%]"
                />
                <p className="mt-3 font-semibold">Refinancing household</p>
                <p className="mt-1 text-sm text-[var(--fb-muted)]">
                  Looking to reduce rate and free monthly cash flow.
                </p>
              </article>
              <article className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <img
                  src="/images/people/person-6.png"
                  alt="Remote worker comparing mortgage plans"
                  className="h-72 w-full rounded-xl object-cover object-[50%_8%]"
                />
                <p className="mt-3 font-semibold">Digital-first customer</p>
                <p className="mt-1 text-sm text-[var(--fb-muted)]">
                  Wants banking products that recognize mainstream crypto usage.
                </p>
              </article>
            </div>
          </section>

          <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-7 sm:p-8 shadow-sm">
            <h3 className="text-2xl font-bold">Eligibility And Trust</h3>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <p className="font-semibold">How to qualify</p>
                <p className="mt-1 text-sm text-[var(--fb-muted)]">
                  Connect a wallet and verify active crypto holdings during the
                  application process.
                </p>
              </div>
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <p className="font-semibold">Transparency promise</p>
                <p className="mt-1 text-sm text-[var(--fb-muted)]">
                  All pricing assumptions, terms, and risk disclosures are shown
                  upfront before any commitment.
                </p>
              </div>
            </div>
          </section>

          <section className="mt-6 rounded-3xl bg-slate-900 text-white p-7 sm:p-8 shadow-[0_20px_60px_rgba(15,23,42,0.35)]">
            <h3 className="text-2xl font-bold">Start With FakeBank</h3>
            <p className="mt-2 text-slate-300">
              Request your mortgage quote or refinancing scenario and see your
              crypto-holder rate in minutes.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <button className="rounded-xl bg-[var(--fb-accent)] px-5 py-2.5 font-semibold">
                Start Mortgage Quote
              </button>
              <button className="rounded-xl bg-white/10 border border-white/20 px-5 py-2.5 font-semibold">
                Start Refinance Quote
              </button>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
