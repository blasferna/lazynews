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
    let title = $(elem).find(".container__headline-text").text();

    if (prefferedCategories.includes(section)) {
      if (!articles[section]) {
        articles[section] = [];
      }

      if (articles[section].length < maxArticlesPerCategory) {
        let article = { title, url, section };
        try {
          const extractedArticle = await extract(url);
          const turndownService = new TurndownService();
          article.content = turndownService.turndown(extractedArticle.content);
          article.title = title;
          article.url = url;
          article.image = extractedArticle.image;
          article.language = "English";
          article.source = "CNN";
          article.publishedAt = new Date(extractedArticle.published);
          article.extractedAt = new Date();
          article.section = section;
          article.favicon =
            "https://edition.cnn.com/media/sites/cnn/favicon.ico";
          articles[section].push(article);
        } catch (error) {
          console.error(`Error extracting article from ${url}`, error);
        }
      }
    }
  }
  return articles;
}

export { extractCNN };
