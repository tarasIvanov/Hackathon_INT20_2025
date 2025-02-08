# Використовуємо офіційний образ PHP з вбудованим Apache
FROM php:8.2-apache

# Встановлення необхідних залежностей
RUN apt-get update && apt-get install -y \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    zip \
    unzip \
    git \
    curl \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install gd pdo pdo_mysql

# Встановлюємо Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Встановлюємо робочий каталог
WORKDIR /var/www/html

# Копіюємо файли проєкту
COPY . .

# Встановлюємо права на збереження кешу та логів
RUN chown -R www-data:www-data storage bootstrap/cache \
    && chmod -R 775 storage bootstrap/cache

# Встановлюємо залежності Laravel
RUN composer install --no-dev --optimize-autoloader

# Налаштовуємо Apache
RUN a2enmod rewrite
COPY docker/apache.conf /etc/apache2/sites-available/000-default.conf

# Відкриваємо порт
EXPOSE 80

# Запускаємо Apache
CMD ["apache2-foreground"]
