import { maxArticlesPerCategory, prefferedCategories } from "@/config/categories";
import { db } from "@/db/drizzle/db";
import { ArticleTable } from "@/db/drizzle/schema";
import { summarize } from "@/lib/summarizer";
import { translate } from "@/lib/translator";
import { extract } from "@extractus/article-extractor";
import axios from "axios";
import cheerio from "cheerio";
import { and, eq } from "drizzle-orm";
import TurndownService from "turndown";
import { categorize } from "./categorizer";

async function extractCNN() {
  const response = await axios.get("https://edition.cnn.com/");
  const $ = cheerio.load(response.data);
  const articles = {};
  const elements = $("[data-section]").toArray();

  for (const elem of elements) {
    let url = `https://edition.cnn.com${$(elem).find("a").attr("href")}`;
    let section = $(elem).attr("data-section");

    if (prefferedCategories.includes(section)) {
      if (!articles[section]) {
        articles[section] = [];
      }

      if (articles[section].length < maxArticlesPerCategory) {
        const article = await extractContent(
          url,
          "edition.cnn.com",
          "https://edition.cnn.com/media/sites/cnn/favicon.ico",
          section,
          "English"
        );

        if (article) {
          articles[section].push(article);
        }
      }
    }
  }
  return articles;
}

async function extractContent(
  url,
  source,
  favicon,
  section,
  language = "Unknown"
) {
  try {
    const extractedArticle = await extract(url);
    const turndownService = new TurndownService();

    const article = {
      title: extractedArticle.title,
      content: turndownService.turndown(extractedArticle.content),
      url: url,
      image: extractedArticle.image,
      language: language,
      source: source,
      publishedAt: new Date(extractedArticle.published),
      extractedAt: new Date(),
      section: section,
      favicon: favicon,
    };

    if (!favicon) {
      const response = await axios.get(url);
      const $ = cheerio.load(response.data);

      let sourceFavicon = $('link[rel="shortcut icon"]').attr("href");
      if (!sourceFavicon) {
        sourceFavicon = $('link[rel="icon"]').attr("href");
      }
      if (!sourceFavicon) {
        sourceFavicon = $('link[rel="apple-touch-icon"]').attr("href");
      }

      if (sourceFavicon && !sourceFavicon.startsWith("http")) {
        const urlObject = new URL(url);
        sourceFavicon =
          urlObject.origin +
          (sourceFavicon.startsWith("/") ? "" : "/") +
          sourceFavicon;
      }

      article.favicon = sourceFavicon;
    }

    if (!article.source) {
      const urlObject = new URL(url);
      article.source = urlObject.hostname;
    }

    return article;
  } catch (error) {
    console.error(`Error extracting article from ${url}`, error);
    return null;
  }
}

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

async function processArticle(article) {
  let exists = await existsArticle(article);
  if (exists.length > 0) {
    console.log(`Article ${article.url} (${article.language}) already exists`);
    return;
  }

  let summarized = await summarize(article);
  summarized = JSON.parse(summarized);

  article.content = summarized.content;
  article.title = summarized.title;
  article.language = "English";

  if (!article.section) {
    console.log(`Categorizing article ${article.url}`);
    const category = await categorize(article);
    article.section = JSON.parse(category).category;
  }

  await db.insert(ArticleTable).values(article);
  console.log(`Article ${article.url} (${article.language}) inserted`);

  article.language = "Spanish";

  exists = await existsArticle(article);
  if (exists.length > 0) {
    console.log(`Article ${article.url} (${article.language}) already exists`);
    return;
  }

  console.log(`Translating article ${article.url} (${article.language})`);
  let translated = await translate(article, article.language);
  translated = JSON.parse(translated);
  article.content = translated.content;
  article.title = translated.title;

  await db.insert(ArticleTable).values(article);
  console.log(`Article ${article.url} (${article.language}) inserted`);
}

export { extractCNN, extractContent, processArticle };
