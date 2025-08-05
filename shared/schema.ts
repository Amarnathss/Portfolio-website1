import mongoose, { Document, Schema } from 'mongoose';
import { z } from "zod";

// User interface
export interface IUser extends Document {
  username: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

// User schema
const userSchema = new Schema<IUser>({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

// User model
export const User = mongoose.model<IUser>('User', userSchema);

// Zod validation schemas
export const insertUserSchema = z.object({
  username: z.string().min(3).max(50),
  password: z.string().min(6)
});

export type InsertUser = z.infer<typeof insertUserSchema>;
