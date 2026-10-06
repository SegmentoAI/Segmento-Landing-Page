import { useState } from "react";
import { MenuIcon, XIcon } from "lucide-react";
import { Logo, btnPrimary } from "./ui";

const LINKS = [
  { href: "#metrics", label: "How it works" },
  { href: "#for-kols", label: "For KOLs" },
  { href: "#team", label: "Team" },
  { href: "#cta", label: "Book a Demo" },
];

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-line bg-ink/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Logo />
          <div className="hidden sm:flex items-center gap-8">
            {LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-mono text-xs uppercase tracking-wider text-mute hover:text-paper transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href="https://app.segmento.tech"
              target="_blank"
              rel="noopener noreferrer"
              className={btnPrimary}
            >
              Launch App
            </a>
          </div>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="sm:hidden p-2 text-mute hover:text-paper"
          >
            {isMenuOpen ? <XIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="sm:hidden bg-ink border-t border-line px-6 py-5 space-y-4">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setIsMenuOpen(false)}
              className="block font-mono text-xs uppercase tracking-wider text-mute"
            >
              {link.label}
            </a>
          ))}
          <a
            href="https://app.segmento.tech"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsMenuOpen(false)}
            className={`${btnPrimary} w-full`}
          >
            Launch App
          </a>
        </div>
      )}
    </nav>
  );
};
