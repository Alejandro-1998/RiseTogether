<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Evento;

class EventoSeeder extends Seeder
{
    public function run(): void
    {
        Evento::create([
            'nombre' => 'Jornada de Innovación Sostenible',
            'fechaInicio' => '2025-04-01 10:00:00',
            'fechaFinal' => '2025-04-03 18:00:00',
            'cantidadMaxParticipantes' => 150,
            'idFinalidad' => 1,
        ]);

        Evento::factory(3)->create();
    }
}