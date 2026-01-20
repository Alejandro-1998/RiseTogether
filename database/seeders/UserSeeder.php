<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        // Usuarios Admin
        User::firstOrCreate(
            ['email' => 'alejandro@example.com'],
            [
                'dni' => '12345678B',
                'nombreUsuario' => 'Alejandro',
                'nombreCompleto' => 'Alejandro Caballero Luque',
                'password' => bcrypt('alejandro123'),
                'fechaNacimiento' => '1990-01-01',
                'direccion' => 'Calle Falsa 123',
                'numeroCuenta' => 'ES12345678901234567891',
            ]
        );

        User::firstOrCreate(
            ['email' => 'santiago@example.com'],
            [
                'dni' => '12345678C',
                'nombreUsuario' => 'Santiago',
                'nombreCompleto' => 'Santiago Cantero Torrents',
                'password' => bcrypt('santiago123'),
                'fechaNacimiento' => '1990-01-01',
                'direccion' => 'Calle Falsa 123',
                'numeroCuenta' => 'ES12345678901234567892',
            ]
        );

        User::firstOrCreate(
            ['email' => 'juan@example.com'],
            [
                'dni' => '12345678D',
                'nombreUsuario' => 'Juan',
                'nombreCompleto' => 'Juan Bautista Galisteo Marqués',
                'password' => bcrypt('juan123'),
                'fechaNacimiento' => '1990-01-01',
                'direccion' => 'Calle Falsa 123',
                'numeroCuenta' => 'ES12345678901234567893',
            ]
        );

        User::firstOrCreate(
            ['email' => 'fali@example.com'],
            [
                'dni' => '12345678E',
                'nombreUsuario' => 'Fali',
                'nombreCompleto' => 'Rafael de la Fuente López',
                'password' => bcrypt('fali123'),
                'fechaNacimiento' => '1990-01-01',
                'direccion' => 'Calle Falsa 123',
                'numeroCuenta' => 'ES12345678901234567894',
            ]
        );

        User::where('id', 1)->first()->assignRole('admin');
        User::where('id', 2)->first()->assignRole('admin');
        User::where('id', 3)->first()->assignRole('admin');
        User::where('id', 4)->first()->assignRole('admin');

        // Usuarios aleatorios
        User::factory(5)->create();
    }
}