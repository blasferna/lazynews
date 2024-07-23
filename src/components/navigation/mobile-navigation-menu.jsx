"use client";

import { MenuIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";

const MobileNavigationMenu = () => {
  const t = useTranslations("Menu");
  const locale = useLocale();

  const menuItems = [
    { href: "/", label: "home" },
    { href: "/politics", label: "politics" },
    { href: "/business", label: "business" },
    { href: "/science", label: "science" },
    { href: "/sports", label: "sports" },
    { href: "/entertainment", label: "entertainment" },
  ];

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <MenuIcon className="w-5 h-5" />
          <span className="sr-only">{t("toggleMenu")}</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="md:hidden">
        <nav className="grid gap-4 p-4">
          {menuItems.map((item) => (
            <Link
              key={item.label}
              href={`/${locale}${item.href}`}
              className="hover:underline"
              prefetch={false}
            >
              {t(item.label)}
            </Link>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNavigationMenu;