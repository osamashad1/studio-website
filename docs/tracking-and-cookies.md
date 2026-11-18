# Cookies & tracking — what changes later

**Today:** the site uses no cookies for tracking, no analytics and no ads pixels.
Fonts are self-hosted. → No cookie banner is needed.

## If you add Google Analytics (GA4) or Google Ads conversion tracking
Both set cookies / read device data that are **not strictly necessary**. In Germany
(§ 25 TDDDG + GDPR) you then need **consent before** they load:

1. Add a consent banner (CMP), e.g. Cookiebot, Usercentrics, or the free open-source
   "klaro!" / "Cookie Consent by Orestbida". Accept and Reject must be equally easy.
2. Use **Google Consent Mode v2** (required by Google for ads in the EU since 2024):
   default all to `denied`, switch to `granted` only after consent.
3. Load the Google tag only through the consent tool.
4. Update the Datenschutzerklärung: name Google Analytics / Google Ads, purpose, legal
   basis Art. 6(1)(a) GDPR (consent), US transfer, storage time, how to withdraw.
5. Add a link "Cookie-Einstellungen" in the footer so visitors can change their choice.

## Privacy-friendly alternative (often no banner)
Cookieless analytics such as **Plausible**, **Umami** (self-hosted) or **Netlify Analytics**
(server-side) usually need no consent banner — still mention them in the privacy policy.
For Google Ads you can also track leads without cookies by counting form submissions
on your side ("Projekt anfragen") instead of a conversion pixel.

Always double-check with e-recht24 or a lawyer before going live.
