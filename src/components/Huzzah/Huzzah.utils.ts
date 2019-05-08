import HUZZAHS from './huzzahs'

export const DEFAULT_HUZZAH = 'donut'

/**
 * Retrieves the Huzzah (SVG HTML) string, falling back to a default Huzzah.
 *
 * @param   {string} name
 * @returns {string}
 */
export function getHuzzah(name?: string): string {
  const fallbackHuzzah = HUZZAHS[DEFAULT_HUZZAH]
  if (!name) return fallbackHuzzah

  return HUZZAHS[name.toLowerCase()] || fallbackHuzzah
}
