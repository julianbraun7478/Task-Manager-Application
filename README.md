# Task Manager Application

A web-based task manager application built with Vue.js (frontend) and Laravel (backend), allowing users to add, edit, delete, and mark tasks as complete.

## Prerequisites
- PHP >= 8.0
- Composer
- Node.js >= 16
- MySQL
- Laravel Valet (optional for local development)
- TypeScript (for frontend)

## Setup Instructions

1. **Clone the repository**
```bash
git clone <repository-url>
cd task-manager
```

2. **Backend Setup**
```bash
cd backend
composer install
cp .env.example .env
# Configure .env with your MySQL database credentials (DB_DATABASE, DB_USERNAME, DB_PASSWORD)
php artisan key:generate
php artisan migrate
php artisan serve
```

3. **Frontend Setup**
```bash
cd frontend
npm install
npm run dev
```

4. **Access the Application**
- Open `http://localhost:5173` in your browser.

## Running Tests
```bash
cd backend
php artisan test
```

## API Documentation
- Import `doc/TaskManagerAPI.postman_collection.json` into Postman to explore API endpoints.
- Base URL: `http://localhost:8000/api`
- Endpoints: GET/POST/PUT/DELETE tasks.

## Project Structure
- `backend/`: Laravel backend application
  - `app/Http/Controllers/TaskController.php`: API logic
  - `app/Models/Task.php`: Task model
  - `database/migrations/`: Database schema
  - `tests/Feature/TaskControllerTest.php`: Unit tests
- `frontend/`: Vue.js frontend application
  - `src/App.vue`: Root component
  - `src/components/`: Reusable components (`TaskList.vue`, `TaskItem.vue`, `TaskModal.vue`, `DeleteModal.vue`)
  - `src/composables/`: Logic modules (`useTasks.ts`, `useTruncation.ts`)
  - `src/constants/`: Constants (`api.ts`, `toast.ts`)
  - `src/index.css`: Tailwind CSS
  - `src/main.js`: Vue app setup with Vue3-Toastify
- `doc/TaskManagerAPI.postman_collection.json`: API documentation

## Features
- **Frontend**:
  - Displays tasks with titles, descriptions, and completion status.
  - Supports adding, editing, deleting, and marking tasks as complete.
  - Shows "more"/"less" links for descriptions exceeding two lines.
  - Displays error, success, and info messages using toast notifications (Vue3-Toastify).
  - Responsive design with Tailwind CSS v4.
  - Client-side validation for task forms.
  - Written in TypeScript with Composition API for type safety and modularity.
- **Backend**:
  - RESTful API with CRUD operations.
  - MySQL storage with persistent data.
  - Validation for task title and description.
  - Error handling with appropriate HTTP status codes.
  - Unit tests for all API endpoints.

