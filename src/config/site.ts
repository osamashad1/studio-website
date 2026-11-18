/**
 * All editable business info lives here — and only here.
 * Change a value, save, and the whole site (and the AI assistant) uses it.
 * Texts that describe things (package features, etc.) live in messages/de.json + en.json.
 */

export type PackageId = "start" | "business" | "growth" | "custom";

export type Package = {
  id: PackageId;
  /** Monthly subscription price in euro (net). `null` = price on request. */
  pricePerMonth: number | null;
  recommended?: boolean;
};

export const site = {
  studioName: "Studio OS",
  ownerName: "Osama Shad",
  email: "osamashad97@gmail.com",
  phone: null as string | null, // optional, e.g. "+49 203 123456"
  address: { street: "Neudorfer Straße 109", postalCode: "47057", city: "Duisburg" },
  city: "Duisburg",
  country: "DE",
  // Your domain. On Netlify the site URL is filled in automatically (URL); set
  // NEXT_PUBLIC_SITE_URL=https://mydomain.de once your own domain is connected.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? process.env.URL ?? "https://example.com",

  /**
   * false = site is hidden from Google (noindex). Set to true only when names, Impressum
   * and Datenschutz are filled in and checked — a German business site needs them.
   */
  launched: false,

  availability: {
    /** Month with a free project slot, format YYYY-MM. */
    nextFreeMonth: "2027-01",
    freeSlots: 1,
    projectsPerMonth: 1,
  },

  /**
   * Subscription terms. Prices were set ~10–20 % below typical German website-subscription
   * and Google-Ads-management prices (research 2026-11-18). Don't claim "x % cheaper than
   * competitors" on the site (§ 6 UWG) — just show the prices.
   */
  subscription: {
    minTermMonths: 12, // then cancellable monthly
    setupFee: 0,
  },
  /** Offers for first-time customers. */
  offers: {
    firstMonthFree: true,
    freeWebsiteCheck: true,
  },

  packages: [
    { id: "start", pricePerMonth: 45 },
    { id: "business", pricePerMonth: 75, recommended: true },
    { id: "growth", pricePerMonth: 449 }, // Google Ads budget is paid separately to Google
    { id: "custom", pricePerMonth: null }, // always "price on request"
  ] satisfies Package[],
} as const;

export type Site = typeof site;
