import { openai } from "@ai-sdk/openai";
import { generateText } from "ai";

async function summarize(article) {
  const { text } = await generateText({
    model: openai("gpt-4o-mini"),
    system:
      'You are a professional writer who produces simple, clear, and concise content. Your responses should be in JSON format with the following structure: {"title": "...", "content": "..."}.  Always provide the output in Spanish.',
    prompt: `Summarize the following article in one paragraph and translate it to Spanish. 
             Title: ${article.title} 
             Content: ${article.content}

              IMPORTANT: Provide the summary in Spanish. Both the title and the content in the JSON response must be in Spanish.
`,
  });
  return text;
}
export { summarize };
