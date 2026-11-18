# Brief: <Studio Name> by <Your Name>

## Who and why
- Client: small businesses in Germany (cafés, restaurants, craftsmen/Handwerker, shops,
  local services, small exporters).
- Their problem: no website, or an old one that brings no customers.
- My promise: a modern website that brings customers, with design, SEO and Google Ads
  in one package, personal service in German and English.
- Success: 4+ qualified project requests per month through the form.

## Pages (all in /de and /en)
1. Home (one long page with sections):
   - Hero with interactive 3D scene, headline, short sentence, button "Projekt anfragen" / "Request a project"
   - Availability badge: "1 Projektplatz frei im <Monat>" (from site.ts)
   - Services (websites & web apps first and biggest; then Google Ads & SEO, graphic design,
     AI chatbots & automation)
   - Packages with starting prices (from site.ts) + "custom project" option
   - Portfolio preview (3 demo projects + my real work)
   - How we work (real sequence: 1 free call, 2 concept & design, 3 build, 4 launch & ads)
   - About me (photo placeholder, short story: student in Duisburg, designer + developer + Google Ads)
   - FAQ (price, timeline, hosting, changes after launch, language)
   - Project form
2. /portfolio — all work, filter by: Websites, Design, Google Ads
3. /portfolio/[slug] — case study page (problem, solution, result, images)
4. /demos/cafe, /demos/handwerk, /demos/export, /demos/luxury — 4 working demo websites (see below)
5. /impressum and /datenschutz (legal pages, German law, placeholders for my details)

## Packages (prices are placeholders, I will set them in site.ts)
- Start: one-page website, mobile, contact form, basic SEO — from €<X>
- Business: up to 6 pages, bilingual, Google Business Profile, SEO setup — from €<Y>
- Growth: Business + Google Ads setup for 1 month + AI chat assistant — from €<Z>
- Custom: web app, online shop, automation — price on request

## 4 demo projects (clearly labeled as demo)
1. Café "Hafenbohne" (Duisburg) — warm, menu, opening hours, table reservation form, map placeholder.
2. Handwerk "Müller Elektro" — trust-focused, services, emergency phone button, quote request form.
3. Export "Gaibandha Jute Co." — B2B, product catalogue (jute sacks, jute bags, jute-stick charcoal),
   MOQ, enquiry form, English first.
4. Luxury "Maison Noir Duft" (invented fragrance brand, original design) — cinematic dark site:
   full-screen 3D product hero (real-time three.js: glass bottle with glow), elegant serif type,
   scroll-driven story (ingredients → craft → bottle), collection, enquiry form. Shows premium work.
Each demo: its own colors and fonts (different from the studio site), fully responsive,
and a small banner "Demo von <Studio Name> — so könnte Ihre Website aussehen".

## AI assistant (chat bubble on every page, not on /demos) — Gemini free tier via Vercel AI SDK
- Job: answer visitors' questions about services, packages, timeline and process;
  recommend a package; collect name, email, business type and short project description;
  hand off to the project form.
- Languages: replies in the visitor's language (German or English).
- Tools it may use:
  - get_packages → reads packages from site.ts
  - get_availability → reads availability from site.ts
  - save_lead → sends the lead to me by email (same as the form)
- Must never: promise a final price, promise a date, invent past clients, give legal advice.
- Limits: max 20 messages per visitor session, max 2000 characters per message, rate limit per IP.

## Look and feel
- Words: bold, modern, trustworthy, a bit playful. Eye-catching but clean.
- Hero: cinematic, full-screen dark section (rest of site light).
- 3D hero idea: floating glossy building blocks (cobalt, with one signal-yellow block)
  that slowly assemble into a website/browser window shape; they react to the mouse.
- Mood: Duisburg harbour + modern tech — industrial shapes, clean light.

## Contact
- Email: <your@email.de>
- City: Duisburg, Germany
- Main button everywhere: "Projekt anfragen" / "Request a project" → scrolls to the form
