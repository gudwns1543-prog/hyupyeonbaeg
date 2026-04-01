import { pgTable, text, serial, timestamp, boolean, date } from "drizzle-orm/pg-core";

export const scheduleEventsTable = pgTable("schedule_events", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  date: date("date").notNull(),
  location: text("location"),
  color: text("color").notNull().default("green"),
  isPublished: boolean("is_published").notNull().default(true),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export type ScheduleEvent = typeof scheduleEventsTable.$inferSelect;
export type InsertScheduleEvent = typeof scheduleEventsTable.$inferInsert;
