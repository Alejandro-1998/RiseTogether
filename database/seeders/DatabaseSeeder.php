<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            UserSeeder::class,
            FinalidadSeeder::class,
            ProyectoSeeder::class,
            EventoSeeder::class,
            ProyectoEventoSeeder::class,
            VotoSeeder::class,
        ]);
    }
}
