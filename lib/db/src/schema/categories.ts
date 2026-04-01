import { pgTable, text, serial, integer, timestamp } from "drizzle-orm/pg-core";

export const productCategoriesTable = pgTable("product_categories", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  parentSlug: text("parent_slug"),
  sortOrder: integer("sort_order").notNull().default(0),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export type ProductCategory = typeof productCategoriesTable.$inferSelect;
export type InsertProductCategory = typeof productCategoriesTable.$inferInsert;
