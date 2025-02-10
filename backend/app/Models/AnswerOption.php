<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AnswerOption extends Model
{
    /** @use HasFactory<\Database\Factories\AnswerOptionFactory> */
    use HasFactory;

    protected $fillable = [
        'option_number'
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($answerOption) {
            // Get the last task number for this quest_id
            $lastOptionNumber = self::where('task_id', $answerOption->task_id)->max('option_number') ?? 0;

            // Increment for consistency
            $answerOption->option_number = $lastOptionNumber + 1;
        });
    }
}
