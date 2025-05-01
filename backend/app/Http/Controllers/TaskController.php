<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use App\Models\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    // Get all tasks
    public function index()
    {
        return response()->json(Task::all()); // Return all tasks as JSON
    }

    // Create a new task
    public function store(StoreTaskRequest $request)
    {
        try {
            $task = Task::create($request->validated()); // Create task with validated data
            return response()->json($task, 201); // Return created task with 201 status
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to create task'], 500); // Handle errors
        }
    }

    // Get a single task
    public function show(Task $task)
    {
        return response()->json($task); // Return task as JSON
    }

    // Update a task
    public function update(UpdateTaskRequest $request, Task $task)
    {
        try {
            $task->update($request->validated()); // Update task with validated data
            return response()->json($task); // Return updated task
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to update task'], 500); // Handle errors
        }
    }

    // Delete a task
    public function destroy(Task $task)
    {
        try {
            $task->delete(); // Delete the task
            return response()->json(null, 204); // Return 204 No Content
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to delete task'], 500); // Handle errors
        }
    }
}
