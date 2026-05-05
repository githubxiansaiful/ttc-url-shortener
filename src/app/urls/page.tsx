import { getUrls } from "@/app/actions";
import { UrlsTable } from "@/components/urls-table";

export default async function UrlsPage() {
  const allUrls = await getUrls();
  const reversed = [...allUrls].reverse();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">All Links</h2>
        <p className="text-sm text-muted-foreground mt-1">
          {allUrls.length} {allUrls.length === 1 ? "link" : "links"} created
        </p>
      </div>
      <UrlsTable urls={reversed} />
    </div>
  );
}
