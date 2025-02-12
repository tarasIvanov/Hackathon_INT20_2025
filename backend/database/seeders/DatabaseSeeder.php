<?php

namespace Database\Seeders;

use App\Models\AnswerOption;
use App\Models\Quest;
use App\Models\QuestProgress;
use App\Models\Rating;
use App\Models\Task;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::factory(10)->create();
        Quest::factory(10)->create();
        Task::factory(30)->create();
        AnswerOption::factory(80)->create();
        Rating::factory(20)->create();
        QuestProgress::factory(20)->create();
    }
}
