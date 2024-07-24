import { truncateTitle } from "@/lib/utils";
import { getLocale } from "next-intl/server";
import Link from "next/link";

const RelatedArticle = async ({ article }) => {
  const locale = await getLocale();

  const getTruncatedTitle = (title) => {
    return truncateTitle(title, 70);
  };

  return (
    <Link
      href={`/${locale}/${article.section}/${encodeURIComponent(article.url)}`}
    >
      <div className="flex items-center gap-2 mb-3 group hover:cursor-pointer">
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
    </Link>
  );
};

export default RelatedArticle;
