import { UrlShortenerForm } from "@/components/url-shortener-form";
import { getUrls } from "@/app/actions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link, TrendingUp, MousePointerClick } from "lucide-react";

export default async function Home() {
  const allUrls = await getUrls();
  const recent = [...allUrls].reverse().slice(0, 5);
  const totalClicks = allUrls.reduce((sum, u) => sum + (u.clicks ?? 0), 0);

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">Dashboard</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Create short links for ttc.edu.sg
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Links
            </CardTitle>
            <Link className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{allUrls.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Clicks
            </CardTitle>
            <MousePointerClick className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{totalClicks}</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base font-semibold">
            Shorten a URL
          </CardTitle>
        </CardHeader>
        <CardContent>
          <UrlShortenerForm />
        </CardContent>
      </Card>

      {recent.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
            <h3 className="text-sm font-medium">Recent links</h3>
          </div>
          <div className="space-y-2">
            {recent.map((url) => (
              <div
                key={url.id}
                className="flex items-center justify-between p-3 rounded-lg border bg-card"
              >
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-mono font-medium">
                    ttc.edu.sg/{url.shortCode}
                  </p>
                  <p className="text-xs text-muted-foreground truncate mt-0.5">
                    {url.longUrl}
                  </p>
                </div>
                <span className="text-xs text-muted-foreground ml-4 shrink-0">
                  {url.clicks ?? 0} clicks
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
