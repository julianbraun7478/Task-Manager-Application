<?php
// backend/routes/api.php
use App\Http\Controllers\TaskController;
use Illuminate\Support\Facades\Route;

// Define API routes for tasks
Route::get('/tasks', [TaskController::class, 'index']); // Get all tasks
Route::post('/tasks', [TaskController::class, 'store']); // Create task
Route::get('/tasks/{task}', [TaskController::class, 'show']); // Get single task
Route::put('/tasks/{task}', [TaskController::class, 'update']); // Update task
Route::delete('/tasks/{task}', [TaskController::class, 'destroy']); // Delete task
