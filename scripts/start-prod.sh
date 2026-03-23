#!/usr/bin/env bash
set -euo pipefail

# Збирає проєкт та запускає локальний preview
cd "$(dirname "${BASH_SOURCE[0]}")/.."

echo "Збираємо проєкт..."
npm ci
npm run build

echo "Запуск preview..."
npm run preview
