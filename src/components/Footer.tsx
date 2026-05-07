export const Footer = () => {
  return (
    <footer className="border-t border-slate-800 py-8 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
        <span className="text-lg font-bold tracking-[0.15em] bg-linear-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
          S e g m e n t o
        </span>
        <p className="text-xs text-slate-600">© {new Date().getFullYear()} Segmento. All rights reserved.</p>
        <div className="flex items-center gap-4">
          <a
            href="https://x.com/SegmentoAI"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-500 hover:text-slate-300 transition-colors"
            aria-label="X (Twitter)"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
            </svg>
          </a>
          <a
            href="mailto:marek@carmine.finance"
            className="text-xs text-slate-500 hover:text-slate-300 transition-colors"
          >
            marek@carmine.finance
          </a>
        </div>
      </div>
    </footer>
  );
};
