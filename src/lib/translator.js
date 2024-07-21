import { openai } from "@ai-sdk/openai";
import { generateText } from "ai";


async function translate(article, language) {
  const { text } = await generateText({
    model: openai("gpt-4o-mini"),
    system:
      'You are a professional writer who produces simple, clear, and concise content. Your responses should be in JSON format with the following structure: {"title": "...", "content": "..."}.',
    prompt: `Translate the following article to ${language}. 
             Title: ${article.title} 
             Content: ${article.content}`,
  });
  return text;
}

export { translate };
