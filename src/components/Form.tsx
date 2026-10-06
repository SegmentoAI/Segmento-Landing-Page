import { useState } from "react";
import { captureLead } from "@segmento/core";
import { SectionLabel, btnPrimary } from "./ui";

const SuccessModal = ({ onClose }: { onClose: () => void }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
    <div className="relative bg-ink-2 border border-line-2 rounded-xl px-8 py-10 max-w-sm w-full text-center shadow-2xl">
      <div className="text-accent text-4xl mb-4">✓</div>
      <h3 className="text-xl font-semibold text-paper mb-2">We got your message!</h3>
      <p className="text-mute text-sm mb-8">
        Reach out directly and we'll get back to you right away.
      </p>
      <div className="space-y-3">
        <a
          href="https://t.me/Marek314"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full bg-ink-3 hover:border-accent border border-line-2 text-paper px-5 py-3 rounded-md text-sm font-medium transition-colors"
        >
          <svg className="w-5 h-5 text-accent" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L8.32 14.617l-2.96-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.828.942z" />
          </svg>
          Telegram — @Marek314
        </a>
        <a
          href="https://calendly.com/marek-hauzr/segmento"
          target="_blank"
          rel="noopener noreferrer"
          className={`${btnPrimary} w-full py-3`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          Book a Demo Call
        </a>
      </div>
      <button
        onClick={onClose}
        className="mt-6 font-mono text-dim hover:text-paper text-xs transition-colors"
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
    "w-full bg-ink border border-line-2 rounded-md px-3 py-2.5 text-paper placeholder-dim focus:outline-none focus:border-accent transition-colors";

  return (
    <>
      {status === "success" && (
        <SuccessModal onClose={() => setStatus("idle")} />
      )}
      <div className="max-w-2xl mx-auto px-6 text-center">
        <div className="flex justify-center">
          <SectionLabel index="05">Get started</SectionLabel>
        </div>
        <h2 className="text-4xl sm:text-5xl font-semibold tracking-[-0.025em] text-paper leading-[1.05] mb-5">
          Run your next campaign
          <br />
          based on{" "}
          <span className="text-accent">
            data you can trust.
          </span>
        </h2>
        <p className="text-mute text-lg leading-relaxed mb-10 max-w-lg mx-auto">
          Leave your contact and we'll reach out to show how Segmento can
          transform your protocol's understanding of user behavior.
        </p>
        <form
          onSubmit={handleSubmit}
          className="max-w-lg mx-auto bg-ink-2/80 backdrop-blur border border-line rounded-xl px-6 sm:px-8 py-8 space-y-5 text-left"
        >
          <div>
            <label className="block font-mono text-[11px] uppercase tracking-wider text-mute mb-2">
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
            <label className="block font-mono text-[11px] uppercase tracking-wider text-mute mb-2">
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
            <label className="block font-mono text-[11px] uppercase tracking-wider text-mute mb-2">
              Project name
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
            <label className="block font-mono text-[11px] uppercase tracking-wider text-mute mb-2">
              Project description{" "}
              <span className="text-dim">(optional)</span>
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
            disabled={status === "loading" || (!email && !telegram) || !project}
            className={`${btnPrimary} w-full py-3 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-paper`}
          >
            {status === "loading" ? "Sending…" : "Get in Touch"}
          </button>
        </form>
      </div>
    </>
  );
};
