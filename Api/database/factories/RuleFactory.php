<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class RuleFactory extends Factory
{

    public function definition(): array
    {
        return [
            'name' => fake()->name(),
            'description' => fake()->text(),
        ];
    }
}
