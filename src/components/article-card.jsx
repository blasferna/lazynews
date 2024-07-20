import { formatDistanceToNow } from "date-fns";

import { db } from "@/db/drizzle/db";
import { ArticleTable } from "@/db/drizzle/schema";
import { desc, eq } from "drizzle-orm";

const TimeAgo = ({ date }) => {
  const timeAgo = formatDistanceToNow(new Date(date), { addSuffix: true });
  return <span className="article-time-ago">{timeAgo}</span>;
};

function ArticleCard({
  title,
  content,
  url,
  image,
  source,
  favicon,
  publishedAt,
}) {
  return (
    <div className="group hover:cursor-pointer article">
      <img
        src={image}
        alt="Article Thumbnail"
        className="rounded-md object-contain aspect-video group-hover:brightness-75 article-image"
      />
      <div className="flex items-center mt-3 gap-1">
        <img
          src={favicon}
          alt="Favicon"
          className="rounded-full w-4 h-4 overflow-hidden article-favicon"
        />
        <span className="text-xs ml-1 article-source">{source}</span>
        <span className="text-xs text-muted-foreground">
          <span className="mr-1">•</span>
          <TimeAgo date={publishedAt}/>
        </span>
      </div>
      <div className="mt-3">
        <h3
          className="text-md font-semibold group-hover:underline article-title"
          title={title}
        >
          {title.length > 100 ? title.slice(0, 100) + "..." : title}
        </h3>

          <p className="mt-2 text-article-foreground article-content hidden">
            {content}
          </p>
      </div>
    </div>
  );
}

async function ArticleSection() {
  const articles = await db.select().from(ArticleTable);
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
          content={article.content}
          publishedAt={article.publishedAt}
        />
      ))}
    </>
  );
}

async function LatestArticles() {
  const articles = await db
    .select()
    .from(ArticleTable)
    .orderBy(desc(ArticleTable.publishedAt))
    .limit(4);
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
          content={article.content}
          publishedAt={article.publishedAt}
        />
      ))}
    </>
  );
}

async function FilteredArticles({ section, limit }) {
  const articles = await db
    .select()
    .from(ArticleTable)
    .where(eq(ArticleTable.section, section))
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
          content={article.content}
          publishedAt={article.publishedAt}
        />
      ))}
    </>
  );
}

export { ArticleSection, LatestArticles, FilteredArticles };
