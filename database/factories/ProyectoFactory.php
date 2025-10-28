<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class ProyectoFactory extends Factory
{
    public function definition(): array
    {
        $fechaCreacion = $this->faker->dateTimeBetween('-1 years', 'now');
        $fechaFinal    = (clone $fechaCreacion)->modify('+'.mt_rand(10,120).' days');

        return [
            'nombreProyecto'    => $this->faker->unique()->sentence(3),
            'descripcion'       => $this->faker->paragraphs(3, true),
            'financiacionObjetivo' => $this->faker->randomFloat(2, 500, 50000),
            'fechaCreacion'     => $fechaCreacion->format('Y-m-d'),
            'fechaFinalizacion' => $fechaFinal->format('Y-m-d'),
        ];
    }
}
