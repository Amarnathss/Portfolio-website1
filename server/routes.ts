import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertUserSchema } from "@shared/schema";
import TwilioService from "./twilioService";
import { z } from "zod";

// Contact form schema
const contactFormSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email(),
  message: z.string().min(1).max(1000)
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Test endpoint to verify MongoDB connection
  app.get("/api/health", async (req, res) => {
    try {
      // Test database connection
      res.json({ 
        status: "ok", 
        database: "connected",
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      res.status(500).json({ 
        status: "error", 
        database: "disconnected",
        error: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });

  // Twilio test endpoint
  app.post("/api/sms/test", async (req, res) => {
    try {
      const { message } = req.body;
      if (!message) {
        return res.status(400).json({ error: "Message is required" });
      }

      const result = await TwilioService.sendNotification(message);
      
      if (result.success) {
        res.json({ 
          success: true, 
          message: "SMS sent successfully",
          sid: result.sid 
        });
      } else {
        res.status(500).json({ 
          success: false, 
          error: result.error 
        });
      }
    } catch (error) {
      res.status(500).json({ 
        error: error instanceof Error ? error.message : "Failed to send SMS" 
      });
    }
  });

  // Contact form endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      const contactData = contactFormSchema.parse(req.body);
      
      // Send SMS notification
      const smsResult = await TwilioService.sendContactFormNotification(contactData);
      
      // You could also save the contact form to database here
      // await storage.saveContactForm(contactData);
      
      res.json({ 
        success: true, 
        message: "Contact form submitted successfully",
        smsNotification: smsResult.success ? "sent" : "failed"
      });
    } catch (error) {
      res.status(400).json({ 
        error: error instanceof Error ? error.message : "Invalid contact form data" 
      });
    }
  });

  // User endpoints
  app.post("/api/users", async (req, res) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      
      // Check if user already exists
      const existingUser = await storage.getUserByUsername(userData.username);
      if (existingUser) {
        return res.status(409).json({ error: "Username already exists" });
      }

      const user = await storage.createUser(userData);
      
      // Send welcome SMS
      await TwilioService.sendWelcomeMessage(user.username);
      
      res.status(201).json({ 
        id: user._id, 
        username: user.username,
        createdAt: user.createdAt 
      });
    } catch (error) {
      res.status(400).json({ 
        error: error instanceof Error ? error.message : "Invalid user data" 
      });
    }
  });

  app.get("/api/users/:username", async (req, res) => {
    try {
      const user = await storage.getUserByUsername(req.params.username);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      
      res.json({ 
        id: user._id, 
        username: user.username,
        createdAt: user.createdAt 
      });
    } catch (error) {
      res.status(500).json({ 
        error: error instanceof Error ? error.message : "Internal server error" 
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
