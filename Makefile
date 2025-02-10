migrate:
	docker compose exec -it backend-app php artisan migrate

rollback:
	docker compose exec -it backend-app php artisan migrate:rollback

seed:
	docker compose exec -it backend-app php artisan db:seed

optimize:
	docker compose exec -it backend-app php artisan optimize

