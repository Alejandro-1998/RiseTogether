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
            'estrellas' => 10,
            'estado' => 'aprobado',
        ]);

        // Respuesta al comentario principal
        Comentario::create([
            'idUsuario' => 3,
            'idProyecto' => 2,
            'idComentario' => $comentarioPrincipal->id,
            'mensaje' => 'Gracias por tu comentario, estamos trabajando duro en ello.',
            'fechaHora' => now(),
            'estrellas' => 6,
            'estado' => 'aprobado',
        ]);

        Comentario::create([
            'idUsuario' => 2,
            'idProyecto' => 2,
            'mensaje' => 'Me parece decepcionante este proyecto.',
            'fechaHora' => now(),
            'estrellas' => 2,
            'estado' => 'aprobado',
        ]);

        Comentario::create([
            'idUsuario' => 4,
            'idProyecto' => 3,
            'mensaje' => 'No me gusta :(',
            'fechaHora' => now(),
            'estrellas' => 1,
            'estado' => 'aprobado',
        ]);
    }
}