import { extract } from "@extractus/article-extractor";
import axios from "axios";
import cheerio from "cheerio";
import TurndownService from "turndown";

const allCategories = [
  "travel",
  "world",
  "entertainment",
  "style",
  "politics",
  "science",
  "homepage",
  "climate",
  "business",
  "health",
  "us",
  "sport",
  "opinions",
];

const prefferedCategories = [
  "world",
  "us",
  "business",
  "politics",
  "health",
  "entertainment",
  "science",
  "climate",
  "sport",
];

const maxArticlesPerCategory = 4;

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
          "CNN",
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

    if (favicon === null) {
      const response = await axios.get(url);
      const $ = cheerio.load(response.data);

      let sourceFavicon = $('link[rel="shortcut icon"]').attr("href");
      if (sourceFavicon) {
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
    }
    return article;
  } catch (error) {
    console.error(`Error extracting article from ${url}`, error);
    return null;
  }
}

export { extractCNN, extractContent };
