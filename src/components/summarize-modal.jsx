"use client";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { SparkleIcon } from "lucide-react";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SummarizeModal() {
  const locale = useLocale();
  const router = useRouter();
  const [url, setUrl] = useState("");

  return (
    <Dialog defaultOpen>
      <DialogTrigger asChild>
        <Button variant="secondary">
          <SparkleIcon className="w-5 h-5 mr-2" />
          Summarize
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Summarize News Articles</DialogTitle>
          <DialogDescription>
            Enter a URL and we'll use AI to summarize the key points for you.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-[1fr_auto] items-center gap-4">
            <Input
              placeholder="Enter article URL"
              className="w-full"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
            <Button
              onClick={() => {
                router.push(`/${locale}/unknown/${url}?extract=true`);
              }}
            >
              Summarize
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
