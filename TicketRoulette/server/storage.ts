import { users, ticketDraws, type User, type InsertUser, type TicketDraw, type InsertTicketDraw } from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Ticket draw methods
  createTicketDraw(draw: InsertTicketDraw): Promise<TicketDraw>;
  getTicketDrawCount(): Promise<number>;
  getTicketDrawsByType(): Promise<Record<string, number>>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private ticketDraws: Map<number, TicketDraw>;
  private currentUserId: number;
  private currentDrawId: number;

  constructor() {
    this.users = new Map();
    this.ticketDraws = new Map();
    this.currentUserId = 1;
    this.currentDrawId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createTicketDraw(insertDraw: InsertTicketDraw): Promise<TicketDraw> {
    const id = this.currentDrawId++;
    const draw: TicketDraw = {
      id,
      ticketType: insertDraw.ticketType,
      drawnAt: new Date(),
      userAgent: insertDraw.userAgent || null,
      ipAddress: insertDraw.ipAddress || null,
    };
    this.ticketDraws.set(id, draw);
    return draw;
  }

  async getTicketDrawCount(): Promise<number> {
    return this.ticketDraws.size;
  }

  async getTicketDrawsByType(): Promise<Record<string, number>> {
    const counts: Record<string, number> = {};
    Array.from(this.ticketDraws.values()).forEach((draw) => {
      counts[draw.ticketType] = (counts[draw.ticketType] || 0) + 1;
    });
    return counts;
  }
}

export const storage = new MemStorage();
