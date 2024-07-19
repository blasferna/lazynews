import axios from "axios";
import cheerio from "cheerio";
import { extract } from "@extractus/article-extractor";
import TurndownService from "turndown";
import dotenv from "dotenv";
import { summarize } from "@lib/summarizer.js";

dotenv.config();

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

const articles = {};

async function extractCNN() {
  const response = await axios.get("https://edition.cnn.com/");
  const $ = cheerio.load(response.data);

  const elements = $("[data-section]").toArray();

  for (const elem of elements) {
    let link = `https://edition.cnn.com${$(elem).find("a").attr("href")}`;
    let section = $(elem).attr("data-section");
    let title = $(elem).find(".container__headline-text").text();

    if (prefferedCategories.includes(section)) {
      if (!articles[section]) {
        articles[section] = [];
      }

      if (articles[section].length < maxArticlesPerCategory) {
        let article = { title, link, section };
        try {
          const extractedArticle = await extract(link);
          const turndownService = new TurndownService();
          const content = turndownService.turndown(extractedArticle.content);
          article["content"] = await summarize(article);
          article["image"] = extractedArticle.image;
          article["favicon"] = extractedArticle.author;
          articles[section].push(article);
        } catch (error) {
          console.error(`Error extracting article from ${link}`, error);
        }
      }
    }
  }
}

extractCNN().then(() => {
  Object.keys(articles).forEach((section) => {
    articles[section].forEach((article, i) => {
      console.log(
        `${i + 1}. ${article.title} - ${article.section} - ${article.link}\n${article.image}\n${article.favicon}\n${article.content}\n\n`,
      );
    });
  });
});


export { extractCNN };
