import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { use } from "react";
import { Hero } from "@/components/hero/Hero";
import { About } from "@/components/home/About";
import { ContactSection } from "@/components/home/ContactSection";
import { Faq } from "@/components/home/Faq";
import { Packages } from "@/components/home/Packages";
import { PortfolioPreview } from "@/components/home/PortfolioPreview";
import { Process } from "@/components/home/Process";
import { Services } from "@/components/home/Services";
import { JsonLd } from "@/components/seo/JsonLd";
import { alternates } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  return { alternates: alternates(locale, "/") };
}

export default function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale } = use(params);
  setRequestLocale(locale);

  return (
    <>
      <JsonLd locale={locale} />
      <Hero />
      <Services />
      <Packages />
      <PortfolioPreview />
      <Process />
      <About />
      <Faq />
      <ContactSection />
    </>
  );
}
