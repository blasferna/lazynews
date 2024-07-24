import ArticleGrid from "@/components/articles/article-grid";
import FilteredArticles from "@/components/articles/filtered-articles";
import { getTranslations } from "next-intl/server";

const SectionDetail = async ({ params: { section } }) => {
  const t = await getTranslations("Menu");

  const sections = [
    {
      title: t(section),
      component: (
        <FilteredArticles section={section} limit={24}></FilteredArticles>
      ),
    },
  ];

  return (
    <main className="flex-1 dark:bg-[#1a1b1e] dark:text-white bg-background text-foreground">
      <ArticleGrid sections={sections}></ArticleGrid>
    </main>
  );
};

export default SectionDetail;
