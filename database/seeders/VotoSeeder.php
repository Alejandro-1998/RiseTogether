<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Models\Voto;

class VotoSeeder extends Seeder
{
    public function run(): void
    {
        $userIds = DB::table('users')->pluck('id')->all();
        $peIds   = DB::table('proyectos_eventos')->pluck('id')->all();

        // Para respetar el unique (idUsuario, idProyectoEvento),
        // generamos algunas combinaciones no repetidas.
        $combos = [];

        foreach ($peIds as $peId) {
            // que voten entre 1 y 10 usuarios por relación proyecto-evento
            $votantes = collect($userIds)->shuffle()->take(mt_rand(1,10));
            foreach ($votantes as $uid) {
                $combos[] = ['idUsuario' => $uid, 'idProyectoEvento' => $peId];
            }
        }

        // Evitar duplicados por si acaso
        $combos = collect($combos)->unique(fn($r) => $r['idUsuario'].'-'.$r['idProyectoEvento'])->values();

        $now = now();
        $payload = $combos->map(function ($c) use ($now) {
            return [
                'idUsuario'         => $c['idUsuario'],
                'idProyectoEvento'  => $c['idProyectoEvento'],
                'fechaVoto'         => now()->subDays(mt_rand(0, 30)),
                'created_at'        => $now,
                'updated_at'        => $now,
            ];
        })->all();

       
        DB::table('votos')->insert($payload);
    }
}
