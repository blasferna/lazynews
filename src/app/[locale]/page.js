import { Component } from "@/components/component";
import { LatestArticles, FilteredArticles } from "@/components/article-card";

export default function Home() {
  const elements = [
    { title: "Latest News", component: <LatestArticles></LatestArticles> },
    {
      title: "World News",
      component: (
        <FilteredArticles section="world" limit={4}></FilteredArticles>
      ),
    },
    {
      title: "Politics News",
      component: (
        <FilteredArticles section="politics" limit={4}></FilteredArticles>
      ),
    },
    {
      title: "Science News",
      component: (
        <FilteredArticles section="science" limit={4}></FilteredArticles>
      ),
    },
    {
      title: "Business News",
      component: (
        <FilteredArticles section="business" limit={4}></FilteredArticles>
      ),
    },
  ];

  return <Component elements={elements}></Component>;
}
