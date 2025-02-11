<?php

namespace Database\Factories;

use App\Models\Quest;
use App\Models\Task;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\QuestProgress>
 */
class QuestProgressFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $quests = Quest::pluck('id')->toArray();
        $users = User::pluck('id')->toArray();

        $random_quest_id = $this->faker->randomElement($quests);
        $quest = Quest::find($random_quest_id);

        $tasks = $quest->tasks()->get()->count();
//        $tasks_numbers = $tasks->pluck('task_number')->toArray();
        return [
            'user_id' => $this->faker->randomElement($users),
            'quest_id' => $this->faker->randomElement($quests),
            'current_task' => $this->faker->numberBetween(1, $tasks),
        ];
    }
}
