/**
 * Generates unique identifiers for correlation & errors.
 *
 * Uses `crypto.randomUUID()` when available.
 *
 * @returns {string} UUID-like identifier.
 */
export function createId() {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }

  // Fallback for older browsers.
  return `id_${Math.random().toString(16).slice(2)}_${Date.now().toString(16)}`;
}
