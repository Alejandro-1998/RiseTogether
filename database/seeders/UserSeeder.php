<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

use Illuminate\Support\Facades\Hash;
use App\Models\User;

class UserSeeder extends Seeder

{
    public function run(): void
    {
    
      User::factory()->create([
        'nombreUsuario'  => 'admin',
        'nombreCompleto' => 'Administrador',
        'email'          => 'admin@gmail.com',
        'password'       => Hash::make('admin123'),
        'dni'            => '00000000A',
    ]);

    User::factory(20)->create();
    }
}
