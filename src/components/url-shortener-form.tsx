"use client";

import { useState, useTransition } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { createShortUrl } from "@/app/actions";
import { toast } from "sonner";
import { Copy, Check, Link } from "lucide-react";

const BASE_URL = "https://www.ttc.edu.sg/";

export function UrlShortenerForm() {
  const [longUrl, setLongUrl] = useState("");
  const [shortCode, setShortCode] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    startTransition(async () => {
      try {
        const code = await createShortUrl(longUrl);
        setShortCode(code);
        setLongUrl("");
        setCopied(false);
      } catch {
        toast.error("Failed to shorten URL");
      }
    });
  }

  function copy() {
    if (!shortCode) return;
    navigator.clipboard.writeText(`${BASE_URL}${shortCode}`);
    setCopied(true);
    toast.success("Copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="space-y-1.5">
          <Label htmlFor="longUrl">Destination URL</Label>
          <div className="flex gap-2">
            <Input
              id="longUrl"
              placeholder="https://www.ttc.edu.sg/some/long/path..."
              value={longUrl}
              onChange={(e) => setLongUrl(e.target.value)}
              required
              type="url"
              className="flex-1"
            />
            <Button type="submit" disabled={isPending}>
              {isPending ? "Shortening..." : "Shorten"}
            </Button>
          </div>
        </div>
      </form>

      {shortCode && (
        <div className="flex items-center gap-3 p-4 rounded-lg border bg-muted/50">
          <Link className="h-4 w-4 text-muted-foreground shrink-0" />
          <span className="flex-1 text-sm font-medium font-mono">
            {BASE_URL}{shortCode}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={copy}
            className="shrink-0"
          >
            {copied ? (
              <Check className="h-4 w-4" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
            <span className="ml-1.5">{copied ? "Copied" : "Copy"}</span>
          </Button>
        </div>
      )}
    </div>
  );
}
