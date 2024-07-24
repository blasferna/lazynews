import "@/lib/env-config.js";
import { extractCNN, extractContent, processArticle } from "@/lib/extractor";
import { normalizeUrl } from "@/lib/utils";

export async function POST(req) {
  try {
    const body = await req.json().catch(() => null);

    if (body && body.url) {
      const url = normalizeUrl(body.url);
      console.log(`Extracting article from ${url}`);
      const article = await extractContent(url);
      if (article) {
        await processArticle(article);
      }
    } else {
      const articles = await extractCNN();
      for (const section of Object.keys(articles)) {
        for (let i = 0; i < articles[section].length; i++) {
          const article = articles[section][i];
          await processArticle(article);
        }
      }
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500 }
    );
  }
}
