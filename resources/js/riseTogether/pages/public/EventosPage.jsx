import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import HeaderPublic from "../../components/public/header_public";
import FooterPublic from "../../components/public/footer_public";

export default function EventosPage() {
    // Estado para datos dinámicos
    const [projects, setProjects] = useState([]);
    const [timeLeft, setTimeLeft] = useState({ days: 4, hours: 23, minutes: 59, seconds: 59 });

    // Countdown Logic (Simulado para 5 días desde ahora o fecha fija)
    useEffect(() => {
        // Establecer fecha objetivo: 5 días desde el momento de carga
        const targetDate = new Date();
        targetDate.setDate(targetDate.getDate() + 5);

        const interval = setInterval(() => {
            const now = new Date();
            const difference = targetDate - now;

            if (difference <= 0) {
                clearInterval(interval);
            } else {
                setTimeLeft({
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                    seconds: Math.floor((difference / 1000) % 60),
                });
            }
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    // Fetch Projects Logic
    useEffect(() => {
        fetch('/api/proyectos')
            .then(res => res.json())
            .then(data => {
                // Ordenar por cantidad recaudada (simulando leaderboard)
                const sorted = data.sort((a, b) => Number(b.cantidad_recaudada) - Number(a.cantidad_recaudada));
                setProjects(sorted.slice(0, 5)); // Top 5
            })
            .catch(err => console.error("Error fetching projects:", err));
    }, []);

    return (
        <div className="bg-[#fcfaf8] dark:bg-[#1c140d] font-sans text-[#1c140d] dark:text-[#fcfaf8] transition-colors duration-200">
            <HeaderPublic />

            <main className="flex-1 w-full max-w-[1280px] mx-auto px-4 md:px-10 pb-20 pt-8">
                {/* Hero Section */}
                <section className="py-8 md:py-12 flex flex-col lg:flex-row gap-8 items-start">
                    {/* Left: Info & Timer */}
                    <div className="flex-1 flex flex-col gap-6 w-full">
                        <div className="flex flex-wrap gap-3">
                            <div className="inline-flex items-center justify-center gap-x-2 rounded-full bg-[#f27f0d]/10 dark:bg-[#f27f0d]/20 pl-3 pr-4 py-1.5 border border-[#f27f0d]/20">
                                <span className="material-symbols-outlined text-[#f27f0d] text-lg">monetization_on</span>
                                <p className="text-[#f27f0d] text-sm font-bold leading-normal">Meta: 50.000€ Recaudados</p>
                            </div>
                            <div className="inline-flex items-center justify-center gap-x-2 rounded-full bg-[#f4ede7] dark:bg-[#3a2d22] pl-3 pr-4 py-1.5">
                                <span className="material-symbols-outlined text-gray-500 text-lg">timer</span>
                                <p className="text-[#1c140d] dark:text-gray-300 text-sm font-medium leading-normal">Duración: 5 días</p>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <h1 className="text-[#1c140d] dark:text-white text-4xl md:text-5xl lg:text-6xl font-black leading-tight tracking-[-0.033em]">
                                Sprint de Financiación de 5 Días
                            </h1>
                            <p className="text-gray-600 dark:text-gray-400 text-lg md:text-xl max-w-xl">
                                Compite para recaudar la mayor cantidad de fondos y desbloquear beneficios en la plataforma. ¡El tiempo corre!
                            </p>
                        </div>
                        {/* Countdown */}
                        <div className="flex gap-3 md:gap-4 py-2">
                            <div className="flex flex-col items-center gap-2">
                                <div className="flex h-16 w-16 md:h-20 md:w-20 items-center justify-center rounded-xl bg-white dark:bg-[#2a221b] border border-[#f4ede7] dark:border-[#3a2d22] shadow-sm">
                                    <p className="text-[#1c140d] dark:text-white text-2xl md:text-3xl font-black">{String(timeLeft.days).padStart(2, '0')}</p>
                                </div>
                                <p className="text-xs uppercase tracking-wider font-semibold text-gray-500">Días</p>
                            </div>
                            <div className="flex flex-col items-center gap-2">
                                <div className="flex h-16 w-16 md:h-20 md:w-20 items-center justify-center rounded-xl bg-white dark:bg-[#2a221b] border border-[#f4ede7] dark:border-[#3a2d22] shadow-sm">
                                    <p className="text-[#1c140d] dark:text-white text-2xl md:text-3xl font-black">{String(timeLeft.hours).padStart(2, '0')}</p>
                                </div>
                                <p className="text-xs uppercase tracking-wider font-semibold text-gray-500">Horas</p>
                            </div>
                            <div className="flex flex-col items-center gap-2">
                                <div className="flex h-16 w-16 md:h-20 md:w-20 items-center justify-center rounded-xl bg-white dark:bg-[#2a221b] border border-[#f4ede7] dark:border-[#3a2d22] shadow-sm">
                                    <p className="text-[#1c140d] dark:text-white text-2xl md:text-3xl font-black">{String(timeLeft.minutes).padStart(2, '0')}</p>
                                </div>
                                <p className="text-xs uppercase tracking-wider font-semibold text-gray-500">Mins</p>
                            </div>
                            <div className="flex flex-col items-center gap-2">
                                <div className="flex h-16 w-16 md:h-20 md:w-20 items-center justify-center rounded-xl bg-white dark:bg-[#2a221b] border border-[#f4ede7] dark:border-[#3a2d22] shadow-sm">
                                    <p className="text-[#f27f0d] text-2xl md:text-3xl font-black animate-pulse">{String(timeLeft.seconds).padStart(2, '0')}</p>
                                </div>
                                <p className="text-xs uppercase tracking-wider font-semibold text-gray-500">Segs</p>
                            </div>
                        </div>
                        <div className="flex flex-wrap gap-4 pt-4">
                            <button
                                onClick={() => document.getElementById('leaderboard').scrollIntoView({ behavior: 'smooth' })}
                                className="flex items-center justify-center rounded-xl h-12 px-8 bg-linear-to-r from-[#f27f0d] to-[#ff9e3d] text-white text-base font-bold shadow-lg shadow-[#f27f0d]/30 hover:shadow-xl hover:shadow-[#f27f0d]/40 hover:-translate-y-0.5 transition-all">
                                Ver Clasificación
                            </button>
                            <Link to="/proyectos" className="flex items-center justify-center rounded-xl h-12 px-6 border-2 border-[#f4ede7] dark:border-[#3a2d22] bg-transparent text-[#1c140d] dark:text-white text-base font-bold hover:bg-[#f4ede7] dark:hover:bg-[#3a2d22] transition-colors">
                                Explorar Proyectos
                            </Link>
                        </div>
                    </div>
                    {/* Right: Widget (How to win & Rewards) */}
                    <div className="w-full lg:w-[400px] shrink-0">
                        <div className="relative overflow-hidden rounded-xl bg-white dark:bg-[#2a221b] border border-[#f4ede7] dark:border-[#3a2d22] p-6 shadow-sm">
                            {/* Abstract bg decoration */}
                            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-48 h-48 bg-[#f27f0d]/10 rounded-full blur-3xl"></div>
                            <div className="relative z-10 flex flex-col gap-6">
                                <div>
                                    <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
                                        <span className="material-symbols-outlined text-[#f27f0d]">emoji_events</span>
                                        Cómo Ganar
                                    </h3>
                                    <ul className="space-y-3">
                                        <li className="flex items-start gap-3">
                                            <div className="size-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center shrink-0 mt-0.5">
                                                <span className="material-symbols-outlined text-green-600 dark:text-green-400 text-sm">check</span>
                                            </div>
                                            <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Recauda la mayor cantidad de nuevos patrocinadores.</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <div className="size-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center shrink-0 mt-0.5">
                                                <span className="material-symbols-outlined text-green-600 dark:text-green-400 text-sm">check</span>
                                            </div>
                                            <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Mantén una alta participación (comentarios).</span>
                                        </li>
                                    </ul>
                                </div>
                                <div className="h-px bg-[#f4ede7] dark:bg-[#3a2d22] w-full"></div>
                                <div>
                                    <h3 className="text-lg font-bold mb-3">Recompensas</h3>
                                    <div className="flex gap-3">
                                        <div className="flex-1 rounded-lg bg-[#fcfaf8] dark:bg-[#1c140d] p-3 border border-[#f4ede7] dark:border-[#3a2d22] flex flex-col items-center text-center gap-2">
                                            <img className="rounded-full" alt="Icono 0% comisiones" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBWlXVTFEUL0dzf6DPvt8KeD1vIoHuYkiP__5GYy4rSkXJtH6DYcGnEGdd589TJcOgc7YoUiihgg20X26meGD9SW0oZFbNHI9NZan55rMzDBjXWyx-EfEUEAKOeQEp8oBczOjbmX0afK4XazykC0jVFbyfOaby7POy8Mhr1MuzeSm32WIo4eoMNazY6BTprhV2QJkEE6RTOXC_uITEyxmIQTgMT8iWciWB7c7Vzjlcz8OiCIanbOxVRKTbI2YI0_zBcdXoZEC9gcDI" />
                                            <span className="text-xs font-bold leading-tight">0% Comisiones</span>
                                        </div>
                                        <div className="flex-1 rounded-lg bg-[#fcfaf8] dark:bg-[#1c140d] p-3 border border-[#f4ede7] dark:border-[#3a2d22] flex flex-col items-center text-center gap-2">
                                            <img className="rounded-full" alt="Icono destacado" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAsgCC9J-DYiNdSvAFDDi3uRae4-jDA4PTaP5tapGE3Gd-S-mfcMf1mr7TlPIYblE3ZCBhooVfB3Zb0dnMujdUSD-BKFFkDyrmlF4zUzxR_iAhrInXiE_BmR0j3BYWmEpcP48hHT0FxJ37c4Qf6xBUu33wJPOEtVhcKj8cXmaLTR2TUhkR8SHddfVQchsGKAHtBXlJA6Sr62j2WKKu0x-gMFihVJP1Rf3ZIVSimQNWhOygZBKCf83LmQddgqGuvUYOzfUwz5FsAIl4" />
                                            <span className="text-xs font-bold leading-tight">Destacado</span>
                                        </div>
                                        <div className="flex-1 rounded-lg bg-[#fcfaf8] dark:bg-[#1c140d] p-3 border border-[#f4ede7] dark:border-[#3a2d22] flex flex-col items-center text-center gap-2">
                                            <img className="rounded-full" alt="Icono insignia oro" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA2JuHOvR5ohbyfRvM0qNkQU1XpgIGDFPFRgOI7NzHPBzkKmQPtAMvS1B0m28mq6nvOV0QQjyayk1jpRNhE6ehHtxmghR8Jrf6ztUldOvqUpx1-qsZB8bZ8-c-DtLYw_c1hCGwP96LEPZdF28Mb6R2uQFTbaae2ufR7KKdvcp95Pm6pL9OORca1vRkuce_TYMzXNfWyhGRiNSbdjlJymQsntsMJltgW35ssp6eRT7sE8I9qMpEWIlSX0y-kRj3LDkVjBD0JwxchFnc" />
                                            <span className="text-xs font-bold leading-tight">Insignia Oro</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* Upcoming Events Section */}
                <section className="mb-12">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold tracking-tight">Próximos Eventos</h2>
                        {/* View Toggle */}
                        <div className="bg-white dark:bg-[#2a221b] border border-[#f4ede7] dark:border-[#3a2d22] p-1 rounded-lg flex items-center">
                            <button className="px-3 py-1.5 rounded-md bg-[#fcfaf8] dark:bg-[#1c140d] shadow-sm text-xs font-bold flex items-center gap-2">
                                <span className="material-symbols-outlined text-base">grid_view</span>
                                Tarjetas
                            </button>
                            <button className="px-3 py-1.5 rounded-md text-gray-500 hover:text-gray-900 dark:hover:text-gray-100 text-xs font-bold flex items-center gap-2">
                                <span className="material-symbols-outlined text-base">calendar_month</span>
                                Calendario
                            </button>
                        </div>
                    </div>
                    <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                        {/* Event Card 1 */}
                        <div className="min-w-[280px] md:min-w-[320px] rounded-xl bg-white dark:bg-[#2a221b] border border-[#f4ede7] dark:border-[#3a2d22] overflow-hidden flex flex-col hover:border-[#f27f0d]/50 transition-colors group cursor-pointer">
                            <div className="h-32 bg-gray-100 dark:bg-gray-800 relative bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBzyWlzmtg2kvhetJ-uwK6-c9v6D2AyW4Hn3YzynGhThmN5MdUNprK_5DrWZe5iPqFtpdTj0nXjCGgV_ckgkfUBVLq5UttEyqqhmH4pHLdISM20UUzEWtoX2YobbF2ZcwmfSgF6b0Wj0EoSuHTrzqQYCFsA8ldlSXHqjW9VKfa-aOiGrdtLRhdFGxkzfyGRilpL93c-zsdlf4gNqgI9-Rsc_ssMXYxX2ZontXTcna6AXPvJ_1qftQmhoehOh7nwNVb47B3IsL1T0ts')" }}>
                                <div className="absolute top-3 left-3 bg-white/90 dark:bg-black/80 backdrop-blur px-2 py-1 rounded text-xs font-bold uppercase tracking-wide">15 - 20 Nov</div>
                            </div>
                            <div className="p-5 flex flex-col gap-3 flex-1">
                                <h3 className="font-bold text-lg leading-tight">Favorito de la Comunidad</h3>
                                <p className="text-sm text-gray-500 line-clamp-2">El proyecto con más comentarios y compartidos gana un espacio destacado.</p>
                                <div className="mt-auto pt-2 flex items-center justify-between">
                                    <span className="text-xs font-semibold text-[#f27f0d]">Métrica: Engagement</span>
                                    <button className="size-8 rounded-full bg-[#f4ede7] dark:bg-[#3a2d22] hover:bg-[#f27f0d] hover:text-white flex items-center justify-center transition-colors">
                                        <span className="material-symbols-outlined text-lg">notifications</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                        {/* Event Card 2 */}
                        <div className="min-w-[280px] md:min-w-[320px] rounded-xl bg-white dark:bg-[#2a221b] border border-[#f4ede7] dark:border-[#3a2d22] overflow-hidden flex flex-col hover:border-[#f27f0d]/50 transition-colors group cursor-pointer">
                            <div className="h-32 bg-gray-100 dark:bg-gray-800 relative bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuA-pmyfCFWGgR28728BWkvnj_xFCZRkyrEqqysvMAaXRmdvbBh4huVVVlFbuc_KmcjazYJ-AvBjTLgt0JeNdwjoEAzmGe2bewmdJ6M633THifK9j97fHKTrKFHcrxNuuyJ5SiDPR5QU0H7nmJT149cQ1wMIkXL_kbG4Frtyu-yoClRDeYH3G5dGRwi9wC_kAM0m1vNRKu_ZeHppqbRd8fxYrFW-2hV_CR3p3V-7i0qORazr3e1ckOWmfYTmwu7bwtLFNksipMo9IlQ')" }}>
                                <div className="absolute top-3 left-3 bg-white/90 dark:bg-black/80 backdrop-blur px-2 py-1 rounded text-xs font-bold uppercase tracking-wide">01 - 05 Dic</div>
                            </div>
                            <div className="p-5 flex flex-col gap-3 flex-1">
                                <h3 className="font-bold text-lg leading-tight">Maratón de Patrocinadores</h3>
                                <p className="text-sm text-gray-500 line-clamp-2">Consigue el mayor número de patrocinadores únicos para reducir comisiones.</p>
                                <div className="mt-auto pt-2 flex items-center justify-between">
                                    <span className="text-xs font-semibold text-[#f27f0d]">Métrica: Patrocinadores Únicos</span>
                                    <button className="size-8 rounded-full bg-[#f4ede7] dark:bg-[#3a2d22] hover:bg-[#f27f0d] hover:text-white flex items-center justify-center transition-colors">
                                        <span className="material-symbols-outlined text-lg">notifications</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                        {/* Event Card 3 */}
                        <div className="min-w-[280px] md:min-w-[320px] rounded-xl bg-white dark:bg-[#2a221b] border border-[#f4ede7] dark:border-[#3a2d22] overflow-hidden flex flex-col hover:border-[#f27f0d]/50 transition-colors group cursor-pointer">
                            <div className="h-32 bg-gray-100 dark:bg-gray-800 relative bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDU1GxStQsIs5yVt24Mq049DNoeXQGpkPBIL9txz3c6AuStN4QU_KtZq5BArA2vROTdEvRrMejoFPYLAFMLUWYSmO-VvqktgDwwuS9Ap-D4ERZhBJRGTZ-lfvf0I26i8g68XsLbFgzhhffbi2W5Xhh_e28Sj7L0aURD4q--Uq_rp4micjEznOsKkKKopKHv0l0GfL8cb7Ikog-QqvmvuPllX7UHUkS5RMvAHvYxubTPEOPsg3IhZb8ePmycak85sy54SNkQU3Pz_TM')" }}>
                                <div className="absolute top-3 left-3 bg-white/90 dark:bg-black/80 backdrop-blur px-2 py-1 rounded text-xs font-bold uppercase tracking-wide">10 - 12 Dic</div>
                            </div>
                            <div className="p-5 flex flex-col gap-3 flex-1">
                                <h3 className="font-bold text-lg leading-tight">Sprint de Fin de Semana</h3>
                                <p className="text-sm text-gray-500 line-clamp-2">Desafío rápido de 48 horas. Los 3 proyectos tendencia ganan una insignia.</p>
                                <div className="mt-auto pt-2 flex items-center justify-between">
                                    <span className="text-xs font-semibold text-[#f27f0d]">Métrica: Score Tendencia</span>
                                    <button className="size-8 rounded-full bg-[#f4ede7] dark:bg-[#3a2d22] hover:bg-[#f27f0d] hover:text-white flex items-center justify-center transition-colors">
                                        <span className="material-symbols-outlined text-lg">notifications</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* Main Content Grid */}
                <div id="leaderboard" className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                    {/* Live Leaderboard (Col-span-2) */}
                    <div className="lg:col-span-2 flex flex-col gap-6">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                            <div>
                                <h2 className="text-2xl font-bold flex items-center gap-2">
                                    <span className="relative flex h-3 w-3">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                                    </span>
                                    Clasificación en Vivo
                                </h2>
                                <p className="text-sm text-gray-500 mt-1">Actualizado: hace unos segundos</p>
                            </div>
                            <div className="flex gap-2">
                                <select className="bg-white dark:bg-[#2a221b] border border-[#f4ede7] dark:border-[#3a2d22] text-sm rounded-lg focus:ring-[#f27f0d] focus:border-[#f27f0d] block p-2">
                                    <option>Todas las Categorías</option>
                                    <option>Tecnología</option>
                                    <option>Diseño</option>
                                    <option>Juegos</option>
                                </select>
                            </div>
                        </div>
                        {/* Table */}
                        <div className="overflow-x-auto rounded-xl border border-[#f4ede7] dark:border-[#3a2d22] bg-white dark:bg-[#2a221b]">
                            <table className="w-full text-sm text-left">
                                <thead className="text-xs text-gray-500 uppercase bg-[#fcfaf8] dark:bg-[#1c140d] border-b border-[#f4ede7] dark:border-[#3a2d22]">
                                    <tr>
                                        <th className="px-6 py-4 w-12 text-center" scope="col">#</th>
                                        <th className="px-6 py-4" scope="col">Proyecto</th>
                                        <th className="px-6 py-4" scope="col">Creador</th>
                                        <th className="px-6 py-4 text-right" scope="col">Métrica (€)</th>
                                        <th className="px-6 py-4 text-center" scope="col">Tendencia</th>
                                        <th className="px-6 py-4 text-right" scope="col">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[#f4ede7] dark:divide-[#3a2d22]">
                                    {projects.length > 0 ? projects.map((project, index) => (
                                        <tr key={project.id} className="hover:bg-[#fcfaf8] dark:hover:bg-[#1c140d]/50 transition-colors">
                                            <td className="px-6 py-4 font-black text-lg text-center text-[#1c140d] dark:text-white">
                                                {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : index + 1}
                                            </td>
                                            <td className="px-6 py-4 font-medium text-[#1c140d] dark:text-white">
                                                <div className="flex items-center gap-3">
                                                    <img
                                                        className="w-10 h-10 rounded-lg object-cover"
                                                        alt={project.titulo}
                                                        src={project.imagen_portada ? "/" + project.imagen_portada : "https://via.placeholder.com/50"}
                                                    />
                                                    <span className="font-bold line-clamp-1">{project.titulo}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2">
                                                    <div className="size-6 rounded-full bg-gray-200 overflow-hidden">
                                                        <img src={`https://ui-avatars.com/api/?name=${project.user?.nombreUsuario || 'User'}&background=random`} alt="Avatar" />
                                                    </div>
                                                    <span className="text-gray-600 dark:text-gray-300 whitespace-nowrap">{project.user?.nombreUsuario || 'Anónimo'}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-right font-mono font-bold text-[#1c140d] dark:text-white">€{Number(project.cantidad_recaudada).toLocaleString()}</td>
                                            <td className="px-6 py-4 text-center">
                                                <span className="material-symbols-outlined text-green-500">trending_up</span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex justify-end gap-2">
                                                    <Link to={`/proyectos/${project.id}`} className="text-gray-400 hover:text-[#f27f0d] transition-colors"><span className="material-symbols-outlined text-xl">visibility</span></Link>
                                                    <button className="text-gray-400 hover:text-[#f27f0d] transition-colors"><span className="material-symbols-outlined text-xl">favorite</span></button>
                                                </div>
                                            </td>
                                        </tr>
                                    )) : (
                                        <tr>
                                            <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                                                Cargando proyectos en tiempo real...
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    {/* Sidebar: Personalized Impact & Past Events (Col-span-1) */}
                    <div className="flex flex-col gap-8">
                        {/* Personalized Impact */}
                        <div className="rounded-xl bg-linear-to-br from-gray-900 to-gray-800 text-white p-6 shadow-lg relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-[#f27f0d]/20 rounded-full blur-3xl -mr-10 -mt-10"></div>
                            <h3 className="font-bold text-lg mb-4 relative z-10">Tu Impacto</h3>
                            <div className="grid grid-cols-2 gap-4 mb-6 relative z-10">
                                <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm">
                                    <p className="text-xs text-gray-300 uppercase tracking-wide">Contribuido</p>
                                    <p className="text-xl font-bold mt-1">€0</p>
                                </div>
                                <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm">
                                    <p className="text-xs text-gray-300 uppercase tracking-wide">Proyectos</p>
                                    <p className="text-xl font-bold mt-1">0</p>
                                </div>
                            </div>
                            <div className="relative z-10">
                                <p className="text-sm text-gray-300 mb-2">Comienza a apoyar proyectos para ver tu impacto aquí.</p>
                            </div>
                        </div>
                        {/* Past Events */}
                        <div>
                            <h3 className="font-bold text-lg mb-4">Eventos Pasados</h3>
                            <div className="grid grid-cols-1 gap-4">
                                {/* Past Event Card */}
                                <div className="flex gap-4 p-3 rounded-xl bg-white dark:bg-[#2a221b] border border-[#f4ede7] dark:border-[#3a2d22] items-center">
                                    <div className="h-14 w-14 rounded-lg bg-gray-200 dark:bg-gray-700 flex items-center justify-center font-bold text-gray-500">
                                        OCT
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-bold text-sm">Mes del Diseño</h4>
                                        <div className="flex items-center gap-1 mt-1">
                                            <span className="material-symbols-outlined text-[#f27f0d] text-sm">verified</span>
                                            <p className="text-xs text-gray-500">Ganador: Escritorio Inteligente</p>
                                        </div>
                                    </div>
                                    <span className="material-symbols-outlined text-gray-300">chevron_right</span>
                                </div>
                                {/* Past Event Card */}
                                <div className="flex gap-4 p-3 rounded-xl bg-white dark:bg-[#2a221b] border border-[#f4ede7] dark:border-[#3a2d22] items-center">
                                    <div className="h-14 w-14 rounded-lg bg-gray-200 dark:bg-gray-700 flex items-center justify-center font-bold text-gray-500">
                                        SEP
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-bold text-sm">Semana Tech</h4>
                                        <div className="flex items-center gap-1 mt-1">
                                            <span className="material-symbols-outlined text-[#f27f0d] text-sm">verified</span>
                                            <p className="text-xs text-gray-500">Ganador: Asistente IA</p>
                                        </div>
                                    </div>
                                    <span className="material-symbols-outlined text-gray-300">chevron_right</span>
                                </div>
                            </div>
                            <button className="w-full mt-4 text-sm font-medium text-[#f27f0d] hover:text-[#d66c00] transition-colors">
                                Ver Archivo
                            </button>
                        </div>
                    </div>
                </div>
                {/* Rewards & Badges Section */}
                <section>
                    <h2 className="text-2xl font-bold mb-6">Recompensas e Insignias</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                        {/* Reward Card 1 */}
                        <div className="group rounded-xl p-6 bg-white dark:bg-[#2a221b] border border-[#f4ede7] dark:border-[#3a2d22] hover:border-[#f27f0d] transition-all">
                            <div className="w-12 h-12 rounded-full bg-orange-100 dark:bg-orange-900/20 flex items-center justify-center mb-4 text-[#f27f0d] group-hover:scale-110 transition-transform">
                                <span className="material-symbols-outlined">stars</span>
                            </div>
                            <h3 className="font-bold text-lg mb-2">Destacado en Inicio</h3>
                            <p className="text-sm text-gray-500">Los 3 mejores proyectos obtienen 24h en portada.</p>
                        </div>
                        {/* Reward Card 2 */}
                        <div className="group rounded-xl p-6 bg-white dark:bg-[#2a221b] border border-[#f4ede7] dark:border-[#3a2d22] hover:border-[#f27f0d] transition-all">
                            <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center mb-4 text-blue-500 group-hover:scale-110 transition-transform">
                                <span className="material-symbols-outlined">military_tech</span>
                            </div>
                            <h3 className="font-bold text-lg mb-2">Insignia de Ganador</h3>
                            <p className="text-sm text-gray-500">Insignia permanente para ganadores de categoría.</p>
                        </div>
                        {/* Reward Card 3 */}
                        <div className="group rounded-xl p-6 bg-white dark:bg-[#2a221b] border border-[#f4ede7] dark:border-[#3a2d22] hover:border-[#f27f0d] transition-all">
                            <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center mb-4 text-purple-500 group-hover:scale-110 transition-transform">
                                <span className="material-symbols-outlined">rocket_launch</span>
                            </div>
                            <h3 className="font-bold text-lg mb-2">Impulso de Descubrimiento</h3>
                            <p className="text-sm text-gray-500">Impulso algorítmico en listas "Recomendadas".</p>
                        </div>
                        {/* Reward Card 4 */}
                        <div className="group rounded-xl p-6 bg-white dark:bg-[#2a221b] border border-[#f4ede7] dark:border-[#3a2d22] hover:border-[#f27f0d] transition-all">
                            <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center mb-4 text-green-500 group-hover:scale-110 transition-transform">
                                <span className="material-symbols-outlined">percent</span>
                            </div>
                            <h3 className="font-bold text-lg mb-2">Comisiones Reducidas</h3>
                            <p className="text-sm text-gray-500">0% comisión de plataforma en fondos recaudados.</p>
                        </div>
                    </div>
                </section>
            </main>

            <FooterPublic />
        </div>
    );
}
