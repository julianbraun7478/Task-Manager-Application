# Task-Manager-Application
Create a simple web-based task manager application that allows users to add, edit, and delete tasks. The application should have both front-end and back-end components.

# Task Manager Application

A web-based task manager application built with Vue.js (frontend) and Laravel (backend).

## Prerequisites
- PHP >= 8.0
- Composer
- Node.js >= 16
- MySQL
- Laravel Valet (optional for local development)

## Setup Instructions

1. Clone the repository
```bash
git clone <repository-url>
```

2. Backend Setup
```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
# Configure .env with your database credentials
php artisan migrate
php artisan serve
```

3. Frontend Setup
```bash
cd frontend
npm install
npm install axios
npm run dev
```

4. Access the application at `http://localhost:5173`

## Running Tests
```bash
cd backend
php artisan test
```

## API Documentation
API documentation is available in the Postman collection file: `task-manager-api.postman_collection.json`

## Project Structure
- `backend/`: Laravel backend application
- `frontend/`: Vue.js frontend application
