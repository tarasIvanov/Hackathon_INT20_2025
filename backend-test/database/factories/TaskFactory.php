<?php

namespace Database\Factories;

use App\Models\Quest;
use App\Models\Task;
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
        $hasAnswerOptions = $this->faker->boolean();


        return [
            'quest_id' => $this->faker->randomElement($quests),
            'name' => $this->faker->name(),
            'question' => $this->faker->text(),
            'has_options' => $hasAnswerOptions,
            'answer' => $hasAnswerOptions ? null : $this->faker->text(),
            'time_limit' => $this->faker->randomNumber(2),
        ];
    }
}
