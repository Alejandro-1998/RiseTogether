<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProyectoEventoSeeder extends Seeder
{
    public function run(): void
    {
        $proyectoIds = DB::table('proyectos')->pluck('id')->all();
        $eventoIds   = DB::table('eventos')->pluck('id')->all();

        $rows = [];
        foreach ($proyectoIds as $pid) {
            // cada proyecto se asocia con 2–4 eventos
            $asignados = collect($eventoIds)->shuffle()->take(mt_rand(2,4));
            foreach ($asignados as $eid) {
                $rows[] = [
                    'idProyecto' => $pid,
                    'idEvento'   => $eid,
                    'created_at' => now(),
                    'updated_at' => now(),
                ];
            }
        }

        // evita duplicados (unique idProyecto-idEvento)
        $rows = collect($rows)->unique(fn($r) => $r['idProyecto'].'-'.$r['idEvento'])->values()->all();

        DB::table('proyectos_eventos')->insert($rows);
    }
}
