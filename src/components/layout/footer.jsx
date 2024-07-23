"use client";

import { GithubIcon } from "@/components/icons";
import { useTranslations } from "next-intl";
import Link from "next/link";

const Footer = () => {
  const t = useTranslations("Menu");
  return (
    <footer className="bg-primary text-primary-foreground py-4 px-6 shadow dark:bg-[#2a2b2e] dark:text-white">
      <div className="container mx-auto flex items-center justify-between">
        <p className="text-sm">2024 Lazy News.</p>
        <nav className="flex items-center gap-4">
          <Link
            href="https://github.com/blasferna/lazynews"
            className="text-sm hover:underline flex items-center"
            prefetch={false}
          >
            <GithubIcon className="w-4 h-4 mr-2" />
            {t("sourceCode")}
          </Link>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
