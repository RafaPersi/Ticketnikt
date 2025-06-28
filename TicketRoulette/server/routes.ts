import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertTicketDrawSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Get ticket draw statistics
  app.get("/api/stats", async (req, res) => {
    try {
      const totalCount = await storage.getTicketDrawCount();
      const countsByType = await storage.getTicketDrawsByType();
      
      res.json({
        totalCount: totalCount + 1247, // Add base count for visual appeal
        countsByType,
        onlineUsers: Math.floor(Math.random() * 200) + 700 // Simulated online users
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to get statistics" });
    }
  });

  // Record a ticket draw
  app.post("/api/draw", async (req, res) => {
    try {
      const validation = insertTicketDrawSchema.safeParse({
        ticketType: req.body.ticketType,
        userAgent: req.headers['user-agent'] || null,
        ipAddress: req.ip || req.connection.remoteAddress || null,
      });

      if (!validation.success) {
        return res.status(400).json({ error: "Invalid ticket draw data" });
      }

      const draw = await storage.createTicketDraw(validation.data);
      res.json(draw);
    } catch (error) {
      res.status(500).json({ error: "Failed to record ticket draw" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
