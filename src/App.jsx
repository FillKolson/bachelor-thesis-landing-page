import { useState, useEffect } from 'react';

function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');

  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  return (
    <>
      <a href="#main" className="skip-link">
        Перейти до основного вмісту
      </a>

      <header className="site-header">
        <div className="container">
          <nav className="brand" aria-label="Логотип та інформація про університет">
            <div className="brand__logo">
              <img
                src="/assets/favicon-64x64.png"
                alt="Логотип університету"
                width="64"
                height="64"
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
        <div className="container">
          <section className="hero">
            <h1 id="page-title">
              Інформаційна система тестування знань на базі чат-бота в месенджері Telegram
            </h1>
            <p className="lead">
              Розробка односторінкового сайту для представлення бакалаврської роботи з використанням
              React, Vite та системи контролю версій Git Flow.
            </p>
          </section>

          <section className="content-section" aria-labelledby="about-title">
            <div className="container">
              <h2 id="about-title">Про проєкт</h2>
              <p>
                <strong>Назва (українською):</strong> Інформаційна система тестування знань на базі
                чат-бота в месенджері Telegram
                <br />
                <strong>Назва (англійською):</strong> Information System for Knowledge Testing Based
                on a Telegram Chatbot
              </p>
              <p>
                <strong>Предмет:</strong> Технічна підтримка програмного забезпечення (ТППЗ)
                <br />
                <strong>Завдання:</strong> Розробка односторінкового веб-сайту для представлення
                бакалаврської роботи з використанням сучасних веб-технологій та методології Git
                Flow.
              </p>
              <p>
                <strong>Короткий опис:</strong> Проєкт демонструє практичне застосування сучасних
                веб-технологій (React, Vite) та методології Git Flow при створенні адаптивного,
                SEO-оптимізованого лендінгу для представлення бакалаврської роботи.
              </p>
              <p>
                <strong>Ключові слова:</strong> Telegram, чат-бот, тестування знань, інформаційна
                система, React, Vite, Git Flow, лендінг, SEO, доступність, адаптивність,
                веб-розробка, бакалаврська робота, курсова робота, ТППЗ
              </p>
            </div>
          </section>

          <section className="content-section" aria-labelledby="relevance-title">
            <div className="container">
              <h2 id="relevance-title">Актуальність теми</h2>
              <p>
                В умовах стрімкого розвитку освітніх технологій та широкого впровадження месенджерів
                на базі чат-ботів, створення інформаційних систем для тестування знань стає
                актуальним завданням. Такі рішення дозволяють автоматизувати перевірку теоретичних
                знань студентів, надувати миттєвий зворотний зв&apos;язок та інтегруватися з
                сучасними цифровими освітніми платформами.
              </p>
            </div>
          </section>

          <section className="content-section" aria-labelledby="goal-title">
            <div className="container">
              <h2 id="goal-title">Мета КРБ</h2>
              <p>
                Розробити функціональну інформаційну систему тестування знань на базі чат-бота в
                месенджері Telegram, що демонструє володіння сучасними технологіями веб-розробки
                (React, Vite), системою контролю версій Git Flow та принципами створення доступних і
                SEO-оптимізованих інтерфейсів.
              </p>
            </div>
          </section>

          <section className="content-section" aria-labelledby="tasks-title">
            <div className="container">
              <h2 id="tasks-title">Основні завдання КРБ</h2>
              <ol>
                <li>Проаналізувати існуючі рішення для тестування знань на базі чат-ботів</li>
                <li>Спроєктувати архітектуру інформаційної системи та інтерфейсу чат-бота</li>
                <li>Розробити бекенд-логіку для обробки запитань та перевірки відповідей</li>
                <li>Інтегрувати чат-бота з API Telegram та забезпечити безперебійну роботу</li>
                <li>Реалізувати базові вимоги SEO та доступності для веб-інтерфейсу</li>
                <li>Продемонструвати використання стратегії гілкування Git Flow</li>
              </ol>
            </div>
          </section>

          <section className="content-section" aria-labelledby="methodology-title">
            <div className="container">
              <h2 id="methodology-title">Методологія виконання КРБ</h2>
              <p>
                Робота виконується з використанням методології Git Flow для систематичного
                управління версіями. Для фронтенду застосовується компонентний підхід на базі React,
                стилізація виконується з використанням CSS-змінних та сучасних технік адаптивної
                верстки. Особлива увага приділяється семантичній розмітці, доступності та
                SEO-оптимізації. Бекенд розробляється з урахуванням принципів RESTful API та безпеки
                даних.
              </p>
            </div>
          </section>

          <section className="content-section" aria-labelledby="results-title">
            <div className="container">
              <h2 id="results-title">Очікувані результати КРБ</h2>
              <ul>
                <li>Готова інформаційна система тестування знань з інтеграцією Telegram</li>
                <li>Повністю задокументований процес розробки в системі Git</li>
                <li>Портфоліо-проєкт для подальшого професійного розвитку</li>
              </ul>
            </div>
          </section>

          <section className="content-section" aria-labelledby="contacts-title">
            <div className="container">
              <h2 id="contacts-title">Контактна інформація</h2>
              <p>
                <strong>Автор:</strong> Шевченко Кирил Олексійович
                <br />
                <strong>Університет:</strong> Сумський державний університет
                <br />
                <strong>Факультет:</strong> Електроніки та інформаційних технологій
                <br />
                <strong>Email:</strong> shevchenko.kyryl@student.sumdu.edu.ua
              </p>
            </div>
          </section>
        </div>
      </main>

      <footer className="site-footer">
        <div className="container">
          <p>2026 Шевченко Кирил Олексійович • СумДУ • Факультет ЕлІТ • Курсова робота (КРБ)</p>
        </div>
      </footer>

      <button className="theme-toggle" onClick={toggleTheme} aria-label="Перемкнути тему">
        {theme === 'light' ? '🌙' : '☀️'}
      </button>
    </>
  );
}

export default App;
