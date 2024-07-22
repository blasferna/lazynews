"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";

const NavigationMenu = () => {
  const t = useTranslations("Menu");

  const menuItems = [
    { href: "/", label: "home" },
    { href: "/politics", label: "politics" },
    { href: "/business", label: "business" },
    { href: "/science", label: "science" },
    { href: "/sports", label: "sports" },
    { href: "/entertainment", label: "entertainment" },
  ];

  return (
    <nav className="hidden md:flex items-center gap-6 mr-4">
      {menuItems.map((item) => (
        <Link
          key={item.label}
          href={item.href}
          className="hover:underline"
          prefetch={false}
        >
          {t(item.label)}
        </Link>
      ))}
    </nav>
  );
};

export default NavigationMenu;
