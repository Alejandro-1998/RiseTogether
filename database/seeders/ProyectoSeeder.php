<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Proyecto;
use App\Models\User;
use App\Models\Categoria;
use Illuminate\Support\Str;

class ProyectoSeeder extends Seeder
{
    public function run(): void
    {
        // Obtenemos un ID de usuario y de categoría para que no falle la restricción de clave foránea
        // Asegúrate de haber ejecutado los seeders de User y Categoria antes que este.
        $user = User::first() ?? User::factory()->create();
        $categoria = Categoria::first() ?? Categoria::factory()->create();

        Proyecto::create([
            'user_id'               => $user->id,
            'categoria_id'          => 1,
            'titulo'                => 'Plataforma de Energía Solar',
            'slug'                  => Str::slug('Plataforma de Energía Solar'),
            'resumen'               => 'Un resumen corto sobre la gestión de energía solar doméstica.',
            'descripcion'           => 'Un proyecto extenso para desarrollar una plataforma que gestiona la energía solar doméstica de forma eficiente.',
            'objetivo_financiacion' => 50000.00,
            'cantidad_recaudada'    => 0, // Por defecto es 0 según tu migración
            'fecha_limite'          => '2025-06-30 23:59:59',
            'estado'                => 'publicado',
            'imagen_portada'        => null,
            'video_url'             => null,
        ]);

        // Esto creará 3 registros adicionales usando el Factory
        Proyecto::factory(3)->create();

        Proyecto::create([
            'user_id'               => $user->id,
            'categoria_id'          => 1,
            'titulo'                => 'Plataforma de Energía',
            'slug'                  => Str::slug('plataformaDeEnergia'),
            'resumen'               => 'Un resumen corto sobre la gestión de energía solar doméstica.',
            'descripcion'           => 'Un proyecto extenso para desarrollar una plataforma que gestiona la energía solar doméstica de forma eficiente.',
            'objetivo_financiacion' => 50000.00,
            'cantidad_recaudada'    => 0, // Por defecto es 0 según tu migración
            'fecha_limite'          => '2025-06-30 23:59:59',
            'estado'                => 'publicado',
            'imagen_portada'        => null,
            'video_url'             => null,
            'ganadorEvento'         => true
        ]);

        Proyecto::create([
            'user_id'               => $user->id,
            'categoria_id'          => 1,
            'titulo'                => 'Juego de Mesa',
            'slug'                  => Str::slug('juegoDeMesa'),
            'resumen'               => 'Un resumen corto sobre la gestión de energía solar doméstica.',
            'descripcion'           => 'Un proyecto extenso para desarrollar una plataforma que gestiona la energía solar doméstica de forma eficiente.',
            'objetivo_financiacion' => 50000.00,
            'cantidad_recaudada'    => 13000.00, // Por defecto es 0 según tu migración
            'fecha_limite'          => '2025-06-30 23:59:59',
            'estado'                => 'publicado',
            'imagen_portada'        => null,
            'video_url'             => null,
            'ganadorEvento'         => true
        ]);

        Proyecto::create([
            'user_id'               => $user->id,
            'categoria_id'          => 1,
            'titulo'                => 'Videojuego',
            'slug'                  => Str::slug('videojuego'),
            'resumen'               => 'Un resumen corto sobre la gestión de energía solar doméstica.',
            'descripcion'           => 'Un proyecto extenso para desarrollar una plataforma que gestiona la energía solar doméstica de forma eficiente.',
            'objetivo_financiacion' => 50000.00,
            'cantidad_recaudada'    => 49345.00, // Por defecto es 0 según tu migración
            'fecha_limite'          => '2025-06-30 23:59:59',
            'estado'                => 'publicado',
            'imagen_portada'        => null,
            'video_url'             => null,
            'ganadorEvento'         => true
        ]);
    }
}