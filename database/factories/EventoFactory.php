<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class EventoFactory extends Factory
{
    public function definition(): array
    {
        $inicio = $this->faker->dateTimeBetween('-6 months', '+3 months');
        $fin    = (clone $inicio)->modify('+'.mt_rand(1,3).' hours');

        return [
            'nombre'                    => $this->faker->unique()->sentence(3),
            'fechaInicio'               => $inicio,
            'fechaFinal'                => $fin,
            'cantidadMaxParticipantes'  => $this->faker->boolean(70) ? $this->faker->numberBetween(20, 300) : null,
        ];
    }
}
