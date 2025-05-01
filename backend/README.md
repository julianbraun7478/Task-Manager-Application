# Task Manager Backend

A Laravel-based RESTful API for managing tasks, integrated with a Vue.js front-end.

## Setup

1. **Install Dependencies**:
   \`\`\`bash
   composer install
   \`\`\`

2. **Configure Environment**:
   \`\`\`bash
   cp .env.example .env
   \`\`\`
   - Update \`.env\` with MySQL credentials (e.g., \`DB_DATABASE=task_manager\`).
   - Generate app key:
     \`\`\`bash
     php artisan key:generate
     \`\`\`

3. **Run Migrations**:
   \`\`\`bash
   php artisan migrate
   \`\`\`

4. **Start Server**:
   \`\`\`bash
   php artisan serve
   \`\`\`

## API Documentation

The API is documented using Postman. To view or test the API:

1. **Import Postman Collection**:
   - Open Postman and import \`docs/TaskManagerAPI.postman_collection.json\`.
   - Set the \`baseUrl\` variable to \`http://localhost:8000/api\`.

2. **Endpoints**:
   - \`GET /api/tasks\`: Retrieve all tasks.
   - \`POST /api/tasks\`: Create a task.
   - \`GET /api/tasks/{task}\`: Retrieve a single task.
   - \`PUT /api/tasks/{task}\`: Update a task.
   - \`DELETE /api/tasks/{task}\`: Delete a task.

3. **Details**:
   - The collection includes descriptions, example requests, responses, and error cases (422, 404, 500).
   - Validation: Title (2-255 chars), description (required), is_completed (optional boolean).

## Notes
- API routes are defined in \`routes/api.php\` to bypass CSRF protection.
- Run tests with \`php artisan test\`.

## Testing
- Use Postman to test endpoints.
- Run unit/feature tests: \`php artisan test\`.
- Verify data persistence in MySQL (\`select * from tasks;\`).
- Check logs in \`storage/logs/laravel.log\` for errors.
