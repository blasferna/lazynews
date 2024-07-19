import {
  pgTable,
  serial,
  text,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core";

export const ArticleTable = pgTable("articles", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  url: text("url").notNull(),
  language: text("language").notNull(),
  source: text("source").notNull(),
  image: text("image").notNull(),
  favicon: text("favicon"),
  content: text("content").notNull(),
  section: text("section").notNull(),
  publishedAt: timestamp("publishedAt").notNull(),
  extractedAt: timestamp("extractedAt").notNull(),
});
