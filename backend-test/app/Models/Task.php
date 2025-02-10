<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use App\Models\Quest;

class Task extends Model
{
    /** @use HasFactory<\Database\Factories\TaskFactory> */
    use HasFactory;

    protected $fillable = [
        'task_number',
    ];

    public function answerOptions() {
        return $this->hasMany(AnswerOption::class, 'task_id', 'id');
    }

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
