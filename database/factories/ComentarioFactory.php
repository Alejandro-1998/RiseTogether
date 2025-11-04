<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\User;
use App\Models\Proyecto;
use App\Models\Comentario;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Comentario>
 */
class ComentarioFactory extends Factory
{
    public function definition(): array
    {
        return [
            'idUsuario' => User::inRandomOrder()->first()?->id ?? User::factory(),
            'idProyecto' => Proyecto::inRandomOrder()->first()?->id ?? Proyecto::factory(),
            'idComentario' => null, // se asignará después para simular respuestas
            'mensaje' => $this->faker->paragraph(),
            'fechaHora' => $this->faker->dateTimeBetween('-6 months', 'now'),
            'estado' => $this->faker->randomElement(['pendiente', 'aprobado', 'rechazado']),
        ];
    }
}