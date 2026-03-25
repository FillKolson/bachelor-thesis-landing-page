const STRINGS = {
  uk: {
    'errors.fatal.title': 'Сталася непередбачена помилка',
    'errors.fatal.message':
      'Ми зафіксували помилку та зберегли технічні деталі. Будь ласка, спробуйте ще раз або повідомте `errorId`, щоб ми могли швидше допомогти.',
    'errors.notFound.title': 'Сторінку не знайдено',
    'errors.notFound.message':
      'Можливо, посилання некоректне або сторінка була видалена. Перейдіть на головну.',
    'errors.report.title': 'Повідомити про проблему',
    'errors.report.reproduction': 'Кроки для відтворення',
    'errors.report.reproductionPlaceholder': 'Опишіть, що саме ви робили до помилки...',
    'errors.report.systemInfo': 'Системна інформація',
    'errors.report.copyTech': 'Скопіювати технічні дані',
    'errors.report.download': 'Завантажити звіт',
    'errors.report.submitted': 'Звіт сформовано. Якщо потрібно — надішліть файл підтримці.',
    'errors.report.copyOk': 'Технічні дані скопійовано.',
    'errors.report.copyFail': 'Не вдалося скопіювати технічні дані.',
    'errors.actions.goHome': 'Перейти на головну',
  },
};

/**
 * Detects UI language (best-effort).
 *
 * @returns {'uk'}
 */
export function detectLanguage() {
  const lang = (navigator.language || 'uk').toLowerCase();
  if (lang.startsWith('uk')) {
    return 'uk';
  }
  return 'uk';
}

/**
 * Localized string lookup.
 *
 * @param {string} key
 * @returns {string}
 */
export function t(key) {
  const lang = detectLanguage();
  const value = STRINGS[lang][key];
  return value || key;
}
