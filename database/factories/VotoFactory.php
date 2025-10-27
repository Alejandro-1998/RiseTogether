<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class VotoFactory extends Factory
{
    public function definition(): array
    {
        return [
            'fechaVoto' => $this->faker->dateTimeBetween('-30 days', 'now'),
        ];
    }
}
