<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Evento;
use Illuminate\Support\Facades\DB;

class EventoSeeder extends Seeder
{
    public function run(): void
    {
        $finalidadIds = DB::table('finalidades')->pluck('id')->all();

        // crea 12 eventos y asigna finalidad a cada uno
        Evento::factory(12)->make()->each(function ($evento) use ($finalidadIds) {
            // Si no hay finalidades aún, crea una por si acaso
            if (empty($finalidadIds)) {
                $fid = DB::table('finalidades')->insertGetId([
                    'tipo_finalidad' => 'recaudación',
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
                $finalidadIds = [$fid];
            }

            $evento->idFinalidad = $finalidadIds[array_rand($finalidadIds)];
            $evento->save();
        });
    }
}
