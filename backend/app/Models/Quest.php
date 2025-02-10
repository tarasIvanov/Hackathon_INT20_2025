<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use \Illuminate\Database\Eloquent\Relations\HasMany;

class Quest extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
        'description',
        'time_limit',
    ];

    public function tasks(): HasMany
    {
        return $this->hasMany(Task::class, 'quest_id');
    }
}
