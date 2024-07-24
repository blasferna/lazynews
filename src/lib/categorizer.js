import { openai } from "@ai-sdk/openai";
import { generateText } from "ai";
import { prefferedCategories } from "@/config/categories";

async function categorize(article) {
  const { text } = await generateText({
    model: openai("gpt-4o-mini"),
    system: `
      You are an expert content categorizer.
      Your task is to categorize the given article into one of the following categories:
      ${prefferedCategories.join(", ")}.
      If the article doesn't fit into any of these categories, use "unknown".
      Your response should be in JSON format with the following structure:
      {"category": "..."}
      The category should be a single word from the provided list or "unknown".
    `,
    prompt: `
      Categorize the following article:
      Title: ${article.title}
      Content: ${article.content}
    `,
  });
  return text.replace(/^```json\n/, "").replace(/\n```$/, "");
}

export { categorize };
