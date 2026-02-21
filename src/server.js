#!/usr/bin/env node
/**
 * Talent Bridge API Server
 */
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import path from 'path';
import { fileURLToPath } from 'url';
import apiRoutes from './routes/api.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(helmet({ contentSecurityPolicy: false }));
app.use(cors());
app.use(express.json());
app.use(morgan('short'));

// Rate limiting
app.use('/api/', rateLimit({ windowMs: 15 * 60 * 1000, max: 200 }));

// API routes
app.use('/api', apiRoutes);

// Serve frontend
app.use(express.static(path.join(__dirname, '../public')));

// SPA fallback
app.get('*', (req, res) => {
  if (req.path.startsWith('/api/')) {
    return res.status(404).json({ ok: false, error: 'Not found' });
  }
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ ok: false, error: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`
╔══════════════════════════════════════════╗
║       🚀 TALENT BRIDGE v2.0             ║
╠══════════════════════════════════════════╣
║  API:   http://localhost:${PORT}            ║
║  Dash:  http://localhost:${PORT}            ║
║  Docs:  http://localhost:${PORT}/api/dashboard ║
╚══════════════════════════════════════════╝
  `);
});

export default app;
