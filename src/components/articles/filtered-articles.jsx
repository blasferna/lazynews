import { localesData } from "@/config/locales";
import { db } from "@/db/drizzle/db";
import { ArticleTable } from "@/db/drizzle/schema";
import { and, desc, eq } from "drizzle-orm";
import { getLocale } from "next-intl/server";
import ArticleCard from "./article-card";

async function FilteredArticles({ section, limit }) {
  const locale = await getLocale();
  const language = localesData[locale].name;
  const articles = await db
    .select()
    .from(ArticleTable)
    .where(
      and(
        eq(ArticleTable.section, section),
        eq(ArticleTable.language, language)
      )
    )
    .orderBy(desc(ArticleTable.publishedAt))
    .limit(limit);
  return (
    <>
      {articles.map((article) => (
        <ArticleCard
          key={article.id}
          title={article.title}
          url={article.url}
          source={article.source}
          favicon={article.favicon}
          image={article.image}
          publishedAt={article.publishedAt}
          section={article.section}
        />
      ))}
    </>
  );
}

export default FilteredArticles;
