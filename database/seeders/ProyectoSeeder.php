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
            'descripcion'           => 'NextGen Drone: Exploración Autónoma es un proyecto de vanguardia que busca democratizar el acceso a la tecnología aérea avanzada. Diseñado para ofrecer una plataforma robusta y versátil, este dron no es solo un juguete, sino una herramienta de precisión para profesionales y entusiastas de la tecnología.

🚀 Visión del proyecto

El objetivo es crear un ecosistema de hardware y software abierto que permita la exploración autónoma en entornos donde el GPS es limitado o inexistente. Utilizando algoritmos de IA de última generación y visión computacional, el NextGen Drone puede mapear cuevas, bosques densos y estructuras industriales de forma independiente.

🛠️ Innovaciones Técnicas

- Chasis Impreso en 3D: Construido con filamentos reforzados de fibra de carbono para una relación resistencia-peso inigualable.
- Sistema de Navegación SLAM: Permite la localización y mapeo simultáneos sin depender de señales externas.
- Autonomía Extendida: Optimización de motores y baterías para vuelos de hasta 45 minutos.
- Sensores Multiespectrales: Capacidad de equipar cámaras térmicas y de infrarrojos para misiones de búsqueda y rescate.

Los fondos recaudados se utilizarán para finalizar el desarrollo del software de evasión de obstáculos y miniaturizar los componentes de procesamiento necesarios para la autonomía total.',
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
            'descripcion'           => 'El Festival de Arte Comunitario 2026 es una iniciativa cultural vibrante diseñada para transformar el paisaje urbano de nuestra ciudad a través de la creatividad colectiva y la expresión artística. No es solo un evento, es un movimiento para reclamar los espacios públicos y fortalecer los lazos vecinales.

🎨 Visión Artística

Buscamos convertir muros grises en lienzos de esperanza y calles vacías en escenarios de talento local. El festival integrará diversas disciplinas, desde el muralismo y la escultura con materiales reciclados hasta la música experimental y la danza contemporánea, siempre bajo un enfoque de sostenibilidad y respeto por el entorno.

🌟 Lo que el Festival ofrece:

- Murales Participativos: Artistas de renombre colaborarán con vecinos para crear obras monumentales en barrios periféricos.
- Talleres de Reciclaje Creativo: Espacios para aprender a transformar residuos en obras de arte.
- Escenarios Sostenibles: Toda la potencia eléctrica del festival provendrá de generadores solares y bicicletas generadoras de energía.
- Feria de Emprendimiento Local: Un espacio para que artesanos y creativos de la zona muestren y vendan sus productos.

Tu apoyo ayudará a financiar el alquiler de equipos de sonido profesionales, la compra de pinturas ecológicas de alta durabilidad y la logística para los más de 50 artistas invitados.',
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
            'descripcion'           => 'La Mochila Solar "SunPack" es la solución definitiva para quienes viven en constante movimiento y necesitan mantener sus dispositivos cargados sin depender de una toma de corriente. Es la unión perfecta entre diseño ergonómico, tecnología fotovoltaica de alta eficiencia y materiales sostenibles.

☀️ Energía en Movimiento

SunPack no es una mochila convencional; es una estación de energía portátil. Equipada con paneles solares flexibles de última generación integrados suavemente en su cara externa, permite cargar smartphones, tablets y laptops simplemente caminando bajo el sol o dejándola expuesta durante un descanso.

🔋 Características Principales:

- Paneles Solares de Alta Eficiencia: Células monocristalinas que funcionan incluso en días nublados.
- Power Bank Integrado: Batería de 20,000 mAh que almacena el exceso de energía para usarla de noche.
- Materiales Reciclados: Tejido fabricado a partir de plásticos rescatados del océano (PET reciclado).
- Diseño Antirrobo: Cremalleras ocultas y bolsillos internos protegidos con RFID.
- Ergonomía Avanzada: Sistema de distribución de peso para evitar la fatiga en largas caminatas.

Este proyecto ya ha superado con éxito su fase de prototipado y estamos listos para la producción en masa con tu ayuda.',
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
            'descripcion'           => 'Indie Game: The Lost World es un RPG de supervivencia y exploración ambientado en un mundo post-apocalíptico donde la naturaleza ha reclamado las grandes metrópolis. Un proyecto nacido de la pasión por los videojuegos clásicos fusionado con mecánicas modernas de narrativa emergente.

🗺️ El Mundo Perdido

Los jugadores explorarán ciudades en ruinas cubiertas de vegetación exuberante, donde cada decisión cuenta y el entorno reacciona a sus acciones. No se trata solo de sobrevivir, sino de descubrir los secretos de una civilización caída y decidir el destino de los nuevos asentamientos humanos.

🎮 Jugabilidad y Características:

- Sistema de Crafteo Realista: Crea herramientas y refugios utilizando la física del juego para mayor inmersión.
- Gráficos Estilizados (Low Poly): Una estética visual única que permite mundos vastos y detallados con requisitos técnicos accesibles.
- Narrativa Basada en Decisiones: Múltiples finales y un sistema de reputación con las diferentes facciones supervivientes.
- Banda Sonora Original: Música ambiental que se adapta dinámicamente a la tensión y la atmósfera del juego.

Gracias a la increíble respuesta inicial, estamos incorporando expansiones gratuitas, un modo multijugador cooperativo y herramientas de modding para que la comunidad amplíe este universo infinito.',
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
            'descripcion'           => 'El Filtro de Agua Inteligente es una respuesta tecnológica avanzada a la crisis de acceso a agua potable en zonas remotas o situaciones de emergencia. Combinamos la ciencia de materiales moderna con la conectividad inteligente para garantizar agua segura en cualquier circunstancia.

💧 Agua Pura, Datos Claros

Este dispositivo no solo filtra impurezas, sino que monitoriza la calidad del agua en tiempo real. Utilizando una membrana de nano-filtración patentada, elimina el 99.9% de bacterias, virus y microplásticos, mientras envía un informe detallado a tu smartphone sobre la pureza del líquido resultante.

🔍 Tecnología de Vanguardia:

- Membrana de Nanotubos de Carbono: Filtración ultrafina que no requiere productos químicos ni electricidad para funcionar la mayoría del tiempo.
- Conectividad Bluetooth: Avisa al usuario cuando la capacidad del filtro llega al 10%.
- Sensor de Pureza TDS: Mide los sólidos disueltos totales y garantiza que el agua cumpla con los estándares de la OMS.
- Diseño Compacto y Ligero: Fácil de transportar en una mochila, ideal para aventureros, cooperantes internacionales y ayuda humanitaria.

Hemos desarrollado una solución de bajo costo y larga duración que ya está impactando vidas de forma positiva.',
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
