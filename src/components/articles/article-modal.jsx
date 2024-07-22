"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { truncateTitle } from "@/lib/utils";
import { useTranslations } from "next-intl";

const ArticleModal = ({ isOpen, onClose, article }) => {
  const t = useTranslations("ArticleModal");

  const getTruncatedTitle = () => {
    const isMobile = window.innerWidth <= 600;
    return truncateTitle(article.title, isMobile ? 95 : article.title.length);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-full sm:max-w-[800px] h-screen sm:h-auto overflow-y-auto max-h-screen">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-left sm:max-w-none max-w-[95ch] sm:overflow-visible overflow-hidden text-ellipsis">
            {getTruncatedTitle()}
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-3">
          <div>
            <img
              src={article.image}
              alt="Article Thumbnail"
              width={800}
              height={450}
              className="rounded-md object-cover aspect-video"
            />
          </div>
          <div className="flex items-center mt-1 gap-1 justify-between article-source">
            <div className="flex items-center gap-1">
              <img
                src={article.favicon}
                alt="Favicon"
                className="rounded-full w-4 h-4 overflow-hidden article-favicon"
              />
              <span className="text-xs ml-1 article-source">
                {article.source}
              </span>
              <span className="text-xs text-muted-foreground">
                <span className="mr-1">•</span>
                <span>{article.timeAgo}</span>
              </span>
            </div>
            <a
              href={article.url}
              target="_blank"
              className="text-muted-foreground hover:underline text-xs flex items-center gap-1"
            >
              {t("readOriginal")}
            </a>
          </div>
          <div className="grid">
            <p className="text-article-foreground">{article.content}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ArticleModal;
