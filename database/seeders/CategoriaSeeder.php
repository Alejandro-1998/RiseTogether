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
        $categorias = ['Juegos', 'Educación', 'Arte', 'Libros', 'Música', 'Medio Ambiente', 'Tecnología'];

        foreach ($categorias as $categoria) {
            Categoria::create([
                'nombre' => $categoria,
                'slug'   => Str::slug($categoria)
            ]);
        }
    }
}