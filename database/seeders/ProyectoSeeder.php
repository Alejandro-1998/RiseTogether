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
        $categoria = Categoria::first() ?? Categoria::factory()->create();

        // --- 3 PROYECTOS DESTACADOS (Top Proyectos) ---
        // Deben ser 'publicado' y 'ganadorEvento' => true

        Proyecto::create([
            'user_id'               => $user->id,
            'categoria_id'          => $categoria->id,
            'titulo'                => 'Eco-City Garden: Jardines Urbanos',
            'slug'                  => Str::slug('eco-city-garden-jardines-urbanos'),
            'resumen'               => 'Transformando techos grises en oasis verdes para la comunidad.',
            'descripcion'           => 'Este proyecto busca instalar jardines en 10 edificios del centro...',
            'objetivo_financiacion' => 15000.00,
            'cantidad_recaudada'    => 8500.00,
            'fecha_limite'          => now()->addDays(30),
            'estado'                => 'publicado',
            'ganadorEvento'         => true,
            'imagen_portada'        => null,
        ]);

        Proyecto::create([
            'user_id'               => $user->id,
            'categoria_id'          => $categoria->id,
            'titulo'                => 'NextGen Drone: Exploración Autónoma',
            'slug'                  => Str::slug('nextgen-drone-exploracion-autonoma'),
            'resumen'               => 'Drones con IA para mapeo y rescate en zonas de difícil acceso.',
            'descripcion'           => 'Desarrollo de drones impresos en 3D con capacidad de vuelo autónomo...',
            'objetivo_financiacion' => 50000.00,
            'cantidad_recaudada'    => 42000.00,
            'fecha_limite'          => now()->addDays(45),
            'estado'                => 'publicado',
            'ganadorEvento'         => true,
            'imagen_portada'        => null,
        ]);

        Proyecto::create([
            'user_id'               => $user->id,
            'categoria_id'          => $categoria->id,
            'titulo'                => 'Festival de Arte Comunitario 2026',
            'slug'                  => Str::slug('festival-de-arte-comunitario-2026'),
            'resumen'               => 'Un fin de semana lleno de música, pintura y teatro local.',
            'descripcion'           => 'Apoya a los artistas locales financiando el alquiler de equipos...',
            'objetivo_financiacion' => 5000.00,
            'cantidad_recaudada'    => 1200.00,
            'fecha_limite'          => now()->addDays(15),
            'estado'                => 'publicado',
            'ganadorEvento'         => true,
            'imagen_portada'        => null,
        ]);

        // --- 3 HISTORIAS DE ÉXITO ---
        // Deben ser 'completado' y recaudado >= 2 * objetivo

        Proyecto::create([
            'user_id'               => $user->id,
            'categoria_id'          => $categoria->id,
            'titulo'                => 'Mochila Solar "SunPack"',
            'slug'                  => Str::slug('mochila-solar-sunpack'),
            'resumen'               => 'Carga tus dispositivos mientras caminas. 100% recicable.',
            'descripcion'           => 'La mochila que revolucionó el mercado de accesorios sostenibles...',
            'objetivo_financiacion' => 5000.00,
            'cantidad_recaudada'    => 12000.00, // > 10,000 (Doble)
            'fecha_limite'          => now()->subDays(10), // Ya terminó
            'estado'                => 'completado',
            'ganadorEvento'         => false,
            'imagen_portada'        => null,
            'updated_at'            => now(),
        ]);

        Proyecto::create([
            'user_id'               => $user->id,
            'categoria_id'          => $categoria->id,
            'titulo'                => 'Indie Game: The Lost World',
            'slug'                  => Str::slug('indie-game-the-lost-world'),
            'resumen'               => 'Un RPG de acción que superó todas las expectativas.',
            'descripcion'           => 'Gracias a la comunidad pudimos añadir 3 expansiones gratuitas...',
            'objetivo_financiacion' => 10000.00,
            'cantidad_recaudada'    => 25000.00, // > 20,000
            'fecha_limite'          => now()->subDays(60),
            'estado'                => 'completado',
            'ganadorEvento'         => false,
            'imagen_portada'        => null,
            'updated_at'            => now()->subMinutes(5), // Un poco antes
        ]);

        Proyecto::create([
            'user_id'               => $user->id,
            'categoria_id'          => $categoria->id,
            'titulo'                => 'Filtro de Agua Inteligente',
            'slug'                  => Str::slug('filtro-de-agua-inteligente'),
            'resumen'               => 'Agua potable accesible para comunidades rurales.',
            'descripcion'           => 'Desarrollamos una solución de bajo costo que ya está en uso...',
            'objetivo_financiacion' => 2000.00,
            'cantidad_recaudada'    => 5000.00, // > 4,000
            'fecha_limite'          => now()->subDays(100),
            'estado'                => 'completado',
            'ganadorEvento'         => false,
            'imagen_portada'        => null,
            'updated_at'            => now()->subMinutes(10),
        ]);
    }
}