<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Quest>
 */
class QuestFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
//        $users = App\User::pluck('id')->toArray();

        $users = User::pluck('id')->toArray();

        return [
            'user_id' => $this->faker->randomElement($users),
            'name' => $this->faker->name(),
            'description' => $this->faker->text(),
            'time_limit' => $this->faker->randomNumber(4, true)
        ];
    }
}
