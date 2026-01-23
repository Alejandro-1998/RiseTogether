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
        // Aseguramos que existan al menos un usuario y una categoría
        $user = User::first() ?? User::factory()->create();

        // --- 3 PROYECTOS DESTACADOS (Top Proyectos) ---
        // Deben ser 'publicado' y 'ganadorEvento' => true

        Proyecto::create([
            'user_id'               => $user->id,
            'categoria_id'          => 6,
            'titulo'                => 'Eco-City Garden: Jardines Urbanos',
            'slug'                  => Str::slug('eco-city-garden-jardines-urbanos'),
            'descripcion'           => 'Este proyecto busca instalar jardines en 10 edificios del centro...',
            'objetivo_financiacion' => 15000.00,
            'cantidad_recaudada'    => 8500.00,
            'fecha_limite'          => now()->addDays(30),
            'estado'                => 'publicado',
            'ganadorEvento'         => true,
            'imagen_portada'        => 'img/jardines_urbanos.png',
        ]);

        Proyecto::create([
            'user_id'               => $user->id,
            'categoria_id'          => 7,
            'titulo'                => 'NextGen Drone: Exploración Autónoma',
            'slug'                  => Str::slug('nextgen-drone-exploracion-autonoma'),
            'descripcion'           => 'Desarrollo de drones impresos en 3D con capacidad de vuelo autónomo...',
            'objetivo_financiacion' => 50000.00,
            'cantidad_recaudada'    => 42000.00,
            'fecha_limite'          => now()->addDays(45),
            'estado'                => 'publicado',
            'ganadorEvento'         => true,
            'imagen_portada'        => 'img/dron.png',
        ]);

        Proyecto::create([
            'user_id'               => $user->id,
            'categoria_id'          => 3,
            'titulo'                => 'Festival de Arte Comunitario 2026',
            'slug'                  => Str::slug('festival-de-arte-comunitario-2026'),
            'descripcion'           => 'Apoya a los artistas locales financiando el alquiler de equipos...',
            'objetivo_financiacion' => 5000.00,
            'cantidad_recaudada'    => 1200.00,
            'fecha_limite'          => now()->addDays(15),
            'estado'                => 'publicado',
            'ganadorEvento'         => true,
            'imagen_portada'        => 'img/festival.png',
        ]);

        // --- 3 HISTORIAS DE ÉXITO ---
        // Deben ser 'completado' y recaudado >= 2 * objetivo

        Proyecto::create([
            'user_id'               => $user->id,
            'categoria_id'          => 6,
            'titulo'                => 'Mochila Solar "SunPack"',
            'slug'                  => Str::slug('mochila-solar-sunpack'),
            'descripcion'           => 'La mochila que revolucionó el mercado de accesorios sostenibles...',
            'objetivo_financiacion' => 5000.00,
            'cantidad_recaudada'    => 12000.00,
            'fecha_limite'          => now()->subDays(10),
            'estado'                => 'completado',
            'ganadorEvento'         => false,
            'imagen_portada'        => 'img/mochila.png',
            'updated_at'            => now(),
        ]);

        Proyecto::create([
            'user_id'               => $user->id,
            'categoria_id'          => 1,
            'titulo'                => 'Indie Game: The Lost World',
            'slug'                  => Str::slug('indie-game-the-lost-world'),
            'descripcion'           => 'Gracias a la comunidad pudimos añadir 3 expansiones gratuitas...',
            'objetivo_financiacion' => 10000.00,
            'cantidad_recaudada'    => 25000.00,
            'fecha_limite'          => now()->subDays(60),
            'estado'                => 'completado',
            'ganadorEvento'         => false,
            'imagen_portada'        => 'img/juego.png',
            'updated_at'            => now()->subMinutes(5),
        ]);

        Proyecto::create([
            'user_id'               => $user->id,
            'categoria_id'          => 6,
            'titulo'                => 'Filtro de Agua Inteligente',
            'slug'                  => Str::slug('filtro-de-agua-inteligente'),
            'descripcion'           => 'Desarrollamos una solución de bajo costo que ya está en uso...',
            'objetivo_financiacion' => 2000.00,
            'cantidad_recaudada'    => 5000.00,
            'fecha_limite'          => now()->subDays(100),
            'estado'                => 'completado',
            'ganadorEvento'         => false,
            'imagen_portada'        => 'img/filtro.png',
            'updated_at'            => now()->subMinutes(10),
        ]);
    }
}