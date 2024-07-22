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
import { useRouter } from "next/navigation";

export default function LocaleSwitcher() {
  const router = useRouter();
  const t = useTranslations("LocaleSwitcher");
  const locale = useLocale();

  const changeLocale = (locale) => {
    router.push(`/${locale}`);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" className="flex items-center gap-2">
          <span className="">
            {locale === "es" ? t("spanish") : t("english")}
          </span>
          <ChevronsUpDownIcon className="ml-2 h-4 w-4 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[130px]">
        <DropdownMenuItem onClick={() => changeLocale("es")}>
          <div className="flex items-center gap-2">
            <span>{t("spanish")}</span>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => changeLocale("en")}>
          <div className="flex items-center gap-2">
            <span>{t("english")}</span>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
