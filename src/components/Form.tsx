import { useState } from "react";
import { captureLead } from "@segmento/core";

export const Form = () => {
  const [email, setEmail] = useState("");
  const [telegram, setTelegram] = useState("");
  const [project, setProject] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

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

      {status === "success" ? (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl px-8 py-8 text-emerald-400 font-medium text-lg">
          Thanks! We'll be in touch soon.
        </div>
      ) : (
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
              Project name <span className="text-slate-600">(optional)</span>
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
      )}
    </div>
  );
};
