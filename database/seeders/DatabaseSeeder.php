<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Database\Seeders\RoleSeeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            RoleSeeder::class,
            UserSeeder::class,
            CategoriaSeeder::class,
            ProyectoSeeder::class,
            FacturaSeeder::class,
            ComentarioSeeder::class,
            ComentarioEstrellaSeeder::class,
            RecompensaSeeder::class,
            DonacionSeeder::class,
            UserProyectoSeeder::class,
            FinalidadSeeder::class,
            EventoSeeder::class,
            ProyectoEventoSeeder::class,
            VotoSeeder::class
        ]);
    }
}