<?php

namespace Database\Factories;

use App\Models\RequestPattern;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<RequestPattern>
 */
class RequestPatternFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'pattern_name' => $this->faker->name,
            'pattern_description' => $this->faker->text
        ];
    }
}
