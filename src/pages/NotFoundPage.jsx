import { t } from '../i18n/index.js';

/**
 * User-facing 404 page.
 *
 * @param {object} props
 * @param {string} props.hash
 * @returns {JSX.Element}
 */
export default function NotFoundPage({ hash }) {
  const title = t('errors.notFound.title');
  const message = t('errors.notFound.message');

  return (
    <div className="error-page" role="alert" aria-live="polite">
      <div className="container">
        <h1 className="error-page__title">{title}</h1>
        <p className="error-page__message">{message}</p>

        <p className="error-page__meta-line">
          <strong>Requested:</strong> <span className="mono">{hash || '#/'}</span>
        </p>

        <a className="btn" href="#/">
          {t('errors.actions.goHome')}
        </a>
      </div>
    </div>
  );
}
