# Project: Studio OS by Osama Shad — studio & portfolio website

## What this is
A bilingual (German default, English) website for my freelance digital studio.
Goal: get small businesses in Germany to fill in the project form.
I sell websites and web apps first; also Google Ads, SEO, graphic design,
AI chatbots and automation. I take 1 new project per month (limited capacity).

## Stack (do not change without asking me) — all free tiers
- Next.js (App Router) + TypeScript (strict), Tailwind CSS, pnpm
- 3D: three + @react-three/fiber + @react-three/drei
- Animation: framer-motion (sparingly)
- i18n: next-intl, routes /de and /en, German is default. ONE language switcher; all
  images/assets are language-neutral or come in one version (no per-language copies).
- Forms: react-hook-form + zod; email via Resend (API route)
- AI assistant: Vercel AI SDK (`ai` + `@ai-sdk/google`), Gemini Flash free tier,
  server route /api/chat, GEMINI_API_KEY from env. Keep it provider-swappable
  (switching to `@ai-sdk/anthropic` later must be a one-line change).
- Rate limiting: @upstash/ratelimit + @upstash/redis (not in-memory)
- Hosting: Netlify (free plan allows commercial use). Not Vercel Hobby (non-commercial only).

## Commands
- pnpm dev        → local site at http://localhost:3000
- pnpm build      → production build (must pass before every commit)
- pnpm lint
- pnpm typecheck

## Design system
- Colors:
  - ink      #10162F  (text, dark sections)
  - paper    #F3F5FA  (main background, cool off-white)
  - cobalt   #3355FF  (primary buttons, links, 3D main material)
  - signal   #FFD23F  (highlights, hover, small accents only)
  - mint     #3DDC97  (success states, "available" badge)
  - steel    #8A93AD  (secondary text, borders)
- Fonts (Google Fonts via next/font): "Unbounded" for headlines, "Instrument Sans" for body.
  Unbounded is very wide: headlines need deliberate line breaks / balanced wrapping.
- Type scale: 14 / 16 / 20 / 28 / 40 / 64 px. Body line length max ~70 characters.
  64px headlines only from sm (640px) up; on phones max 40px (Unbounded at 64px overflows 375px).
- Radius: 8px small elements, 20px large panels.
- Motion: ONE strong moment (the 3D hero). Everything else calm. Respect prefers-reduced-motion.
- Hero style: CINEMATIC — full-screen dark (ink) hero, glossy 3D blocks with dramatic
  studio light and glow, subtle scroll-driven camera move. Real-time three.js only (no paid
  AI video). All other sections stay light (paper/white), fast and trustworthy.
- Avoid: generic SaaS card grids, ALL-CAPS labels, "01/02/03" numbers unless it is a real sequence,
  arrows "→" on every button, gradient washes everywhere.

## Brand assets (Stewdio)
- Stewdio file "Studio Website — Brand Kit": hero block-assembly animation (layout + timing
  reference for the 3D hero, last frame = static fallback), OG image 1200×630, brand basics.
- Exports go to public/hero-fallback.png, public/og.png, public/hero.mp4 (optional).
- The 3D hero uses the same 10-block browser-window layout as the Stewdio animation.

## How to work with me
- I am learning. After each change explain in 2–3 simple sentences what you did.
- Plan first, show me the plan, wait for my OK, then write code.
- One phase at a time. Small commits with clear messages.
- Mobile first. Must look great at 375px wide and at 1440px.
- Accessibility: keyboard focus visible, alt text, color contrast AA, labels on all inputs.
- All text comes from translation files (messages/de.json, messages/en.json). No hard-coded strings.

## Rules
- Never commit secrets. Read keys from environment variables. Keep .env.example updated.
- Never invent testimonials, client names or results. Demo projects must be labeled
  "Demo-Projekt" / "Demo project". Example numbers must be marked as examples.
- Keep editable business info (name, email, prices, availability) in ONE file: src/config/site.ts.
- After each phase: run pnpm lint, pnpm typecheck and pnpm build, and fix all errors.
- 3D must not block the page: lazy-load it, show a static fallback on slow devices / no WebGL.

## Decisions log
- 2026-11-18: Target = small businesses in Germany; lead service = websites + web apps;
  pricing = fixed packages + custom quote; languages = DE + EN; main action = project form;
  brand = "<Studio Name> by <Your Name>"; capacity = 1 new project per month.
- 2026-11-18: Free stack: Netlify hosting, Gemini free tier via Vercel AI SDK, Upstash rate limit,
  Resend free. Builders: Claude Code / Google Antigravity / Gemini CLI (all read this file;
  AGENTS.md and GEMINI.md point here).
- 2026-11-18: One language switcher on the site; brand assets in German only (one version).
- 2026-11-18: Inspired by cinematic 3D sites: cinematic dark hero only, rest of site light.
  Added a 4th demo: original luxury brand in cinematic dark style. Free tools only (no Higgsfield credits).
- 2026-11-18: GitHub repo osamashad1/studio-website (public — never commit secrets).
- 2026-11-18: All 10 phases built. Before launch: fill site.ts + legal placeholders, add API keys in Netlify,
  connect domain, set launched: true. See docs/deploy.md and docs/test-report.md.
- 2026-11-18: Brand = Studio OS by Osama Shad (Duisburg; B.Sc. Mobility and Logistics, HSRW). Pricing = monthly
  subscriptions ~10–20 % below market: Start 45 €, Business 75 €, Growth 449 € (net, 12-month minimum, no setup fee).
  New customers: first month free + free website check. Never claim 'x % cheaper' on the site (§ 6 UWG).
  VAT status open. Next free slot: January 2027. Go-live/SEO guide: docs/go-live-and-free-seo.md.
