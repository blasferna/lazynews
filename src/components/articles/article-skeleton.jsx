"use client";

const ArticleSkeleton = async () => {
  return (
    <main className="flex-1 dark:bg-[#1a1b1e] dark:text-white bg-background text-foreground">
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8 px-3 sm:px-0 pt-8">
        <div className="h-8 bg-skeleton animate-pulse rounded-full w-3/4 mb-4"></div>
        <div className="hidden lg:block">&nbsp;</div>
      </div>
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8 px-3 mt-2 sm:px-0 pb-8">
        <div>
          <div className="w-full flex items-center justify-center h-64 bg-skeleton rounded-md mb-4 animate-pulse">
            <svg
              className="w-10 h-10 text-skeleton-foreground"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 18"
            >
              <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
            </svg>
          </div>
          <div className="flex items-center mt-4 gap-1">
            <div className="w-4 h-4 bg-skeleton rounded-full animate-pulse"></div>
            <div className="h-2 bg-skeleton rounded-full w-24 animate-pulse"></div>
            <div className="h-2 bg-skeleton rounded-full w-32 ml-auto animate-pulse"></div>
          </div>
          <div className="space-y-2 mt-4">
            {[...Array(5)].map((_, index) => (
              <div
                key={index}
                className="h-4 bg-skeleton rounded-full w-full animate-pulse"
              ></div>
            ))}
          </div>
        </div>
        <aside>
          <div className="h-6 bg-skeleton rounded-full w-1/2 mb-4 animate-pulse"></div>
          <ul className="space-y-4">
            {[...Array(3)].map((_, index) => (
              <li key={index} className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-skeleton rounded-md animate-pulse"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-skeleton rounded-full w-3/4 animate-pulse"></div>
                  <div className="h-3 bg-skeleton rounded-full w-1/2 animate-pulse"></div>
                </div>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </main>
  );
};

export default ArticleSkeleton;
