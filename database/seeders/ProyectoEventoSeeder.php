<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Models\Proyecto;
use App\Models\Evento;

class ProyectoEventoSeeder extends Seeder
{
    public function run(): void
    {
        $proyectos = Proyecto::all();
        $eventos = Evento::all();

        if ($proyectos->isEmpty() || $eventos->isEmpty()) {
            $this->command->warn('⚠️ No hay proyectos o eventos disponibles para asociar.');
            return;
        }

        foreach ($proyectos as $proyecto) {
            // Cada proyecto se asocia a entre 1 y 3 eventos aleatorios
            $eventosSeleccionados = $eventos->random(rand(1, 3));

            foreach ($eventosSeleccionados as $evento) {
                DB::table('proyectos_eventos')->updateOrInsert(
                    [
                        'idProyecto' => $proyecto->id,
                        'idEvento' => $evento->id,
                    ],
                    [
                        'created_at' => now(),
                        'updated_at' => now(),
                    ]
                );
            }
        }
    }
}