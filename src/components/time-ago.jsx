"use client";
import { formatDistanceToNow } from "date-fns";
import { enUS, es } from "date-fns/locale";
import { useLocale } from "next-intl";

const shortenTimeAgo = (timeAgo, locale) => {
  const replacements = [
    { from: "about ", to: "" },
    { from: " years", to: "y" },
    { from: " year", to: "y" },
    { from: " months", to: "m" },
    { from: " month", to: "m" },
    { from: " days", to: "d" },
    { from: " day", to: "d" },
    { from: " hours", to: "h" },
    { from: " hour", to: "h" },
    { from: " minutes", to: "m" },
    { from: " minute", to: "m" },
    { from: " seconds", to: "s" },
    { from: " second", to: "s" },
    { from: "ago", to: "" },
  ];

  const esReplacements = [
    { from: "alrededor de ", to: "" },
    { from: " años", to: "a" },
    { from: " año", to: "a" },
    { from: " meses", to: "m" },
    { from: " mes", to: "m" },
    { from: " días", to: "d" },
    { from: " día", to: "d" },
    { from: " horas", to: "h" },
    { from: " hora", to: "h" },
    { from: " minutos", to: "m" },
    { from: " minuto", to: "m" },
    { from: " segundos", to: "s" },
    { from: " segundo", to: "s" },
    { from: "hace", to: "" },
  ];

  const applicableReplacements = locale === es ? esReplacements : replacements;

  return applicableReplacements
    .reduce(
      (result, { from, to }) => result.replace(new RegExp(from, "g"), to),
      timeAgo
    )
    .trim();
};

const TimeAgo = ({ date }) => {
  const localeName = useLocale();
  const locale = localeName === "en" ? enUS : es;
  const timeAgo = formatDistanceToNow(new Date(date), {
    addSuffix: true,
    locale,
  });
  const shortTimeAgo = shortenTimeAgo(timeAgo, locale);

  return (
    <div>
      <span className="article-time-ago sm:hidden">{shortTimeAgo}</span>
      <span className="article-time-ago hidden sm:block">{timeAgo}</span>
    </div>
  );
};

export default TimeAgo;
