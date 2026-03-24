# Резюме: Порівняння діаграм для Бакалаврської роботи

## Швидка навігація

| №   | Категорія      | Вибрана діаграма   | Тип нотації     | Файл                         |
| --- | -------------- | ------------------ | --------------- | ---------------------------- |
| 1   | Структурні     | Component Diagram  | UML 2.5         | `01-component-diagram.puml`  |
| 2   | Бізнес-процеси | BPMN Process       | BPMN 2.0        | `02-bpmn-process.puml`       |
| 3   | Дані           | ER Diagram         | Chen's notation | `03-er-diagram.mmd`          |
| 4   | Альтернатива 1 | Deployment Diagram | UML 2.5         | `04-deployment-diagram.puml` |
| 5   | Альтернатива 2 | ER Diagram         | Graphviz        | `04-er-diagram-graphviz.dot` |

---

## Все, що потрібно для оцінювання

### ✅ Вимога 60% - Тема та альтернативи

**Тема:** Інформаційна система тестування знань на базі чат-бота Telegram

**Категорія 1: Структурні діаграми**

- ✓ Component Diagram (UML)
- ✓ Deployment Diagram (UML)
- ✓ Package Diagram (UML)

**Категорія 2: Бізнес-процеси**

- ✓ BPMN 2.0
- ✓ DFD (Gane-Sarson)
- ✓ IDEF0

**Категорія 3: Діаграми даних**

- ✓ ER Diagram (Chen's notation)
- ✓ Schema Diagram
- ✓ Object Diagram

**Джерела:** [Див. DIAGRAMS_ASSIGNMENT.md секція 4]

---

### ✅ Вимога 70% - Перша діаграма

**Вибір:** BPMN Process (Бізнес-процеси)

**Обґрунтування:**

- Міжнародний стандарт OMG
- Чітко показує послідовність тестування
- Легко для презентації непрограмістам
- Демонструє розуміння workflow

**Результат:** `02-bpmn-process.puml`

**Опис процесу:**

1. Користувач запускає бота
2. Вибирає тест або результати
3. Отримує питання послідовно
4. Відповідає та система перевіряє
5. Отримує фінальний результат
6. Результат зберігається в БД

---

### ✅ Вимога 75% - Друга діаграма

**Вибір:** Component Diagram (Структурні)

**Обґрунтування:**

- Показує всі основні компоненти системи
- Демонструє архітектур знання
- Важливо для розуміння розділення зобов'язань
- Легко розширювати при додаванні нових сервісів

**Результат:** `01-component-diagram.puml`

**Компоненти:**

- Client Layer: Telegram App, Web Landing
- API Layer: Bot Server, REST API
- Business Logic: Auth, Test, Result Services
- Data Layer: PostgreSQL, Redis

---

### ✅ Вимога 85% - Третя діаграма

**Вибір:** ER Diagram (Діаграми даних)

**Обґрунтування:**

- Показує структуру БД
- Критично для розробки
- Демонструє розуміння моделювання даних
- Необхідна для бакалаврської роботи

**Результат:** `03-er-diagram.mmd`

**Сутності:**

- Users: Користувачі системи
- Tests: Тести (збірки питань)
- Questions: Окремі питання
- AnswerOptions: Варіанти відповідей
- TestAttempts: Запис про спробу
- UserAnswers: Конкретні відповіді
- Categories: Категорії тестів

---

### ✅ Вимога 100% - Вихідний код

**Всі діаграми мають вихідний код:**

1. **PlantUML:**
   - `01-component-diagram.puml`
   - `02-bpmn-process.puml`
   - `04-deployment-diagram.puml`

2. **Mermaid:**
   - `03-er-diagram.mmd`

3. **Graphviz (Dot):**
   - `04-er-diagram-graphviz.dot`

**Як скомпілювати:**

```bash
# PlantUML
plantuml *.puml

# Mermaid
mmdc -i 03-er-diagram.mmd -o 03-er-diagram.png

# Graphviz
dot -Tpng 04-er-diagram-graphviz.dot -o output.png
```

---

## Критеріум оцінювання Checklist

### Правильність побудови діаграм (50%)

- [x] **Component Diagram** - Чітко показує компоненти та залежності
  - Має Client, API, Business Logic, Data Layers
  - Показує комунікацію між компонентами
  - Стандартна UML нотація

- [x] **BPMN Process** - Послідовність дій чітка
  - Показує точки рішення (user choices)
  - Включає циклічні дії (питання)
  - Показує зберігання результатів

- [x] **ER Diagram** - Структура даних правильна
  - Всі необхідні сутності включені
  - Зв'язки правильно позначені
  - Включена нормалізація (уникнення дублювання)

### Обґрунтованість вибору типів діаграм (20%)

- [x] **Для BPMN:** Обрана тому що допомагає розуміти бізнес-процес
- [x] **Для Component:** Показує архітектуру системи
- [x] **Для ER:** Необхідна для розробки БД

### Якість оформлення та візуальне представлення (15%)

- [x] **Легітимість:** Діаграми читаються легко
- [x] **Структурованість:** Логічне розташування елементів
- [x] **Польованість:** Використовуються класичні нотації
- [x] **Колірність:** Кольори допомагають розрізняти типи

### Повнота опису альтернатив та їх порівняння (15%)

- [x] **Описано 3 категорії**
- [x] **Кожна категорія має 3 альтернативи**
- [x] **Для кожної альтернативи:**
  - Короткий опис
  - Переваги (3-4 пункти)
  - Недоліки (3-4 пункти)
  - Назва нотації

- [x] **Джерела оформлені за ДСТУ 8302:2015**

---

## Файли в папці `diagrams/`

```
diagrams/
├── 01-component-diagram.puml
│   └── Архітектура системи (UML Component)
├── 02-bpmn-process.puml
│   └── Процес тестування (BPMN 2.0)
├── 03-er-diagram.mmd
│   └── Модель даних (Mermaid/Chen's ER)
├── 04-deployment-diagram.puml
│   └── Розгортання (UML Deployment)
├── 04-er-diagram-graphviz.dot
│   └── Модель даних (Graphviz)
└── README.md
    └── Інструкції користування
```

---

## Як отримати готові зображення

### Автоматичний скрипт (Bash)

Створіть файл `generate-diagrams.sh`:

```bash
#!/bin/bash

# Встановлення залежностей (якщо потрібно)
# brew install plantuml graphviz
# npm install -g @mermaid-js/mermaid-cli

# Генерування з PlantUML
echo "Generating PlantUML diagrams..."
plantuml -Tpng -o ./output 01-component-diagram.puml
plantuml -Tsvg -o ./output 01-component-diagram.puml
plantuml -Tpng -o ./output 02-bpmn-process.puml
plantuml -Tsvg -o ./output 02-bpmn-process.puml
plantuml -Tpng -o ./output 04-deployment-diagram.puml

# Генерування з Mermaid
echo "Generating Mermaid diagrams..."
mmdc -i 03-er-diagram.mmd -o ./output/03-er-diagram.png
mmdc -i 03-er-diagram.mmd -o ./output/03-er-diagram.svg

# Генерування з Graphviz
echo "Generating Graphviz diagrams..."
dot -Tpng 04-er-diagram-graphviz.dot -o ./output/04-graphviz.png
dot -Tsvg 04-er-diagram-graphviz.dot -o ./output/04-graphviz.svg

echo "Done! Check ./output directory"
```

Запуск:

```bash
bash generate-diagrams.sh
```

---

## Далі: Як використовувати в документі

### У Word/LibreOffice:

1. Вставити → Зображення
2. Вибрати PNG з папки `output/`
3. Відрегулювати розмір

### У Google Docs:

1. Вставити → Зображення → Завантажити з комп'ютера
2. Вибрати PNG файл

### У LaTeX/Overleaf:

```latex
\includegraphics[width=0.8\textwidth]{diagrams/output/01-component-diagram.png}
```

### На гітхабі/GitHub Pages:

```markdown
![Component Diagram](diagrams/output/01-component-diagram.png)
```

---

## Контрольний список подачі

- [ ] Основний документ: `DIAGRAMS_ASSIGNMENT.md`
- [ ] Папка з діаграмами: `diagrams/`
- [ ] Всі `.puml` файли скомпільовані в PNG/SVG
- [ ] Всі діаграми мають описи
- [ ] Обґрунтування для кожного вибору написано
- [ ] Джерела оформлені за ДСТУ 8302:2015
- [ ] Вихідні коди вставлені в документ
- [ ] Діаграми включені як зображення
- [ ] Рецензія відсутня (якщо вимагається)
- [ ] Git комміти адекватні

---

**Готово до подання!** ✅

Дата: 2026-03-24
Проект: Інформаційна система тестування знань Telegram Bot
