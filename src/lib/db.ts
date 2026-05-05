import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import { text, integer, sqliteTable } from "drizzle-orm/sqlite-core";

export const urls = sqliteTable("urls", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  shortCode: text("short_code").unique().notNull(),
  longUrl: text("long_url").notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }).defaultNow(),
  clicks: integer("clicks").default(0),
});

const client = createClient({ url: "file:local.db" });
export const db = drizzle(client);