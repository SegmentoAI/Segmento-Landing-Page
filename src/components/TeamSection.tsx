import { LinkedinIcon, GithubIcon } from "lucide-react";

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
