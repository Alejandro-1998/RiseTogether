<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Donacion;

class DonacionSeeder extends Seeder
{
    public function run(): void
    {
        // Donación de ejemplo
        Donacion::create([
            'idRecompensa' => 1,
            'idUsuario' => 1,
            'idProyecto' => 1,
            'fechaCompra' => '2025-01-20',
            'importe' => 50.00,
            'estadoDonacion' => 'pagada',
        ]);

        // Donaciones aleatorias
        Donacion::factory(15)->create();
    }
}