"use client";

import { useEffect, useState } from "react";
import ArticleModal from "./article-modal";

const ArticleGrid = ({ sections }) => {
  const [selectedArticle, setSelectedArticle] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (article) => {
    setSelectedArticle(article);
    setIsModalOpen(true);
  };

  const handleArticleClick = (e) => {
    const articleEl = e.target.closest(".article");
    if (articleEl) {
      const article = {};
      article.title = articleEl
        .querySelector(".article-title")
        .getAttribute("title");
      article.content = articleEl.querySelector(".article-content").textContent;
      article.image = articleEl.querySelector(".article-image").src;
      article.source = articleEl.querySelector(".article-source").textContent;
      article.favicon = articleEl.querySelector(".article-favicon").src;
      article.timeAgo =
        articleEl.querySelector(".article-time-ago").textContent;
      article.url = articleEl.getAttribute("data-url");
      openModal(article);
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
      <ArticleModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        article={selectedArticle}
      />
    </div>
  );
};

export default ArticleGrid;
