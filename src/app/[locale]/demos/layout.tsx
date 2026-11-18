import { setRequestLocale } from "next-intl/server";
import { DemoBanner } from "@/components/demo/DemoBanner";

// Demo websites: no studio header/footer, no chat bubble — only the demo banner.
export default async function DemosLayout({ children, params }: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      {children}
      <DemoBanner />
    </>
  );
}
