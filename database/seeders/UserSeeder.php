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
            ['email' => 'rafael@example.com'],
            [
                'dni' => '12345678E',
                'nombreUsuario' => 'Rafael',
                'nombreCompleto' => 'Rafael de la Fuente López',
                'password' => bcrypt('rafael123'),
                'fechaNacimiento' => '1990-01-01',
                'direccion' => 'Calle Falsa 123',
                'numeroCuenta' => 'ES12345678901234567894',
            ]
        );

        User::where('id', 1)->first()->assignRole('admin');
        User::where('id', 2)->first()->assignRole('admin');
        User::where('id', 3)->first()->assignRole('admin');
        User::where('id', 4)->first()->assignRole('admin');

        User::firstOrCreate(
            ['email' => 'javier.ruiz@davante.com'],
            [
                'dni' => '12345678E',
                'nombreUsuario' => 'Javier',
                'nombreCompleto' => 'Javier Ruiz',
                'password' => bcrypt('password'),
                'fechaNacimiento' => '1990-01-01',
                'direccion' => 'Calle Falsa 123',
                'numeroCuenta' => 'ES12345678901234567894',
            ]
        );

        User::firstOrCreate(
            ['email' => 'pablo.santaella@davante.com'],
            [
                'dni' => '12345678E',
                'nombreUsuario' => 'Pablo',
                'nombreCompleto' => 'Pablo Santaella',
                'password' => bcrypt('password'),
                'fechaNacimiento' => '1990-01-01',
                'direccion' => 'Calle Falsa 123',
                'numeroCuenta' => 'ES12345678901234567894',
            ]
        );

        User::firstOrCreate(
            ['email' => 'sergio.diaz@davante.com'],
            [
                'dni' => '12345678E',
                'nombreUsuario' => 'Sergio',
                'nombreCompleto' => 'Sergio Díaz',
                'password' => bcrypt('password'),
                'fechaNacimiento' => '1990-01-01',
                'direccion' => 'Calle Falsa 123',
                'numeroCuenta' => 'ES12345678901234567894',
            ]
        );

        User::firstOrCreate(
            ['email' => 'virginia.millan@davante.com'],
            [
                'dni' => '12345678E',
                'nombreUsuario' => 'Virginia',
                'nombreCompleto' => 'Virginia Millán',
                'password' => bcrypt('password'),
                'fechaNacimiento' => '1990-01-01',
                'direccion' => 'Calle Falsa 123',
                'numeroCuenta' => 'ES12345678901234567894',
            ]
        );

        User::where('id', 5)->first()->assignRole('admin');
        User::where('id', 6)->first()->assignRole('admin');
        User::where('id', 7)->first()->assignRole('admin');
        User::where('id', 8)->first()->assignRole('admin');

        // Usuarios aleatorios
        User::factory(5)->create();
    }
}