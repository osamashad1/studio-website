# Go live for free + free SEO — step by step (Studio OS)

Total cost: **0 €**. Optional: your own .de domain (~5–15 €/year) — strongly recommended for SEO and trust.

---

## Part 1 — Go live (about 30 minutes)

### Step 1 · Netlify: connect GitHub (free, commercial use allowed)
1. Log in at https://app.netlify.com → open project **studio-website-preview**.
2. **Project configuration → Build & deploy → Link repository** → GitHub → `osamashad1/studio-website` → branch `main` → **Deploy**.
3. Optional: **Project configuration → General → Change project name** → `studio-os` → your free address becomes **https://studio-os.netlify.app** (if the name is free).
4. To let other people see it: **Access & security → Visitor access** → turn off "Netlify team login".

### Step 2 · Free API keys (all free tiers)
| Service | What for | Where |
|---|---|---|
| Google AI Studio | AI chat assistant | https://aistudio.google.com → **Get API key** |
| Resend | form emails | https://resend.com → **API Keys** |
| Upstash | spam protection | https://upstash.com → Redis (region Frankfurt) → **REST API** |

### Step 3 · Put the keys into Netlify
**Project configuration → Environment variables → Add**:
`GEMINI_API_KEY`, `RESEND_API_KEY`, `CONTACT_TO_EMAIL=osamashad97@gmail.com`,
`UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN` → then **Deploys → Trigger deploy**.
(Without a verified domain, Resend only delivers to the email of your own Resend account —
so sign up at Resend with osamashad97@gmail.com.)

### Step 4 · Test
- Send the form on the live site → the email must arrive.
- Ask the chat "Was kostet eine Website?" → it should answer with 45 / 75 / 449 € and the free first month.

### Step 5 · Before you switch on Google (legal)
- [ ] Decide VAT: Kleinunternehmer (§ 19 UStG) or not → edit the "Umsatzsteuer" block in `messages/de.json` + `en.json` (legal → impressum).
- [ ] Register your business (Gewerbeanmeldung, Stadt Duisburg) — or check with the tax office whether you are a Freiberufler.
- [ ] Check Impressum + Datenschutz with the free e-recht24 generator or a lawyer.
- [ ] Sign the free data-processing agreements (AVV/DPA) in Netlify, Resend and Upstash account settings.

### Step 6 · Launch
In `src/config/site.ts` set `launched: true` → commit → push. Netlify redeploys; the site is
now visible to Google (noindex removed, robots.txt opened, sitemap published).

### Optional · Own domain (recommended, the only cost)
Buy e.g. `studio-os.de` (INWX, IONOS, Strato, Cloudflare Registrar) → Netlify **Domain management →
Add a domain** → follow the DNS steps → HTTPS turns on automatically → set
`NEXT_PUBLIC_SITE_URL=https://studio-os.de` in Netlify → redeploy. Then verify the domain in
Resend so emails come from `form@studio-os.de`.

---

## Part 2 — Free SEO (do in this order)

### Week 1 — get found at all
1. **Google Search Console** (free): https://search.google.com/search-console → add property →
   verify (HTML tag or DNS) → **Sitemaps** → submit `/sitemap.xml` → **URL inspection** → "Request indexing" for `/de` and `/en`.
2. **Bing Webmaster Tools** (free): https://www.bing.com/webmasters → "Import from Google Search Console" (1 click). Also feeds ChatGPT/Copilot search.
3. **Google Business Profile** (free, most important for local customers):
   https://business.google.com → category "Webdesigner" → service area Duisburg + surroundings
   (you can hide your home address) → add website link, services, prices, photos → verify.
4. **Apple Business Connect** (free): https://businessconnect.apple.com — shows you in Apple Maps.

### Week 2 — local listings (all free, use exactly the same name/address/email everywhere = "NAP")
- Das Örtliche, Gelbe Seiten, 11880.com, Cylex, GoLocal, meinestadt.de, Yelp
- LinkedIn company page "Studio OS", Instagram, Facebook page — link to your website
- HSRW: ask the start-up / career service (e.g. start-up support) to list you; student projects pages

### Month 1 — content that ranks (each = one new page or FAQ entry)
Free keyword research: Google Search Console → **Performance** (what people already search),
Google autocomplete, "People also ask", Google Keyword Planner (free with a Google Ads account, no need to run ads).
Target long, local searches you can win:
- "Website erstellen lassen Duisburg", "Homepage für Café Duisburg", "Website für Handwerker Duisburg",
  "Webdesign Kamp-Lintfort / Moers / Oberhausen", "Website Abo Duisburg"
- One page per city/industry with real, useful text (no copy-paste of the same text).

### Every month — reputation & links
- After each project ask the client for a **Google review** (send them the direct review link from your Business Profile).
- Every client site gets a small footer link "Website: Studio OS" (ask the client first).
- Post your demos/projects on LinkedIn and Instagram with a link.
- Check Search Console → **Pages** (errors) and **Core Web Vitals** (real-phone speed).

### Already done in the code (no action needed)
Titles + descriptions per page and language, hreflang DE/EN, canonical URLs, sitemap.xml,
robots.txt, share image, LocalBusiness/ProfessionalService structured data with your address,
fast static pages, mobile-friendly layout, accessible markup.

### Don't
- Don't buy links or fake reviews (Google penalties, illegal in Germany — UWG).
- Don't claim "x % cheaper than other agencies" (comparative advertising rules, § 6 UWG).
