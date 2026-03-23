#!/usr/bin/env bash
set -euo pipefail

# Запускає dev сервер (Vite)
cd "$(dirname "${BASH_SOURCE[0]}")/.."

echo "Запуск dev серверу..."
npm run dev
