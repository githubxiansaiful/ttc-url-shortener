"use server";

import { db, urls } from "@/lib/db";
import { eq } from "drizzle-orm";
import { nanoid } from "nanoid";
import { revalidatePath } from "next/cache";

export async function createShortUrl(longUrl: string) {
  const shortCode = nanoid(6);
  await db.insert(urls).values({ shortCode, longUrl });
  revalidatePath("/");
  revalidatePath("/urls");
  return shortCode;
}

export async function getUrls() {
  return db.select().from(urls).orderBy(urls.id);
}

export async function deleteUrl(id: number) {
  await db.delete(urls).where(eq(urls.id, id));
  revalidatePath("/urls");
  revalidatePath("/");
}
