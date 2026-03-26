import {
  clearLogs,
  getRecentLogs,
  initLogger,
  logger,
  setLoggerPerfMode,
} from '../src/logger/logger.js';

function createStorage() {
  /** @type {Map<string, string>} */
  const map = new Map();
  return {
    getItem(key) {
      return map.has(key) ? map.get(key) : null;
    },
    setItem(key, value) {
      map.set(String(key), String(value));
    },
    removeItem(key) {
      map.delete(String(key));
    },
    clear() {
      map.clear();
    },
  };
}

function installBrowserMocks() {
  const localStorage = createStorage();
  const sessionStorage = createStorage();

  globalThis.localStorage = localStorage;
  globalThis.sessionStorage = sessionStorage;

  globalThis.document = {
    visibilityState: 'visible',
  };

  globalThis.window = {
    location: { href: 'http://localhost/#/perf', hash: '#/perf' },
    addEventListener() {},
    dispatchEvent() {},
    clearTimeout: globalThis.clearTimeout.bind(globalThis),
    setTimeout: globalThis.setTimeout.bind(globalThis),
  };

  // Node has global performance in modern versions, but ensure it's present.
  if (!globalThis.performance || typeof globalThis.performance.now !== 'function') {
    globalThis.performance = {
      now: () => Date.now(),
    };
  }
}

function now() {
  return performance.now();
}

function measure(label, fn) {
  const t0 = now();
  const result = fn();
  const t1 = now();
  return { label, ms: t1 - t0, result };
}

function runOnce({ n }) {
  const log = logger('bench/logger');

  setLoggerPerfMode('legacy');
  clearLogs();
  const before = measure(`legacy(${n})`, () => {
    for (let i = 0; i < n; i += 1) {
      log.info('Perf test log record', { context: { i, tag: 'perf' } });
    }
    return getRecentLogs(5).length;
  });

  setLoggerPerfMode('optimized');
  clearLogs();
  const after = measure(`optimized(${n})`, () => {
    for (let i = 0; i < n; i += 1) {
      log.info('Perf test log record', { context: { i, tag: 'perf' } });
    }
    return getRecentLogs(5).length;
  });

  const improvementPct = before.ms > 0 ? ((before.ms - after.ms) / before.ms) * 100 : NaN;

  return { beforeMs: before.ms, afterMs: after.ms, improvementPct };
}

function median(values) {
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 0 ? (sorted[mid - 1] + sorted[mid]) / 2 : sorted[mid];
}

installBrowserMocks();
initLogger();

const N = 2000;
const runs = 5;
const results = [];

for (let i = 0; i < runs; i += 1) {
  results.push(runOnce({ n: N }));
}

const beforeList = results.map((r) => r.beforeMs);
const afterList = results.map((r) => r.afterMs);

const beforeMed = median(beforeList);
const afterMed = median(afterList);
const improvementMed = beforeMed > 0 ? ((beforeMed - afterMed) / beforeMed) * 100 : NaN;

console.log('Logger before/after benchmark');
console.log(`N=${N}, runs=${runs}`);
console.log(
  'runs:',
  results.map((r) => ({
    beforeMs: Number(r.beforeMs.toFixed(2)),
    afterMs: Number(r.afterMs.toFixed(2)),
    improvementPct: Number(r.improvementPct.toFixed(1)),
  })),
);
console.log(
  'median:',
  JSON.stringify(
    {
      beforeMs: Number(beforeMed.toFixed(2)),
      afterMs: Number(afterMed.toFixed(2)),
      improvementPct: Number(improvementMed.toFixed(1)),
    },
    null,
    2,
  ),
);
