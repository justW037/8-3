import fs from 'fs'
import path from 'path'

const CARDS_DIR = path.join(process.cwd(), 'data', 'cards')

// Ensure directory exists
function ensureDir() {
  if (!fs.existsSync(CARDS_DIR)) {
    fs.mkdirSync(CARDS_DIR, { recursive: true })
  }
}

/**
 * Save a card to the file system.
 * @param {string} id - Unique card ID
 * @param {object} data - Card data (slides text + image base64)
 */
export function saveCard(id, data) {
  ensureDir()
  const filePath = path.join(CARDS_DIR, `${id}.json`)
  fs.writeFileSync(filePath, JSON.stringify(data), 'utf-8')
}

/**
 * Get a card by ID.
 * @param {string} id
 * @returns {object|null}
 */
export function getCard(id) {
  ensureDir()
  const filePath = path.join(CARDS_DIR, `${id}.json`)
  if (!fs.existsSync(filePath)) return null
  const raw = fs.readFileSync(filePath, 'utf-8')
  return JSON.parse(raw)
}

/**
 * Check if a card exists.
 * @param {string} id
 * @returns {boolean}
 */
export function cardExists(id) {
  ensureDir()
  return fs.existsSync(path.join(CARDS_DIR, `${id}.json`))
}
