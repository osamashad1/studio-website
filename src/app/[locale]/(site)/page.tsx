import { setRequestLocale } from "next-intl/server";
import { use } from "react";
import { Hero } from "@/components/hero/Hero";

// Home page. More sections (services, packages, …) follow in Phase 5.
export default function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale } = use(params);
  setRequestLocale(locale);

  return <Hero />;
}
