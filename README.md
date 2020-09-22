# Instruction For Running
This application is build on React+Redux in TypeScript with PHP+Laravel for the backend. The following steps should be taken to run the application.

## Inside the `curology_server` directory:
* Ensure PHP 7.3+ is installed
* Install composer dependencies
* Update the `.env` directory with Database credentials and an empty MySQL database]
* Run Laravel Migrations (`php artisan migrate`)
* Run the Laravel Server on port 8000 (`php artisan serve`)

## Inside the `curology_demo` directory:
* Install node modules via `yarn`
* Run the React implementation with `yarn start`
