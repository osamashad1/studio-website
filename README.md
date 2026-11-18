# Studio website

Bilingual (DE/EN) studio & portfolio website with a cinematic 3D hero, 4 demo websites,
project form and AI assistant. Next.js 16 · TypeScript · Tailwind · three.js · next-intl.

```bash
pnpm install
pnpm dev          # http://localhost:3000/de
```

- Business info (name, email, prices, availability, launch switch): `src/config/site.ts`
- All texts: `messages/de.json`, `messages/en.json`
- Rules for AI coding tools: `CLAUDE.md` (also read via AGENTS.md / GEMINI.md)
- Going live: `docs/deploy.md` · Email setup: `docs/setup-email.md` · Tests: `docs/test-report.md`
