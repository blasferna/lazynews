"use client";
import { formatDistanceToNow } from "date-fns";

const TimeAgo = ({ date }) => {
  const timeAgo = formatDistanceToNow(new Date(date), { addSuffix: true });
  return <span className="article-time-ago">{timeAgo}</span>;
};

export default TimeAgo;
