
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import HeaderPublic from "../../components/public/header_public";
import FooterPublic from "../../components/public/footer_public";

// --- Valores por defecto (Fallback) ---
const DEFAULT_CONTENT = {
    about_hero_badge: "Nuestra historia",
    about_hero_title: "Nuestra Historia de Impacto",
    about_hero_text: "RiseTogether nació con una idea simple: conectar sueños con oportunidades. Creemos que cada gran idea merece la oportunidad de brillar, sin importar de dónde venga.",
    about_mission_title: "Nuestra Misión",
    about_mission_text: "Democratizar el acceso a la financiación para creadores, innovadores y soñadores de todo el mundo. Queremos ser el trampolín que convierte ideas en realidad.",
    about_mission_highlight: "Hemos ayudado a financiar más de 500 proyectos en el último año.",
    about_values_title: "Nuestros Valores",
    about_values_subtitle: "Los principios que guían cada paso que damos."
};

// --- Componentes Auxiliares ---

function ValorCard({ icon, title, text }) {
    return (
        <div className="p-8 bg-white dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800 rounded-xl hover:border-[#f2780d]/50 transition-all group">
            <span className="material-symbols-outlined text-[#f2780d] mb-4 group-hover:scale-110 transition-transform">{icon}</span>
            <h3 className="text-xl font-bold mb-2">{title}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">{text}</p>
        </div>
    );
}

function Paso({ n, title, text }) {
    return (
        <div className="flex flex-col items-center text-center gap-6">
            <div className="size-16 rounded-full bg-[#f2780d] text-white flex items-center justify-center text-2xl font-black shadow-lg shadow-[#f2780d]/30">
                {n}
            </div>
            <h3 className="text-xl font-bold">{title}</h3>
            <p className="text-gray-500 dark:text-gray-400">{text}</p>
        </div>
    );
}

function AdminCard({ admin }) {
    const { name = "Administrador", roleLabel = "Administrador", avatarUrl } = admin || {};
    const img = avatarUrl || "/img/admin-placeholder.png";

    return (
        <div className="flex flex-col items-center text-center gap-4">
            <div
                className="size-32 rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-xl bg-cover bg-center"
                style={{ backgroundImage: `url('${img}')` }}
            />
            <div>
                <h4 className="font-bold">{name}</h4>
                <p className="text-sm text-[#f2780d]">{roleLabel}</p>
            </div>
        </div>
    );
}

// --- Componente Principal ---

export default function AboutPage() {
    const [team, setTeam] = useState([]);
    const [content, setContent] = useState(DEFAULT_CONTENT); // Inicializar con defaults
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        window.axios.get('/api/about-us')
            .then(response => {
                setTeam(response.data.team || []);
                // Fusionar defaults con datos de API para asegurar que no haya nulos
                setContent(prev => ({ ...prev, ...response.data.content }));
            })
            .catch(error => console.error("Error fetching about data:", error))
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#f9f8f6] dark:bg-[#120c07]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#f2780d]"></div>
            </div>
        );
    }

    return (
        <div className="bg-[#f9f8f6] dark:bg-[#120c07] text-[#1c140d] dark:text-gray-100 transition-colors duration-300 min-h-screen">
            <HeaderPublic />

            <main className="max-w-[1200px] mx-auto px-6 py-12 md:py-20">
                {/* HERO */}
                <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
                    <div className="flex flex-col gap-6">
                        <span className="inline-block px-3 py-1 text-xs font-bold tracking-widest uppercase text-[#f2780d] bg-[#f2780d]/10 rounded-full w-fit">
                            {content.about_hero_badge}
                        </span>

                        <h1 dangerouslySetInnerHTML={{ __html: content.about_hero_title }} className="text-5xl md:text-6xl font-black leading-[1.1] tracking-tight text-[#1c140d] dark:text-white" />

                        <p className="text-lg md:text-xl text-[#9c7049] dark:text-gray-400 leading-relaxed max-w-lg">
                            {content.about_hero_text}
                        </p>

                        <div className="flex flex-wrap gap-4 pt-4">
                            <Link to="/proyectos" className="px-8 py-4 bg-[#f2780d] text-white font-bold rounded-xl text-lg hover:translate-y-[-2px] transition-all shadow-xl shadow-[#f2780d]/20">
                                Explorar campañas
                            </Link>
                            <button
                                onClick={() => document.getElementById('mision').scrollIntoView({ behavior: 'smooth' })}
                                className="px-8 py-4 bg-[#f4ede7] dark:bg-gray-800 text-[#1c140d] dark:text-white font-bold rounded-xl text-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-all"
                            >
                                Nuestra visión
                            </button>
                        </div>
                    </div>

                    <div className="relative group">
                        <div className="absolute -inset-4 bg-[#f2780d]/20 rounded-xl blur-2xl group-hover:bg-[#f2780d]/30 transition-all" />
                        <div
                            className="relative h-[400px] w-full bg-cover bg-center rounded-xl shadow-2xl border-4 border-white dark:border-gray-800"
                            style={{ backgroundImage: `url('/img/grupo.png')` }}
                        />
                    </div>
                </section>

                {/* MISIÓN */}
                <section id="mision" className="mb-24">
                    <div className="bg-white dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800 rounded-xl p-8 md:p-12 flex flex-col md:flex-row gap-10 items-center">
                        <div className="w-full md:w-1/3 aspect-square bg-[#f2780d]/5 rounded-xl flex items-center justify-center">
                            <span className="material-symbols-outlined text-[120px] text-[#f2780d]">
                                rocket_launch
                            </span>
                        </div>

                        <div className="flex-1 space-y-4">
                            <h2 className="text-3xl font-bold">{content.about_mission_title}</h2>
                            <p className="text-xl text-[#9c7049] dark:text-gray-400 leading-relaxed">
                                {content.about_mission_text}
                            </p>
                            <p className="text-lg font-medium text-[#f2780d]">
                                {content.about_mission_highlight}
                            </p>
                        </div>
                    </div>
                </section>

                {/* VALORES */}
                <section className="mb-24">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">{content.about_values_title}</h2>
                        <p className="text-gray-500 dark:text-gray-400">
                            {content.about_values_subtitle}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        <ValorCard icon="visibility" title="Transparencia" text="Comunicación abierta y reportes honestos en cada paso del camino." />
                        <ValorCard icon="groups" title="Comunidad" text="Creemos en el poder colectivo para generar cambios reales." />
                        <ValorCard icon="lightbulb" title="Innovación" text="Creamos herramientas mejores para ayudar a impulsar ideas." />
                        <ValorCard icon="public" title="Inclusión" text="Una plataforma donde la financiación sea accesible para todos." />
                    </div>
                </section>

                {/* CÓMO FUNCIONA */}
                <section className="mb-24 py-16 bg-white/50 dark:bg-gray-900/30 rounded-xl px-8">
                    <h2 className="text-3xl font-bold text-center mb-16">Cómo funciona</h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        <Paso n="1" title="Crea un proyecto" text="Define tus objetivos, fija tu meta y cuenta tu historia al mundo." />
                        <Paso n="2" title="Comparte con la comunidad" text="Usa nuestras herramientas para llegar a personas que creen en tu idea." />
                        <Paso n="3" title="Alcanza tu meta" text="Recauda fondos, comparte actualizaciones y hazlo realidad." />
                    </div>
                </section>

                {/* EQUIPO (Admins) */}
                <section className="mb-24">
                    <h2 className="text-3xl font-bold text-center mb-12">Conoce al equipo</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {team.map((admin) => (
                            <AdminCard key={admin.id} admin={admin} />
                        ))}
                    </div>
                    {team.length === 0 && (
                        <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
                            No se encontraron administradores.
                        </p>
                    )}
                </section>

                {/* CTA FINAL */}
                <section className="mb-12">
                    <div className="bg-[#f2780d]/10 dark:bg-[#f2780d]/5 rounded-xl p-12 text-center flex flex-col items-center gap-8 border border-[#f2780d]/20">
                        <h2 className="text-4xl font-black max-w-2xl">¿Lista/o para marcar la diferencia?</h2>
                        <div className="flex flex-wrap justify-center gap-4">
                            <Link to="/crear-proyecto" className="px-10 py-4 bg-[#f2780d] text-white font-bold rounded-xl text-lg hover:scale-105 transition-transform">
                                Lanza tu proyecto
                            </Link>
                            <Link to="/proyectos" className="px-10 py-4 bg-white dark:bg-gray-800 text-[#1c140d] dark:text-white font-bold rounded-xl text-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-all border border-[#f2780d]/20">
                                Explorar proyectos
                            </Link>
                        </div>
                    </div>
                </section>
            </main>

            <FooterPublic />
        </div>
    );
}