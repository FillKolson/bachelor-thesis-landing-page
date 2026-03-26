import { useEffect, useMemo, useState } from 'react';
import { t } from '../i18n/index.js';
import { getRecentLogs, exportLogsToFile, clearLogs } from '../logger/logger.js';
import { createId } from '../lib/id.js';

/**
 * @typedef {object} FatalErrorDetail
 * @property {string} errorId
 * @property {string | undefined} correlationId
 * @property {string} [module]
 * @property {Record<string, unknown>} [technical]
 */

/**
 * User-facing 500 error page with a mechanism to report the problem.
 *
 * No server is used: the report is downloaded as a JSON file.
 *
 * @param {object} props
 * @param {FatalErrorDetail} props.fatalError
 * @returns {JSX.Element}
 */
export default function ServerErrorPage({ fatalError }) {
  const [reproduction, setReproduction] = useState('');
  const [submitState, setSubmitState] = useState(
    /** @type {'idle'|'submitting'|'submitted'} */ ('idle'),
  );

  const systemInfo = useMemo(() => {
    return {
      userAgent: navigator.userAgent,
      language: navigator.language,
      platform: navigator.platform,
      url: window.location.href,
      time: new Date().toISOString(),
      storage: {
        logLevel: localStorage.getItem('logLevel'),
      },
    };
  }, []);

  const technicalPayload = useMemo(() => {
    return {
      errorId: fatalError.errorId,
      correlationId: fatalError.correlationId,
      module: fatalError.module,
      technical: fatalError.technical || {},
      recentLogs: getRecentLogs(80),
      systemInfo,
    };
  }, [fatalError, systemInfo]);

  useEffect(() => {
    // Attach last fatal error id for debugging/testing.
    sessionStorage.setItem('lastFatalErrorId', fatalError.errorId);
  }, [fatalError.errorId]);

  const copyTechnical = async () => {
    try {
      await navigator.clipboard.writeText(JSON.stringify(technicalPayload, null, 2));
      console.warn('Copied technical error details to clipboard'); // allowed by eslint config
    } catch {
      console.error('Failed to copy technical error details'); // allowed by eslint config
    }
  };

  const downloadReport = () => {
    const reportId = createId();
    const filename = `error-report-${fatalError.errorId}-${reportId}.json`;
    const blob = new Blob(
      [
        JSON.stringify(
          {
            reportId,
            createdAt: new Date().toISOString(),
            error: {
              errorId: fatalError.errorId,
              correlationId: fatalError.correlationId,
            },
            reproduction,
            technicalPayload,
          },
          null,
          2,
        ),
      ],
      { type: 'application/json' },
    );

    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setSubmitState('submitting');
    // Create the report immediately; no network request.
    downloadReport();
    setSubmitState('submitted');
  };

  const title = t('errors.fatal.title');
  const message = t('errors.fatal.message').replace('`errorId`', fatalError.errorId);

  return (
    <div className="error-page" role="alert" aria-live="polite">
      <div className="container">
        <h1 className="error-page__title">{title}</h1>
        <p className="error-page__message">{message}</p>

        <div className="error-page__meta">
          <p className="error-page__meta-line">
            <strong>errorId:</strong> <span className="mono">{fatalError.errorId}</span>
          </p>
          {fatalError.correlationId ? (
            <p className="error-page__meta-line">
              <strong>correlationId:</strong>{' '}
              <span className="mono">{fatalError.correlationId}</span>
            </p>
          ) : null}
        </div>

        <div className="error-page__actions">
          <button className="btn btn--secondary" type="button" onClick={copyTechnical}>
            {t('errors.report.copyTech')}
          </button>
          <button
            className="btn"
            type="button"
            onClick={() => exportLogsToFile(`app-logs-${fatalError.errorId}.json`)}
          >
            {t('errors.report.download')}
          </button>
        </div>

        <form className="error-page__report" onSubmit={onSubmit}>
          <h2 className="error-page__report-title">{t('errors.report.title')}</h2>

          <label className="field">
            <span className="field__label">{t('errors.report.reproduction')}</span>
            <textarea
              className="field__textarea"
              value={reproduction}
              onChange={(ev) => setReproduction(ev.target.value)}
              placeholder={t('errors.report.reproductionPlaceholder')}
              rows={5}
            />
          </label>

          <details className="error-page__details">
            <summary>{t('errors.report.systemInfo')}</summary>
            <pre className="error-page__pre mono">{JSON.stringify(systemInfo, null, 2)}</pre>
          </details>

          <button className="btn btn--primary" type="submit" disabled={submitState !== 'idle'}>
            {submitState === 'submitted'
              ? t('errors.report.submitted')
              : t('errors.report.download')}
          </button>
          <button className="btn btn--danger" type="button" onClick={() => clearLogs()}>
            Очистити локальні логи
          </button>
        </form>

        <a className="btn btn--secondary error-page__home" href="#/">
          {t('errors.actions.goHome')}
        </a>
      </div>
    </div>
  );
}
