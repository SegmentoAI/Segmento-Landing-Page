const GithubIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
  </svg>
);
const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const TEAM = [
  {
    name: "Marek Hauzr",
    role: "CEO & Founder",
    bio: "Background in data-driven product development, DeFi, and technical leadership. Founded Segmento after experiencing the KOL attribution problem firsthand.",
    img: "/assets/marek.jpeg",
    linkedin: "https://www.linkedin.com/in/marek-hauzr/",
    github: "https://github.com/MarekHauzr",
  },
  {
    name: "Andrej Chepelau",
    role: "Senior Software Engineer",
    bio: "Former trading analyst focused on high-frequency DEX trading. Co-founded Carmine Finance and worked on DeRisk integrations.",
    img: "/assets/andrej.jpeg",
    linkedin: "https://www.linkedin.com/in/andrej-chepelau",
    github: "https://github.com/Chepelau",
  },
  {
    name: "David Vodrazka",
    role: "Senior Full-Stack Engineer",
    bio: "Built scalable interfaces at Seznam.cz. Now leads frontend, DevOps, and selected smart contract work at Segmento.",
    img: "/assets/david.jpeg",
    linkedin: "https://www.linkedin.com/in/davevodrazka",
    github: "https://github.com/DaveVodrazka",
  },
];

export const TeamSection = () => {
  return (
    <section id="team" className="py-24 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-[11px] font-semibold uppercase tracking-[0.25em] text-emerald-300 mb-4">The team</div>
        <h2 className="text-3xl sm:text-4xl font-bold text-slate-50 leading-tight mb-14">
          Built by people who felt the pain
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {TEAM.map((member) => (
            <div key={member.name} className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center">
              <img
                src={member.img}
                alt={member.name}
                className="w-20 h-20 rounded-full object-cover mx-auto mb-5 border-2 border-slate-700"
              />
              <div className="text-lg font-bold text-slate-100 mb-1">{member.name}</div>
              <div className="text-xs font-semibold uppercase tracking-wider text-emerald-400 mb-3">{member.role}</div>
              <p className="text-sm text-slate-500 leading-relaxed mb-5">{member.bio}</p>
              <div className="flex justify-center gap-4">
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-600 hover:text-slate-300 transition-colors"
                >
                  <LinkedinIcon className="w-5 h-5" />
                </a>
                <a
                  href={member.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-600 hover:text-slate-300 transition-colors"
                >
                  <GithubIcon className="w-5 h-5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
