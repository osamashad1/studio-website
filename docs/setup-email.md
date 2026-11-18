# Email setup (project form + AI assistant leads)

The form sends emails through **Resend** (free plan: 3,000 emails/month, 100/day).
Spam protection uses **Upstash Redis** (free plan).

## 1. Resend API key
1. Create a free account at https://resend.com (log in with GitHub works).
2. **API Keys → Create API Key** → name it `studio-website`, permission "Sending access".
3. Copy the key (starts with `re_`). You only see it once.

## 2. Verify your domain (so emails come from you@yourdomain.de)
1. Resend → **Domains → Add Domain** → enter `mydomain.de`, region EU (Ireland).
2. Resend shows 3–4 DNS records (TXT/MX for SPF and DKIM).
3. Add exactly these records at your domain provider (INWX, Strato, IONOS, Cloudflare …) under "DNS".
4. Back in Resend click **Verify**. It can take a few minutes up to a few hours.

Until the domain is verified you can test with the sender `onboarding@resend.dev`,
but then Resend only delivers to the email address of your own Resend account.

## 3. Upstash Redis (rate limit)
1. https://upstash.com → create a free Redis database (region: Frankfurt / eu-central-1).
2. Open the database → **REST API** → copy `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN`.

## 4. Put the values in
- **Local:** copy `.env.example` to `.env.local` and fill in the values. Never commit `.env.local`.
- **Netlify:** Project configuration → Environment variables → add:

| Name | Example |
|---|---|
| `RESEND_API_KEY` | `re_…` (mark as secret) |
| `CONTACT_TO_EMAIL` | your inbox, e.g. `you@gmail.com` |
| `CONTACT_FROM_EMAIL` | `Studio <form@mydomain.de>` |
| `UPSTASH_REDIS_REST_URL` | `https://…upstash.io` |
| `UPSTASH_REDIS_REST_TOKEN` | `…` (mark as secret) |

Then trigger a new deploy.

## How it behaves without keys
- `pnpm dev` (local): the email is printed in the terminal instead of sent — good for testing.
- Live site: the visitor sees "please email me directly at …" with your address from `site.ts`.
