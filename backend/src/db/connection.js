/**
 * Database Connection Manager
 * Manages SQLite database connection using better-sqlite3
 */

import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATABASE_PATH = process.env.DATABASE_PATH || path.join(__dirname, '../../data/talent-bridge.db');

// Ensure data directory exists
const dataDir = path.dirname(DATABASE_PATH);
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Create database connection
const db = new Database(DATABASE_PATH, {
  verbose: process.env.NODE_ENV === 'development' ? console.log : null
});

// Enable foreign keys
db.pragma('foreign_keys = ON');

// Enable WAL mode for better concurrent access
db.pragma('journal_mode = WAL');

// Increase cache size for better performance
db.pragma('cache_size = 10000');

// Optimize for speed
db.pragma('synchronous = NORMAL');

/**
 * Execute a query with parameters
 */
export const query = (sql, params = []) => {
  try {
    const stmt = db.prepare(sql);
    return stmt.all(params);
  } catch (error) {
    console.error('Query error:', error.message);
    throw error;
  }
};

/**
 * Execute a query and get single result
 */
export const queryOne = (sql, params = []) => {
  try {
    const stmt = db.prepare(sql);
    return stmt.get(params);
  } catch (error) {
    console.error('Query error:', error.message);
    throw error;
  }
};

/**
 * Execute an insert/update/delete statement
 */
export const execute = (sql, params = []) => {
  try {
    const stmt = db.prepare(sql);
    return stmt.run(params);
  } catch (error) {
    console.error('Execute error:', error.message);
    throw error;
  }
};

/**
 * Execute multiple statements in a transaction
 */
export const transaction = (callback) => {
  const tx = db.transaction(callback);
  return tx();
};

/**
 * Close database connection
 */
export const close = () => {
  db.close();
};

/**
 * Get database instance (for advanced usage)
 */
export const getDb = () => db;

export default {
  query,
  queryOne,
  execute,
  transaction,
  close,
  getDb
};
