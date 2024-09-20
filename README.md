# Install

## Set up env and install packages

* uv venv --python 3.12.6
* source .venv/bin/activate
* uv sync

## Launch backend

* cd booking
* make start
* make migrate
* make seed_flats (Optional: creates multiple Flat objects in the database with bookings)
* make seed_bookings (Optional: creates multiple Booking objects in the database)
* make createsuperuser (Optional: creates a superuser to access the admin page)
* make runserver

Access 0.0.0.0:8200/admin for the admin page.
Access 0.0.0.0:8200/api/bookings for the endpoint.

## Launch frontend

* cd frontend
* npm install
* npm run dev

Access 0.0.0.0:3000 for the frontend bookings page.
