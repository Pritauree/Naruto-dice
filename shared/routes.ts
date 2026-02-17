import { z } from 'zod';
import { insertGameSchema, games } from './schema';

export const errorSchemas = {
  validation: z.object({
    message: z.string(),
    field: z.string().optional(),
  }),
  notFound: z.object({
    message: z.string(),
  }),
  internal: z.object({
    message: z.string(),
  }),
};

export const api = {
  games: {
    create: {
      method: 'POST' as const,
      path: '/api/games' as const,
      input: z.object({}).optional(), // No input needed to start fresh
      responses: {
        201: z.custom<typeof games.$inferSelect>(),
        500: errorSchemas.internal,
      },
    },
    get: {
      method: 'GET' as const,
      path: '/api/games/:id' as const,
      responses: {
        200: z.custom<typeof games.$inferSelect>(),
        404: errorSchemas.notFound,
      },
    },
    update: {
      method: 'PATCH' as const,
      path: '/api/games/:id' as const,
      input: z.object({
        gameState: z.any(), // JSONB
        currentTurn: z.number().optional(),
        winner: z.string().optional(),
        status: z.string().optional(),
      }),
      responses: {
        200: z.custom<typeof games.$inferSelect>(),
        404: errorSchemas.notFound,
      },
    }
  }
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}
