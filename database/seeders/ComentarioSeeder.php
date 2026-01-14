<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Comentario;

class ComentarioSeeder extends Seeder
{
    public function run(): void
    {
        // Asegurarnos de tener ID de usuario y proyecto validos
        // Usamos el usuario 1 y proyecto 1 como base, o fallbacks
        $userId = \App\Models\User::first()->id ?? 1;
        $proyectoId = \App\Models\Proyecto::first()->id ?? 1;

        // 1. Comentario TENDENCIA (Tendrá muchas estrellas recientes)
        Comentario::create([
            'idUsuario' => $userId,
            'idProyecto' => $proyectoId,
            'mensaje' => '¡TENDENCIA! Este comentario debe salir PRIMERO. Tiene muchas estrellas de HOY.',
            'fechaHora' => now(),
            'estrellas' => 0, // Campo legacy
            'estado' => 'aprobado',
        ]);

        // 2. Comentario POPULAR (Tendrá bastantes estrellas recientes)
        Comentario::create([
            'idUsuario' => $userId,
            'idProyecto' => $proyectoId,
            'mensaje' => '¡POPULAR! Este comentario debe salir SEGUNDO. Estrellas de hace 2 días.',
            'fechaHora' => now()->subDays(2),
            'estrellas' => 0,
            'estado' => 'aprobado',
        ]);

        // 3. Comentario RELEVANTE (Tendrá algunas estrellas recientes)
        Comentario::create([
            'idUsuario' => $userId,
            'idProyecto' => $proyectoId,
            'mensaje' => '¡RELEVANTE! Este comentario debe salir TERCERO. Estrellas de hace 6 días.',
            'fechaHora' => now()->subDays(6),
            'estrellas' => 0,
            'estado' => 'aprobado',
        ]);

        // 4. Comentario ANTIGUO (Tendrá muchísimas estrellas, pero VIEJAS)
        Comentario::create([
            'idUsuario' => $userId,
            'idProyecto' => $proyectoId,
            'mensaje' => '¡IGNORADO! Este tiene muchas estrellas pero son del mes pasado. No debería salir.',
            'fechaHora' => now()->subMonths(2),
            'estrellas' => 0,
            'estado' => 'aprobado',
        ]);
    }
}