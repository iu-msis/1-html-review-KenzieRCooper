FROM php:7.4-apache

LABEL maintainer="Mackenzie Cooper"

RUN docker-php-ext-install pdo_mysql

COPY docker/apache/vhost.conf /etc/apache2/sites-available/000-default.conf

COPY docker/php/php.ini /usr/local/etc/php/php.ini

COPY app /srv/app

WORKDIR /srv/app