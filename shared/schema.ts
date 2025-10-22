import { sql } from "drizzle-orm";
import { pgTable, text, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type EmailBlockType = 
  | 'header'
  | 'text'
  | 'event'
  | 'announcement'
  | 'divider'
  | 'media'
  | 'footer';

export interface EmailBlock {
  id: string;
  type: EmailBlockType;
  content: Record<string, any>;
}

export interface EmailTemplate {
  id: string;
  name: string;
  blocks: EmailBlock[];
  createdAt: Date;
  updatedAt: Date;
}
