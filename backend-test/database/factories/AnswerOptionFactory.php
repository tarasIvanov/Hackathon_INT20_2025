<?php

namespace Database\Factories;

use App\Models\Task;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\AnswerOption>
 */
class AnswerOptionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $tasks = Task::where('has_options', true)->pluck('id');

        return [
            'task_id' => $this->faker->randomElement($tasks),
            'name' => $this->faker->name(),
            'is_correct' => $this->faker->randomElement([true, false])
        ];
    }
}
