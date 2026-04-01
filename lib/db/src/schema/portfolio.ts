import { pgTable, text, serial, timestamp, integer, boolean } from "drizzle-orm/pg-core";

export const portfolioItemsTable = pgTable("portfolio_items", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  category: text("category").notNull(),
  categoryKey: text("category_key").notNull(),
  imageUrl: text("image_url").notNull(),
  description: text("description").notNull().default(""),
  sortOrder: integer("sort_order").notNull().default(0),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export type PortfolioItem = typeof portfolioItemsTable.$inferSelect;
export type InsertPortfolioItem = typeof portfolioItemsTable.$inferInsert;
