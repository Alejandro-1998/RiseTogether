<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
use App\Models\User;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    protected $model = User::class;

    public function definition(): array
    {
        // === Generar DNI español (8 dígitos + letra) ===
        $numero = rand(10000000, 99999999);
        $letras = 'TRWAGMYFPDXBNJZSQVHLCKE';
        $letra = $letras[$numero % 23];
        $dni = "{$numero}{$letra}";

        // === Generar IBAN simple (no real, solo para test) ===
        $iban = 'ES' . str_pad(strval(rand(0, 999999999999999999)), 18, '0', STR_PAD_LEFT);

        return [
            'dni' => fake()->boolean(80) ? $dni : null, // 80% de probabilidad de tener DNI
            'nombreUsuario' => fake()->unique()->userName(),
            'nombreCompleto' => fake()->name(),
            'email' => fake()->unique()->safeEmail(),
            'email_verified_at' => now(),
            'password' => bcrypt('password'),
            'fechaNacimiento' => fake()->date(),
            'direccion' => fake()->optional()->address(),
            'numeroCuenta' => fake()->boolean(70) ? $iban : null, // 70% de probabilidad de tener cuenta
            'remember_token' => Str::random(10),
        ];
    }
}