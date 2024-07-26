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
        <div className="w-[130px] h-[73px] flex-shrink-0">
          <img
            src={article.image}
            alt="Article Thumbnail"
            className="w-full h-full object-cover rounded-md group-hover:brightness-75 transition-all duration-300"
          />
        </div>
        <div className="flex-grow min-w-0">
          <h3 className="text-lg group-hover:underline" title={article.title}>
            {getTruncatedTitle(article.title)}
          </h3>
        </div>
      </div>
    </Link>
  );
};

export default RelatedArticle;
