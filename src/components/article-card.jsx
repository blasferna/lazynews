import { Card, CardContent } from "@/components/ui/card";

import { db } from "@/db/drizzle/db";
import { ArticleTable } from "@/db/drizzle/schema";

function ArticleCard({ title, content, url, image }) {
  return (
    <Card className="">
      <CardContent>
        <img
          src={image}
          alt="Article Thumbnail"
          width={400}
          height={225}
          className="rounded-md object-cover aspect-video"
        />
        <div className="mt-4">
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="mt-2 dark:text-[#a9a9a9] text-muted-foreground">
            {content}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}


async function ArticleSection(){
    const articles = await db.select().from(ArticleTable);
    return (
        <>
            {articles.map((article) => (
                <ArticleCard
                    key={article.id}
                    title={article.title}
                    content={article.content}
                    url={article.url}
                    image={article.image}
                />
            ))}
        </>
    )
}

export default ArticleSection;