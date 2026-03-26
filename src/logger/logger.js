import { createId } from '../lib/id.js';

const STORAGE_KEY = 'app.logBuffer.v1';
const ANON_USER_ID_KEY = 'app.anonUserId.v1';
const SESSION_ID_KEY = 'app.sessionId.v1';
const FLUSH_DEBOUNCE_MS = 250;
const PERF_MODE_KEY = 'app:loggerPerfMode.v1';

/**
 * @typedef {'legacy'|'optimized'} LoggerPerfMode
 */

/** @type {LoggerPerfMode} */
let perfMode = /** @type {LoggerPerfMode} */ ('optimized');

/**
 * @typedef {'DEBUG'|'INFO'|'WARNING'|'ERROR'|'CRITICAL'} LogLevel
 */

const LEVELS = /** @type {const} */ ({
  DEBUG: 10,
  INFO: 20,
  WARNING: 30,
  ERROR: 40,
  CRITICAL: 50,
});

/**
 * @typedef {object} LogRecord
 * @property {string} id
 * @property {string} timestamp
 * @property {LogLevel} level
 * @property {string} module
 * @property {string} message
 * @property {string | undefined} correlationId
 * @property {string | undefined} errorId
 * @property {Record<string, unknown> | undefined} context
 */

/**
 * @typedef {object} LoggerConfig
 * @property {LogLevel} minLevel
 * @property {number} maxEntries
 * @property {number} maxAgeMs
 */

/** @type {LoggerConfig | null} */
let config = null;

/** @type {LogRecord[] | null} */
let bufferCache = null;

/** @type {number | null} */
let flushTimer = null;

/** @type {string | null} */
let cachedAnonUserId = null;

/** @type {string | null} */
let cachedSessionId = null;

/**
 * Initializes logger configuration once per page load.
 *
 * Allows runtime changes without rebuilding:
 * - `?logLevel=DEBUG|INFO|WARNING|ERROR|CRITICAL`
 * - `localStorage.setItem('logLevel', 'ERROR')`
 *
 * @returns {LoggerConfig} resolved config
 */
export function initLogger() {
  if (config) {
    return config;
  }

  const url = new URL(window.location.href);
  const urlLevel = url.searchParams.get('logLevel');
  const storedLevel = localStorage.getItem('logLevel');
  const resolvedLevel = /** @type {LogLevel} */ ((urlLevel || storedLevel || 'INFO').toUpperCase());

  const minLevel = resolvedLevel in LEVELS ? resolvedLevel : /** @type {LogLevel} */ ('INFO');

  const storedMaxEntries = Number(localStorage.getItem('logMaxEntries') || '');
  const storedMaxAgeDays = Number(localStorage.getItem('logMaxAgeDays') || '');

  const maxEntries =
    Number.isFinite(storedMaxEntries) && storedMaxEntries > 0 ? storedMaxEntries : 200;
  const maxAgeMs =
    Number.isFinite(storedMaxAgeDays) && storedMaxAgeDays > 0
      ? storedMaxAgeDays * 24 * 60 * 60 * 1000
      : 7 * 24 * 60 * 60 * 1000;

  config = { minLevel, maxEntries, maxAgeMs };

  // Perf mode switch for profiling "before vs after" in the same build.
  const storedPerfMode = localStorage.getItem(PERF_MODE_KEY);
  if (storedPerfMode === 'legacy' || storedPerfMode === 'optimized') {
    perfMode = storedPerfMode;
  }

  // Load buffer once at init for faster hot-path logging.
  bufferCache = readLogBuffer();

  // Best-effort flush on tab hide/unload.
  const flushNow = () => {
    try {
      if (bufferCache) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(bufferCache));
      }
    } catch {
      // ignore storage errors
    }
  };
  window.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') {
      flushNow();
    }
  });
  window.addEventListener('beforeunload', flushNow);

  return config;
}

/**
 * Sets logger perf mode (used for profiling comparisons).
 *
 * `legacy`: sync storage I/O per log record (baseline)
 * `optimized`: in-memory cache + debounced persistence
 *
 * @param {LoggerPerfMode} mode
 */
export function setLoggerPerfMode(mode) {
  perfMode = mode;
  try {
    localStorage.setItem(PERF_MODE_KEY, mode);
  } catch {
    // ignore storage errors
  }
}

/**
 * Returns current logger perf mode.
 *
 * @returns {LoggerPerfMode}
 */
export function getLoggerPerfMode() {
  return perfMode;
}

/**
 * Returns current logger config. Call `initLogger()` first.
 *
 * @returns {LoggerConfig}
 */
export function getLoggerConfig() {
  if (!config) {
    return initLogger();
  }
  return config;
}

/**
 * Reads log buffer from localStorage.
 *
 * @returns {LogRecord[]}
 */
export function readLogBuffer() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    return [];
  }
  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      return [];
    }
    return parsed;
  } catch {
    return [];
  }
}

/**
 * Best-effort stable ID per browser storage.
 *
 * @param {'localStorage'|'sessionStorage'} storageType
 * @param {string} key
 * @returns {string}
 */
function getOrCreateStorageId(storageType, key) {
  try {
    const storage = storageType === 'localStorage' ? localStorage : sessionStorage;
    const existing = storage.getItem(key);
    if (existing) {
      return existing;
    }
    const created = createId();
    storage.setItem(key, created);
    return created;
  } catch {
    // If storage is blocked (private mode), fall back to non-persistent id.
    return createId();
  }
}

/**
 * Adds standard context fields for tracing.
 *
 * @param {Record<string, unknown> | undefined} context
 * @returns {Record<string, unknown>}
 */
function withStandardContext(context) {
  if (perfMode === 'legacy') {
    const userId = getOrCreateStorageId('localStorage', ANON_USER_ID_KEY);
    const sessionId = getOrCreateStorageId('sessionStorage', SESSION_ID_KEY);
    const route = window.location.hash || '';

    return {
      ...(context || {}),
      userId,
      sessionId,
      route,
    };
  }

  if (!cachedAnonUserId) {
    cachedAnonUserId = getOrCreateStorageId('localStorage', ANON_USER_ID_KEY);
  }
  if (!cachedSessionId) {
    cachedSessionId = getOrCreateStorageId('sessionStorage', SESSION_ID_KEY);
  }

  const userId = cachedAnonUserId;
  const sessionId = cachedSessionId;
  const route = window.location.hash || '';

  return {
    ...(context || {}),
    userId,
    sessionId,
    route,
  };
}

/**
 * Persists log buffer to localStorage.
 *
 * @param {LogRecord[]} records
 */
function writeLogBuffer(records) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
}

function persistBufferDebounced() {
  if (flushTimer) {
    window.clearTimeout(flushTimer);
  }
  flushTimer = window.setTimeout(() => {
    flushTimer = null;
    try {
      if (bufferCache) {
        writeLogBuffer(bufferCache);
      }
    } catch {
      // ignore storage errors
    }
  }, FLUSH_DEBOUNCE_MS);
}

/**
 * Removes old entries by age and keeps size bounded.
 *
 * @param {LogRecord[]} records
 * @returns {LogRecord[]}
 */
function applyRetention(records) {
  const { maxEntries, maxAgeMs } = getLoggerConfig();
  const now = Date.now();
  const trimmedByAge = records.filter((r) => now - Date.parse(r.timestamp) <= maxAgeMs);

  // Keep last `maxEntries`.
  if (trimmedByAge.length <= maxEntries) {
    return trimmedByAge;
  }
  return trimmedByAge.slice(trimmedByAge.length - maxEntries);
}

/**
 * Adds a new log record into localStorage ring-buffer.
 *
 * @param {Omit<LogRecord, 'id'|'timestamp'>} partial
 */
export function logRecord(partial) {
  const { minLevel } = getLoggerConfig();
  const levelValue = LEVELS[partial.level];
  if (levelValue < minLevel) {
    return;
  }

  const mergedContext = withStandardContext(partial.context);

  const record = /** @type {LogRecord} */ ({
    id: createId(),
    timestamp: new Date().toISOString(),
    correlationId: partial.correlationId,
    errorId: partial.errorId,
    level: partial.level,
    module: partial.module,
    message: partial.message,
    context: mergedContext,
  });

  if (perfMode === 'legacy') {
    const buffer = readLogBuffer();
    buffer.push(record);
    const retained = applyRetention(buffer);
    writeLogBuffer(retained);
  } else {
    if (!bufferCache) {
      bufferCache = readLogBuffer();
    }
    bufferCache.push(record);
    bufferCache = applyRetention(bufferCache);
    persistBufferDebounced();
  }

  // Console handler: keep it quiet (no-console is configured to allow warn/error only).
  if (partial.level === 'WARNING') {
    console.warn(`[${record.level}] ${record.module}: ${record.message}`);
  } else if (partial.level === 'ERROR' || partial.level === 'CRITICAL') {
    console.error(`[${record.level}] ${record.module}: ${record.message}`, {
      errorId: record.errorId,
      correlationId: record.correlationId,
    });
  }
}

/**
 * Convenience logger methods.
 *
 * @param {string} moduleName
 * @returns {object}
 */
export function logger(moduleName) {
  /**
   * @param {LogLevel} level
   * @param {string} message
   * @param {object} [options]
   * @param {string} [options.correlationId]
   * @param {string} [options.errorId]
   * @param {Record<string, unknown>} [options.context]
   */
  const log = (level, message, options = {}) => {
    logRecord({
      level,
      module: moduleName,
      message,
      correlationId: options.correlationId,
      errorId: options.errorId,
      context: options.context,
    });
  };

  return {
    debug: (message, options) => log(/** @type {LogLevel} */ ('DEBUG'), message, options),
    info: (message, options) => log(/** @type {LogLevel} */ ('INFO'), message, options),
    warning: (message, options) => log(/** @type {LogLevel} */ ('WARNING'), message, options),
    error: (message, options) => log(/** @type {LogLevel} */ ('ERROR'), message, options),
    critical: (message, options) => log(/** @type {LogLevel} */ ('CRITICAL'), message, options),
  };
}

/**
 * Returns recent logs (most recent last) for displaying or exporting.
 *
 * @param {number} [limit]
 * @returns {LogRecord[]}
 */
export function getRecentLogs(limit = 50) {
  const buffer = perfMode === 'legacy' ? readLogBuffer() : bufferCache || readLogBuffer();
  if (buffer.length <= limit) {
    return buffer;
  }
  return buffer.slice(buffer.length - limit);
}

/**
 * Clears the log buffer.
 */
export function clearLogs() {
  localStorage.removeItem(STORAGE_KEY);
  bufferCache = [];
}

/**
 * Exports all logs into a downloadable JSON file.
 *
 * @param {string} filename
 */
export function exportLogsToFile(filename) {
  const records = readLogBuffer();
  const blob = new Blob(
    [JSON.stringify({ exportedAt: new Date().toISOString(), records }, null, 2)],
    {
      type: 'application/json',
    },
  );
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
