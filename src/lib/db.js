import pg from 'pg'

const { Pool } = pg

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
})

/**
 * Execute a SQL query.
 * @param {string} text - SQL query string
 * @param {Array} params - Query parameters
 * @returns {Promise<import('pg').QueryResult>}
 */
export async function query(text, params) {
  return pool.query(text, params)
}

let initialized = false

/**
 * Initialize the database schema (create tables if not exist).
 */
export async function initDb() {
  if (initialized) return
  await query(`
    CREATE TABLE IF NOT EXISTS cards (
      id VARCHAR(20) PRIMARY KEY,
      data JSONB NOT NULL,
      created_at TIMESTAMPTZ DEFAULT NOW()
    );
  `)
  initialized = true
}
