"use client";
import { formatDistanceToNow } from "date-fns";
import { enUS, es } from "date-fns/locale";
import { useLocale } from "next-intl";

const TimeAgo = ({ date }) => {
  const localeName = useLocale();
  const locale = localeName === "en" ? enUS : es;
  const timeAgo = formatDistanceToNow(new Date(date), { addSuffix: true, locale});
  return <span className="article-time-ago">{timeAgo}</span>;
};

export default TimeAgo;
