# Розгортання у виробничому середовищі

## 1. Огляд проєкту

Це фронтенд проєкт на React + Vite. Ідеально розгортати як статичний сайт (NGINX, S3+CloudFront, Netlify, Vercel).

## 2. Вимоги до апаратного забезпечення

- CPU: мінімум 1vCPU, рекомендовано 2vCPU
- RAM: мінімум 1 GB, рекомендовано 2 GB
- Диск: мінімум 5 GB, рекомендовано 20 GB

## 3. Необхідне програмне забезпечення

- Node.js 18+ (для збірки)
- npm 9+ або yarn
- nginx або веб сервер (Caddy, Apache)
- Git
- Docker (опціонально)

## 4. Налаштування мережі

- HTTPS з сертифікатом (Let's Encrypt / ACME)
- 80 та 443 порти відкриті
- DNS: `A`/`CNAME` на IP/Hosting

## 5. Конфігурація серверів

- Встановити OS (Ubuntu 22.04, Debian 12, CentOS 9)
- Створити користувача `deploy`
- Налаштувати Firewall (ufw):
  - `ufw allow OpenSSH`
  - `ufw allow http`
  - `ufw allow https`

## 6. Розгортання коду

1. Клонування:
   - `git clone https://github.com/<org>/<repo>.git`
   - `cd Project`
2. Встановлення залежностей:
   - `npm ci`
3. Збірка:
   - `npm run build`
4. Розгортання і файлів:
   - копіювати `dist/` у `/var/www/project` (або у bucket)
5. Настроювання nginx:
   ```nginx
   server {
     listen 80;
     server_name example.com;
     root /var/www/project;
     index index.html;
     location / {
       try_files $uri $uri/ /index.html;
     }
   }
   ```
6. Перезапуск nginx:
   - `sudo systemctl reload nginx`

## 7. Перевірка працездатності

- Відкрити браузер на `https://example.com`
- Перевірити 200 OK
- Тестування через `curl -I https://example.com`
- Перевірити логі `nginx` та network tab
- Перевірити, що SPA коректно працює на deep links

## 8. Моніторинг (опціонально)

- Використовувати Prometheus+Grafana, ELK, Logrotate
- Перевірка доступності через UptimeRobot
