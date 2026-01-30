import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/user.js';
import challengeRoutes from './routes/challenge.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Health check
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Elite Performance API is operational' });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/challenge', challengeRoutes);

// Static assets for production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../../dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../../dist', 'index.html'));
  });
}

export default app;
