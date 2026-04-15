<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Recompensa;

class RecompensaSeeder extends Seeder
{
    public function run(): void
    {
        // ---------------------------------------------------------
        // PROYECTO 1: Eco-City Garden (Jardines Urbanos)
        // ---------------------------------------------------------
        Recompensa::create([
            'idProyecto' => 1,
            'nombreRecompensa' => 'Nivel Semilla',
            'costoRecompensa' => 5.00,
            'descripcionRecompensa' => "Ideal para quienes quieren apoyar la idea:\n- Agradecimiento digital personalizado\n- Nombre en la web como patrocinador\n- Acceso a actualizaciones exclusivas.",
            'tipoEntrega' => 'digital',
        ]);

        Recompensa::create([
            'idProyecto' => 1,
            'nombreRecompensa' => 'Nivel Brote',
            'costoRecompensa' => 25.00,
            'descripcionRecompensa' => "Primer contacto con el cultivo:\n- Todo lo anterior\n- Pack de semillas ecológicas variadas\n- Guía digital de cultivo urbano (PDF)",
            'tipoEntrega' => 'fisica',
        ]);

        Recompensa::create([
            'idProyecto' => 1,
            'nombreRecompensa' => 'Hojas Verdes',
            'costoRecompensa' => 60.00,
            'descripcionRecompensa' => "Kit de inicio avanzado:\n- Todo lo anterior\n- 3 Macetas biodegradables de diseño\n- Sustrato orgánico enriquecido\n- Herramientas pequeñas de mano",
            'tipoEntrega' => 'fisica',
        ]);

        Recompensa::create([
            'idProyecto' => 1,
            'nombreRecompensa' => 'Eco-City Garden Estándar',
            'costoRecompensa' => 125.00,
            'descripcionRecompensa' => "El producto estrella del proyecto:\n- Kit completo de madera modular\n- Compartimentos inteligentes\n- Herramientas premium\n- Acceso completo a la App",
            'tipoEntrega' => 'fisica',
        ]);

        Recompensa::create([
            'idProyecto' => 1,
            'nombreRecompensa' => 'Huerto Premium Familiar',
            'costoRecompensa' => 280.00,
            'descripcionRecompensa' => "Máxima producción en casa:\n- Kit doble (2 unidades modulares)\n- Sistema de riego automático integrado\n- Videollamada de asesoría (30 min)",
            'tipoEntrega' => 'fisica',
        ]);

        Recompensa::create([
            'idProyecto' => 1,
            'nombreRecompensa' => 'Socio Fundador',
            'costoRecompensa' => 550.00,
            'descripcionRecompensa' => "Impacto total:\n- 2 Kits completisimos\n- Tu nombre tallado en la estructura\n- Invitación VIP a la granja piloto\n- Mención de honor permanente",
            'tipoEntrega' => 'fisica',
        ]);

        // ---------------------------------------------------------
        // PROYECTO 2: NextGen Drone (Exploración Autónoma)
        // ---------------------------------------------------------
        Recompensa::create([
            'idProyecto' => 2,
            'nombreRecompensa' => 'Explorador Digital',
            'costoRecompensa' => 10.00,
            'descripcionRecompensa' => "Apoyo tecnológico:\n- Wallpapers 4K del dron\n- Nombre en los créditos del software\n- Acceso al canal Beta de pruebas",
            'tipoEntrega' => 'digital',
        ]);

        Recompensa::create([
            'idProyecto' => 2,
            'nombreRecompensa' => 'Kit de Montaje (Chasis)',
            'costoRecompensa' => 85.00,
            'descripcionRecompensa' => "Para los amantes del DIY:\n- Chasis completo impreso en 3D\n- Planos de ensamblaje detallados\n- Pegatinas exclusivas 'NextGen'",
            'tipoEntrega' => 'fisica',
        ]);

        Recompensa::create([
            'idProyecto' => 2,
            'nombreRecompensa' => 'Módulo Sensorial Pack',
            'costoRecompensa' => 180.00,
            'descripcionRecompensa' => "Mejora tu visión:\n- Sensores de proximidad láser\n- Cámara HD de repuesto\n- Lector de telemetría por Bluetooth",
            'tipoEntrega' => 'fisica',
        ]);

        Recompensa::create([
            'idProyecto' => 2,
            'nombreRecompensa' => 'NextGen Drone Explorer',
            'costoRecompensa' => 550.00,
            'descripcionRecompensa' => "La experiencia completa:\n- Dron NextGen listo para volar\n- Mando de control remoto\n- Estuche rígido de transporte\n- 2 Baterías extra",
            'tipoEntrega' => 'fisica',
        ]);

        Recompensa::create([
            'idProyecto' => 2,
            'nombreRecompensa' => 'Pack Fotogrametría Pro',
            'costoRecompensa' => 1200.00,
            'descripcionRecompensa' => "Uso comercial y técnico:\n- Dron con Cámara Térmica\n- Licencia de software de mapeo 3D\n- Curso online de pilotaje avanzado",
            'tipoEntrega' => 'fisica',
        ]);

        // ---------------------------------------------------------
        // PROYECTO 3: Festival de Arte Comunitario 2026
        // ---------------------------------------------------------
        Recompensa::create([
            'idProyecto' => 3,
            'nombreRecompensa' => 'Amigo del Festival',
            'costoRecompensa' => 15.00,
            'descripcionRecompensa' => "Súmate al cambio:\n- Pulsera oficial de tela\n- Agradecimiento en redes sociales\n- Mapa digital de murales",
            'tipoEntrega' => 'mixta',
        ]);

        Recompensa::create([
            'idProyecto' => 3,
            'nombreRecompensa' => 'Pack Merchandising Creativo',
            'costoRecompensa' => 45.00,
            'descripcionRecompensa' => "Lleva el arte contigo:\n- Camiseta de algodón orgánico\n- Bolsa de tela (Tote Bag) ilustrada\n- Set de pegatinas de artistas locales",
            'tipoEntrega' => 'fisica',
        ]);

        Recompensa::create([
            'idProyecto' => 3,
            'nombreRecompensa' => 'Tallerista VIP',
            'costoRecompensa' => 110.00,
            'descripcionRecompensa' => "Aprende de los mejores:\n- Acceso a 3 talleres (muralismo/DJ)\n- Kit de materiales necesario\n- Merienda con los talleristas",
            'tipoEntrega' => 'mixta',
        ]);

        Recompensa::create([
            'idProyecto' => 3,
            'nombreRecompensa' => 'Mecenas del Mural',
            'costoRecompensa' => 260.00,
            'descripcionRecompensa' => "Deja tu huella:\n- Tu nombre integrado en un mural\n- Lámina firmada por el artista\n- Foto profesional del proceso",
            'tipoEntrega' => 'mixta',
        ]);

        Recompensa::create([
            'idProyecto' => 3,
            'nombreRecompensa' => 'Patrocinador Honorífico',
            'costoRecompensa' => 1600.00,
            'descripcionRecompensa' => "Socio principal:\n- Mural entero dedicado a tu negocio\n- Placa conmemorativa de acero\n- Ubicación preferente en toda la publicidad",
            'tipoEntrega' => 'mixta',
        ]);

        // ---------------------------------------------------------
        // PROYECTO 4: Mochila Solar "SunPack"
        // ---------------------------------------------------------
        Recompensa::create([
            'idProyecto' => 4,
            'nombreRecompensa' => 'Carga Digital',
            'costoRecompensa' => 10.00,
            'descripcionRecompensa' => "Conciencia solar:\n- Guía de eficiencia energética\n- Fondo de pantalla exclusivo\n- Registro en la web de fundadores",
            'tipoEntrega' => 'digital',
        ]);

        Recompensa::create([
            'idProyecto' => 4,
            'nombreRecompensa' => 'Power Bank SunPack',
            'costoRecompensa' => 40.00,
            'descripcionRecompensa' => "Siente la energía:\n- Batería de 15.000 mAh\n- Logo SunPack grabado en láser\n- Cable de carga rápida universal",
            'tipoEntrega' => 'fisica',
        ]);

        Recompensa::create([
            'idProyecto' => 4,
            'nombreRecompensa' => 'SunPack Early Bird',
            'costoRecompensa' => 135.00,
            'descripcionRecompensa' => "Ahorra reservando antes:\n- Mochila SunPack original\n- Descuento del 30% sobre el PVP\n- Envío prioritario",
            'tipoEntrega' => 'fisica',
        ]);

        Recompensa::create([
            'idProyecto' => 4,
            'nombreRecompensa' => 'SunPack Explorer Edition',
            'costoRecompensa' => 195.00,
            'descripcionRecompensa' => "Lista para la aventura:\n- Mochila SunPack\n- Panel extra acoplable\n- Protector de lluvia reflectante\n- Botella de agua sostenible",
            'tipoEntrega' => 'fisica',
        ]);

        Recompensa::create([
            'idProyecto' => 4,
            'nombreRecompensa' => 'SunPack Partner (Dúo)',
            'costoRecompensa' => 350.00,
            'descripcionRecompensa' => "Para viajar en pareja:\n- 2 Mochilas SunPack Explorer\n- Regalo sorpresa de la marca\n- Envío internacional gratuito",
            'tipoEntrega' => 'fisica',
        ]);

        // ---------------------------------------------------------
        // PROYECTO 5: Indie Game: The Lost World
        // ---------------------------------------------------------
        Recompensa::create([
            'idProyecto' => 5,
            'nombreRecompensa' => 'Copia Digital',
            'costoRecompensa' => 20.00,
            'descripcionRecompensa' => "Entra en el mundo:\n- Juego completo (Steam/Epic)\n- Tu nombre en los créditos\n- Rol exclusivo en Discord",
            'tipoEntrega' => 'digital',
        ]);

        Recompensa::create([
            'idProyecto' => 5,
            'nombreRecompensa' => 'Edición Explorador',
            'costoRecompensa' => 45.00,
            'descripcionRecompensa' => "Contenido extra:\n- Todo lo anterior\n- Libro de Arte digital\n- Banda Sonora Original (OST)\n- Guía de supervivencia detallada",
            'tipoEntrega' => 'digital',
        ]);

        Recompensa::create([
            'idProyecto' => 5,
            'nombreRecompensa' => 'Season Pass Edition',
            'costoRecompensa' => 85.00,
            'descripcionRecompensa' => "Juego para siempre:\n- Todos los DLCs futuros gratuitos\n- Skins exclusivas de lanzamiento\n- Acceso anticipado (1 semana)",
            'tipoEntrega' => 'digital',
        ]);

        Recompensa::create([
            'idProyecto' => 5,
            'nombreRecompensa' => 'NPC Inmortalizado',
            'costoRecompensa' => 350.00,
            'descripcionRecompensa' => "Sé parte de la historia:\n- Un NPC llevará tu nombre\n- Elige una línea de diálogo\n- Postal física firmada por el equipo",
            'tipoEntrega' => 'mixta',
        ]);

        Recompensa::create([
            'idProyecto' => 5,
            'nombreRecompensa' => 'Arquitecto de Zonas',
            'costoRecompensa' => 1100.00,
            'descripcionRecompensa' => "Diseño creativo:\n- Diseña un rincón del mapa con nosotros\n- Crudo de desarrollo del juego\n- Aparece como 'Productor Asociado'",
            'tipoEntrega' => 'mixta',
        ]);

        // ---------------------------------------------------------
        // PROYECTO 6: Filtro de Agua Inteligente
        // ---------------------------------------------------------
        Recompensa::create([
            'idProyecto' => 6,
            'nombreRecompensa' => 'Gota de Apoyo',
            'costoRecompensa' => 15.00,
            'descripcionRecompensa' => "Aporta al cambio:\n- Certificado digital de impacto\n- Boletín trimestral de proyectos\n- Agradecimiento público en web",
            'tipoEntrega' => 'digital',
        ]);

        Recompensa::create([
            'idProyecto' => 6,
            'nombreRecompensa' => 'Kit de Mantenimiento',
            'costoRecompensa' => 50.00,
            'descripcionRecompensa' => "Para usuarios actuales:\n- 2 Cartuchos de nanotubos\n- Kit de limpieza profesional\n- Guía de uso extendido",
            'tipoEntrega' => 'fisica',
        ]);

        Recompensa::create([
            'idProyecto' => 6,
            'nombreRecompensa' => 'Filtro Inteligente Basic',
            'costoRecompensa' => 110.00,
            'descripcionRecompensa' => "Tu agua segura siempre:\n- El dispositivo purificador inteligente\n- Pack de inicio de filtros\n- Acceso a la App de monitoreo",
            'tipoEntrega' => 'fisica',
        ]);

        Recompensa::create([
            'idProyecto' => 6,
            'nombreRecompensa' => 'Pack Aventura Total',
            'costoRecompensa' => 170.00,
            'descripcionRecompensa' => "Para viajeros extremos:\n- Filtro Inteligente\n- Funda protectora de silicona\n- 4 Filtros de repuesto\n- Linterna solar compacta",
            'tipoEntrega' => 'fisica',
        ]);

        Recompensa::create([
            'idProyecto' => 6,
            'nombreRecompensa' => 'Sponsor de Impacto Social',
            'costoRecompensa' => 1200.00,
            'descripcionRecompensa' => "Haz el bien a lo grande:\n- 5 Filtros para tu uso personal\n- Donamos 10 filtros a una ONG en tu nombre\n- Reporte detallado de impacto con fotos",
            'tipoEntrega' => 'mixta',
        ]);
    }
}