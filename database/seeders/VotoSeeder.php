<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Models\User;

class VotoSeeder extends Seeder
{
    public function run(): void
    {
        $usuarios = User::all();
        $proyectosEventos = DB::table('proyectos_eventos')->get();

        if ($usuarios->isEmpty() || $proyectosEventos->isEmpty()) {
            $this->command->warn('⚠️ No hay usuarios o proyectos_eventos para generar votos.');
            return;
        }

        foreach ($usuarios as $usuario) {
            // Cada usuario vota entre 1 y 3 combinaciones proyecto-evento
            $votaciones = $proyectosEventos->random(rand(1, min(3, $proyectosEventos->count())));

            foreach ($votaciones as $pe) {
                DB::table('votos')->updateOrInsert(
                    [
                        'idUsuario' => $usuario->id,
                        'idProyectoEvento' => $pe->id,
                    ],
                    [
                        'fechaVoto' => now(),
                        'created_at' => now(),
                        'updated_at' => now(),
                    ]
                );
            }
        }
    }
}