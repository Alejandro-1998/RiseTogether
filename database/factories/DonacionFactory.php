<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\User;
use App\Models\Proyecto;
use App\Models\Recompensa;

/**
 * @extends \Illuminate\Database\Eloquent\Factories.Factory<\App\Models\Donacion>
 */
class DonacionFactory extends Factory
{
    public function definition(): array
    {
        return [
            'idRecompensa' => $this->faker->optional()->randomElement(
                Recompensa::pluck('id')->toArray() ?: [null] // Recoge los id existentes de la tabla Recompensa y lo transforma en array
            ),
            'idUsuario' => User::inRandomOrder()->first()?->id ?? User::factory(),
            'idProyecto' => Proyecto::inRandomOrder()->first()?->id ?? Proyecto::factory(),
            'fechaCompra' => $this->faker->dateTimeBetween('-6 months', 'now')->format('Y-m-d'),
            'importe' => $this->faker->randomFloat(2, 5, 500),
            'estadoDonacion' => $this->faker->randomElement(['pendiente', 'pagada', 'fallida', 'reembolsada']),
        ];
    }
}