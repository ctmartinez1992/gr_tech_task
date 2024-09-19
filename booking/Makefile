include .env
export

createsuperuser:
	python manage.py createsuperuser

makemigrations:
	python manage.py makemigrations

migrate:
	python manage.py migrate --database default

showmigrations:
	python manage.py showmigrations

runserver:
	python manage.py runserver 0.0.0.0:8020

shell:
	python manage.py shell_plus

stop:
	docker compose down

start:
	docker compose down
	docker compose up -d

clean:
	find . -name '*.py[co]' -delete
	find . -name '__pycache__'  -exec rm -r '{}' \;

seed_flats:
	python manage.py seed_flats

seed_bookings:
	python manage.py seed_bookings
