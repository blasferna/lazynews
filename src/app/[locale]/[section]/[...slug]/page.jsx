import RelatedArticle from "@/components/articles/related-article";
import TimeAgo from "@/components/time-ago";
import { localesData } from "@/config/locales";
import { db } from "@/db/drizzle/db";
import { ArticleTable } from "@/db/drizzle/schema";
import { and, desc, eq, ne } from "drizzle-orm";
import { getLocale, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";

const Article = async ({ params: { slug } }) => {
  const fullSlug = decodeURIComponent(slug.join("/"));
  const t = await getTranslations("ArticlePage");
  const locale = await getLocale();
  const language = localesData[locale].name;

  const article = await db
    .select()
    .from(ArticleTable)
    .where(
      and(eq(ArticleTable.url, fullSlug), eq(ArticleTable.language, language))
    )
    .limit(1);

  if (!article || article.length === 0) {
    notFound();
  }

  const relatedArticles = await db
    .select()
    .from(ArticleTable)
    .where(
      and(
        eq(ArticleTable.section, article[0].section),
        eq(ArticleTable.language, language),
        ne(ArticleTable.id, article[0].id)
      )
    )
    .orderBy(desc(ArticleTable.publishedAt))
    .limit(4);

  return (
    <main className="flex-1 dark:bg-[#1a1b1e] dark:text-white bg-background text-foreground">
      <div className="container  mx-auto grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8 px-3 sm:px-0 pt-8">
        <h1 className="text-4xl font-bold mb-4">{article[0].title}</h1>
        <div className="hidden lg:block"> &nbsp;</div>
      </div>
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8 px-3 mt-2 sm:px-0 pb-8">
        <div>
          <img
            src={article[0].image}
            alt="Article Thumbnail"
            className="rounded-md object-contain w-full aspect-video article-image"
          />
          <div className="flex items-center mt-4 gap-1">
            <img
              src={article[0].favicon}
              alt="Favicon"
              className="rounded-full w-4 h-4 overflow-hidden article-favicon"
            />
            <span className="text-xs ml-1 article-source">
              {article[0].source}
            </span>
            <span className="text-xs text-muted-foreground">
              <span className="mr-1">•</span>
              <TimeAgo date={article[0].publishedAt} />
            </span>
            <a
              href={article[0].url}
              target="_blank"
              className="text-muted-foreground hover:underline ml-auto text-xs flex items-center cursor-pointer gap-1"
            >
              {t("readOriginal")}
            </a>
          </div>
          <p className="text-lg mb-4 text-article-foreground mt-4">
            {article[0].content}
          </p>
        </div>
        <aside>
          <h2 className="text-2xl font-bold mb-4">{t("relatedArticles")}</h2>
          <ul>
            {relatedArticles.map((relatedArticle) => (
              <li key={relatedArticle.id}>
                <RelatedArticle article={relatedArticle} />
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </main>
  );
};

export default Article;