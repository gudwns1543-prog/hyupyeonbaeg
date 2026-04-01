import { pgTable, text, serial, timestamp, boolean } from "drizzle-orm/pg-core";

export const noticesTable = pgTable("notices", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  isNew: boolean("is_new").notNull().default(false),
  isPinned: boolean("is_pinned").notNull().default(false),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export type Notice = typeof noticesTable.$inferSelect;
export type InsertNotice = typeof noticesTable.$inferInsert;
