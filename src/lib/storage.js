import { query, initDb } from './db'

/**
 * Save a card to the database.
 * @param {string} id - Unique card ID
 * @param {object} data - Card data (slides text + image base64)
 */
export async function saveCard(id, data) {
  await initDb()
  await query('INSERT INTO cards (id, data) VALUES ($1, $2)', [
    id,
    JSON.stringify(data)
  ])
}

/**
 * Get a card by ID.
 * @param {string} id
 * @returns {Promise<object|null>}
 */
export async function getCard(id) {
  await initDb()
  const result = await query('SELECT data FROM cards WHERE id = $1', [id])
  if (result.rows.length === 0) return null
  return result.rows[0].data
}

/**
 * Check if a card exists.
 * @param {string} id
 * @returns {Promise<boolean>}
 */
export async function cardExists(id) {
  await initDb()
  const result = await query('SELECT 1 FROM cards WHERE id = $1', [id])
  return result.rows.length > 0
}
