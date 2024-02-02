FROM php:8.1-fpm-alpine

WORKDIR /var/www/html

RUN apk add --no-cache nginx supervisor wget nodejs npm

RUN docker-php-ext-install pdo pdo_mysql

RUN mkdir -p /run/nginx
COPY docker/nginx.conf /etc/nginx/nginx.conf

COPY . /var/www/html

RUN sh -c "wget http://getcomposer.org/composer.phar && chmod a+x composer.phar && mv composer.phar /usr/local/bin/composer"

RUN /usr/local/bin/composer install --no-dev

COPY ./package.json /var/www/html
COPY ./package-lock.json /var/www/html

RUN npm install

RUN npm run build

RUN chown -R www-data: /var/www/html

CMD sh /var/www/html/docker/startup.sh
