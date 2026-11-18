# Test report — 2026-11-18

Tested on the production build (`pnpm build && pnpm start`) with Playwright (Chromium).
Re-run any time: see "How to re-test" at the end.

## Summary

| Area | Result |
|---|---|
| `pnpm lint`, `pnpm typecheck`, `pnpm build` | ✅ pass, no build warnings |
| All pages, DE + EN, at 375 / 768 / 1440 px (78 checks) | ✅ 78/78 |
| Keyboard only: 40 tab stops on the home page | ✅ 40/40 with visible focus ring; first Tab = "Zum Inhalt springen" |
| Mobile menu (open, Esc closes) | ✅ |
| Language switch keeps the page (/de/x → /en/x) | ✅ |
| Project form: empty submit | ✅ 8 clear error messages, focus jumps to first field |
| Project form: server validation, honeypot, rate limit (6th request → 429) | ✅ |
| Project form: success (local dev, email printed) | ✅ "Danke! Ich melde mich innerhalb von 24 Stunden." |
| Project form: sending fails | ✅ shows "please email me directly at …" |
| Chat: 21st message → limit, 2001 characters → rejected, IP rate limit | ✅ |
| Chat: no API key → friendly "not available" message | ✅ |
| Chat: real AI answers (15 test questions) | ⏳ **needs your Gemini key** — run `node scripts/test-assistant.mjs` |
| Chat bubble hidden on /demos | ✅ |
| 3D hero: fly-in plays, pauses when idle, wakes on mouse/scroll | ✅ |
| 3D fallback with WebGL off (hero + luxury bottle) | ✅ static pictures shown |
| Reduced motion → no 3D, static picture | ✅ |
| 404 page for unknown URLs | ✅ |
| Demo forms: errors + success message, nothing sent | ✅ |
| Portfolio filters + empty state | ✅ |
| SEO: canonical, hreflang de/en/x-default, OG image per language, sitemap, robots, JSON-LD | ✅ |
| Real email delivery via Resend | ⏳ needs your Resend key (docs/setup-email.md) |

## Every page (each cell: status 200, no sideways scroll, exactly one h1, all inputs labelled, all images with alt, no duplicate IDs, no browser errors, correct `lang`)

| Page | 375 | 768 | 1440 |
|---|---|---|---|
| /de | ✅ | ✅ | ✅ |
| /de/portfolio | ✅ | ✅ | ✅ |
| /de/portfolio/cafe | ✅ | ✅ | ✅ |
| /de/portfolio/handwerk | ✅ | ✅ | ✅ |
| /de/portfolio/export | ✅ | ✅ | ✅ |
| /de/portfolio/luxury | ✅ | ✅ | ✅ |
| /de/demos/cafe | ✅ | ✅ | ✅ |
| /de/demos/handwerk | ✅ | ✅ | ✅ |
| /de/demos/export | ✅ | ✅ | ✅ |
| /de/demos/luxury | ✅ | ✅ | ✅ |
| /de/impressum | ✅ | ✅ | ✅ |
| /de/datenschutz | ✅ | ✅ | ✅ |
| /de/styleguide | ✅ | ✅ | ✅ |
| /en | ✅ | ✅ | ✅ |
| /en/portfolio | ✅ | ✅ | ✅ |
| /en/portfolio/cafe | ✅ | ✅ | ✅ |
| /en/portfolio/handwerk | ✅ | ✅ | ✅ |
| /en/portfolio/export | ✅ | ✅ | ✅ |
| /en/portfolio/luxury | ✅ | ✅ | ✅ |
| /en/demos/cafe | ✅ | ✅ | ✅ |
| /en/demos/handwerk | ✅ | ✅ | ✅ |
| /en/demos/export | ✅ | ✅ | ✅ |
| /en/demos/luxury | ✅ | ✅ | ✅ |
| /en/impressum | ✅ | ✅ | ✅ |
| /en/datenschutz | ✅ | ✅ | ✅ |
| /en/styleguide | ✅ | ✅ | ✅ |

## Lighthouse (mobile, this test machine)

| Page | Performance | Accessibility | Best practices | SEO |
|---|---|---|---|---|
| /de (3D off — weak devices / fallback) | 90 | 100 | 100 | 66* |
| /de (3D on, software rendering) | 62 | 100 | 100 | 66* |
| /de/portfolio | 93 | 100 | 100 | 66* |
| /de/demos/cafe | 89 | 100 | 100 | 66* |
| /de/demos/luxury (3D off) | 88 | 100 | 100 | 66* |
| /en/impressum | 89 | 100 | 100 | 66* |

\* SEO is 66 only because the site is deliberately **noindex until launch** (`launched: false`).
The only failing SEO audit is "is-crawlable". After launch it should be 100.

**About the 3D scores:** this machine has no GPU, so WebGL is drawn in software and counted as
"blocking time". Real phones use their GPU. Check on your own phone after deploying, and use
Google Search Console → Core Web Vitals (real-visitor data, which Google actually uses).

## Bugs found and fixed during testing
- Hero fly-in skipped on slow devices → animation clock now advances per frame.
- Fallback picture showed the finished window before the fly-in → hidden when 3D runs.
- 64 px headline overflowed on phones → 40 px on phones.
- White-on-white button text, overlapping decoration (services).
- Demo pages used the studio font and oversized headings → base CSS moved to @layer base, fixed sizes in demos.
- Several demo headers / long German words overflowed on phones → wrapping + hyphenation.
- Form error text grey on dark → light red; inputs got a visible keyboard focus ring.
- Contrast fixes (services label, café terracotta, luxury numerals), language switch accessible names.

## How to re-test
```bash
pnpm lint && pnpm typecheck && pnpm build
pnpm start            # then open http://localhost:3000/de
node scripts/test-assistant.mjs http://localhost:3000   # needs GEMINI_API_KEY
```
