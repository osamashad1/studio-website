import { useTranslations } from "next-intl";
import { site } from "@/config/site";
import { Link } from "@/i18n/navigation";

/** Fixed small banner on every demo page: makes clear it's a demo + link back. */
export function DemoBanner() {
  const t = useTranslations("demoBanner");
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 flex justify-center p-3 pointer-events-none">
      <p className="pointer-events-auto flex flex-wrap items-center justify-center gap-x-3 gap-y-1 rounded-full bg-[#10162f] px-4 py-2 text-center font-[family-name:var(--font-instrument)] text-sm text-[#f3f5fa] shadow-lg">
        <span>{t("text", { studio: site.studioName })}</span>
        <Link href="/#portfolio" className="font-semibold text-[#ffd23f] underline-offset-4 hover:underline">
          {t("back")}
        </Link>
      </p>
    </div>
  );
}
