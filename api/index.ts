import type { VercelRequest, VercelResponse } from '@vercel/node';
import express from 'express';
import { connectToDatabase } from '../shared/database.js';
import routes from '../server/routes.js';

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

// Connect to database
connectToDatabase();

// Use routes
app.use('/api', routes);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  return app(req, res);
}
