import { useState } from "react";
import { captureLead } from "@segmento/core";

const SuccessModal = ({ onClose }: { onClose: () => void }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
    <div className="relative bg-slate-900 border border-slate-700 rounded-2xl px-8 py-10 max-w-sm w-full text-center shadow-2xl">
      <div className="text-emerald-400 text-4xl mb-4">✓</div>
      <h3 className="text-xl font-bold text-slate-50 mb-2">We got your message!</h3>
      <p className="text-slate-500 text-sm mb-8">
        Reach out directly and we'll get back to you right away.
      </p>
      <div className="space-y-3">
        <a
          href="https://t.me/Marek314"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-100 px-5 py-3 rounded-xl text-sm font-medium transition-colors"
        >
          <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L8.32 14.617l-2.96-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.828.942z" />
          </svg>
          Telegram — @Marek314
        </a>
        <a
          href="https://calendly.com/marek-hauzr/segmento"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full bg-linear-to-r from-blue-500 to-violet-700 text-white px-5 py-3 rounded-xl text-sm font-semibold"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          Book a Demo Call
        </a>
      </div>
      <button
        onClick={onClose}
        className="mt-6 text-slate-600 hover:text-slate-400 text-xs transition-colors"
      >
        Close
      </button>
    </div>
  </div>
);

export const Form = () => {
  const [email, setEmail] = useState("");
  const [telegram, setTelegram] = useState("");
  const [project, setProject] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setStatus("loading");
    const meta: Record<string, string> = {};
    if (project) meta.project_name = project;
    if (description) meta.project_description = description;
    try {
      await captureLead({
        email: email || undefined,
        telegram: telegram || undefined,
        meta: Object.keys(meta).length ? meta : undefined,
      });
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  const inputClass =
    "w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent";

  return (
    <>
      {status === "success" && (
        <SuccessModal onClose={() => setStatus("idle")} />
      )}
      <div className="max-w-lg mx-auto text-center">
        <div className="text-[11px] font-semibold uppercase tracking-[0.25em] text-emerald-300 mb-4">
          Get started
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold text-slate-50 leading-tight mb-5">
          Run your next campaign
          <br />
          based on{" "}
          <span className="bg-linear-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            data you can trust.
          </span>
        </h2>
        <p className="text-slate-500 text-lg leading-relaxed mb-10">
          Leave your contact and we'll reach out to show how Segmento can
          transform your protocol's understanding of user behavior.
        </p>
        <form
          onSubmit={handleSubmit}
          className="bg-slate-900 border border-slate-800 rounded-2xl px-8 py-8 space-y-4 text-left"
        >
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@protocol.xyz"
              className={inputClass}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1">
              Telegram
            </label>
            <input
              type="text"
              value={telegram}
              onChange={(e) => setTelegram(e.target.value)}
              placeholder="@username"
              className={inputClass}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1">
              Project name{" "}
              <span className="text-slate-600">(optional)</span>
            </label>
            <input
              type="text"
              value={project}
              onChange={(e) => setProject(e.target.value)}
              placeholder="My Protocol"
              className={inputClass}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1">
              Project description{" "}
              <span className="text-slate-600">(optional)</span>
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Tell us about your project…"
              rows={3}
              className={`${inputClass} resize-none`}
            />
          </div>
          {status === "error" && (
            <p className="text-red-400 text-sm">
              Something went wrong. Please try again.
            </p>
          )}
          <button
            type="submit"
            disabled={status === "loading" || (!email && !telegram)}
            className="w-full bg-linear-to-r from-blue-500 to-violet-700 text-white px-8 py-3 rounded-xl text-base font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {status === "loading" ? "Sending…" : "Get in Touch"}
          </button>
        </form>
      </div>
    </>
  );
};
