const DEMO_URL = "https://calendly.com/marek-hauzr/segmento";

export const CTASection = () => {
  return (
    <section id="cta" className="py-24 px-6 lg:px-8">
      <div className="max-w-2xl mx-auto text-center">
        <div className="text-[11px] font-semibold uppercase tracking-[0.25em] text-emerald-300 mb-4">Get started</div>
        <h2 className="text-3xl sm:text-4xl font-bold text-slate-50 leading-tight mb-5">
          Run your next campaign
          <br />
          based on{" "}
          <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            data you can trust.
          </span>
        </h2>
        <p className="text-slate-500 text-lg leading-relaxed mb-10">
          Segmento is live. One new project onboards every week.
          <br />
          Let's make yours next.
        </p>
        <a
          href={DEMO_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-gradient-to-r from-blue-500 to-violet-700 text-white px-9 py-4 rounded-xl text-base font-semibold"
        >
          Book a Demo
        </a>
      </div>
    </section>
  );
};
