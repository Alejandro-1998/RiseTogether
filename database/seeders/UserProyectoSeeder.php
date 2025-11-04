<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Proyecto;
use Illuminate\Support\Facades\DB;

class UserProyectoSeeder extends Seeder
{
    public function run(): void
    {
        $usuarios = User::all();
        $proyectos = Proyecto::all();

        if ($usuarios->isEmpty() || $proyectos->isEmpty()) {
            $this->command->warn('⚠️ No hay usuarios o proyectos para asociar.');
            return;
        }

        // Asocia 1 a 3 usuarios a cada proyecto
        foreach ($proyectos as $proyecto) {
            $participantes = $usuarios->random(rand(1, 3));
            foreach ($participantes as $usuario) {
                // Inserta manualmente en la tabla pivote
                DB::table('users_proyectos')->insert([
                    'idUsuario' => $usuario->id,
                    'idProyecto' => $proyecto->id,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }
        }
    }
}