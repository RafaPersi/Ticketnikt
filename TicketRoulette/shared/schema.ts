import { pgTable, text, serial, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const ticketDraws = pgTable("ticket_draws", {
  id: serial("id").primaryKey(),
  ticketType: text("ticket_type").notNull(),
  drawnAt: timestamp("drawn_at").defaultNow().notNull(),
  userAgent: text("user_agent"),
  ipAddress: text("ip_address"),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertTicketDrawSchema = createInsertSchema(ticketDraws).pick({
  ticketType: true,
  userAgent: true,
  ipAddress: true,
}).partial({
  userAgent: true,
  ipAddress: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type TicketDraw = typeof ticketDraws.$inferSelect;
export type InsertTicketDraw = z.infer<typeof insertTicketDrawSchema>;
