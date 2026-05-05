# Segmento Landing Page Redesign — Design Spec
**Date:** 2026-05-03  
**Status:** Approved

---

## Overview

Replace the current white/blue landing page with a dark-mode page that matches the Segmento app aesthetic. Primary sources: the investor deck (2026-04-27), three pitch copy versions, and the `segmento-frontend` color system.

---

## Audience

Both Web3 project founders/CMOs and KOLs. Projects are the primary audience (hero speaks to them); KOLs get a dedicated section.

---

## Visual Design

| Property | Value |
|---|---|
| Mode | Dark |
| Background | `#0a0f1e` (primary), `#080d1a` (alternate sections) |
| Surface | `#0f172a` cards, `#1e293b` elevated |
| Border | `#1e293b` (subtle), `#334155` (visible) |
| Brand gradient | `linear-gradient(90deg, #3b82f6, #a855f7)` — logo + accents |
| CTA gradient | `linear-gradient(135deg, #3b82f6, #7c3aed)` — buttons |
| Accent (emerald) | `#6ee7b7` — stats, labels, positive values |
| Muted text | `#94a3b8`, `#64748b` |
| Font | Space Grotesk (400, 500, 600, 700) |
| Nav | Sticky, `backdrop-filter: blur(12px)`, `rgba(10,15,30,0.92)` |

---

## Page Sections (in order)

### 1. Navbar
- Logo: "S e g m e n t o" with blue→purple gradient
- Links: How it works · For KOLs · Team
- CTA button: "Book a Demo" (gradient)
- Sticky with blur backdrop

### 2. Hero
- **Headline:** "Measure ROI per KOL," (no-wrap) / "Do Not Guess." (gradient)
- **Subline:** "Turn community into a revenue channel."
- **Story copy:** "200+ KOL pitches in your inbox. No deliverables, no accountability — just '2 tweets for $100.' We built Segmento: the first platform that ties every KOL directly to verified on-chain results."
- **CTAs:** "Book a Demo" (primary) + "See Example Report →" (secondary)
- **Right column:** Discord-style DM chat mockup recreating the KOL negotiation chaos from the deck, with "+199 similar messages" badge and a solution strip below
- Two-column layout (50/50), left = copy, right = chat visual

### 3. What We Track (id: metrics)
- Label: "What we track"
- Title: "Know exactly what each KOL delivers"
- Sub: KOL–wallet mapping via direct affiliate links and indirect on-chain activity
- 3×2 grid of metric cards (featured style for top 3):
  1. Fees Generated
  2. TVL Deployed
  3. Real Users Acquired (farmer-filtered)
  4. Retained Wallets
  5. Cross-Protocol Activity
  6. KOL Performance Score

### 4. The Process (id: flywheel)
- Label: "The process"
- Title: "Turn marketing into a self-propelling flywheel"
- Sub: Budget is tied to results. Final spend capped at half of fees collected — campaign can fully pay for itself.
- Centered layout, max-width 680px stack of 5 steps:
  1. Propose a budget
  2. Segmento expands your KOL roster — existing KOLs onboarded to Segmento, new KOLs added to the list
  3. KOLs do their magic
  4. Segmento monitors results
  5. Project collects fees, campaign pays for itself — note: "Campaign can fully pay for itself"

### 5. For KOLs (id: for-kols)
- Label: "For KOLs" (purple accent)
- Title: "Prove your real impact. Earn what you're worth." (gradient)
- Body: Verified on-chain case studies, compound reputation, better deals
- 4 bullet points: own impact dashboard, portfolio of case studies, attract results-paying projects, performance bonuses
- Right column: mock KOL report card with real-looking stats (720 users, $8.35M TVL, $42.8k fees, 24.2% farmers filtered)
- Two-column layout

### 6. Team (id: team)
- Label: "The team"
- Title: "Built by people who felt the pain"
- 3-column card grid with real photos (`public/assets/`)
- Marek Hauzr — CEO & Founder
- Andrej Chepelau — Senior Software Engineer
- David Vodrazka — Senior Full-Stack Engineer

### 7. CTA + Footer (id: cta)
- Label: "Get started"
- Title: "Run your next campaign based on **data you can trust.**"
- Sub: "Segmento is live. One new project onboards every week. Let's make yours next."
- Single CTA button: "Book a Demo" → Calendly link
- Footer: logo · copyright · marek@carmine.finance

---

## Sections Hidden (deferred)

- **Proof of work / Example Reports** — section exists in code but `display:none`. Re-enable when reports are ready to showcase publicly.

---

## Navigation Links

How it works · For KOLs · Team · [Book a Demo button]

"Examples" removed from nav while that section is hidden.

---

## Key Copy Decisions

- **No "full transparency"** — projects see all data, each KOL sees only their own. Use "data you can trust" instead.
- **No "launching project" framing** — the pain applies to any established project running KOL campaigns.
- **Flywheel self-funding** — campaign can *fully* pay for itself (not just partially), since budget is capped at half of fees collected.
- **KOL onboarding** — step 02 clarifies that existing project KOLs are onboarded to Segmento first, then Segmento adds more.

---

## Tech Stack

Unchanged from current repo: React + TypeScript + Vite + Tailwind CSS. Replace all existing section components with new dark-mode versions. The non-landing-page routes (KOLReportExamplePage, KOLMarketingPerformancePage, etc.) are preserved as-is.

---

## Files to Change

| File | Action |
|---|---|
| `src/App.tsx` | Update main layout background |
| `src/index.css` | Add Space Grotesk import, dark color-scheme |
| `src/components/Navbar.tsx` | Full rewrite |
| `src/components/HeroSection.tsx` | Full rewrite |
| `src/components/WhereWeHelpSection.tsx` | Replace with MetricsSection |
| `src/components/SolutionSection.tsx` | Replace with FlywheelSection |
| `src/components/HowWeHelpSection.tsx` | Replace with ForKOLsSection |
| `src/components/ExamplesSection.tsx` | Keep, hidden via prop |
| `src/components/TeamSection.tsx` | Full rewrite |
| `src/components/CTASection.tsx` | Full rewrite |
| `src/components/Footer.tsx` | Full rewrite |
| `tailwind.config.js` | Add custom colors |
