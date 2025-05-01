<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use HasFactory;

    // Define fillable fields for mass assignment
    protected $fillable = [
        'title',
        'description',
        'is_completed'
    ];

    // Cast is_completed to boolean
    protected $casts = [
        'is_completed' => 'boolean'
    ];
}
