import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"

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
          <span className="">{locale === "es" ? t("spanish") : t("english")}</span>
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
  )
}


function ChevronsUpDownIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m7 15 5 5 5-5" />
      <path d="m7 9 5-5 5 5" />
    </svg>
  )
}
