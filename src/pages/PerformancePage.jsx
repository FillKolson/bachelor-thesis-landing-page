import { useMemo, useState } from 'react';
import {
  clearLogs,
  getLoggerPerfMode,
  getRecentLogs,
  logger,
  setLoggerPerfMode,
} from '../logger/logger.js';

function formatMs(ms) {
  return `${ms.toFixed(2)} ms`;
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

function makeData(size) {
  const data = new Array(size);
  for (let i = 0; i < size; i += 1) {
    data[i] = { id: i, value: (size - i) ^ (i * 2654435761) };
  }
  return data;
}

/**
 * Simple in-app performance harness.
 *
 * Route: `#/perf`
 *
 * @returns {JSX.Element}
 */
export default function PerformancePage() {
  const log = useMemo(() => logger('ui/PerformancePage'), []);
  const [results, setResults] = useState([]);
  const [itemsSeed, setItemsSeed] = useState(0);
  const [listSize, setListSize] = useState(2000);
  const [loggerComparison, setLoggerComparison] = useState(null);

  const runCpuScenario = () => {
    const data = makeData(50_000);
    const m1 = measure('sort 50k items', () => {
      data.sort((a, b) => a.value - b.value);
      return data[0]?.value;
    });
    const m2 = measure('map+reduce 50k items', () => {
      let sum = 0;
      for (let i = 0; i < data.length; i += 1) {
        sum += (data[i].value & 1023) * 3;
      }
      return sum;
    });
    setResults((prev) => [m1, m2, ...prev]);
  };

  const runLoggingScenario = () => {
    clearLogs();
    const N = 2000;
    const m = measure(`log ${N} INFO records`, () => {
      for (let i = 0; i < N; i += 1) {
        log.info('Perf test log record', { context: { i, tag: 'perf' } });
      }
      return getRecentLogs(5).length;
    });
    setResults((prev) => [m, ...prev]);
  };

  const runLoggingBeforeAfter = () => {
    const N = 2000;
    const prior = getLoggerPerfMode();

    setLoggerPerfMode('legacy');
    clearLogs();
    const before = measure(`logger legacy (${N})`, () => {
      for (let i = 0; i < N; i += 1) {
        log.info('Perf test log record', { context: { i, tag: 'perf' } });
      }
      return getRecentLogs(5).length;
    });

    setLoggerPerfMode('optimized');
    clearLogs();
    const after = measure(`logger optimized (${N})`, () => {
      for (let i = 0; i < N; i += 1) {
        log.info('Perf test log record', { context: { i, tag: 'perf' } });
      }
      return getRecentLogs(5).length;
    });

    setLoggerPerfMode(prior);

    const improvementPct = before.ms > 0 ? ((before.ms - after.ms) / before.ms) * 100 : Number.NaN;

    setLoggerComparison({
      n: N,
      beforeMs: before.ms,
      afterMs: after.ms,
      improvementPct,
    });

    setResults((prev) => [after, before, ...prev]);
  };

  const runRenderScenario = () => {
    const m = measure(`render list ${listSize} items`, () => {
      setItemsSeed((s) => s + 1);
      return null;
    });
    setResults((prev) => [m, ...prev]);
  };

  const items = useMemo(() => {
    const out = new Array(listSize);
    for (let i = 0; i < listSize; i += 1) {
      out[i] = `${itemsSeed}: Item ${i + 1}`;
    }
    return out;
  }, [listSize, itemsSeed]);

  return (
    <section className="content-section" aria-labelledby="perf-title">
      <div className="container">
        <h2 id="perf-title">Performance</h2>
        <p className="lead">
          Локальні сценарії для базового профілювання CPU/рендеру та витрат на логування. Відкрийте
          DevTools → Performance / React Profiler, запустіть сценарії й порівняйте до/після.
        </p>

        <div className="perf-controls" role="group" aria-label="Performance scenarios">
          <button type="button" onClick={runCpuScenario}>
            CPU: sort + reduce
          </button>
          <button type="button" onClick={runLoggingScenario}>
            Logger: 2000 records
          </button>
          <button type="button" onClick={runLoggingBeforeAfter}>
            Logger: before/after
          </button>
          <button type="button" onClick={runRenderScenario}>
            Render: list
          </button>
          <label className="perf-label">
            List size:{' '}
            <input
              type="number"
              min="100"
              max="20000"
              step="100"
              value={listSize}
              onChange={(e) => setListSize(Number(e.target.value || 0))}
            />
          </label>
        </div>

        <div className="perf-results" aria-label="Performance results">
          {results.length === 0 ? (
            <p>Результатів ще немає.</p>
          ) : (
            <ol>
              {results.slice(0, 10).map((r, idx) => (
                <li key={`${r.label}-${idx}`}>
                  <strong>{r.label}:</strong> {formatMs(r.ms)}
                </li>
              ))}
            </ol>
          )}
        </div>

        {loggerComparison ? (
          <div className="perf-results" aria-label="Logger before/after summary">
            <p>
              <strong>Logger before/after (N={loggerComparison.n}):</strong> before{' '}
              {formatMs(loggerComparison.beforeMs)}, after {formatMs(loggerComparison.afterMs)} (
              {loggerComparison.improvementPct.toFixed(1)}%)
            </p>
          </div>
        ) : null}

        <div className="perf-render" aria-label="Render target">
          <h3>Render target</h3>
          <ul>
            {items.map((text) => (
              <li key={text}>{text}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
