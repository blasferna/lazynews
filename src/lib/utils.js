import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function truncateTitle(title, maxLength) {
  if (title.length > maxLength) {
    return title.slice(0, maxLength) + "...";
  }
  return title;
}


export function normalizeUrl(url) {
  if (url.endsWith("/")) {
    return url.slice(0, -1);
  }
  return url;
}
