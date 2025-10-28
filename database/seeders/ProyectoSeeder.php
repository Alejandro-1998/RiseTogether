<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Proyecto;

class ProyectoSeeder extends Seeder
{
    public function run(): void
    {
        Proyecto::factory(10)->create();
    }
}
