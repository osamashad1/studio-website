# Going live — step by step

## 0. Before you start
- [ ] `src/config/site.ts`: studio name, your name, email, prices, free month
- [ ] Impressum + Datenschutz: replace every highlighted <PLACEHOLDER> (messages/de.json + en.json → "legal")
- [ ] About-me text and photo
- [ ] Check legal pages with e-recht24 or a lawyer

## 1. GitHub ✅ already done
Code: https://github.com/osamashad1/studio-website (branch `main`).

## 2. Netlify (free, commercial use allowed)
The Netlify project **studio-website-preview** already exists.
1. https://app.netlify.com/projects/studio-website-preview
2. **Project configuration → Build & deploy → Link repository** → GitHub → `osamashad1/studio-website`, branch `main`.
3. Build settings come from `netlify.toml` (`pnpm build`). Click **Deploy**.
4. Every push to `main` now deploys automatically.

The preview currently needs a Netlify login to view (team protection). To show it to others:
Project configuration → Access & security → Visitor access → turn off "Netlify team login".

## 3. Environment variables (Netlify → Project configuration → Environment variables)

| Name | Where to get it | Secret? |
|---|---|---|
| `GEMINI_API_KEY` | https://aistudio.google.com → Get API key | yes |
| `RESEND_API_KEY` | resend.com → API Keys | yes |
| `CONTACT_TO_EMAIL` | your inbox | no |
| `CONTACT_FROM_EMAIL` | e.g. `Studio <form@mydomain.de>` (after domain is verified in Resend) | no |
| `UPSTASH_REDIS_REST_URL` / `UPSTASH_REDIS_REST_TOKEN` | upstash.com → Redis → REST API | token: yes |
| `NEXT_PUBLIC_SITE_URL` | `https://mydomain.de` (once the domain is connected) | no |

After adding variables: **Deploys → Trigger deploy**. Details for Resend/Upstash: docs/setup-email.md.

## 4. Your domain (e.g. mydomain.de, ~€10–20/year)
1. Netlify → **Domain management → Add a domain** → `mydomain.de`.
2. At your registrar either switch the nameservers to Netlify (easiest) or add the
   A/CNAME records Netlify shows.
3. Netlify issues the HTTPS certificate automatically (Let's Encrypt). Check
   **Domain management → HTTPS** shows "certificate active"; open https://mydomain.de.
4. Set `NEXT_PUBLIC_SITE_URL=https://mydomain.de` and redeploy.

## 5. Spending limits
- Gemini: the free tier has its own rate limits; if you switch to the paid tier, set a
  **budget alert** in Google Cloud Console → Billing → Budgets & alerts.
- (If you later use Claude via `@ai-sdk/anthropic`: set a monthly spend limit in the Anthropic Console.)

## 6. Launch
1. In `src/config/site.ts` set `launched: true` → commit → push. (This removes "noindex" and opens robots.txt.)
2. Test the live form (an email must arrive) and the chat (ask "Was kostet eine Website?").
3. Google Search Console → add `mydomain.de` → submit `https://mydomain.de/sitemap.xml`.
4. Google Business Profile → add the website link.

## 7. Logs (if something doesn't work)
- Netlify → **Logs & metrics → Functions** (or **Observability → Logs**): server errors from
  `/api/contact` and `/api/chat` appear here, e.g. `[contact] email failed …`.
- Netlify → **Deploys → (a deploy) → Deploy log**: build errors.
