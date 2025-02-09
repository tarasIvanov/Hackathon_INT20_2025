<?php

namespace Database\Factories;

use App\Models\Quest;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Task>
 */
class TaskFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $quests = Quest::pluck('id')->toArray();
        return [
            'quest_id' => $this->faker->randomElement($quests),
            'task_number' => $this->faker->unique()->randomNumber(1),
            'name' => $this->faker->name(),
            'question' => $this->faker->text(),
            'answer' => $this->faker->text(),
            'time_limit' => $this->faker->randomNumber(2),
        ];
    }
}
