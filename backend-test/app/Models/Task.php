<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use App\Models\Quest;

class Task extends Model
{
    /** @use HasFactory<\Database\Factories\TaskFactory> */
    use HasFactory;

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($task) {
            // Get the last task number for this quest_id
            $lastTaskNumber = self::where('quest_id', $task->quest_id)->max('task_number') ?? 0;

            // Increment for consistency
            $task->task_number = $lastTaskNumber + 1;
        });
    }
}
