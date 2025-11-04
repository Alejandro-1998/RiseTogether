<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Finalidad;

/**
 * @extends \Illuminate\Database\Eloquent\Factories.Factory<\App\Models\Evento>
 */
class EventoFactory extends Factory
{
    public function definition(): array
    {
        $fechaInicio = $this->faker->dateTimeBetween('-3 months', '+3 months');
        $fechaFinal = (clone $fechaInicio)->modify('+' . rand(1, 5) . ' days');

        return [
            'nombre' => ucfirst($this->faker->words(3, true)),
            'fechaInicio' => $fechaInicio,
            'fechaFinal' => $fechaFinal,
            'cantidadMaxParticipantes' => $this->faker->optional()->numberBetween(10, 200),
            'idFinalidad' => Finalidad::inRandomOrder()->first()?->id ?? Finalidad::factory(),
        ];
    }
}