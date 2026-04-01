import { pgTable, text, serial, timestamp, integer, boolean } from "drizzle-orm/pg-core";

export const productsTable = pgTable("products", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  category: text("category").notNull(),
  subCategory: text("sub_category").notNull(),
  price: integer("price"),
  priceText: text("price_text").notNull().default("가격 문의"),
  description: text("description").notNull().default(""),
  imageUrl: text("image_url"),
  inStock: boolean("in_stock").notNull().default(true),
  sortOrder: integer("sort_order").notNull().default(0),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export type Product = typeof productsTable.$inferSelect;
export type InsertProduct = typeof productsTable.$inferInsert;
