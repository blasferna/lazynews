"use client";

import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavigationMenu = () => {
  const t = useTranslations("Menu");
  const locale = useLocale();
  const pathname = usePathname();

  const menuItems = [
    { href: "/", label: "home" },
    { href: "/politics", label: "politics" },
    { href: "/business", label: "business" },
    { href: "/science", label: "science" },
    { href: "/sports", label: "sports" },
    { href: "/entertainment", label: "entertainment" },
  ];
  const isActive = (item) => {
    if (item.href === "/") {
      return pathname === `/${locale}`;
    }
    return pathname === `/${locale}${item.href}`;
  };

  return (
    <nav className="hidden md:flex items-center gap-6 mr-4">
      {menuItems.map((item) => (
        <Link
          key={item.label}
          href={`/${locale}${item.href}`}
          className={`hover:underline ${isActive(item) ? "font-bold" : ""}`}
          prefetch={false}
        >
          {t(item.label)}
        </Link>
      ))}
    </nav>
  );
};

export default NavigationMenu;