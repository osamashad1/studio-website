/**
 * All editable business info lives here — and only here.
 * Change a value, save, and the whole site (and the AI assistant) uses it.
 * Texts that describe things (package features, etc.) live in messages/de.json + en.json.
 */

export type PackageId = "start" | "business" | "growth" | "custom";

export type Package = {
  id: PackageId;
  /** Starting price in euro (net). `null` = not set yet → site shows "Preis folgt". */
  priceFrom: number | null;
  recommended?: boolean;
};

export const site = {
  studioName: "Studio Name", // TODO: your real studio name
  ownerName: "Your Name", // TODO
  email: "hello@example.com", // TODO: your real email
  phone: null as string | null, // optional, e.g. "+49 203 123456"
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
    nextFreeMonth: "2026-12",
    freeSlots: 1,
    projectsPerMonth: 1,
  },

  packages: [
    { id: "start", priceFrom: null },
    { id: "business", priceFrom: null, recommended: true },
    { id: "growth", priceFrom: null },
    { id: "custom", priceFrom: null }, // always "price on request"
  ] satisfies Package[],
} as const;

export type Site = typeof site;
