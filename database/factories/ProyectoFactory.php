<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Proyecto>
 */
class ProyectoFactory extends Factory
{
    public function definition(): array
    {
        $fechaCreacion = $this->faker->dateTimeBetween('-2 years', 'now');
        $fechaFinalizacion = (clone $fechaCreacion)->modify('+' . rand(1, 12) . ' months');

        return [
            'nombreProyecto' => $this->faker->unique()->sentence(3),
            'descripcion' => $this->faker->paragraph(3),
            'financiacionObjetivo' => $this->faker->randomFloat(2, 1000, 100000),
            'fechaCreacion' => $fechaCreacion->format('Y-m-d'),
            'fechaFinalizacion' => $fechaFinalizacion->format('Y-m-d'),
        ];
    }
}