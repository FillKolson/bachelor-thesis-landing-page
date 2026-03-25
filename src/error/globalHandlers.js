import { createId } from '../lib/id.js';
import { initLogger, logger } from '../logger/logger.js';

const FATAL_EVENT_NAME = 'app:fatal-error';
const LAST_FATAL_STORAGE_KEY = 'app:lastFatalErrorForUi.v1';

/**
 * Initializes window-level error handlers.
 *
 * - Assigns a unique `errorId` and `correlationId`
 * - Logs critical details into the in-app log buffer
 * - Dispatches `app:fatal-error` with payload suitable for `ServerErrorPage`
 */
export function initGlobalErrorHandlers() {
  initLogger();

  /** @type {ReturnType<typeof logger>} */
  const log = logger('global/error-handlers');

  /** @param {object} fatalDetail */
  const publishFatal = (fatalDetail) => {
    try {
      sessionStorage.setItem(LAST_FATAL_STORAGE_KEY, JSON.stringify(fatalDetail));
    } catch {
      // ignore storage errors
    }

    window.dispatchEvent(
      new CustomEvent(FATAL_EVENT_NAME, {
        detail: fatalDetail,
      }),
    );
  };

  /**
   * Builds a fatal error payload for the UI and logs it.
   *
   * @param {string} kind
   * @param {Record<string, unknown>} technical
   */
  const buildFatalPayload = (kind, technical) => {
    const errorId = createId();
    const correlationId = createId();
    const fatal = {
      errorId,
      correlationId,
      module: 'global/error-handlers',
      technical: {
        kind,
        ...technical,
      },
    };

    log.critical(`Fatal error captured: ${kind}`, {
      errorId,
      correlationId,
      context: fatal.technical,
    });

    publishFatal(fatal);
  };

  window.addEventListener(
    'error',
    (event) => {
      // Some browsers don't provide full error details.
      const err = event.error;
      const technical = {
        message: event.message,
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
        name: err && err.name ? err.name : undefined,
        stack: err && err.stack ? err.stack : undefined,
      };

      buildFatalPayload('window.onerror', technical);
    },
    { capture: true },
  );

  window.addEventListener(
    'unhandledrejection',
    (event) => {
      const reason = event.reason;
      const technical = {
        name: reason && reason.name ? reason.name : undefined,
        message: reason && reason.message ? reason.message : undefined,
        stack: reason && reason.stack ? reason.stack : undefined,
        // Include a best-effort string representation.
        reasonString: typeof reason === 'string' ? reason : undefined,
      };

      buildFatalPayload('window.unhandledrejection', technical);
    },
    { capture: true },
  );
}

/**
 * Allows UI to restore the last fatal error after hard refresh.
 *
 * @returns {any|null}
 */
export function readLastFatalErrorForUi() {
  try {
    const raw = sessionStorage.getItem(LAST_FATAL_STORAGE_KEY);
    if (!raw) {
      return null;
    }
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

/**
 * Clears the last stored fatal error so the UI can recover without hard refresh.
 */
export function clearLastFatalErrorForUi() {
  try {
    sessionStorage.removeItem(LAST_FATAL_STORAGE_KEY);
  } catch {
    // ignore storage errors
  }
}
