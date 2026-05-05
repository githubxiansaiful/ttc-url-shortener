import { db, urls } from "@/lib/db";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { notFound } from "next/navigation";
import type { NextRequest } from "next/server";

export async function GET(_req: NextRequest, ctx: RouteContext<"/[code]">) {
  const { code } = await ctx.params;

  const [url] = await db
    .select()
    .from(urls)
    .where(eq(urls.shortCode, code))
    .limit(1);

  if (!url) {
    notFound();
  }

  await db
    .update(urls)
    .set({ clicks: (url.clicks ?? 0) + 1 })
    .where(eq(urls.id, url.id));

  redirect(url.longUrl);
}
