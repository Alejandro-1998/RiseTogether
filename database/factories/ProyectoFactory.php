<?php

namespace Database\Factories;

use App\Models\User;
use App\Models\Categoria;
use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Proyecto>
 */
class ProyectoFactory extends Factory
{
    public function definition(): array
    {
        $titulo = $this->faker->unique()->sentence(4);
        $objetivo = $this->faker->randomFloat(2, 1000, 100000);

        return [
            // Relaciones
            'user_id'               => User::factory(),
            'categoria_id'          => Categoria::factory(),
            
            // Textos
            'titulo'                => $titulo,
            'slug'                  => Str::slug($titulo),
            'descripcion'           => $this->faker->paragraphs(5, true),
            
            // Multimedia
            'imagen_portada'        => $this->faker->imageUrl(1280, 720, 'business'),
            'video_url'             => 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
            
            // Finanzas
            'objetivo_financiacion' => $objetivo,
            'cantidad_recaudada'    => $this->faker->randomFloat(2, 0, $objetivo),
            
            // Fechas
            'fecha_limite'          => $this->faker->dateTimeBetween('now', '+1 year'),
            
            // Estado
            'estado'                => $this->faker->randomElement([
                'borrador', 'revision', 'publicado', 'exitoso', 'fallido', 'cancelado'
            ]),
        ];
    }
}