const ArticleGrid = ({ sections }) => {
  return (
    <div className="container px-4 sm:px-0 mx-auto py-8">
      {sections.map((section, index) => (
        <section key={index} className="mb-8">
          <div>
            <h2 className="text-2xl font-bold mb-4">{section.title}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 sm:gap-6">
              {section.component}
            </div>
          </div>
        </section>
      ))}
    </div>
  );
};

export default ArticleGrid;
