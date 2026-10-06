import { Logo } from "./ui";

export const Footer = () => {
  return (
    <footer className="border-t border-line">
      <div className="border-b border-line">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8 flex flex-col sm:flex-row items-center gap-6 sm:gap-10">
          <img
            src="/brand/czechinvest.png"
            alt="CzechInvest"
            className="h-8 shrink-0"
          />
          <p className="text-sm text-mute leading-relaxed text-center sm:text-left">
            This project was carried out with financial support from the Technology Incubation programme of
            the CzechInvest agency.
          </p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-10 flex flex-col sm:flex-row justify-between items-center gap-6">
        <Logo className="h-[18px]" />
        <p className="font-mono text-[11px] text-dim">© {new Date().getFullYear()} Segmento. All rights reserved.</p>
        <div className="flex items-center gap-5">
          <a
            href="https://x.com/SegmentoAI"
            target="_blank"
            rel="noopener noreferrer"
            className="text-mute hover:text-paper transition-colors"
            aria-label="X (Twitter)"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
            </svg>
          </a>
          <a
            href="mailto:marek@carmine.finance"
            className="font-mono text-[11px] text-mute hover:text-paper transition-colors"
          >
            marek@carmine.finance
          </a>
        </div>
      </div>
    </footer>
  );
};
