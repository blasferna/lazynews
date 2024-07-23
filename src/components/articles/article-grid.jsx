"use client";

import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const ArticleGrid = ({ sections }) => {
  const router = useRouter();
  const locale = useLocale();

  const handleArticleClick = (e) => {
    const articleEl = e.target.closest(".article");
    if (articleEl) {
      const url = articleEl.getAttribute("data-url");
      const section = articleEl.getAttribute("data-section");
      router.push(`/${locale}/${section}/${url}`);
    }
  };

  useEffect(() => {
    const articleElements = document.querySelectorAll(".article");

    articleElements.forEach((article) => {
      article.addEventListener("click", handleArticleClick);
    });

    return () => {
      articleElements.forEach((article) => {
        article.removeEventListener("click", handleArticleClick);
      });
    };
  }, []);

  return (
    <div className="container px-4 sm:px-0 mx-auto py-8">
      {sections.map((section, index) => (
        <section key={index} className="mb-8">
          <div>
            <h2 className="text-2xl font-bold mb-4">{section.title}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {section.component}
            </div>
          </div>
        </section>
      ))}
    </div>
  );
};

export default ArticleGrid;
