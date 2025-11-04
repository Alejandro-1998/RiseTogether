<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Recompensa;

class RecompensaSeeder extends Seeder
{
    public function run(): void
    {
        Recompensa::create([
            'idProyecto' => 1,
            'nombreRecompensa' => 'Camiseta oficial del proyecto',
            'costoRecompensa' => 25.00,
            'descripcionRecompensa' => 'Recibe una camiseta oficial como agradecimiento por tu apoyo.',
            'tipoEntrega' => 'fisica',
        ]);

        Recompensa::factory(15)->create();
    }
}