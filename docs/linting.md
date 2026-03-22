# Документація Статичного Аналізу та Лінтингу Коду

## Огляд та Налаштування

### Обраний Лінтер: ESLint

**Причини Вибору:**

- **Найбільш популярний** інструмент статичного аналізу для JavaScript/React проектів
- **Розширюваність**: підтримка плагінів (React, React Hooks, React Refresh)
- **Інтеграція з TypeScript**: підтримка через `typescript-eslint`
- **Форматування**: сумісність з Prettier для розділення забаснозацій про виділення та форматування кодуаниз
- **Гнучкість**: можливість налаштування будь-яких правил

### Дослідження Популярних Інструментів

| Інструмент | Призначення                           | Обрано                 |
| ---------- | ------------------------------------- | ---------------------- |
| ESLint     | JavaScript/TypeScript лінтинг         | Y                      |
| Prettier   | Форматування коду                     | Y                      |
| TypeScript | Статична типізація                    | Y                      |
| tsc        | TypeScript компілятор перевірки типів | Y                      |
| SonarQube  | Комплексний аналіз якості коду        | N (надто складний)     |
| JSHint     | Легший лінтер                         | N (заступлений ESLint) |

### Обрані Аспекти Якості Коду

1. **Стиль коду** (Style):
   - Правила форматування (відступи, пробіли, кавички)
   - Назви змінних та функцій
   - Довжина рядків

2. **Безпека** (Security):
   - Запобігання використанню `eval()`
   - Контроль за `console` виразами
   - Запобігання `debugger` виразам

3. **Продуктивність** (Performance):
   - Запобігання неправильному використанню `async/await`
   - Контроль за повернутими промісами

4. **Найкращі Практики** (Best Practices):
   - Використання `const` та `let` замість `var`
   - Правильне використання `===` замість `==`
   - Структурування коду з фігурних дужок

5. **React Best Practices**:
   - Правильне використання хуків
   - Правильні залежності в `useEffect` та `useMemo`

## Конфігураційні Файли

### ESLint Конфігурація (`eslint.config.js`)

```javascript
// Розділена конфігурація для JavaScript та TypeScript файлів

// JavaScript конфіг:
- ecmaVersion: 'latest'
- sourceType: 'module'
- Для JSX файлів

// TypeScript конфіг:
- parser: typescript-eslint.parser
- Для .ts та .tsx файлів
```

**Базові Правила:**

| Правило                      | Рівень | Пояснення                                       |
| ---------------------------- | ------ | ----------------------------------------------- |
| `eqeqeq`                     | error  | Використовуй `===` замість `==`                 |
| `no-console`                 | warn   | Запобягай console виразам (дозвіл: warn, error) |
| `no-debugger`                | error  | Запобігай `debugger` виразам                    |
| `no-shadow`                  | error  | Не перевизначай змінні зі зовнішньої області    |
| `prefer-const`               | error  | Використовуй `const` за замовчуванням           |
| `no-var`                     | error  | Заборони `var`, використовуй `let`/`const`      |
| `curly`                      | error  | Завжди використовуй фігурні дужки для блоків    |
| `no-unused-vars`             | warn   | Попереджуй про невикористані змінні             |
| `react/react-in-jsx-scope`   | off    | Вимкнено для React 17+ (автоматичний імпорт)    |
| `react-hooks/rules-of-hooks` | error  | Дотримуйся правил хуків React                   |

### Prettier Конфігурація (`.prettierrc.json`)

```json
// Усі файли автоматично форматуються:
- printWidth: стандартна довжина рядка
- trailingComma: true (comma в кінці об'єктів)
- singleQuote: true (одинарні кавички)
```

### TypeScript Конфігурація (`tsconfig.json`)

```json
{
  "compilerOptions": {
    "strict": true, // Суворий режим типізації
    "jsx": "react-jsx", // Автоматичний імпорт React
    "noEmit": true, // Не генерувати JS (тільки перевіряй типи)
    "esModuleInterop": true, // Спільність з CommonJS модулів
    "paths": {
      // Alias для імпортів
      "@/*": ["src/*"]
    }
  }
}
```

## Ігнорування Файлів

### ESLint `.eslintignore`

```
dist/
node_modules/
**/*.config.js
.husky/
```

### Prettier `.prettierignore`

```
dist
node_modules
```

## Запуск Лінтера

### Базове лінтування

```bash
npm run lint
```

Перевіряє всі файли на відповідність правилам ESLint (без змін).

### Автоматичне виправлення

```bash
npm run lint:fix
```

Виправляє автоматично виправляємі помилки ESLint.

### Форматування коду

```bash
npm run format
```

Перевіряє та виправляє форматування за допомогою Prettier.

### Перевірка форматування

```bash
npm run format:check
```

Перевіряє, чи код відповідає Prettier стилю (без змін).

### Перевірка типів

```bash
npm run type-check
```

Запускає TypeScript компілятор для перевірки типів без генерації JS.

### Комплексна перевірка коду

```bash
npm run check
```

Запускає всі перевірки послідовно:

1. `npm run format:check` - перевірка форматування
2. `npm run lint` - ESLint лінтування
3. `npm run type-check` - TypeScript типізація

### Комплексне виправлення

```bash
npm run check:fix
```

Виправляє форматування та лінтинг помилки.

## Звіт про результати лінтингу

### Останній запуск

- `npm run lint` (ESLint)
- `npm run format:check` (Prettier)
- `npm run type-check` (TypeScript)

### Типові перевірки які мають бути зрозумілі новому розробнику

- синтаксичні та стилістичні помилки ESLint
- загальноприйняті React/React Hooks правила
- форматування коду через Prettier
- типізація TypeScript через `tsc`

> Не включено статуси виконання завдань про відсоток та внутрішній статус файлів — лише актуальна інформація по конфігурації та командах для перевірки.

## Pre-commit Хуки та Інтеграція

### Git Hooks (Husky)

#### Налаштування Pre-commit Хука

```bash
npm install husky --save-dev
npx husky install
npx husky add .husky/pre-commit "npm run check"
```

Цей хук:

- ✅ Запускається перед кожним `git commit`
- ✅ Перевіряє форматування (Prettier)
- ✅ Перевіряє лінтування (ESLint)
- ✅ Перевіряє типи (TypeScript)
- ✅ Блокує коміт, якщо будь-яка перевірка не пройде

#### Налаштування Commit-msg Хука (опціональне)

```bash
npx husky add .husky/commit-msg 'echo "Commit message hook"'
```

#### Команди:

```bash
# Встановити husky
npm install husky --save-dev

# Ініціалізувати husky
npx husky install

# Перевірити налаштованих хуків
ls -la .husky/
```

**Розташування хуків**: `.husky/` директорія

### Інтеграція з Процесом Збірки

#### Vite Build Configuration

```bash
npm run build
```

**Послідовність збірки**:

1. ✅ `npm run check` - запускається перед збіркою (перевіряє все)
2. ✅ `vite build` - генерує оптимізований бандл

**package.json**:

```json
{
  "scripts": {
    "build": "npm run check && vite build"
  }
}
```

### Статична Типізація

#### TypeScript Configuration

**Файли конфіги**:

- `tsconfig.json` - основна конфігурація
- `tsconfig.app.json` - додаткова конфіг для app коду

**Параметри**:

```json
{
  "compilerOptions": {
    "strict": true, // 🔒 Суворий режим
    "noImplicitAny": true, // Забороні неявне any
    "strictNullChecks": true, // Строгі null перевірки
    "strictFunctionTypes": true, // Типи функцій
    "noEmit": true // Не генерувати JS
  }
}
```

**Запуск перевірки типів**:

```bash
npm run type-check
```

#### Підтримка TypeScript для Різних Розширень

- ✅ `.ts` - TypeScript файли
- ✅ `.tsx` - TypeScript + JSX
- ✅ `.js` - JavaScript (включає типи через JSDoc)
- ✅ `.jsx` - JavaScript + JSX

### Комплексна Перевірка Коду

#### Скрипт `npm run check`

Запускає всі перевірки по черзі:

```bash
npm run check
```

**Що виконується**:

1. `prettier . --check` - Перевіряє форматування
2. `eslint .` - Запускає ESLint лінтування
3. `tsc --noEmit` - Перевіряє типи TypeScript

**Вихід**:

- ✅ Всі перевірки пройдені - код готовий до комітування
- ❌ Будь-яка перевірка не пройшла - блокує коміт

#### Скрипт `npm run check:fix`

Автоматично виправляє проблеми:

```bash
npm run check:fix
```

**Що виправляється**:

1. `prettier . --write` - Форматує весь код
2. `eslint . --fix` - Виправляє автоматико виправляємі помилки ESLint

### Рекомендована Робоча течія

```bash
# 1. Розробка
git checkout -b feature/my-feature

# 2. Розробка коду...
# ...редагування файлів...

# 3. Фіксинг перед комітуванням
npm run check:fix

# 4. Перевірити, чи все OK
npm run check

# 5. Коміт (pre-commit хук запуститься автоматично)
git add .
git commit -m "feat: add new feature"

# 6. Якщо pre-commit не пройде - виправити і спробувати ще раз
npm run check:fix
git add .
git commit -m "feat: add new feature"

# 7. Збірка перед push
npm run build

# 8. Push
git push origin feature/my-feature
```

## Корисні Посилання

- [ESLint Документація](https://eslint.org)
- [Prettier Документація](https://prettier.io)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Husky Документація](https://typicode.github.io/husky)
- [React ESLint Plugin](https://github.com/jsx-eslint/eslint-plugin-react)
- [TypeScript ESLint](https://typescript-eslint.io)

---

**Версія**: 1.0
**Остання оновлення**: 22.03.2026
