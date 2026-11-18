import { site } from "@/config/site";

/** Structured data so Google understands the business (LocalBusiness in Duisburg). */
export function JsonLd({ locale }: { locale: string }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: site.studioName,
    url: `${site.url}/${locale}`,
    email: site.email,
    ...(site.phone ? { telephone: site.phone } : {}),
    founder: { "@type": "Person", name: site.ownerName },
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      postalCode: site.address.postalCode,
      addressLocality: site.address.city,
      addressCountry: site.country,
    },
    priceRange: "€€",
    areaServed: ["Duisburg", "Deutschland"],
    knowsLanguage: ["de", "en"],
    serviceType: ["Webdesign", "Web-Entwicklung", "Google Ads", "SEO", "Grafikdesign", "KI-Chatbots"],
  };
  return (
    <script
      type="application/ld+json"
      // JSON.stringify output is safe here; "<" is escaped to avoid closing the script tag.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
