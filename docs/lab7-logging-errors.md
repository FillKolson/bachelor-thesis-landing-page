# ЛР7: Логування та обробка помилок (інваріант для Telegram-лістингу)

Проєкт у цьому репозиторії є `frontend-only` (React + Vite). Тому для централізованого збору логів і звітів використовується **інфраструктура всередині клієнта** (localStorage + сторінка звіту), а не ELK/Splunk/Sentry-агент на сервері.

## 1) Рівні логування

Підтримуються рівні:

- `DEBUG`
- `INFO`
- `WARNING`
- `ERROR`
- `CRITICAL`

Налаштування мінімального рівня виконується без перекомпіляції:

- параметр URL: `?logLevel=DEBUG|INFO|WARNING|ERROR|CRITICAL`
- або `localStorage` ключ `logLevel` (наприклад, `localStorage.setItem('logLevel', 'ERROR')`)

Код: `src/logger/logger.js`.

## 2) Формат логів

Логи зберігаються як JSON-об’єкти в `localStorage` (ring-buffer):

- `id` (унікальний запис)
- `timestamp` (ISO)
- `level`
- `module`
- `message`
- `correlationId` (ID операції)
- `errorId` (ID помилки, якщо є)
- `context` (додатковий стан/параметри)

У `context` також автоматично додаються:

- `userId` (анонімний ID з `localStorage`)
- `sessionId` (ID сесії з `sessionStorage`)
- `route` (current `window.location.hash`)

Технічний буфер: `localStorage['app.logBuffer.v1']`.

Ротація/утримання:

- обмеження кількості записів: `logMaxEntries` (за замовчуванням `200`)
- обмеження часу зберігання: `logMaxAgeDays` (за замовчуванням `7` днів`)

## 3) Логування ключових подій

У `src/App.jsx` логуються:

- старт застосунку (`App started`)
- зміни роуту (hash)
- дія користувача `theme toggle`

Зупинка:

- best-effort лог під `beforeunload`.

## 4) Базова обробка помилок (унікальні ID + контекст)

### 4.1) ErrorBoundary (React)

`src/error/ErrorBoundary.jsx` перехоплює помилки рендеру/життєвого циклу:

- генерує `errorId` та `correlationId`
- логgує `CRITICAL` з `stack`, `componentStack`
- показує user-friendly сторінку `500`.

### 4.2) Глобальні обробники браузера

`src/error/globalHandlers.js` перехоплює:

- `window.onerror`
- `window.onunhandledrejection`

Після захоплення:

- генерується `errorId` + `correlationId`
- деталі помилки додаються в технічний payload
- через подію `app:fatal-error` UI показує сторінку `500`.

## 5) Користувацькі сторінки 404/500

Оскільки це SPA, використовується **hash-router**:

- `#/` або порожній hash → головна (landing)
- інші значення → `404` (`src/pages/NotFoundPage.jsx`)
- `#/500` → тестове форсування помилки для демонстрації `500`.

## 6) Локалізація повідомлень

Текст користувацьких повідомлень локалізується через `src/i18n/index.js`.
Поточна реалізація — `uk`, fallback — `uk` (за потреби можна додати інші мови).

## 7) Механізм збору технічних даних від користувачів

Сторінка `500` (`src/error/ServerErrorPage.jsx`) надає:

- показ `errorId` / `correlationId`
- кнопку копіювання технічних даних у clipboard
- завантаження JSON-звіту про помилку (включає: відтворення, systemInfo, останні логи)
- форму для опису “кроки для відтворення”.

Оскільки бекенду в цьому репозиторії немає, відправка реалізована як **download JSON**.

## 8) Як протестувати

1. Відкрити сторінку і перевірити, що landing рендериться коректно.
2. Перейти на `#/bad-route` → має з’явитися `404`.
3. Перейти на `#/500` → має з’явитися `500` з `errorId`.
4. У DevTools виконати:
   - `Promise.reject(new Error('Test unhandledrejection')).catch(()=>{})`
   - або кинути помилку в console (щоб спрацювали глобальні хендлери)
     → має з’явитися user-friendly `500` і лог у localStorage.

## 9) Централізований збір/аналіз (додаткові бали в межах frontend-only)

“Один канал” реалізовано так:

- всі логи концентруються в `app.logBuffer.v1`
- у звіті 500 додаються `recentLogs`
- користувач може завантажити один JSON-файл, який містить і помилку, і контекст, і останні події.

У продакшн-сценарії те саме можна підключити до Sentry/ELK через бекенд або через відповідні frontend SDK, але це не є обов’язковим для цього репозиторію.
