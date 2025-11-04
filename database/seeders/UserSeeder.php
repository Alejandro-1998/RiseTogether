<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        // Admin
        User::create([
            'dni' => '12345678A',
            'nombreUsuario' => 'admin',
            'nombreCompleto' => 'Administrador Principal',
            'email' => 'admin@example.com',
            'password' => bcrypt('admin123'),
            'fechaNacimiento' => '1990-01-01',
            'direccion' => 'Calle Falsa 123',
            'numeroCuenta' => 'ES12345678901234567890',
        ]);

        User::factory(5)->create();
    }
}