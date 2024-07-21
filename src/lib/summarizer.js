import { openai } from "@ai-sdk/openai";
import { generateText } from "ai";

async function summarize(article) {
  const { text } = await generateText({
    model: openai("gpt-4o-mini"),
    system:
      'You are a professional writer who produces simple, clear, and concise content. Your responses should be in JSON format with the following structure: {"title": "...", "content": "..."}.',
    prompt: `Summarize the following article in one paragraph. 
             Title: ${article.title} 
             Content: ${article.content}`,
  });
  return text;
}
export { summarize };
