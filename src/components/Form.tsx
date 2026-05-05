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

  const handleSubmit = async (e: React.SubmitEvent) => {
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

  return (
    <div className="max-w-7xl mx-auto">
      <div className="text-center">
        <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
          Ready to Get Started?
        </h2>
        <p className="mt-4 text-xl text-blue-100 max-w-3xl mx-auto">
          Leave your contact and we'll reach out to show you how Segmento can
          transform your protocol's understanding of user behavior.
        </p>
        <div className="mt-10 max-w-md mx-auto">
          {status === "success" ? (
            <div className="bg-white rounded-lg px-8 py-6 shadow-lg text-blue-600 font-medium text-lg">
              Thanks! We'll be in touch soon.
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-lg px-8 py-6 shadow-lg space-y-4"
            >
              <div className="text-left">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@protocol.xyz"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="text-left">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Telegram
                </label>
                <input
                  type="text"
                  value={telegram}
                  onChange={(e) => setTelegram(e.target.value)}
                  placeholder="@username"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="text-left">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Project name <span className="text-gray-400">(optional)</span>
                </label>
                <input
                  type="text"
                  value={project}
                  onChange={(e) => setProject(e.target.value)}
                  placeholder="My Protocol"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="text-left">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Project description{" "}
                  <span className="text-gray-400">(optional)</span>
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Tell us about your project…"
                  rows={3}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                />
              </div>
              {status === "error" && (
                <p className="text-red-500 text-sm">
                  Something went wrong. Please try again.
                </p>
              )}
              <button
                type="submit"
                disabled={status === "loading" || (!email && !telegram)}
                className="w-full inline-flex justify-center items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed shadow"
              >
                {status === "loading" ? "Sending…" : "Get in Touch"}
              </button>
            </form>
          )}
        </div>
        <p className="mt-6 text-blue-100">
          Our team will walk you through Segmento's capabilities and discuss how
          it can be tailored to your specific needs.
        </p>
      </div>
    </div>
  );
};
