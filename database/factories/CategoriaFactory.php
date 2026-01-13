<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Categoria>
 */
class CategoriaFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        // Generamos un nombre único para evitar errores con la migración
        $nombre = $this->faker->unique()->words(2, true);

        return [
            'nombre' => ucfirst($nombre),
            'slug'   => Str::slug($nombre), // Genera el slug a partir del nombre
            'icono'  => $this->faker->randomElement([
                'cpu-chip', 'paint-brush', 'leaf', 'academic-cap', 
                'heart', 'video-camera', 'beaker', 'briefcase', 
                'camera', 'chat-bubble-left'
            ]), // Iconos sugeridos para las categorías
        ];
    }
}
