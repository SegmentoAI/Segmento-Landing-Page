# Landing Page Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the existing white/light landing page with a dark-mode redesign using Space Grotesk font and the Segmento brand color system, while preserving all non-landing-page routes.

**Architecture:** Each existing section component is rewritten in-place (same filename, same export name) so `App.tsx` import paths stay stable. `ExamplesSection` is dropped from the main page render. All 3 "Book a Demo" CTAs point to `https://calendly.com/marek-hauzr/segmento`.

**Tech Stack:** React 18, TypeScript, Vite 7, Tailwind CSS 3.4, lucide-react

---

## File Map

| File | Action |
|---|---|
| `index.html` | Add Space Grotesk Google Fonts link |
| `tailwind.config.js` | Add Space Grotesk as default sans font |
| `src/index.css` | Set `color-scheme: dark` |
| `src/App.tsx` | Dark bg wrapper, remove ExamplesSection, reorder sections |
| `src/components/Navbar.tsx` | Full rewrite — dark sticky nav, new links |
| `src/components/HeroSection.tsx` | Full rewrite — 2-col layout with DM chat mockup |
| `src/components/WhereWeHelpSection.tsx` | Full rewrite — 6 metric cards (Metrics section) |
| `src/components/SolutionSection.tsx` | Full rewrite — 5-step flywheel |
| `src/components/HowWeHelpSection.tsx` | Full rewrite — For KOLs 2-col section |
| `src/components/TeamSection.tsx` | Full rewrite — dark cards with photos |
| `src/components/CTASection.tsx` | Full rewrite — dark, updated copy |
| `src/components/Footer.tsx` | Full rewrite — simplified dark footer |

`ExamplesSection.tsx`, `KOLReportExamplePage.tsx`, `KOLMarketingPerformancePage.tsx`, `ProtocolValueExampleReportPage.tsx`, `FakeBankExamplePage.tsx` — **not touched**.

---

## Task 1: Foundation — font, Tailwind, global CSS, App wrapper

**Files:**
- Modify: `index.html`
- Modify: `tailwind.config.js`
- Modify: `src/index.css`
- Modify: `src/App.tsx`

- [ ] **Step 1: Add Space Grotesk to index.html**

Replace the `<head>` block in `index.html`:

```html
<!doctype html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Segmento | Measure ROI per KOL, Do Not Guess</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet">
  <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png">
  <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png">
  <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png">
  <link rel="manifest" href="/favicon/site.webmanifest">
</head>

<body>
  <div id="root"></div>
  <script type="module" src="/src/index.tsx"></script>
</body>

</html>
```

- [ ] **Step 2: Update tailwind.config.js**

```js
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
```

- [ ] **Step 3: Update src/index.css**

```css
/* PLEASE NOTE: THESE TAILWIND IMPORTS SHOULD NEVER BE DELETED */
@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';
/* DO NOT DELETE THESE TAILWIND IMPORTS, OTHERWISE THE STYLING WILL NOT RENDER AT ALL */

:root {
  color-scheme: dark;
}

@media print {
  html, body, * {
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
  }
}
```

- [ ] **Step 4: Update src/App.tsx**

```tsx
import { Navbar } from "./components/Navbar";
import { HeroSection } from "./components/HeroSection";
import { WhereWeHelpSection } from "./components/WhereWeHelpSection";
import { SolutionSection } from "./components/SolutionSection";
import { HowWeHelpSection } from "./components/HowWeHelpSection";
import { TeamSection } from "./components/TeamSection";
import { CTASection } from "./components/CTASection";
import { Footer } from "./components/Footer";
import { KOLReportExamplePage } from "./components/KOLReportExamplePage";
import { KOLMarketingPerformancePage } from "./components/KOLMarketingPerformancePage";
import { ProtocolValueExampleReportPage } from "./components/ProtocolValueExampleReportPage";
import { FakeBankExamplePage } from "./components/FakeBankExamplePage";
import { getPageVariant, PAGES } from "./navigation";

export function App() {
  const page = getPageVariant();

  if (page === PAGES.KOLMarketingPerformancePage) return <KOLMarketingPerformancePage />;
  if (page === PAGES.KOLReportExamplePage) return <KOLReportExamplePage />;
  if (page === PAGES.FakeBankExamplePage) return <FakeBankExamplePage />;
  if (page === PAGES.ProtocolValueExampleReportPage) return <ProtocolValueExampleReportPage />;

  return (
    <div className="min-h-screen bg-[#0a0f1e]">
      <Navbar />
      <main>
        <HeroSection />
        <WhereWeHelpSection />
        <SolutionSection />
        <HowWeHelpSection />
        <TeamSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
```

- [ ] **Step 5: Start dev server and verify**

```bash
npm run dev
```

Open http://localhost:5173. The page should be dark (`#0a0f1e` background) and use Space Grotesk font. The non-landing-page routes should still work (e.g. `?page=KOLReportExamplePage`).

- [ ] **Step 6: Commit**

```bash
git add index.html tailwind.config.js src/index.css src/App.tsx
git commit -m "feat: dark mode foundation — font, tailwind, app wrapper"
```

---

## Task 2: Navbar

**Files:**
- Modify: `src/components/Navbar.tsx`

- [ ] **Step 1: Rewrite Navbar.tsx**

```tsx
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
```

- [ ] **Step 2: Verify in browser**

Nav should be dark, sticky, blur on scroll. Links: How it works · For KOLs · Team · Book a Demo button. Mobile hamburger menu works. "Book a Demo" opens Calendly in a new tab.

- [ ] **Step 3: Commit**

```bash
git add src/components/Navbar.tsx
git commit -m "feat: dark mode navbar with new nav links"
```

---

## Task 3: HeroSection

**Files:**
- Modify: `src/components/HeroSection.tsx`

- [ ] **Step 1: Rewrite HeroSection.tsx**

```tsx
const DEMO_URL = "https://calendly.com/marek-hauzr/segmento";

function ChatMsg({ from, text }: { from: "them" | "us"; text: string }) {
  return (
    <div className={`flex flex-col max-w-[80%] ${from === "us" ? "self-end items-end" : "self-start items-start"}`}>
      <div
        className={`px-4 py-2 rounded-xl text-sm leading-snug ${
          from === "them"
            ? "bg-slate-800 text-slate-300 rounded-bl-sm"
            : "bg-blue-600 text-white rounded-br-sm"
        }`}
      >
        {text}
      </div>
    </div>
  );
}

export const HeroSection = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 lg:px-8 py-24 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
      <div>
        <div className="inline-block text-[11px] font-semibold uppercase tracking-[0.25em] text-emerald-300 border border-emerald-900 bg-emerald-950/40 px-3 py-1 rounded-full mb-6">
          Web3 KOL Attribution · Live
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold leading-[1.15] tracking-tight text-slate-50 mb-5">
          <span className="whitespace-nowrap">Measure ROI per KOL,</span>
          <br />
          <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            Do Not Guess.
          </span>
        </h1>
        <p className="text-slate-400 text-base leading-relaxed mb-8">
          Turn community into a revenue channel.
          <br />
          <br />
          <strong className="text-slate-300">200+ KOL pitches in your inbox.</strong> No deliverables, no
          accountability — just <em>"2 tweets for $100."</em>
          <br />
          <br />
          We built Segmento: the first platform that ties every KOL directly to verified on-chain results.
        </p>
        <div className="flex flex-wrap gap-3">
          <a
            href={DEMO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gradient-to-r from-blue-500 to-violet-700 text-white px-7 py-3 rounded-lg text-sm font-semibold"
          >
            Book a Demo
          </a>
          <a href="#metrics" className="border border-slate-700 text-slate-400 px-7 py-3 rounded-lg text-sm font-medium">
            How it works →
          </a>
        </div>
      </div>

      <div>
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
          <div className="bg-slate-800 px-5 py-3 flex items-center gap-3 border-b border-slate-900">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-violet-700 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
              K
            </div>
            <div>
              <div className="text-sm font-semibold text-slate-200">KOL_alpha.eth</div>
              <div className="text-xs text-green-400">● Online</div>
            </div>
            <span className="ml-auto text-[10px] text-slate-500 uppercase tracking-wider">+199 similar messages</span>
          </div>
          <div className="px-5 py-5 flex flex-col gap-3">
            <ChatMsg from="them" text="I will do 2 tweets for $500. Last offer!" />
            <ChatMsg from="us" text="What users, fees, or TVL do I get?" />
            <ChatMsg from="them" text="2 tweets. Big audience. Trust me 🚀" />
            <ChatMsg from="us" text="I need the on-chain numbers. Even for $5 — I need to know the ROI." />
            <ChatMsg from="them" text="3 tweets, $250. Final offer!" />
          </div>
          <div className="bg-slate-800 border-t border-slate-900 px-5 py-3 flex items-center gap-2">
            <span className="bg-violet-700 text-white text-xs font-bold px-2.5 py-0.5 rounded-full">200+</span>
            <span className="text-xs text-slate-500">KOL pitches with zero accountability</span>
          </div>
        </div>
        <div className="mt-3 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-slate-700 rounded-xl p-4 flex items-start gap-3">
          <span className="text-xl flex-shrink-0">⛓</span>
          <p className="text-sm text-slate-400 leading-relaxed">
            <strong className="text-emerald-300">Segmento changes this.</strong> Every KOL mapped to real wallet
            activity — fees collected, TVL deployed, genuine users vs. farmers.
          </p>
        </div>
      </div>
    </section>
  );
};
```

- [ ] **Step 2: Verify in browser**

Two-column hero. Left: headline "Measure ROI per KOL," on one line (no wrap), "Do Not Guess." in gradient, story copy, two CTA buttons. Right: dark DM chat card + solution strip. Responsive: stacks to single column on mobile.

- [ ] **Step 3: Commit**

```bash
git add src/components/HeroSection.tsx
git commit -m "feat: dark hero section with chat mockup"
```

---

## Task 4: WhereWeHelpSection → Metrics

**Files:**
- Modify: `src/components/WhereWeHelpSection.tsx`

- [ ] **Step 1: Rewrite WhereWeHelpSection.tsx**

```tsx
const METRICS = [
  {
    icon: "💰",
    title: "Fees Generated",
    desc: "See the actual protocol fees each KOL's audience generates — not impressions, real revenue.",
    featured: true,
  },
  {
    icon: "📊",
    title: "TVL Deployed",
    desc: "Track total value locked attributed to each KOL's referred wallets in real time.",
    featured: true,
  },
  {
    icon: "👤",
    title: "Real Users Acquired",
    desc: "We filter out farmers and sybil wallets. You see genuine, retained users only.",
    featured: true,
  },
  {
    icon: "🔗",
    title: "Retained Wallets",
    desc: "Which wallets stayed active after the campaign? Measure lasting impact, not just spikes.",
    featured: false,
  },
  {
    icon: "🌐",
    title: "Cross-Protocol Activity",
    desc: "Understand user behaviour beyond your protocol — net worth, trade volume, DeFi footprint.",
    featured: false,
  },
  {
    icon: "📈",
    title: "KOL Performance Score",
    desc: "Compare KOLs side-by-side with a single composite score. Allocate budget with confidence.",
    featured: false,
  },
];

export const WhereWeHelpSection = () => {
  return (
    <section id="metrics" className="bg-[#080d1a] py-24 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-[11px] font-semibold uppercase tracking-[0.25em] text-emerald-300 mb-4">
          What we track
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold text-slate-50 leading-tight mb-4">
          Know exactly what each KOL delivers
        </h2>
        <p className="text-slate-500 text-lg max-w-2xl mb-14 leading-relaxed">
          KOL–wallet mapping via direct affiliate links and indirect on-chain activity. No more guessing — every
          metric verified on-chain.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {METRICS.map((m) => (
            <div
              key={m.title}
              className={`rounded-2xl border p-7 ${
                m.featured
                  ? "bg-gradient-to-br from-blue-500/10 to-violet-500/10 border-violet-500/30"
                  : "bg-slate-900 border-slate-800"
              }`}
            >
              <span className="text-2xl mb-4 block">{m.icon}</span>
              <h3 className={`text-base font-bold mb-2 ${m.featured ? "text-violet-300" : "text-slate-200"}`}>
                {m.title}
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed">{m.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
```

- [ ] **Step 2: Verify in browser**

Alternate dark background (`#080d1a`). 3×2 grid of metric cards. Top 3 cards have blue-violet featured gradient. Emerald label, large heading, muted subtitle.

- [ ] **Step 3: Commit**

```bash
git add src/components/WhereWeHelpSection.tsx
git commit -m "feat: metrics section — 6 KOL tracking cards"
```

---

## Task 5: SolutionSection → Flywheel

**Files:**
- Modify: `src/components/SolutionSection.tsx`

- [ ] **Step 1: Rewrite SolutionSection.tsx**

```tsx
const STEPS = [
  {
    num: "01",
    title: "Propose a budget",
    desc: "You set a campaign budget (e.g. $10k). Segmento activates a curated set of KOLs against that budget.",
    note: null,
  },
  {
    num: "02",
    title: "Segmento expands your KOL roster",
    desc: "Your existing KOLs are onboarded to Segmento for tracking. We then add more KOLs to your list — extending your reach while keeping everything measured in one place.",
    note: null,
  },
  {
    num: "03",
    title: "KOLs do their magic",
    desc: "KOLs run their campaigns. Every referred wallet is tracked from first click to on-chain activity.",
    note: null,
  },
  {
    num: "04",
    title: "Segmento monitors results",
    desc: "Real-time dashboard shows fees, TVL, new users, and farmer-filtered wallet counts per KOL.",
    note: null,
  },
  {
    num: "05",
    title: "Project collects fees, campaign pays for itself",
    desc: "Final budget allocation is limited to half the fees the campaign generates — meaning the fees collected can fully cover the cost of the campaign.",
    note: "Campaign can fully pay for itself",
  },
];

export const SolutionSection = () => {
  return (
    <section id="flywheel" className="py-24 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="text-[11px] font-semibold uppercase tracking-[0.25em] text-emerald-300 mb-4">
            The process
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-50 leading-tight mb-4">
            Turn marketing into a{" "}
            <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              self-propelling flywheel
            </span>
          </h2>
          <p className="text-slate-500 text-lg max-w-xl mx-auto leading-relaxed">
            Budget is tied to results. Final spend is capped at half of fees collected — campaign can fully pay for
            itself.
          </p>
        </div>
        <div className="max-w-2xl mx-auto divide-y divide-slate-800">
          {STEPS.map((step) => (
            <div key={step.num} className="flex gap-6 py-7">
              <div className="flex-shrink-0 w-11 h-11 rounded-full bg-gradient-to-br from-blue-900 to-indigo-900 border border-slate-700 flex items-center justify-center text-sm font-bold text-blue-300">
                {step.num}
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-200 mb-2">{step.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{step.desc}</p>
                {step.note && (
                  <span className="inline-block mt-3 text-xs text-emerald-300 border border-emerald-900 bg-emerald-950/40 px-3 py-1 rounded-full">
                    {step.note}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
```

- [ ] **Step 2: Verify in browser**

Centered layout. 5 numbered steps with gradient step circles. Step 05 has an emerald pill note. Dividers between steps.

- [ ] **Step 3: Commit**

```bash
git add src/components/SolutionSection.tsx
git commit -m "feat: flywheel process section — 5-step campaign lifecycle"
```

---

## Task 6: HowWeHelpSection → For KOLs

**Files:**
- Modify: `src/components/HowWeHelpSection.tsx`

- [ ] **Step 1: Rewrite HowWeHelpSection.tsx**

```tsx
const KOL_POINTS = [
  "Get your own KOL impact dashboard with real attribution data",
  "Build a portfolio of verified on-chain case studies",
  "Stand out to projects that pay for results, not promises",
  "Earn performance bonuses tied to real fees and TVL",
];

const KOL_REPORT_ROWS = [
  { label: "Campaign", value: "Protocol X · Apr 2026", color: "" },
  { label: "Users acquired", value: "720 real users", color: "text-emerald-400" },
  { label: "Farmers filtered", value: "24.2% removed", color: "text-red-400" },
  { label: "TVL generated", value: "$8.35M", color: "text-emerald-400" },
  { label: "Fees collected", value: "$42,800", color: "text-emerald-400" },
  { label: "Avg user net worth", value: "$11,500", color: "text-violet-300" },
];

export const HowWeHelpSection = () => {
  return (
    <section id="for-kols" className="bg-[#080d1a] py-24 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-[0.25em] text-purple-400 mb-4">For KOLs</div>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-50 leading-tight mb-5">
            Prove your real impact.{" "}
            <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              Earn what you're worth.
            </span>
          </h2>
          <p className="text-slate-500 text-base leading-relaxed mb-8 max-w-md">
            Anyone can claim followers and impressions. Segmento gives you verified on-chain case studies that show
            exactly what you delivered — so you can command better deals and build a reputation that compounds.
          </p>
          <ul className="space-y-4">
            {KOL_POINTS.map((point) => (
              <li key={point} className="flex items-start gap-3 text-slate-400 text-sm leading-relaxed">
                <span className="text-purple-400 font-bold flex-shrink-0 mt-0.5">→</span>
                {point}
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-7">
          <div className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-500 mb-5">
            KOL Report — @alpha.eth
          </div>
          {KOL_REPORT_ROWS.map((row, i) => (
            <div
              key={row.label}
              className={`flex justify-between items-center py-3 ${i < KOL_REPORT_ROWS.length - 1 ? "border-b border-slate-800" : ""}`}
            >
              <span className="text-sm text-slate-500">{row.label}</span>
              <span className={`text-sm font-bold ${row.color || "text-slate-200"}`}>{row.value}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
```

- [ ] **Step 2: Verify in browser**

Alternate dark bg. Two-column: left has purple "For KOLs" label, heading, copy, bullet list. Right has a mock KOL report card with stat rows. Stacks to single column on mobile.

- [ ] **Step 3: Commit**

```bash
git add src/components/HowWeHelpSection.tsx
git commit -m "feat: for KOLs section — impact proof and mock report card"
```

---

## Task 7: TeamSection

**Files:**
- Modify: `src/components/TeamSection.tsx`

- [ ] **Step 1: Rewrite TeamSection.tsx**

```tsx
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
```

- [ ] **Step 2: Verify in browser**

Three dark cards. Each shows real photo from `/assets/`, name, emerald role label, bio, LinkedIn + GitHub icons. Photos are circular, 80×80.

- [ ] **Step 3: Commit**

```bash
git add src/components/TeamSection.tsx
git commit -m "feat: dark team section with photos and social links"
```

---

## Task 8: CTASection + Footer

**Files:**
- Modify: `src/components/CTASection.tsx`
- Modify: `src/components/Footer.tsx`

- [ ] **Step 1: Rewrite CTASection.tsx**

```tsx
const DEMO_URL = "https://calendly.com/marek-hauzr/segmento";

export const CTASection = () => {
  return (
    <section id="cta" className="py-24 px-6 lg:px-8">
      <div className="max-w-2xl mx-auto text-center">
        <div className="text-[11px] font-semibold uppercase tracking-[0.25em] text-emerald-300 mb-4">Get started</div>
        <h2 className="text-3xl sm:text-4xl font-bold text-slate-50 leading-tight mb-5">
          Run your next campaign
          <br />
          based on{" "}
          <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            data you can trust.
          </span>
        </h2>
        <p className="text-slate-500 text-lg leading-relaxed mb-10">
          Segmento is live. One new project onboards every week.
          <br />
          Let's make yours next.
        </p>
        <a
          href={DEMO_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-gradient-to-r from-blue-500 to-violet-700 text-white px-9 py-4 rounded-xl text-base font-semibold"
        >
          Book a Demo
        </a>
      </div>
    </section>
  );
};
```

- [ ] **Step 2: Rewrite Footer.tsx**

```tsx
export const Footer = () => {
  return (
    <footer className="border-t border-slate-800 py-8 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
        <span className="text-lg font-bold tracking-[0.15em] bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
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
```

- [ ] **Step 3: Verify full page in browser**

Scroll through the entire page top to bottom:
- Nav: dark sticky, blur, correct links
- Hero: 2-col, chat mockup, both CTAs point to Calendly
- Metrics: 6 cards, alternating bg
- Flywheel: 5 steps, step 05 has emerald note
- For KOLs: 2-col, mock report card
- Team: 3 cards with real photos
- CTA: centered, single "Book a Demo" button pointing to Calendly
- Footer: logo · copyright · email
- All 3 "Book a Demo" buttons (nav, hero, CTA) open `https://calendly.com/marek-hauzr/segmento`
- Responsive: test at 375px mobile width

- [ ] **Step 4: Commit**

```bash
git add src/components/CTASection.tsx src/components/Footer.tsx
git commit -m "feat: dark CTA section and simplified footer"
```
