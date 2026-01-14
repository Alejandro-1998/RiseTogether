<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Categoria;
use Illuminate\Support\Str;

class CategoriaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categorias = [
            ['nombre' => 'Tecnología', 'icono' => 'cpu-chip'],
            ['nombre' => 'Arte', 'icono' => 'paint-brush'],
            ['nombre' => 'Medio Ambiente', 'icono' => 'leaf'],
            ['nombre' => 'Educación', 'icono' => 'academic-cap'],
            ['nombre' => 'Salud', 'icono' => 'heart'],
            ['nombre' => 'Cine y Video', 'icono' => 'video-camera'],
        ];

        foreach ($categorias as $categoria) {
            Categoria::create([
                'nombre' => $categoria['nombre'],
                'slug'   => Str::slug($categoria['nombre']),
                'icono'  => $categoria['icono'],
            ]);
        }
    }
}