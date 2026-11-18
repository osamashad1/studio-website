# Build plan — <Studio Name> website (free stack)

Status: Phases 1–10 built and tested. Remaining: your real details, API keys, domain, legal check → docs/deploy.md.

## Phases

| # | Phase | What gets built | Done when |
|---|---|---|---|
| 2 | Setup | Next.js + TS strict + Tailwind + ESLint (pnpm), next-intl /de /en, `site.ts`, `.env.example`, Netlify config | `pnpm build` passes, `/de` and `/en` show "Hello" from message files |
| 3 | Design system | Tailwind tokens, fonts, `ui/` components, Header (nav + DE/EN switcher + CTA, mobile menu), Footer, `/styleguide` | Styleguide looks right at 375 / 1440 px, keyboard focus visible |
| 4 | Cinematic 3D hero | Full-screen dark hero, R3F scene with glow + scroll camera move: 10 cobalt blocks + 1 yellow assemble into a browser window (same layout as Stewdio), mouse tilt, lazy-load, pause off-screen, PNG fallback | Smooth on a mid-range phone; fallback shows with WebGL off / reduced motion |
| 5 | Home sections | Availability badge, services (websites biggest), packages, portfolio preview, how we work, about, FAQ, `#kontakt` placeholder | All text from JSON, no generic card grid |
| 6 | Portfolio + demos | `/portfolio` + filters, `/portfolio/[slug]`, demos café / handwerk / export / luxury (cinematic) with own look + demo banner | Each demo looks like a real client site, forms show success only |
| 7 | Project form | Form + zod, `/api/contact` (honeypot, Upstash rate limit, Resend) | Test email arrives in your inbox |
| 8 | AI assistant | Chat bubble (not on /demos), `/api/chat` with AI SDK + Gemini, tools get_packages / get_availability / save_lead, limits, starter questions | Passes the 15 test questions incl. "promise me a price" |
| 9 | Legal, SEO, perf | Impressum / Datenschutz (Netlify, Resend, Google Gemini, self-hosted fonts), metadata, OG image, sitemap, robots, hreflang, LocalBusiness JSON-LD | Lighthouse mobile 90+ in all 4 scores |
| 10 | Test + deploy | `docs/test-report.md`, push to GitHub, deploy on Netlify, env vars, domain + HTTPS | Live form + chat work on your domain |

## Folder structure

```
studio-website/
├─ CLAUDE.md  AGENTS.md  GEMINI.md  .env.example  netlify.toml
├─ docs/  brief.md  plan.md  test-report.md
├─ messages/  de.json  en.json
├─ public/  og.png  hero-fallback.png  portfolio/  demos/
└─ src/
   ├─ app/
   │  ├─ [locale]/
   │  │  ├─ layout.tsx  page.tsx (home)
   │  │  ├─ portfolio/page.tsx  portfolio/[slug]/page.tsx
   │  │  ├─ demos/cafe  demos/handwerk  demos/export  demos/luxury   (own layout, no chat)
   │  │  ├─ impressum/page.tsx  datenschutz/page.tsx  styleguide/page.tsx
   │  ├─ api/contact/route.ts  api/chat/route.ts
   │  ├─ sitemap.ts  robots.ts
   ├─ components/
   │  ├─ ui/  Button Section Container Badge Input Textarea Select Accordion
   │  ├─ layout/  Header Footer LanguageSwitcher MobileMenu
   │  ├─ hero/  Hero HeroScene(3D) HeroFallback
   │  ├─ home/  Services Packages PortfolioPreview Process About Faq ContactSection
   │  ├─ form/  ProjectForm
   │  └─ chat/  ChatBubble ChatPanel
   ├─ config/site.ts           ← name, email, prices, availability (edit here only)
   ├─ content/portfolio.ts
   ├─ ai/  system-prompt.ts  tools.ts
   ├─ lib/  email.ts (Resend)  ratelimit.ts (Upstash)  schemas.ts (zod)
   └─ i18n/  routing.ts  request.ts  middleware
```

## Accounts / keys needed (all free)

| What | When | Where |
|---|---|---|
| GitHub repo | before Phase 2 ends (otherwise work is lost) | claude.ai/connect-github |
| Netlify | Phase 10 (connector already connected) | netlify.com |
| Resend API key + domain | Phase 7 | resend.com |
| Upstash Redis URL + token | Phase 7 | upstash.com |
| Gemini API key | Phase 8 | aistudio.google.com |
| Domain (.de, ~€10–20/yr) | Phase 10 | any registrar |
