import { User, type InsertUser, type IUser } from "@shared/schema";
import { connectDB } from "@shared/database";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: string): Promise<IUser | null>;
  getUserByUsername(username: string): Promise<IUser | null>;
  createUser(user: InsertUser): Promise<IUser>;
}

export class MongoStorage implements IStorage {
  constructor() {
    // Initialize database connection
    this.initDB();
  }

  private async initDB() {
    try {
      await connectDB();
    } catch (error) {
      console.error('Failed to connect to MongoDB:', error);
    }
  }

  async getUser(id: string): Promise<IUser | null> {
    await connectDB();
    return await User.findById(id);
  }

  async getUserByUsername(username: string): Promise<IUser | null> {
    await connectDB();
    return await User.findOne({ username });
  }

  async createUser(insertUser: InsertUser): Promise<IUser> {
    await connectDB();
    const user = new User(insertUser);
    return await user.save();
  }
}

export const storage = new MongoStorage();
