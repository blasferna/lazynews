"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { SparklesIcon } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useRef, useState, useEffect } from "react";

export default function SummarizeModal() {
  const t = useTranslations("SummarizeModal");
  const locale = useLocale();
  const router = useRouter();

  const [url, setUrl] = useState("");
  const [inputError, setInputError] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const inputRef = useRef(null);

  const isVaildUrl = (url) => {
    const urlPattern = new RegExp(
      '^(https?:\\/\\/)?' + 
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|((\\d{1,3}\\.){3}\\d{1,3}))' +
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' +
      '(\\?[;&a-z\\d%_.~+=-]*)?' + 
      '(\\#[-a-z\\d_]*)?$', 'i'
    );
    return urlPattern.test(url);
  };

  const handleSummarize = () => {
    if (!url || !isVaildUrl(url)) {
      setInputError(true);
      inputRef.current.focus();
      return;
    }
    router.push(`/${locale}/unknown/${url}?extract=true`);
    setIsOpen(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSummarize();
    }
  };

  const handleChange = (e) => {
    setUrl(e.target.value);
    if (e.target.value) {
      setInputError(false);
    }
  };

  useEffect(() => {
    setUrl("");
    setInputError(false);
  }
  , [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="gradient">
          <SparklesIcon className="w-5 h-5 lg:mr-2" />
          <span className="hidden lg:inline">{t("trigger")}</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>{t("title")}</DialogTitle>
          <DialogDescription>{t("description")}</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-[1fr_auto] items-center sm:gap-4">
            <Input
              placeholder={t("placeholder")}
              className={`w-full ${
                inputError
                  ? "border-destructive focus-visible:ring-destructive"
                  : ""
              }`}
              value={url}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              ref={inputRef}
            />
            <Button
              variant="gradient"
              className="hidden sm:flex"
              onClick={handleSummarize}
            >
              <SparklesIcon className="w-5 h-5 mr-2" />
              <span>{t("summarize")}</span>
            </Button>
          </div>
        </div>
        <DialogFooter>
          <Button
            className="sm:hidden"
            variant="gradient"
            onClick={handleSummarize}
          >
            <SparklesIcon className="w-5 h-5 mr-2" />
            <span>{t("summarize")}</span>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
