create-project:
	composer require laravel/sail --dev
	@make init
up:
	./vendor/bin/sail up -d
build:
	./vendor/bin/sail build --no-cache
stop:
	./vendor/bin/sail stop
restart:
	./vendor/bin/sail restart
install:
	php artisan sail:install
route:
	./vendor/bin/sail artisan route:list
tinker:
	./vendor/bin/sail artisan tinker
init:
	@make build
	@make up
	docker compose exec laravel.test cp .env.example .env
	./vendor/bin/sail artisan key:generate
	./vendor/bin/sail artisan storage:link
	docker compose exec laravel.test chmod -R 777 storage bootstrap/cache
	@make npm-install
	@make fresh
remake:
	@make destroy
	@make init
migrate:
	./vendor/bin/sail artisan migrate
migrate-rollback:
	./vendor/bin/sail artisan migrate:rollback
fresh:
	./vendor/bin/sail artisan migrate:fresh --seed
fresh-testing:
	./vendor/bin/sail artisan migrate:fresh --seed --env=testing
shell:
	./vendor/bin/sail shell
root-shell:
	./vendor/bin/sail root-shell
destroy:
	docker compose down --rmi all --volumes --remove-orphans
destroy-volumes:
	docker compose down --volumes --remove-orphans
logs-watch:
	docker compose logs --follow
route:
	./vendor/bin/sail artisan route:list
route-cache:
	./vendor/bin/sail artisan route:cache
npm-install:
	./vendor/bin/sail npm install
dump-autoload:
	./vendor/bin/sail composer dump-autoload
composer-install:
	./vendor/bin/sail composer install
composer-install2:
	docker compose exec laravel.test composer install
optimize:
	./vendor/bin/sail artisan optimize
optimize-clear:
	./vendor/bin/sail artisan optimize:clear
cache:
	./vendor/bin/sail composer dump-autoload -o
	@make optimize
	./vendor/bin/sail artisan event:cache
	./vendor/bin/sail artisan view:cache
cache-testing:
	./vendor/bin/sail artisan config:cache --env=testing
	./vendor/bin/sail artisan event:cache --env=testing
	./vendor/bin/sail artisan view:cache --env=testing
cache-clear:
	docker compose exec laravel.test composer clear-cache
	@make optimize-clear
	docker compose exec laravel.test php artisan event:clear
config-cache:
	./vendor/bin/sail artisan config:cache
ps:
	docker compose ps
run-dev:
	./vendor/bin/sail npm run dev
redis:
	docker compose exec redis redis-cli
db:
	docker compose exec mysql bash
sql:
	docker compose exec mysql bash -c 'mysql -u $$MYSQL_USER -p$$MYSQL_PASSWORD $$MYSQL_DATABASE'
swagger:
	docker compose exec laravel.test php artisan l5-swagger:generate
shell:
	./vendor/bin/sail root-shell
tbls:
	tbls out -t xlsx -o dbdoc/schema.xlsx && tbls out -t svg -o dbdoc/er.svg
test:
	./vendor/bin/sail test --stop-on-failure --env=testing 
seed:
	./vendor/bin/sail artisan db:seed
ts-test:
	./vendor/bin/sail npm run test
redoc:
	redoc-cli bundle  swagger.json
