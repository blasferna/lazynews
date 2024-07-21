import { cn } from "@/lib/utils";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

export default function LocaleSwitcher() {
  const router = useRouter();
  const t = useTranslations("LocaleSwitcher");
  const locale = useLocale();

  const changeLocale = (locale) => {
    router.push(`/${locale}`);
  };

  return (
    <div className="locale-switcher flex items-center gap-2">
      <button
        onClick={() => changeLocale("en")}
        className={cn(
          locale === "en" && "font-bold",
          "hover:underline focus:outline-none focus:ring-2 focus:ring-primary"
        )}
      >
        {t("english")}
      </button>
      <button
        onClick={() => changeLocale("es")}
        className={cn(
            locale === "es" && "font-bold",
            "hover:underline focus:outline-none focus:ring-2 focus:ring-primary"
          )}
        >
        {t("spanish")}
      </button>
    </div>
  );
}
