import ArticleGrid from "@/components/articles/article-grid";
import FilteredArticles from "@/components/articles/filtered-articles";
import LatestArticles from "@/components/articles/latest-articles";

import { getTranslations } from "next-intl/server";

export default async function Home() {
  const t = await getTranslations("Home");
  const sections = [
    { title: t("latestNews"), component: <LatestArticles></LatestArticles> },
    {
      title: t("worldNews"),
      component: (
        <FilteredArticles section="world" limit={4}></FilteredArticles>
      ),
    },
    {
      title: t("politicsNews"),
      component: (
        <FilteredArticles section="politics" limit={4}></FilteredArticles>
      ),
    },
    {
      title: t("scienceNews"),
      component: (
        <FilteredArticles section="science" limit={4}></FilteredArticles>
      ),
    },
    {
      title: t("businessNews"),
      component: (
        <FilteredArticles section="business" limit={4}></FilteredArticles>
      ),
    },
    {
      title: t("sportNews"),
      component: (
        <FilteredArticles section="sport" limit={4}></FilteredArticles>
      ),
    },
    {
      title: t("entertainmentNews"),
      component: (
        <FilteredArticles section="entertainment" limit={4}></FilteredArticles>
      ),
    },
  ];

  return (
    <main className="flex-1 dark:bg-[#1a1b1e] dark:text-white bg-background text-foreground">
      <ArticleGrid sections={sections}></ArticleGrid>
    </main>
  );
}
