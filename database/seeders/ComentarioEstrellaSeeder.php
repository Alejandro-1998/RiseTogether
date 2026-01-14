<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Comentario;
use App\Models\ComentarioEstrella;
use App\Models\User;

class ComentarioEstrellaSeeder extends Seeder
{
    public function run(): void
    {
        // Recuperamos los comentarios creados en ComentarioSeeder por su mensaje
        $c1 = Comentario::where('mensaje', 'like', '%TENDENCIA%')->first();
        $c2 = Comentario::where('mensaje', 'like', '%POPULAR%')->first();
        $c3 = Comentario::where('mensaje', 'like', '%RELEVANTE%')->first();
        $c4 = Comentario::where('mensaje', 'like', '%IGNORADO%')->first();

        // Si no existen (por si se ejecuta este seeder solo), salimos o creamos dummy
        if (!$c1) return;

        // Obtenemos usuarios (o creamos si hay pocos)
        $users = User::all();
        if ($users->count() < 10) {
            $users = User::factory(10)->create();
        }

        // Helper para dar estrellas
        $darEstrellas = function ($comentario, $cantidad, $fecha) use ($users) {
            // Tomamos 'cantidad' usuarios aleatorios que NO hayan votado ya a este comentario
            // Para simplificar en este seeder controlado, iteramos los primeros N usuarios
            $count = 0;
            foreach ($users as $user) {
                if ($count >= $cantidad) break;
                
                ComentarioEstrella::create([
                    'user_id' => $user->id,
                    'comentario_id' => $comentario->id,
                    'created_at' => $fecha,
                    'updated_at' => $fecha,
                ]);
                $count++;
            }
        };

        // 1. TENDENCIA: 9 estrellas HOY
        if ($c1) $darEstrellas($c1, 9, now());

        // 2. POPULAR: 6 estrellas hace 2 días
        if ($c2) $darEstrellas($c2, 6, now()->subDays(2));

        // 3. RELEVANTE: 3 estrellas hace 6 días (justo dentro del límite)
        if ($c3) $darEstrellas($c3, 3, now()->subDays(6));

        // 4. IGNORADO/ANTIGUO: 15 estrellas (EL MÁS VOTADO) pero hace 2 meses
        if ($c4) $darEstrellas($c4, 15, now()->subMonths(2));
    }
}
