# Діаграми для бакалаврської роботи

## Estructura папки

```
diagrams/
├── 01-component-diagram.puml         # Component diagram (PlantUML)
├── 02-bpmn-process.puml              # BPMN process diagram (PlantUML)
├── 03-er-diagram.mmd                 # ER diagram (Mermaid)
├── 04-deployment-diagram.puml        # Deployment diagram (PlantUML)
├── 04-er-diagram-graphviz.dot        # ER diagram (Graphviz)
└── README.md                          # This file
```

## Як використовувати діаграми

### Опція 1: PlantUML (`.puml` файли)

**Інструменти:**

- [PlantUML Online Editor](http://www.plantuml.com/plantuml/uml/)
- [VS Code Extension](https://marketplace.visualstudio.com/items?itemName=jebbs.plantuml)
- [IntelliJ IDEA Plugin](https://plugins.jetbrains.com/plugin/7017-plantuml-integration)

**Як використовувати:**

1. Скопіюйте вміст `.puml` файлу
2. Вставте в PlantUML Editor
3. Натисніть "Render" або "Export" для отримання SVG/PNG

**Переваги:**

- Вбудована підтримка UML нотації
- Детальне форматування
- Добре експортується у PDF

### Опція 2: Mermaid (`.mmd` файли)

**Інструменти:**

- [Mermaid Live Editor](https://mermaid.live/)
- [VS Code with Markdown Preview Mermaid Support](https://github.com/mermaid-js/mermaid-cli)
- [GitHub Markdown (вбудована підтримка)](https://github.blog/2022-02-14-include-diagrams-mermaid-markdown/)

**Як використовувати:**

1. Скопіюйте вміст `.mmd` файлу
2. Вставте в Mermaid Live Editor або в Markdown
3. Натисніть експортувати для SVG/PNG

**Переваги:**

- Простий синтаксис
- Вбудована підтримка в GitHub
- Легко комбінувати з Markdown документами

### Опція 3: Graphviz (`.dot` файли)

**Інструменти:**

- [Graphviz Online Viewer](http://www.webgraphviz.com/)
- [Graphviz Desktop Application](https://graphviz.org/download/)
- [VS Code Extension](https://marketplace.visualstudio.com/items?itemName=EricSjoberg.vscode-graphviz)

**Як використовувати:**

```bash
# Локально (якщо встановлено Graphviz)
dot -Tsvg 04-er-diagram-graphviz.dot -o output.svg
dot -Tpng 04-er-diagram-graphviz.dot -o output.png
```

**Переваги:**

- Потужна для complex графів
- Автоматичне розташування вузлів
- Різноманітні вихідні формати

## Опис діаграм

### 1. Component Diagram (01-component-diagram.puml)

- **Тип:** Структурна діаграма (UML)
- **Мета:** Показати архітектуру системи та компоненти
- **Компоненти:**
  - Client Layer: Telegram App, Web Landing
  - API Layer: Bot Server, REST API
  - Business Logic: Auth, Test, Result Services
  - Data Layer: PostgreSQL, Redis

### 2. BPMN Process (02-bpmn-process.puml)

- **Тип:** Діаграма бізнес-процесу
- **Мета:** Показати потік тестування від запуску бота до отримання результату
- **Процес:**
  1. Користувач запускає бота
  2. Вибирає тест або переглядає результати
  3. Отримує питання послідовно
  4. Відповідає на кожне питання
  5. Отримує результат

### 3. ER Diagram (03-er-diagram.mmd)

- **Тип:** Діаграма даних (ER-модель)
- **Мета:** Показати структуру БД та зв'язки між таблицями
- **Сутності:** Users, Tests, Questions, AnswerOptions, TestAttempts, UserAnswers

### 4. Deployment Diagram (04-deployment-diagram.puml)

- **Тип:** Структурна діаграма розгортання (UML)
- **Мета:** Показати розташування компонентів на серверах/контейнерах
- **Вузли:** Client Devices, Docker Cluster, Database Server, Cache Server, Storage, Load Balancer

### 5. ER Diagram (Graphviz) (04-er-diagram-graphviz.dot)

- **Тип:** Діаграма даних (Graphviz)
- **Мета:** Альтернативне представлення ER-моделі
- **Формат:** Dot language для Graphviz

## Експорт діаграм

### Експорт з PlantUML

```bash
# Встановити PlantUML
brew install plantuml

# Експортувати в PNG
plantuml -Tpng 01-component-diagram.puml

# Експортувати в SVG
plantuml -Tsvg 01-component-diagram.puml

# Експортувати в PDF
plantuml -Tpdf 01-component-diagram.puml
```

### Експорт з Mermaid

```bash
# Встановити mermaid-cli
npm install -g @mermaid-js/mermaid-cli

# Експортувати в PNG
mmdc -i 03-er-diagram.mmd -o 03-er-diagram.png

# Експортувати в SVG
mmdc -i 03-er-diagram.mmd -o 03-er-diagram.svg

# Експортувати в PDF
mmdc -i 03-er-diagram.mmd -o 03-er-diagram.pdf
```

### Експорт з Graphviz

```bash
# Встановити Graphviz
brew install graphviz

# Експортувати в SVG
dot -Tsvg 04-er-diagram-graphviz.dot -o 04-er-diagram-graphviz.svg
```

## Рекомендації по використанню

### Для документації:

- Використовуйте **Mermaid** - легко інтегрується в Markdown
- Приклад:

````markdown
```mermaid
[вміст файлу]
```
````

```

### Для презентацій:
- Експортуйте в **SVG** або **PNG** з PlantUML
- Можна редагувати в Figma чи Inkscape після експорту

### Для технічної документації:
- Використовуйте **PlantUML** - професійніша якість
- Експортуйте в **PDF** для друку

### Для веб-сайтів:
- Будь-який формат в SVG або PNG
- Рекомендується SVG для масштабованості

## Посилання на онлайн-редактори

- PlantUML Online: http://www.plantuml.com/plantuml/uml/
- Mermaid Live: https://mermaid.live/
- Graphviz Online: http://www.webgraphviz.com/
- Draw.io: https://draw.io/

## Редагування діаграм

### Найменування конвенцій

Для розширення функціоналу додайте нові диаграми з номерацією:
```

05-sequence-diagram.puml # Sequence diagram
06-activity-diagram.puml # Activity diagram
07-use-case-diagram.puml # Use case diagram
08-class-diagram.puml # Class diagram

```

### Версіонування

При зміні діаграм:
1. Збережіть в Git з описовим commit message
2. Приклад: `docs: update component diagram for new microservice`

## Стандарти оформлення

### PlantUML нотація
- Використовуйте українські назви де можливо
- Додавайте описи для складних частин
- Форматуйте для нормальної читаності

### Mermaid нотація
- Дотримуйтесь простого синтаксису
- Уникайте перевантажених діаграм
- Використовуйте коротки назви

### Graphviz нотація
- Укладіть граф зліва направо (rankdir=LR)
- Додайте кольорування для відрізнення типів
- Дотримуйтесь іменування вузлів

## Проблеми та рішення

### PlantUML не рендерується
- Перевірте синтаксис
- Скористайтесь онлайн-редактором для отримання помилок
- Оновіть PlantUML версію

### Mermaid діаграма дуже велика
- Розділіть на кілька менших діаграм
- Зменшіть кількість вузлів
- Використовуйте піддіаграми (subgraphs)

### Graphviz видає криву топологію
- Додайте `rank` constraints
- Використовуйте `rankdir` для орієнтації
- Експериментуйте з `layout` командою

## Автор та licencия

- **Автор:** Бакалаврська робота ТППЗ
- **Дата:** 2026-03-24
- **Проект:** Інформаційна система тестування знань на базі чат-бота Telegram
- **Ліцензія:** MIT

---

**Посилання на основний документ:** `../DIAGRAMS_ASSIGNMENT.md`
```
