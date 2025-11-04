<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Proyecto;

class ProyectoSeeder extends Seeder
{
    public function run(): void
    {
        Proyecto::create([
            'nombreProyecto' => 'Plataforma de Energía Solar',
            'descripcion' => 'Un proyecto para desarrollar una plataforma que gestiona la energía solar doméstica.',
            'financiacionObjetivo' => 50000.00,
            'fechaCreacion' => '2024-01-01',
            'fechaFinalizacion' => '2025-06-30',
        ]);

        Proyecto::factory(3)->create();
    }
}