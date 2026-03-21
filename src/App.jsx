import { useMemo } from 'react';

export default function App() {
  const year = useMemo(() => String(new Date().getFullYear()), []);

  return (
    <>
      <a className="skip-link" href="#main">
        Перейти до основного вмісту
      </a>

      <header className="site-header">
        <div className="container">
          <div className="brand">
            <div className="brand__logo" aria-hidden="true">
              <svg
                width="48"
                height="48"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                role="img"
                aria-label="Логотип університету"
              >
                <rect width="48" height="48" rx="24" fill="#111827" />
                <img
                  src="/public/assets/favicon-48x48.png"
                  alt="Логотип університету"
                  width="48"
                  height="48"
                />
                
              </svg>
            </div>
            <div className="brand__text">
              <p className="brand__university">СумДУ • Факультет ЕлІТ</p>
              <p className="brand__student">Студент: Шевченко К.О.</p>
            </div>
          </div>
        </div>
      </header>

      <main id="main" className="site-main">
        <section className="hero" aria-labelledby="page-title">
          <div className="container">
            <h1 id="page-title">Лендінг бакалаврської роботи</h1>
            <p className="lead">
              базова структура проєкту
            </p>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container">
          <small>
            Виконав: Шевченко К.О.
          </small>
        </div>
      </footer>
    </>
  );
}
