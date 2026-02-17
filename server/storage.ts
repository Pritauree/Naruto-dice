import { type Game, type InsertGame } from "@shared/schema";

export interface IStorage {
  createGame(game: InsertGame): Promise<Game>;
  getGame(id: number): Promise<Game | undefined>;
  updateGame(id: number, updates: Partial<InsertGame>): Promise<Game>;
}

// In-memory storage (no database required)
export class InMemoryStorage implements IStorage {
  private games: Map<number, Game> = new Map();
  private nextId: number = 1;

  async createGame(insertGame: InsertGame): Promise<Game> {
    const game: Game = {
      id: this.nextId++,
      status: insertGame.status,
      winner: insertGame.winner || null,
      currentTurn: insertGame.currentTurn,
      gameState: insertGame.gameState,
      createdAt: new Date(),
    };
    this.games.set(game.id, game);
    return game;
  }

  async getGame(id: number): Promise<Game | undefined> {
    return this.games.get(id);
  }

  async updateGame(id: number, updates: Partial<InsertGame>): Promise<Game> {
    const game = this.games.get(id);
    if (!game) {
      throw new Error("Game not found");
    }
    
    const updatedGame: Game = {
      ...game,
      ...updates,
    };
    
    this.games.set(id, updatedGame);
    return updatedGame;
  }
}

export const storage = new InMemoryStorage();
