#!/usr/bin/env bash
set -euo pipefail

# Базове резервне копіювання статичного сайту та конфігів nginx.
BACKUP_DIR=/backups
DATE=$(date +%F_%H%M)
SRC_DIR=$(pwd)

mkdir -p "$BACKUP_DIR"

echo "Резервне копіювання коду..."
tar czf "$BACKUP_DIR/project-code-$DATE.tar.gz" "$SRC_DIR"

# Стандартний шлях для nginx config, якщо є
if [ -d "/etc/nginx" ]; then
  echo "Резервне копіювання nginx..."
  tar czf "$BACKUP_DIR/nginx-config-$DATE.tar.gz" /etc/nginx
fi

echo "Backup завершено: $BACKUP_DIR"