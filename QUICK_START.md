# 🎯 QUICK START - ЛІНТИНГ І СТАТИЧНИЙ АНАЛІЗ

## ⚡ За 30 секунд

```bash
# Перевірити код
npm run check

# Виправити проблеми
npm run check:fix

# Собрати проект (з перевірками)
npm run build
```

## 📚 Документація (прочитайте в такому порядку)

1. **LINTING_SETUP.md** - Швидкий старт (5 хв читання)
2. **docs/linting.md** - Повна документація (20 хв читання)
3. **LINTING_REPORT.md** - Детальний звіт (10 хв читання)

## 📋 Всі команди

```bash
# Розробка
npm run dev                # Dev сервер (Vite)
npm run build              # Build з перевірками
npm run preview            # Preview на localhost

# Лінтинг (читай тільки)
npm run lint               # ESLint перевірка
npm run format:check       # Prettier перевірка
npm run type-check         # TypeScript перевірка
npm run check              # ВСІ перевірки

# Лінтинг (виправлення)
npm run lint:fix           # ESLint виправлення
npm run format             # Prettier виправлення
npm run check:fix          # ВСІ виправлення

# Скрипти
./check.sh                 # Комплексна перевірка
```

## 🛠️ Налаштовані інструменти

| Інструмент | Версія | Для чого       |
| ---------- | ------ | -------------- |
| ESLint     | 9.39   | Качество кода  |
| Prettier   | 3.8    | Форматирование |
| TypeScript | 5.9    | Типизация      |
| Husky      | 9.1    | Git hooks      |

## 🔐 Git hooks

Pre-commit hook **автоматично** запускає `npm run check` перед кожним коммітом:

```bash
git commit -m "change"
# → автоматич запуститься npm run check
# → якщо FAILED → коміт блокується
# → якщо PASSED → коміт виконується
```

## ✅ Поточний статус

```
✓ ESLint: 0 errors, 0 warnings
✓ Prettier: All files formatted
✓ TypeScript: No type errors
✓ Git hooks: Active
✓ Build: Integrated
```

## 🚨 Якщо щось не працює

### ESLint виявив помилки

```bash
npm run lint:fix
```

### Prettier виявив проблеми форматування

```bash
npm run format
```

### TypeScript виявив помилки типів

```bash
npm run type-check      # Для перегляду
# Вручну виправте файли
```

### Pre-commit hook блокує коміт

```bash
npm run check:fix       # Виправити все
git add .              # Додати виправлення
git commit -m "fix"    # Спробувати знову
```

## 📖 Файлові структури

```
Project/
├── src/                    # Вихідний код
├── docs/
│   └── linting.md         # 📚 ПОВНА ДОКУМЕНТАЦІЯ
├── .husky/
│   └── pre-commit         # Pre-commit hook
├── tsconfig.json          # TS конфіг
├── eslint.config.js       # ESLint конфіг
├── .prettierrc.json       # Prettier конфіг
├── package.json           # NPM конфіг + скрипти
├── LINTING_REPORT.md      # 📊 Звіт про результати
├── LINTING_SETUP.md       # ⚡ Швидкий старт
└── check.sh               # 🔍 Скрипт перевірки
```

## 🎯 Основні моменти

✅ **Автоматична перевірка перед коммітом**

- Pre-commit hook запускає all checks
- Коміт блокується якщо щось не пройти

✅ **Автоматична перевірка перед сборкою**

- `npm run build` запускає `npm run check` спочатку
- Build не випускається якщо перевірки не пройти

✅ **Статична типізація**

- TypeScript strict mode включено
- Всі файли проверяются на типы

✅ **Єдиний вхідний пункт**

- `npm run check` - робить ВСЕ
- `npm run check:fix` - виправляє ВСЕ

## 💡 Совіти

1. **До початку роботи:**

   ```bash
   npm install        # Переконатись залежності встановлені
   npm run check      # Перевірити что wszystko OK
   ```

2. **Під час розробки:**

   ```bash
   npm run dev        # Запустити dev сервер
   npm run check:fix  # Час від часу виправити проблеми
   ```

3. **Перед коммітом:**

   ```bash
   npm run check:fix  # Виправити все
   git add .
   git commit -m "..."  # Hook запустится автоматically
   ```

4. **Перед сборкою:**
   ```bash
   npm run build      # Запустить all checks + build
   ```

## 📞 Потрібна допомога?

1. **docs/linting.md** - Повна документація для всіх інструментів
2. **LINTING_REPORT.md** - Детальний звіт про налаштування
3. **LINTING_SETUP.md** - Решение проблем и FAQ

---

**Версія**: 1.0
**Статус**: ✅ Все готово
**Дата**: 22.03.2026
