import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Create a new game
  app.post(api.games.create.path, async (req, res) => {
    try {
      // Initial game state
      const initialState = {
        players: [
          { id: 1, name: "Tetra Uzumaki", position: null, color: "orange", avatarClass: "bg-orange-500" },
          { id: 2, name: "Sera Hyûga", position: null, color: "blue", avatarClass: "bg-blue-500" },
          { id: 3, name: "Stan Hôzuki", position: null, color: "red", avatarClass: "bg-red-500" },
        ],
        currentPlayerIndex: 0,
        lastRoll: null,
      };

      const game = await storage.createGame({
        gameState: initialState,
        status: "active",
        currentTurn: 0,
      });
      res.status(201).json(game);
    } catch (err) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  });

  // Get game state
  app.get(api.games.get.path, async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(404).json({ message: "Invalid ID" });

    const game = await storage.getGame(id);
    if (!game) return res.status(404).json({ message: "Game not found" });

    res.json(game);
  });

  // Update game state (move made)
  app.patch(api.games.update.path, async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(404).json({ message: "Invalid ID" });

    try {
      const updates = req.body;
      const game = await storage.updateGame(id, updates);
      res.json(game);
    } catch (err) {
      res.status(500).json({ message: "Failed to update game" });
    }
  });

  return httpServer;
}
