import TimeAgo from "@/components/time-ago";

function ArticleCard({
  title,
  content,
  url,
  image,
  source,
  favicon,
  publishedAt,
  section,
}) {
  return (
    <article>
      <div className="group hover:cursor-pointer article" data-url={encodeURIComponent(url)} data-section={section}>
        <img
          src={image}
          alt="Article Thumbnail"
          className="rounded-md object-contain aspect-video group-hover:brightness-75 article-image"
        />
        <div className="flex items-center mt-3 gap-1">
          <img
            src={favicon}
            alt="Favicon"
            className="rounded-full w-4 h-4 overflow-hidden article-favicon"
          />
          <span className="text-xs ml-1 article-source">{source}</span>
          <span className="text-xs text-muted-foreground">
            <span className="mr-1">•</span>
            <TimeAgo date={publishedAt} />
          </span>
        </div>
        <div className="mt-3">
          <h3
            className="text-md font-semibold group-hover:underline article-title"
            title={title}
          >
            {title.length > 100 ? title.slice(0, 100) + "..." : title}
          </h3>

          <p className="mt-2 text-article-foreground article-content hidden">
            {content}
          </p>
        </div>
      </div>
    </article>
  );
}

export default ArticleCard;
