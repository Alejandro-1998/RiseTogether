<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SiteContentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $contents = [
            // HERO
            ['key' => 'about_hero_badge', 'value' => 'Nuestra historia', 'group' => 'about_us'],
            ['key' => 'about_hero_title', 'value' => 'Impulsando <span className="text-[#f2780d]">sueños</span>, juntos', 'group' => 'about_us'],
            ['key' => 'about_hero_text', 'value' => 'Una plataforma moderna de crowdfunding basada en transparencia, innovación y el poder de la comunidad. Únete a miles de creadores generando impacto.', 'group' => 'about_us'],
            ['key' => 'about_hero_image', 'value' => '/img/grupo.png', 'group' => 'about_us'],

            // MISSION
            ['key' => 'about_mission_title', 'value' => 'Nuestra misión', 'group' => 'about_us'],
            ['key' => 'about_mission_text', 'value' => 'RiseTogether nace para conectar a personas con ideas con una comunidad dispuesta a apoyarlas. Creemos que cuando la gente se une, lo imposible se vuelve alcanzable. Nuestro objetivo es democratizar el acceso a la financiación para cualquiera, en cualquier lugar.', 'group' => 'about_us'],
            ['key' => 'about_mission_highlight', 'value' => 'Un mundo donde cada gran idea encuentre su impulso.', 'group' => 'about_us'],

            // VALUES (Just titles for simplicity, or full objects if we want)
            ['key' => 'about_values_title', 'value' => 'Nuestros valores', 'group' => 'about_us'],
            ['key' => 'about_values_subtitle', 'value' => 'Los principios que guían cada decisión que tomamos.', 'group' => 'about_us'],
        ];

        foreach ($contents as $content) {
            \App\Models\SiteContent::updateOrCreate(
                ['key' => $content['key']],
                $content
            );
        }
    }
}
