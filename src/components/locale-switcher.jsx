"use client";

import { ChevronsUpDownIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";

export default function LocaleSwitcher() {
  const t = useTranslations("LocaleSwitcher");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  function switchLocale(newLocale) {
    const newPath = `/${newLocale}${pathname.replace(`/${locale}`, "")}`;
    router.push(newPath);
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" className="flex items-center gap-2">
          <span className="hidden sm:block">
            {locale === "es" ? t("spanish") : t("english")}
          </span>
          <span className="sm:hidden">
            {locale.toUpperCase()}
          </span>
          <ChevronsUpDownIcon className="sm:ml-2 h-4 w-4 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[130px]">
        <DropdownMenuItem onClick={() => switchLocale("es")}>
          <div className="flex items-center gap-2">
            <span>{t("spanish")}</span>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => switchLocale("en")}>
          <div className="flex items-center gap-2">
            <span>{t("english")}</span>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
