<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Recompensa;

class RecompensaSeeder extends Seeder
{
    public function run(): void
    {
        Recompensa::create([
            'idProyecto' => 1,
            'nombreRecompensa' => 'Semilla',
            'costoRecompensa' => 5.00,
            'descripcionRecompensa' => 'Ideal para quienes quieren apoyar la idea:
            - Agradecimiento digital personalizado                  
            - Nombre en la web del proyecto como patrocinador                                    
            - Acceso a actualizaciones exclusivas del desarrollo.',
            'tipoEntrega' => 'fisica',
        ]);

        Recompensa::create([
            'idProyecto' => 1,
            'nombreRecompensa' => 'Brote',
            'costoRecompensa' => 20.00,
            'descripcionRecompensa' => 'Primer contacto con el cultivo.

- Todo lo anterior
- Pack de semillas ecológicas (hierbas aromáticas)
- Guía digital de cultivo urbano (PDF + acceso web)',
            'tipoEntrega' => 'fisica',
        ]);

        Recompensa::create([
            'idProyecto' => 1,
            'nombreRecompensa' => 'Eco-City Garden Estándar',
            'costoRecompensa' => 120.00,
            'descripcionRecompensa' => 'El producto estrella del proyecto.

- Kit completo como el de la imagen:
- Estructura de madera modular
- Compartimentos de cultivo
- Sustrato orgánico
- Semillas variadas
- Herramientas básicas (guantes, pala)
- Acceso completo a la app
- Guía interactiva avanzada',
            'tipoEntrega' => 'fisica',
        ]);

        Recompensa::factory(15)->create();
    }
}