import { openai } from "@ai-sdk/openai";
import { generateText } from "ai";

async function summarize(article) {
  const { text } = await generateText({
    model: openai("gpt-4o-mini"),
    system: `
      You are a professional writer who produces simple, clear, and concise content. 
      Your responses should be in JSON format with the following structure: 
      {"title": "...", "content": "..."}.
      The content should be a concise summary of no more than 150 words, divided into a maximum of three short paragraphs. 
      Regardless of the input language, the output should always be in English.
    `,
    prompt: `
      Summarize the following article in a concise manner. 
      The summary should be short, clear, and not exceed three short paragraphs.
      Title: ${article.title}
      Content: ${article.content}
    `,
  });

  return text;
}

export { summarize };
