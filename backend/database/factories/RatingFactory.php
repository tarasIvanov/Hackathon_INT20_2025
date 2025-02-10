<?php

namespace Database\Factories;

use App\Models\Quest;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Rating>
 */
class RatingFactory extends Factory
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
            'rating' => $this->faker->numberBetween(1,5),
            'comment' => $this->faker->text()
        ];
    }
}
