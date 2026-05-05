"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { deleteUrl } from "@/app/actions";
import { toast } from "sonner";
import { Copy, Trash2, ExternalLink } from "lucide-react";

const BASE_URL = "https://www.ttc.edu.sg/";

type Url = {
  id: number;
  shortCode: string;
  longUrl: string;
  clicks: number | null;
  createdAt: Date | null;
};

export function UrlsTable({ urls }: { urls: Url[] }) {
  const [deleting, setDeleting] = useState<number | null>(null);

  async function handleDelete(id: number) {
    setDeleting(id);
    try {
      await deleteUrl(id);
      toast.success("Link deleted");
    } catch {
      toast.error("Failed to delete");
    } finally {
      setDeleting(null);
    }
  }

  function copy(code: string) {
    navigator.clipboard.writeText(`${BASE_URL}${code}`);
    toast.success("Copied to clipboard");
  }

  if (urls.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center border rounded-lg bg-muted/20">
        <p className="text-sm text-muted-foreground">No short links yet.</p>
        <p className="text-xs text-muted-foreground mt-1">
          Create one from the Dashboard.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border overflow-hidden">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b bg-muted/50">
            <th className="text-left font-medium text-muted-foreground px-4 py-3">
              Short Link
            </th>
            <th className="text-left font-medium text-muted-foreground px-4 py-3 hidden md:table-cell">
              Destination
            </th>
            <th className="text-right font-medium text-muted-foreground px-4 py-3 w-20">
              Clicks
            </th>
            <th className="px-4 py-3 w-24" />
          </tr>
        </thead>
        <tbody>
          {urls.map((url, i) => (
            <tr
              key={url.id}
              className={
                i !== urls.length - 1 ? "border-b" : ""
              }
            >
              <td className="px-4 py-3">
                <span className="font-mono text-xs font-medium">
                  {BASE_URL}{url.shortCode}
                </span>
              </td>
              <td className="px-4 py-3 hidden md:table-cell max-w-xs">
                <a
                  href={url.longUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-muted-foreground hover:text-foreground truncate flex items-center gap-1 max-w-xs"
                >
                  <span className="truncate">{url.longUrl}</span>
                  <ExternalLink className="h-3 w-3 shrink-0" />
                </a>
              </td>
              <td className="px-4 py-3 text-right tabular-nums text-muted-foreground">
                {url.clicks ?? 0}
              </td>
              <td className="px-4 py-3">
                <div className="flex items-center justify-end gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7"
                    onClick={() => copy(url.shortCode)}
                  >
                    <Copy className="h-3.5 w-3.5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 text-destructive hover:text-destructive"
                    onClick={() => handleDelete(url.id)}
                    disabled={deleting === url.id}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
