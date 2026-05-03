import { useState } from "react";
import { MenuIcon, XIcon } from "lucide-react";

const DEMO_URL = "https://calendly.com/marek-hauzr/segmento";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-800 bg-[rgba(10,15,30,0.92)] backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <span className="text-xl font-bold tracking-[0.15em] bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            S e g m e n t o
          </span>
          <div className="hidden sm:flex items-center gap-8">
            <a href="#metrics" className="text-slate-400 hover:text-slate-100 text-sm font-medium transition-colors">
              How it works
            </a>
            <a href="#for-kols" className="text-slate-400 hover:text-slate-100 text-sm font-medium transition-colors">
              For KOLs
            </a>
            <a href="#team" className="text-slate-400 hover:text-slate-100 text-sm font-medium transition-colors">
              Team
            </a>
            <a
              href={DEMO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-blue-500 to-violet-700 text-white px-5 py-2 rounded-lg text-sm font-semibold"
            >
              Book a Demo
            </a>
          </div>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="sm:hidden p-2 text-slate-400 hover:text-slate-100"
          >
            {isMenuOpen ? <XIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="sm:hidden bg-slate-900 border-t border-slate-800 px-6 py-4 space-y-4">
          <a href="#metrics" onClick={() => setIsMenuOpen(false)} className="block text-slate-400 text-sm font-medium">
            How it works
          </a>
          <a href="#for-kols" onClick={() => setIsMenuOpen(false)} className="block text-slate-400 text-sm font-medium">
            For KOLs
          </a>
          <a href="#team" onClick={() => setIsMenuOpen(false)} className="block text-slate-400 text-sm font-medium">
            Team
          </a>
          <a
            href={DEMO_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsMenuOpen(false)}
            className="block bg-gradient-to-r from-blue-500 to-violet-700 text-white px-4 py-2 rounded-lg text-sm font-semibold text-center"
          >
            Book a Demo
          </a>
        </div>
      )}
    </nav>
  );
};
