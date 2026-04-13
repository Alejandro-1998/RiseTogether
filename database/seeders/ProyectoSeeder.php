<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Proyecto;
use App\Models\User;
use App\Models\Categoria;
use Illuminate\Support\Str;

class ProyectoSeeder extends Seeder
{
    public function run(): void
    {
        // Aseguramos que existan al menos un usuario y una categoría
        $user = User::first() ?? User::factory()->create();

        // --- 3 PROYECTOS DESTACADOS (Top Proyectos) ---
        // Deben ser 'publicado' y 'ganadorEvento' => true

        Proyecto::create([
            'user_id'               => $user->id,
            'categoria_id'          => 6,
            'titulo'                => 'Eco-City Garden: Jardines Urbanos',
            'slug'                  => Str::slug('eco-city-garden-jardines-urbanos'),
            'descripcion'           => 'Eco-City Garden: Jardines Urbanos es un proyecto de crowdfunding que nace como respuesta a uno de los grandes desafíos de las ciudades modernas: la desconexión entre las personas y la naturaleza, y la necesidad urgente de sistemas alimentarios más sostenibles, locales y accesibles.

🌱 Visión del proyecto

Eco-City Garden busca transformar pequeños espacios urbanos —balcones, patios, azoteas o jardines comunitarios— en microecosistemas productivos. La idea central es democratizar el acceso al cultivo de alimentos frescos mediante kits de jardinería modulares, ecológicos y fáciles de usar, diseñados especialmente para entornos urbanos.

La imagen representa uno de los prototipos: una cama de cultivo elevada de madera, dividida en compartimentos, que permite organizar distintas plantas (hierbas aromáticas, vegetales de hoja, tomates, chiles, etc.) en un mismo espacio optimizado. Este diseño no solo facilita el mantenimiento, sino que también fomenta prácticas como la rotación de cultivos y la biodiversidad en miniatura.

🧩 ¿Qué ofrece Eco-City Garden?

El proyecto se centra en un kit integral de jardín urbano, que incluye:

- Estructura modular de madera sostenible: resistente, estética y fácil de montar sin herramientas complejas.
- Sistema de compartimentos inteligentes: permite separar cultivos según sus necesidades (agua, luz, nutrientes).
- Sustrato orgánico optimizado: mezcla rica en nutrientes, lista para usar.
- Selección de semillas ecológicas: adaptadas a climas urbanos y ciclos cortos.
- Guía educativa interactiva: acceso a contenido digital con instrucciones paso a paso, calendario de siembra y consejos de cuidado.
- Herramientas básicas de jardinería: como pala, guantes y marcadores de cultivo.

Eco-City Garden no es solo un producto, sino una iniciativa con impacto medible:

- Reducción de la huella de carbono: al fomentar el consumo de alimentos cultivados localmente.
- Educación ambiental: especialmente dirigida a familias y escuelas urbanas.
- Bienestar emocional: el contacto con la naturaleza reduce el estrés y mejora la calidad de vida.
- Comunidades más fuertes: promueve la creación de huertos comunitarios y redes de intercambio.

Lo que diferencia a Eco-City Garden de otros proyectos similares es su enfoque en la simplicidad + diseño + educación:

- Sistema pensado para principiantes absolutos.
- Diseño compacto ideal para espacios pequeños.
- Integración con una app (en desarrollo) que guía al usuario según clima, ubicación y tipo de cultivo.
- Posibilidad de expansión modular (añadir más unidades con el tiempo).

Los fondos se destinarán a:

- Producción sostenible a escala.
- Desarrollo tecnológico (app y sistema inteligente).
- Logística y distribución.
- Programas educativos en comunidades vulnerables.

Eco-City Garden aspira a convertirse en una red global de microhuertos urbanos interconectados, donde cada usuario no solo cultive alimentos, sino que también forme parte de un movimiento hacia ciudades más verdes, resilientes y autosuficientes.

En esencia, este proyecto convierte un simple cajón de cultivo en una herramienta de cambio urbano, ambiental y social. No se trata solo de plantar alimentos, sino de cultivar conciencia. 🌿',
            'objetivo_financiacion' => 15000.00,
            'cantidad_recaudada'    => 8500.00,
            'fecha_limite'          => now()->addDays(30),
            'estado'                => 'publicado',
            'ganadorEvento'         => true,
            'imagen_portada'        => 'img/jardines_urbanos.png',
        ]);

        Proyecto::create([
            'user_id'               => $user->id,
            'categoria_id'          => 7,
            'titulo'                => 'NextGen Drone: Exploración Autónoma',
            'slug'                  => Str::slug('nextgen-drone-exploracion-autonoma'),
            'descripcion'           => 'Desarrollo de drones impresos en 3D con capacidad de vuelo autónomo...',
            'objetivo_financiacion' => 50000.00,
            'cantidad_recaudada'    => 42000.00,
            'fecha_limite'          => now()->addDays(45),
            'estado'                => 'publicado',
            'ganadorEvento'         => true,
            'imagen_portada'        => 'img/dron.png',
        ]);

        Proyecto::create([
            'user_id'               => $user->id,
            'categoria_id'          => 3,
            'titulo'                => 'Festival de Arte Comunitario 2026',
            'slug'                  => Str::slug('festival-de-arte-comunitario-2026'),
            'descripcion'           => 'Apoya a los artistas locales financiando el alquiler de equipos...',
            'objetivo_financiacion' => 5000.00,
            'cantidad_recaudada'    => 1200.00,
            'fecha_limite'          => now()->addDays(15),
            'estado'                => 'publicado',
            'ganadorEvento'         => true,
            'imagen_portada'        => 'img/festival.png',
        ]);

        // --- 3 HISTORIAS DE ÉXITO ---
        // Deben ser 'completado' y recaudado >= 2 * objetivo

        Proyecto::create([
            'user_id'               => $user->id,
            'categoria_id'          => 6,
            'titulo'                => 'Mochila Solar "SunPack"',
            'slug'                  => Str::slug('mochila-solar-sunpack'),
            'descripcion'           => 'La mochila que revolucionó el mercado de accesorios sostenibles...',
            'objetivo_financiacion' => 5000.00,
            'cantidad_recaudada'    => 12000.00,
            'fecha_limite'          => now()->subDays(10),
            'estado'                => 'completado',
            'ganadorEvento'         => false,
            'imagen_portada'        => 'img/mochila.png',
            'updated_at'            => now(),
        ]);

        Proyecto::create([
            'user_id'               => $user->id,
            'categoria_id'          => 1,
            'titulo'                => 'Indie Game: The Lost World',
            'slug'                  => Str::slug('indie-game-the-lost-world'),
            'descripcion'           => 'Gracias a la comunidad pudimos añadir 3 expansiones gratuitas...',
            'objetivo_financiacion' => 10000.00,
            'cantidad_recaudada'    => 25000.00,
            'fecha_limite'          => now()->subDays(60),
            'estado'                => 'completado',
            'ganadorEvento'         => false,
            'imagen_portada'        => 'img/juego.png',
            'updated_at'            => now()->subMinutes(5),
        ]);

        Proyecto::create([
            'user_id'               => $user->id,
            'categoria_id'          => 6,
            'titulo'                => 'Filtro de Agua Inteligente',
            'slug'                  => Str::slug('filtro-de-agua-inteligente'),
            'descripcion'           => 'Desarrollamos una solución de bajo costo que ya está en uso...',
            'objetivo_financiacion' => 2000.00,
            'cantidad_recaudada'    => 5000.00,
            'fecha_limite'          => now()->subDays(100),
            'estado'                => 'completado',
            'ganadorEvento'         => false,
            'imagen_portada'        => 'img/filtro.png',
            'updated_at'            => now()->subMinutes(10),
        ]);
    }
}
