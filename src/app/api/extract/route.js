import { db } from "@/db/drizzle/db";
import { ArticleTable } from "@/db/drizzle/schema";
import "@/lib/env-config.js";
import { extractCNN } from "@/lib/extractor";
import { summarize } from "@/lib/summarizer";
import { translate } from "@/lib/translator";
import { and, eq } from "drizzle-orm";

async function existsArticle(article) {
  return await db
    .select()
    .from(ArticleTable)
    .where(
      and(
        eq(ArticleTable.url, article.url),
        eq(ArticleTable.language, article.language)
      )
    );
}

export async function POST(req) {
  try {
    const articles = await extractCNN();
    for (const section of Object.keys(articles)) {
      for (let i = 0; i < articles[section].length; i++) {
        const article = articles[section][i];

        let exists = await existsArticle(article);
        if (exists.length > 0) {
          console.log(`Article ${i + 1} of ${section} already exists`);
          continue;
        }

        let summarized = await summarize(article);
        summarized = JSON.parse(summarized);

        article.content = summarized.content;
        article.title = summarized.title;
        article.language = "English";

        await db.insert(ArticleTable).values(article);
        console.log(`Article ${i + 1} of ${section} inserted`);

        article.language = "Spanish";

        exists = await existsArticle(article);
        if (exists.length > 0) {
          console.log(`Article ${i + 1} of ${section} already exists`);
          continue;
        }

        let translated = await translate(article, article.language);
        translated = JSON.parse(translated);
        article.content = translated.content;
        article.title = translated.title;

        await db.insert(ArticleTable).values(article);
        console.log(`Article ${i + 1} of ${section} inserted`);
      }
    }
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500 }
    );
  }
}
