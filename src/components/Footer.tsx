export const Footer = () => {
  return (
    <footer className="border-t border-slate-800 py-8 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
        <span className="text-lg font-bold tracking-[0.15em] bg-linear-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
          S e g m e n t o
        </span>
        <p className="text-xs text-slate-600">© {new Date().getFullYear()} Segmento. All rights reserved.</p>
        <a
          href="mailto:marek@carmine.finance"
          className="text-xs text-slate-500 hover:text-slate-300 transition-colors"
        >
          marek@carmine.finance
        </a>
      </div>
    </footer>
  );
};
