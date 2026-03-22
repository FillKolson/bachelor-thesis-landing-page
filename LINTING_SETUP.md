# Настройка Лінтинга Проекту

## 🚀 Быстрый старт

### Проверить код:

```bash
npm run check
```

### Исправить проблемы:

```bash
npm run check:fix
```

## 📋 Доступные команды

### Типов проверки

| Команда                | Описание                   | Исправляет |
| ---------------------- | -------------------------- | ---------- |
| `npm run lint`         | Проверка ESLint            | ❌         |
| `npm run lint:fix`     | Исправление ESLint         | ✅         |
| `npm run format:check` | Проверка Prettier          | ❌         |
| `npm run format`       | Исправление Prettier       | ✅         |
| `npm run type-check`   | Проверка TypeScript        | ❌         |
| `npm run check`        | Все проверки               | ❌         |
| `npm run check:fix`    | Все проверки + исправления | ✅         |

### Сборка и разработка

```bash
npm run dev              # Запустить дев сервер
npm run build            # Собрать проект (с проверками)
npm run preview          # Preview собранного проекта
```

## 🎯 Что проверяется

### ESLint (Лінтинг)

- ✅ Качество кода (best practices)
- ✅ Безопасность (no eval, debugger и т.д.)
- ✅ Стиль кода (скобки, переводы строк)
- ✅ React правила (хуки, пропсы)

### Prettier (Форматирование)

- ✅ Правильные отступы
- ✅ Одинарные кавычки
- ✅ Длина строк
- ✅ Расширение строк

### TypeScript (Типизация)

- ✅ Типы переменных
- ✅ Типы функций
- ✅ JSX типы
- ✅ Import типов

## 🔧 Конфигурационные файлы

- `eslint.config.js` - Правила ESLint
- `.prettierrc.json` - Правила Prettier
- `tsconfig.json` - Конфіг TypeScript
- `.husky/pre-commit` - Git hook для pre-commit

## 📖 Дополнительная информация

Полную документацию смотри в `docs/linting.md`

## 🆘 Проблеми и решения

### Проблема: ESLint ошибки

```bash
# Решение:
npm run lint:fix
```

### Проблема: Prettier ошибки форматирования

```bash
# Решение:
npm run format
```

### Проблема: TypeScript ошибки типов

```bash
# Решение: Нужно исправить вручную
npm run type-check  # Для просмотра ошибок
```

### Проблема: Pre-commit hook блокирует коммит

```bash
# Решение:
npm run check:fix   # Исправить все проблемы
git add .          # Добавить исправления
git commit -m "..."  # Попробовать еще раз
```

## 📚 Документация

- [ESLint](https://eslint.org)
- [Prettier](https://prettier.io)
- [TypeScript](https://www.typescriptlang.org)
- [Husky](https://typicode.github.io/husky)
- [React ESLint](https://github.com/jsx-eslint/eslint-plugin-react)

---

**Версия**: 1.0
**Статус**: ✅ Готово
