import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Game session storage
export const games = pgTable("games", {
  id: serial("id").primaryKey(),
  status: text("status").notNull().default("active"), // active, completed
  winner: text("winner"),
  currentTurn: integer("current_turn").notNull().default(0),
  gameState: jsonb("game_state").notNull(), // Stores player positions: [{name, position, class}]
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertGameSchema = createInsertSchema(games).omit({ id: true, createdAt: true });

export type Game = typeof games.$inferSelect;
export type InsertGame = z.infer<typeof insertGameSchema>;

export type GameState = {
  players: {
    id: number;
    name: string;
    position: number | null; // 1-9 or null
    color: string;
    avatarClass: string;
  }[];
  currentPlayerIndex: number;
  lastRoll: number | null;
};
