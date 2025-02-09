# Hackathon_INT20_2025


## Кроки розгортання

1. Клонуйте репозиторій:
git clone https://github.com/tarasIvanov/Hackathon_INT20_2025.git
 та перейдіть у потрібну папку
cd Hackaton_INT20_2025

2. Налаштуйте файл .env в директорії backend/ з потрібними налаштуваннями(приклад налаштувань - .env.example файл)

3. Збілдіть Docker образи та запустіть їх:
docker-compose up -d --build

4. Запустіть міграції:
docker-compose exec backend-app php artisan migrate:fresh


Перевірка роботи
API буде доступне за адресою: http://localhost:8010/api/v1
Для тестування API endpoints:
Реєстрація: POST /api/v1/register
Логін: POST /api/v1/login
Отримання профілю: GET /api/v1/user (потребує токен)
