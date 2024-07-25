"use client";
import { useEffect, useState, useRef } from "react";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import ArticleSkeleton from "./article-skeleton";

const ArticleExtractor = ({ url }) => {
  const locale = useLocale();
  const router = useRouter();
  const [error, setError] = useState(null);
  const hasExtracted = useRef(false);

  useEffect(() => {
    const extract = async () => {
      if (hasExtracted.current) return;
      hasExtracted.current = true;

      try {
        const response = await fetch("/api/extract", {
          method: "POST",
          body: JSON.stringify({ url }),
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error('Failed to extract article');
        }

        const { article } = await response.json();
        router.push(`/${locale}/${article.section}/${encodeURIComponent(url)}`);
      } catch (err) {
        console.error("Extraction error:", err);
        setError(true);
      }
    };

    extract();
  }, []);

  if (error) {
    return (
      <div className="container mx-auto flex flex-col justify-center items-center h-screen">
        <p className="text-lg font-bold text-destructive-foreground bg-destructive p-5">
          Failed to extract article
        </p>
      </div>
    );
  }

  return <ArticleSkeleton />;
};

export default ArticleExtractor;