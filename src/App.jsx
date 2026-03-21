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
          <nav className="brand" aria-label="Логотип та інформація про університет">
            <div className="brand__logo">
              <img
                src="/assets/favicon-48x48.png"
                alt="Логотип університету"
                width="48"
                height="48"
                loading="eager"
                decoding="async"
              />
            </div>
            <div className="brand__text">
              <p className="brand__university">СумДУ • Факультет ЕлІТ</p>
              <p className="brand__student">Студент: Шевченко К.О.</p>
            </div>
          </nav>
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
