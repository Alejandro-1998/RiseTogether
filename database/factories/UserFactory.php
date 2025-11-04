<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    public function definition(): array
    {
        return [
            'dni' => $this->faker->optional()->unique()->numerify('#########'),
            'nombreUsuario' => $this->faker->unique()->userName(),
            'nombreCompleto' => $this->faker->name(),
            'email' => $this->faker->unique()->safeEmail(),
            'email_verified_at' => now(),
            'password' => Hash::make('password'), // contraseña por defecto
            'fechaNacimiento' => $this->faker->optional()->date(),
            'direccion' => $this->faker->optional()->address(),
            'numeroCuenta' => $this->faker->optional()->unique()->numerify('ES####################'),
            'remember_token' => Str::random(10),
        ];
    }
}