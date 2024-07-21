import { Component } from "@/components/component";
import { LatestArticles, FilteredArticles } from "@/components/article-card";
import { getTranslations } from "next-intl/server";

export default async function Home() {
  const t = await getTranslations("Home");
  const elements = [
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

  return <Component elements={elements}></Component>;
}
