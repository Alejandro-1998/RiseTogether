<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Proyecto;

/**
 * @extends \Illuminate\Database\Eloquent\Factories.Factory<\App\Models\Recompensa>
 */
class RecompensaFactory extends Factory
{
    public function definition(): array
    {
        return [
            'idProyecto' => Proyecto::inRandomOrder()->first()?->id ?? Proyecto::factory(),
            'nombreRecompensa' => ucfirst($this->faker->words(3, true)),
            'costoRecompensa' => $this->faker->randomFloat(2, 5, 500),
            'descripcionRecompensa' => $this->faker->sentence(10),
            'tipoEntrega' => $this->faker->randomElement(['digital', 'fisica', 'mixta', 'desbloqueo']),
        ];
    }
}