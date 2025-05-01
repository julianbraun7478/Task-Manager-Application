<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class TaskTest extends TestCase {
    /**
    * A basic feature test example.
    */
    // Test creating a task

    public function test_can_create_task() {
        $response = $this->postJson( '/api/tasks', [
            'title' => 'Test Task',
            'description' => 'Test Description',
            'is_completed' => false
        ] );

        return $response;
    }
}
