"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { truncateTitle } from "@/lib/utils";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import LocaleSwitcher from "./locale-switcher";


export function Component({ elements }) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [articleData, setArticleData] = useState({});
  const t = useTranslations("Menu");

  const openModal = (data) => {
    setArticleData(data);
    setIsModalOpen(true);
  };

  const getTruncatedTitle = () => {
    const isMobile = window.innerWidth <= 600;
    return truncateTitle(
      articleData.title,
      isMobile ? 95 : articleData.title.length
    );
  };

  const articleClick = (e) => {
    const article = e.target.closest(".article");
    if (article) {
      const articleData = {};
      articleData.title = article
        .querySelector(".article-title")
        .getAttribute("title");
      articleData.content =
        article.querySelector(".article-content").textContent;
      articleData.image = article.querySelector(".article-image").src;
      articleData.source = article.querySelector(".article-source").textContent;
      articleData.favicon = article.querySelector(".article-favicon").src;
      articleData.timeAgo =
        article.querySelector(".article-time-ago").textContent;
      articleData.url = article.getAttribute("data-url");
      openModal(articleData);
    }
  };

  useEffect(() => {
    const articleElements = document.querySelectorAll(".article");

    articleElements.forEach((article) => {
      article.addEventListener("click", articleClick);
    });

    return () => {
      articleElements.forEach((article) => {
        article.removeEventListener("click", articleClick);
      });
    };
  }, []);

  return (
    <div
      className={`flex flex-col min-h-screen ${
        isDarkMode ? "dark:bg-[#1a1b1e] dark:text-white" : "bg-white text-black"
      }`}
    >
      <header
        className={`bg-primary text-primary-foreground py-4 px-6 shadow ${
          isDarkMode ? "dark:bg-[#2a2b2e] dark:text-white" : ""
        }`}
      >
        <div className="container mx-auto flex items-center justify-between">
          <Link href="#" className="flex items-center gap-2" prefetch={false}>
            <NewspaperIcon className="w-6 h-6" />
            <span className="text-xl font-bold">AI News</span>
          </Link>
          <div className="flex items-center gap-4">
            <nav className="hidden md:flex items-center gap-6 mr-4">
              <Link href="#" className="hover:underline" prefetch={false}>
                {t("home")}
              </Link>
              <Link href="#" className="hover:underline" prefetch={false}>
                {t("politics")}
              </Link>
              <Link href="#" className="hover:underline" prefetch={false}>
                {t("business")}
              </Link>
              <Link href="#" className="hover:underline" prefetch={false}>
                {t("science")}
              </Link>
              <Link href="#" className="hover:underline" prefetch={false}>
                {t("sports")}
              </Link>
              <Link href="#" className="hover:underline" prefetch={false}>
                {t("entertainment")}
              </Link>
            </nav>
            <LocaleSwitcher />
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <MenuIcon className="w-5 h-5" />
                  <span className="sr-only">
                    {t("toggleMenu")}
                  </span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="md:hidden">
                <nav className="grid gap-4 p-4">
                  <Link href="#" className="hover:underline" prefetch={false}>
                    {t("home")}
                  </Link>
                  <Link href="#" className="hover:underline" prefetch={false}>
                    {t("politics")}
                  </Link>
                  <Link href="#" className="hover:underline" prefetch={false}>
                    {t("business")}
                  </Link>
                  <Link href="#" className="hover:underline" prefetch={false}>
                    {t("science")}
                  </Link>
                  <Link href="#" className="hover:underline" prefetch={false}>
                    {t("sports")}
                  </Link>
                  <Link href="#" className="hover:underline" prefetch={false}>
                    {t("entertainment")}
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
      <main
        className={`flex-1 ${
          isDarkMode
            ? "dark:bg-[#1a1b1e] dark:text-white"
            : "bg-background text-foreground"
        }`}
      >
        <div className="container px-4 sm:px-0 mx-auto py-8">
          {elements.map((element, index) => (
            <div key={index} className="mb-8">
              <h2 className="text-2xl font-bold mb-4">{element.title}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {element.component}
              </div>
            </div>
          ))}
        </div>
      </main>
      <footer
        className={`bg-primary text-primary-foreground py-4 px-6 shadow ${
          isDarkMode ? "dark:bg-[#2a2b2e] dark:text-white" : ""
        }`}
      >
        <div className="container mx-auto flex items-center justify-between">
          <p className="text-sm">© 2023 AI News. All rights reserved.</p>
          <nav className="flex items-center gap-4">
            <Link href="#" className="hover:underline" prefetch={false}>
              Privacy Policy
            </Link>
            <Link href="#" className="hover:underline" prefetch={false}>
              Terms of Service
            </Link>
            <Link href="#" className="hover:underline" prefetch={false}>
              Contact Us
            </Link>
          </nav>
        </div>
      </footer>
      {isModalOpen && (
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="w-full sm:max-w-[800px] h-screen sm:h-auto overflow-y-auto max-h-screen">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-left sm:max-w-none max-w-[95ch] sm:overflow-visible overflow-hidden text-ellipsis">
                {getTruncatedTitle()}
              </DialogTitle>
            </DialogHeader>
            <div className="grid gap-3">
              <div>
                <img
                  src={articleData.image}
                  alt="Article Thumbnail"
                  width={800}
                  height={450}
                  className="rounded-md object-cover aspect-video"
                />
              </div>
              <div className="flex items-center mt-1 gap-1 justify-between article-source">
                <div className="flex items-center gap-1">
                  <img
                    src={articleData.favicon}
                    alt="Favicon"
                    className="rounded-full w-4 h-4 overflow-hidden article-favicon"
                  />
                  <span className="text-xs ml-1 article-source">
                    {articleData.source}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    <span className="mr-1">•</span>
                    <span>{articleData.timeAgo}</span>
                  </span>
                </div>
                <a
                  href={articleData.url}
                  target="_blank"
                  className="text-muted-foreground hover:underline text-xs flex items-center gap-1"
                >
                  {t("readOriginal")}
                </a>
              </div>
              <div className="grid">
                <p className="text-article-foreground">{articleData.content}</p>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

function MenuIcon(props) {
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
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}

function MoonIcon(props) {
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
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </svg>
  );
}

function NewspaperIcon(props) {
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
      <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2" />
      <path d="M18 14h-8" />
      <path d="M15 18h-5" />
      <path d="M10 6h8v4h-8V6Z" />
    </svg>
  );
}

function SearchIcon(props) {
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
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function SunMoonIcon(props) {
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
      <path d="M12 8a2.83 2.83 0 0 0 4 4 4 4 0 1 1-4-4" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="m4.9 4.9 1.4 1.4" />
      <path d="m17.7 17.7 1.4 1.4" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="m6.3 17.7-1.4 1.4" />
      <path d="m19.1 4.9-1.4 1.4" />
    </svg>
  );
}

function UserIcon(props) {
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
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function XIcon(props) {
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
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}
