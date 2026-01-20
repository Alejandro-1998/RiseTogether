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
            'nombreUsuario' => 'Admin',
            'nombreCompleto' => 'Administrador Principal',
            'email' => 'admin@example.com',
            'password' => bcrypt('admin123'),
            'fechaNacimiento' => '1990-01-01',
            'direccion' => 'Calle Falsa 123',
            'numeroCuenta' => 'ES12345678901234567890',
        ]);

        User::where('id', 1)->first()->assignRole('admin');

        // Usuarios predefinidos
        User::create([
            'dni' => '12345678B',
            'nombreUsuario' => 'Alejandro',
            'nombreCompleto' => 'Alejandro Caballero Luque',
            'email' => 'alejandro@example.com',
            'password' => bcrypt('alejandro123'),
            'fechaNacimiento' => '1990-01-01',
            'direccion' => 'Calle Falsa 123',
            'numeroCuenta' => 'ES12345678901234567891',
        ]);

        User::create([
            'dni' => '12345678C',
            'nombreUsuario' => 'Santiago',
            'nombreCompleto' => 'Santiago Cantero Torrents',
            'email' => 'santiago@example.com',
            'password' => bcrypt('santiago123'),
            'fechaNacimiento' => '1990-01-01',
            'direccion' => 'Calle Falsa 123',
            'numeroCuenta' => 'ES12345678901234567892',
        ]);

        User::create([
            'dni' => '12345678D',
            'nombreUsuario' => 'Juan',
            'nombreCompleto' => 'Juan Bautista Galisteo Marqués',
            'email' => 'juan@example.com',
            'password' => bcrypt('juan123'),
            'fechaNacimiento' => '1990-01-01',
            'direccion' => 'Calle Falsa 123',
            'numeroCuenta' => 'ES12345678901234567893',
        ]);

        User::create([
            'dni' => '12345678E',
            'nombreUsuario' => 'Fali',
            'nombreCompleto' => 'Rafael de la Fuente López',
            'email' => 'fali@example.com',
            'password' => bcrypt('fali123'),
            'fechaNacimiento' => '1990-01-01',
            'direccion' => 'Calle Falsa 123',
            'numeroCuenta' => 'ES12345678901234567894',
        ]);

        // Usuarios aleatorios
        User::factory(5)->create();
    }
}