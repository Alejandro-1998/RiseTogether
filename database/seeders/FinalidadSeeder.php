<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class FinalidadSeeder extends Seeder
{
    public function run(): void
    {
        $tipos = ['recaudación', 'promoción', 'comunidad'];

        foreach ($tipos as $tipo) {
            DB::table('finalidades')->insert([
                'tipo_finalidad' => $tipo,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}