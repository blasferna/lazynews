"use client";
import { truncateTitle } from "@/lib/utils";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";

const RelatedArticle = ({ article }) => {
  const router = useRouter();
  const locale = useLocale();

  const getTruncatedTitle = (title) => {
    return truncateTitle(title, 70);
  };

  return (
    <div
      className="flex items-center gap-2 mb-3 group hover:cursor-pointer"
      onClick={() =>
        router.push(
          `/${locale}/${article.section}/${encodeURIComponent(article.url)}`
        )
      }
    >
      <img
        src={article.image}
        alt="Article Thumbnail"
        className="rounded-md w-[130px] h-[73px] object-contain aspect-video group-hover:brightness-75 article-image"
      />
      <div>
        <h3 className="text-lg group-hover:underline" title={article.title}>
          {getTruncatedTitle(article.title)}
        </h3>
      </div>
    </div>
  );
};

export default RelatedArticle;
