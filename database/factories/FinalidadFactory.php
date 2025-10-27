<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class FinalidadFactory extends Factory
{
    public function definition(): array
    {
        return [
            'tipo_finalidad' => $this->faker->randomElement(['recaudación','promoción','difusión','comunidad']),
        ];
    }
}
