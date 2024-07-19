import { extract } from "@extractus/article-extractor";
import axios from "axios";
import cheerio from "cheerio";
import TurndownService from "turndown";


// TODO: Server-Side cache by lang and title

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
  // "world",
  // "us",
  //"business",
  //"politics",
  //"health",
  "science",
  "climate",
];

const maxArticlesPerCategory = 3;

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
          article.language = "Spanish";
          article.source = "CNN";
          article.publishedAt = new Date(extractedArticle.published);
          article.extractedAt = new Date();
          article.section = section;
          article.favicon =
            "https://cnnespanol.cnn.com/wp-content/themes/cnnespanol/static/images/favicon/favicon-32x32.png";
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
