import HeaderPublic from "../../components/public/header_public";
import FooterPublic from "../../components/public/footer_public";

// ✅ Card reutilizable para valores
function ValorCard({ icon, title, text }) {
    return (
        <div className="p-8 bg-white dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800 rounded-xl hover:border-[#f2780d]/50 transition-all group">
            <span className="material-symbols-outlined text-[#f2780d] mb-4 group-hover:scale-110 transition-transform">
                {icon}
            </span>
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

// ✅ Componente listo para admins (foto + nombre + rol)
function AdminCard({ admin }) {
    const name = admin?.name || "Administrador";
    const roleLabel = admin?.roleLabel || "Administrador";
    const img = admin?.avatarUrl || "/img/admin-placeholder.png"; // 👈 placeholder local (ponlo si quieres)

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

export default function AboutPage({ admins = [] }) {
    // ✅ Si aún no estás trayendo admins desde Laravel, usamos fallback de 4 “huecos”
    const adminsFinal = admins?.length
        ? admins.slice(0, 4)
        : [
            { id: 1, name: "Administrador 1", roleLabel: "Admin", avatarUrl: "/img/admin-placeholder.png" },
            { id: 2, name: "Administrador 2", roleLabel: "Admin", avatarUrl: "/img/admin-placeholder.png" },
            { id: 3, name: "Administrador 3", roleLabel: "Admin", avatarUrl: "/img/admin-placeholder.png" },
            { id: 4, name: "Administrador 4", roleLabel: "Admin", avatarUrl: "/img/admin-placeholder.png" },
        ];

    return (
        <div className="bg-[#f9f8f6] dark:bg-[#120c07] text-[#1c140d] dark:text-gray-100 transition-colors duration-300 min-h-screen">
            <HeaderPublic />

            <main className="max-w-[1200px] mx-auto px-6 py-12 md:py-20">
                {/* HERO */}
                <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
                    <div className="flex flex-col gap-6">
                        <span className="inline-block px-3 py-1 text-xs font-bold tracking-widest uppercase text-[#f2780d] bg-[#f2780d]/10 rounded-full w-fit">
                            Nuestra historia
                        </span>

                        <h1 className="text-5xl md:text-6xl font-black leading-[1.1] tracking-tight text-[#1c140d] dark:text-white">
                            Impulsando <span className="text-[#f2780d]">sueños</span>, juntos
                        </h1>

                        <p className="text-lg md:text-xl text-[#9c7049] dark:text-gray-400 leading-relaxed max-w-lg">
                            Una plataforma moderna de crowdfunding basada en transparencia, innovación
                            y el poder de la comunidad. Únete a miles de creadores generando impacto.
                        </p>

                        <div className="flex flex-wrap gap-4 pt-4">
                            <button className="px-8 py-4 bg-[#f2780d] text-white font-bold rounded-xl text-lg hover:translate-y-[-2px] transition-all shadow-xl shadow-[#f2780d]/20">
                                Explorar campañas
                            </button>
                            <button className="px-8 py-4 bg-[#f4ede7] dark:bg-gray-800 text-[#1c140d] dark:text-white font-bold rounded-xl text-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-all">
                                Nuestra visión
                            </button>
                        </div>
                    </div>

                    <div className="relative group">
                        <div className="absolute -inset-4 bg-[#f2780d]/20 rounded-xl blur-2xl group-hover:bg-[#f2780d]/30 transition-all" />
                        <div
                            className="relative h-[400px] w-full bg-cover bg-center rounded-xl shadow-2xl border-4 border-white dark:border-gray-800"
                            style={{
                                backgroundImage:
                                    "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBkLgXbLpfrHiwIVGjDc9O6bYOVk1oAnqdLyoieStMVXhxVfpj57IUS_9NfTb78kh9cNGj3_nRRQ_TYnJSdAFr_EXtjCPqjmQGI1scYaElczyILKxdEJXpbm5EiWhjaYOoGx2x30P_nbGYzIzvnfXBc9P9mHPdaUZDRoYVnNA-h4fhby-s56gVlzqBw6clq55B5JoCkqkWZ8ZPI7nhFRchpWSwBBU-rkGF6wGhWCNlPBEDnUwVSmsMN6hTcw9WqtAUUqwhsWkSt7Uc')",
                            }}
                        />
                    </div>
                </section>

                {/* MISIÓN */}
                <section className="mb-24">
                    <div className="bg-white dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800 rounded-xl p-8 md:p-12 flex flex-col md:flex-row gap-10 items-center">
                        <div className="w-full md:w-1/3 aspect-square bg-[#f2780d]/5 rounded-xl flex items-center justify-center">
                            <span className="material-symbols-outlined text-[120px] text-[#f2780d]">
                                rocket_launch
                            </span>
                        </div>

                        <div className="flex-1 space-y-4">
                            <h2 className="text-3xl font-bold">Nuestra misión</h2>
                            <p className="text-xl text-[#9c7049] dark:text-gray-400 leading-relaxed">
                                RiseTogether nace para conectar a personas con ideas con una comunidad
                                dispuesta a apoyarlas. Creemos que cuando la gente se une, lo imposible
                                se vuelve alcanzable. Nuestro objetivo es democratizar el acceso a la financiación
                                para cualquiera, en cualquier lugar.
                            </p>
                            <p className="text-lg font-medium text-[#f2780d]">
                                Un mundo donde cada gran idea encuentre su impulso.
                            </p>
                        </div>
                    </div>
                </section>

                {/* VALORES */}
                <section className="mb-24">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Nuestros valores</h2>
                        <p className="text-gray-500 dark:text-gray-400">
                            Los principios que guían cada decisión que tomamos.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        <ValorCard
                            icon="visibility"
                            title="Transparencia"
                            text="Comunicación abierta y reportes honestos en cada paso del camino."
                        />
                        <ValorCard
                            icon="groups"
                            title="Comunidad"
                            text="Creemos en el poder colectivo para generar cambios reales."
                        />
                        <ValorCard
                            icon="lightbulb"
                            title="Innovación"
                            text="Creamos herramientas mejores para ayudar a impulsar ideas."
                        />
                        <ValorCard
                            icon="public"
                            title="Inclusión"
                            text="Una plataforma donde la financiación sea accesible para todos."
                        />
                    </div>
                </section>

                {/* CÓMO FUNCIONA */}
                <section className="mb-24 py-16 bg-white/50 dark:bg-gray-900/30 rounded-xl px-8">
                    <h2 className="text-3xl font-bold text-center mb-16">Cómo funciona</h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        <Paso
                            n="1"
                            title="Crea un proyecto"
                            text="Define tus objetivos, fija tu meta y cuenta tu historia al mundo."
                        />
                        <Paso
                            n="2"
                            title="Comparte con la comunidad"
                            text="Usa nuestras herramientas para llegar a personas que creen en tu idea."
                        />
                        <Paso
                            n="3"
                            title="Alcanza tu meta"
                            text="Recauda fondos, comparte actualizaciones y hazlo realidad."
                        />
                    </div>
                </section>

                {/* EQUIPO (Admins) */}
                <section className="mb-24">
                    <h2 className="text-3xl font-bold text-center mb-12">
                        Conoce al equipo
                    </h2>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {adminsFinal.map((admin) => (
                            <AdminCard key={admin.id} admin={admin} />
                        ))}
                    </div>

                    <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
                        *Este bloque está preparado para mostrar automáticamente a los 4 usuarios con rol administrador.
                    </p>
                </section>

                {/* CTA FINAL */}
                <section className="mb-12">
                    <div className="bg-[#f2780d]/10 dark:bg-[#f2780d]/5 rounded-xl p-12 text-center flex flex-col items-center gap-8 border border-[#f2780d]/20">
                        <h2 className="text-4xl font-black max-w-2xl">
                            ¿Lista/o para marcar la diferencia?
                        </h2>

                        <div className="flex flex-wrap justify-center gap-4">
                            <button className="px-10 py-4 bg-[#f2780d] text-white font-bold rounded-xl text-lg hover:scale-105 transition-transform">
                                Lanza tu proyecto
                            </button>
                            <button className="px-10 py-4 bg-white dark:bg-gray-800 text-[#1c140d] dark:text-white font-bold rounded-xl text-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-all border border-[#f2780d]/20">
                                Explorar proyectos
                            </button>
                        </div>
                    </div>
                </section>
            </main>

            <FooterPublic />
        </div>
    );
}