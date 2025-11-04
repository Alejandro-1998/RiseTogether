<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Comentario;

class ComentarioSeeder extends Seeder
{
    public function run(): void
    {
        // Comentario principal de ejemplo
        $comentarioPrincipal = Comentario::create([
            'idUsuario' => 1,
            'idProyecto' => 1,
            'mensaje' => 'Este proyecto me parece muy interesante y con mucho potencial.',
            'fechaHora' => now(),
            'estado' => 'aprobado',
        ]);

        // Respuesta al comentario principal
        Comentario::create([
            'idUsuario' => 1,
            'idProyecto' => 1,
            'idComentario' => $comentarioPrincipal->id,
            'mensaje' => 'Gracias por tu comentario, estamos trabajando duro en ello.',
            'fechaHora' => now(),
            'estado' => 'aprobado',
        ]);

        // Comentarios aleatorios
        Comentario::factory(10)->create();

        // Algunos comentarios aleatorios con respuestas
        Comentario::factory(5)->create()->each(function ($comentario) {
            Comentario::factory(1)->create([
                'idComentario' => $comentario->id,
                'idProyecto' => $comentario->idProyecto,
                'idUsuario' => $comentario->idUsuario,
            ]);
        });
    }
}