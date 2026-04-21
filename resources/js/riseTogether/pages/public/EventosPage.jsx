import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import HeaderPublic from "../../components/public/header_public";
import FooterPublic from "../../components/public/footer_public";
import toast, { Toaster } from 'react-hot-toast';
import useAuth from "../../hooks/useAuth";
import axios from 'axios';

export default function EventosPage() {
    const { user } = useAuth();
    // Estado para datos dinámicos
    const [activeEvent, setActiveEvent] = useState(null);
    const [upcomingEvents, setUpcomingEvents] = useState([]);
    const [featuredEvent, setFeaturedEvent] = useState(null); // The one in the Hero
    const [leaderboard, setLeaderboard] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('Todas las Categorías');
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0, isUpcoming: false });
    const [loading, setLoading] = useState(true);
    const [categories, setCategories] = useState([]);
    const [eventStats, setEventStats] = useState({ total_recaudado: 0, total_proyectos: 0, total_donantes: 0 });
    const [userImpact, setUserImpact] = useState({ proyectos_seguidos: 0, total_aportado: 0, proyectos_apoyados: 0 });
    const [userProjects, setUserProjects] = useState([]);
    const [isEnrollModalOpen, setIsEnrollModalOpen] = useState(false);
    const [targetEvent, setTargetEvent] = useState(null); // The event currently chosen for enrollment
    const [selectedProjectId, setSelectedProjectId] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Modal Helper
    const openEnrollModal = (event) => {
        if (!user) {
            premiumToast.error("Debes iniciar sesión para inscribir un proyecto.");
            return;
        }
        setTargetEvent(event);
        setIsEnrollModalOpen(true);
        
        // RE-FETCH projects on every open for state guarantee
        const api = window.axios;
        if (api) {
            api.get('/api/user/mis-proyectos').then(res => {
                const projects = Array.isArray(res.data) ? res.data : (res.data?.data || []);
                setUserProjects(projects);
            }).catch(e => console.error("Error refreshing projects on modal open", e));
        }
    };

    // Fetch Initial Data
    const fetchData = useCallback(async () => {
        try {
            // Fetch Active Event
            const activeRes = await axios.get('/api/eventos/active');
            // IMPORTANT: Normalize {} to null if it's an empty object from backend
            const activeData = (activeRes.data && activeRes.data.id) ? activeRes.data : null;
            setActiveEvent(activeData);

            // Fetch Upcoming Events
            const upcomingRes = await axios.get('/api/eventos/upcoming');
            const upcomingData = upcomingRes.data;
            setUpcomingEvents(upcomingData);

            // Fetch Categories for the filter
            const catRes = await axios.get('/api/categorias');
            setCategories(catRes.data);

            // Determine Featured Event (Hero)
            // If active exists, it's the hero. If not, the first upcoming.
            const hero = activeData || (upcomingData && upcomingData.length > 0 ? upcomingData[0] : null);
            setFeaturedEvent(hero);

            if (hero) {
                // Fetch Event Stats
                try {
                    const statsRes = await axios.get(`/api/eventos/${hero.id}/stats`);
                    setEventStats(statsRes.data);
                } catch (e) {
                    console.error("Error fetching stats", e);
                }

                if (user) {
                    // Fetch User Impact and User Projects if logged in
                    try {
                        const impactRes = await axios.get(`/api/eventos/${hero.id}/user-impact`);
                        setUserImpact(impactRes.data);

                        const projectsRes = await axios.get(`/api/user/mis-proyectos`);
                        setUserProjects(projectsRes.data || []);
                    } catch (e) {
                        console.error("Error fetching user data", e);
                    }
                }
            }

            setLoading(false);
        } catch (error) {
            console.error("Error fetching event data:", error);
            setLoading(false);
        }
    }, [user]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    // Fetch Leaderboard for Active Event
    const fetchLeaderboard = useCallback(async (eventId, category) => {
        if (!eventId) return;
        try {
            const url = `/api/eventos/${eventId}/leaderboard${category !== 'Todas las Categorías' ? `?categoria=${encodeURIComponent(category)}` : ''}`;
            const res = await axios.get(url);
            setLeaderboard(res.data);
        } catch (error) {
            console.error("Error fetching leaderboard:", error);
        }
    }, []);

    // Effect for Leaderboard polling
    useEffect(() => {
        if (featuredEvent?.id) {
            fetchLeaderboard(featuredEvent.id, selectedCategory);

            const interval = setInterval(() => {
                fetchLeaderboard(featuredEvent.id, selectedCategory);
            }, 30000); // Polling cada 30 segundos

            return () => clearInterval(interval);
        }
    }, [featuredEvent, selectedCategory, fetchLeaderboard]);

    // Countdown Logic based on Featured Event
    useEffect(() => {
        if (!featuredEvent) {
            setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isUpcoming: false });
            return;
        }

        const now = new Date();
        const startStr = featuredEvent?.fechaInicio ? featuredEvent.fechaInicio.replace(' ', 'T') : null;
        const endStr = featuredEvent?.fechaFinal ? featuredEvent.fechaFinal.replace(' ', 'T') : null;

        if (!startStr || !endStr) {
            setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isUpcoming: false });
            return;
        }

        const start = new Date(startStr);
        const end = new Date(endStr);

        const isUpcoming = now < start;
        const targetDate = isUpcoming ? start : end;

        if (isNaN(targetDate.getTime())) {
            setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isUpcoming });
            return;
        }

        const calculateTime = () => {
            const currentTime = new Date();
            const difference = targetDate - currentTime;

            if (difference <= 0) {
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isUpcoming });
                return false;
            } else {
                setTimeLeft({
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                    seconds: Math.floor((difference / 1000) % 60),
                    isUpcoming
                });
                return true;
            }
        };

        calculateTime();
        const interval = setInterval(() => {
            if (!calculateTime()) {
                clearInterval(interval);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [featuredEvent]);

    // Premium Toast Styles
    const premiumToast = {
        success: (msg) => toast.success(msg, {
            style: {
                borderRadius: '16px',
                background: '#1c140d',
                color: '#fff',
                border: '1px solid rgba(242, 127, 13, 0.2)',
                padding: '16px',
                fontWeight: 'bold',
            },
            iconTheme: {
                primary: '#f27f0d',
                secondary: '#fff',
            },
        }),
        error: (msg) => toast.error(msg, {
            style: {
                borderRadius: '16px',
                background: '#1c140d',
                color: '#fff',
                border: '1px solid rgba(239, 68, 68, 0.2)',
                padding: '16px',
                fontWeight: 'bold',
            },
        }),
    };

    const handleNotify = (eventName) => {
        premiumToast.success(`¡Te avisaremos cuando comience ${eventName}!`);
    };

    const handleFollow = async (projectId) => {
        if (!user) {
            premiumToast.error('Inicia sesión para seguir este proyecto');
            return;
        }

        try {
            await window.axios.post(`/api/proyectos/${projectId}/seguir`);
            premiumToast.success('¡Siguiendo proyecto!');
        } catch (error) {
            const message = error.response?.data?.message || 'Error al intentar seguir el proyecto';
            premiumToast.error(message);
        }
    };

    const handleInscribir = async () => {
        if (!selectedProjectId) {
            premiumToast.error("Por favor selecciona un proyecto.");
            return;
        }

        if (!user || !targetEvent) {
            premiumToast.error("Faltan datos para la inscripción.");
            return;
        }

        const api = window.axios;
        setIsSubmitting(true);
        
        // Use toast.promise for premium UX
        const enrollmentPromise = api.post(`/api/eventos/${targetEvent.id}/inscribir`, {
            proyecto_id: selectedProjectId
        });

        toast.promise(
            enrollmentPromise,
            {
                loading: 'Inscribiendo proyecto...',
                success: (res) => {
                    setIsEnrollModalOpen(false);
                    fetchData();
                    return res.data?.message || '¡Proyecto inscrito con éxito!';
                },
                error: (err) => {
                    setIsSubmitting(false);
                    return err.response?.data?.message || 'Error del servidor al inscribir.';
                },
            },
            {
                style: {
                    borderRadius: '16px',
                    background: '#1c140d',
                    color: '#fff',
                    border: '1px solid rgba(242, 127, 13, 0.2)',
                    padding: '16px',
                    fontWeight: 'bold',
                },
                success: {
                    duration: 5000,
                    icon: '🚀',
                },
            }
        ).finally(() => {
            setIsSubmitting(false);
        });
    };

    return (
        <div className="bg-[#fcfaf8] dark:bg-[#1c140d] font-sans text-[#1c140d] dark:text-[#fcfaf8] transition-colors duration-200">
            <HeaderPublic />

            <main className="flex-1 w-full max-w-[1400px] mx-auto px-4 md:px-10 pb-20 pt-8">
                {/* Admin Toolbar */}
                {user && user.roles_list && user.roles_list.includes('admin') && (
                    <div className="mb-6 flex justify-end">
                        <Link to="/administrador/eventos" className="inline-flex items-center gap-2 bg-gray-900 dark:bg-white text-white dark:text-black px-6 py-2 rounded-xl font-bold shadow-md hover:scale-105 transition-transform">
                            <span className="material-symbols-outlined">edit_calendar</span>
                            Gestionar Eventos
                        </Link>
                    </div>
                )}

                {/* Event Timeline Navigation */}
                <div className="mb-10 flex justify-center">
                    <div className="inline-flex items-center gap-2 p-1 bg-white dark:bg-[#2a221b] rounded-full border border-[#f4ede7] dark:border-[#3a2d22] shadow-sm">
                        <div className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${!activeEvent ? 'bg-orange-500 text-white' : 'text-gray-400'}`}>Inscripción</div>
                        <span className="material-symbols-outlined text-gray-300 text-sm">chevron_right</span>
                        <div className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${activeEvent ? 'bg-green-500 text-white shadow-lg shadow-green-500/20' : 'text-gray-400'}`}>Competencia Live</div>
                        <span className="material-symbols-outlined text-gray-300 text-sm">chevron_right</span>
                        <div className="px-4 py-1.5 rounded-full text-xs font-bold text-gray-400">Resultados</div>
                    </div>
                </div>

                {/* Hero Section */}
                <section className="relative py-12 md:py-20 mb-12 rounded-[2.5rem] overflow-hidden bg-gradient-to-br from-[#1c140d] via-[#2a221b] to-[#1c140d] border border-white/5 shadow-2xl">
                    {/* Decorative Elements */}
                    <div className="absolute top-0 left-0 w-full h-full">
                        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[50%] bg-[#f27f0d]/10 rounded-full blur-[120px]"></div>
                        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[50%] bg-purple-500/10 rounded-full blur-[120px]"></div>
                    </div>

                    <div className="relative z-10 flex flex-col lg:flex-row gap-12 items-center px-8 md:px-16 text-center lg:text-left">
                        {/* Left: Info & Timer */}
                        <div className="flex-1 flex flex-col gap-8 w-full max-w-2xl">
                            {featuredEvent ? (
                                <>
                                    <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                                        {activeEvent ? (
                                            <div className="inline-flex items-center justify-center gap-x-2 rounded-full bg-white/10 backdrop-blur-md px-4 py-2 border border-white/10">
                                                <span className="material-symbols-outlined text-[#f27f0d] text-xl">verified</span>
                                                <p className="text-white text-sm font-bold tracking-wide">EVENTO OFICIAL ACTIVO</p>
                                            </div>
                                        ) : (
                                            <div className="inline-flex items-center justify-center gap-x-2 rounded-full bg-blue-500/20 backdrop-blur-md px-4 py-2 border border-blue-500/20">
                                                <span className="material-symbols-outlined text-blue-400 text-xl">calendar_month</span>
                                                <p className="text-white text-sm font-bold tracking-wide uppercase">Próximo Evento - ¡Inscríbete ya!</p>
                                            </div>
                                        )}
                                        <div className="inline-flex items-center justify-center gap-x-2 rounded-full bg-orange-500 shadow-lg shadow-orange-500/20 px-4 py-2">
                                            <span className="material-symbols-outlined text-white text-xl">stars</span>
                                            <p className="text-white text-sm font-black italic uppercase">Bote: Evento Oficial</p>
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <h1 className="text-white text-5xl md:text-7xl font-black leading-tight tracking-[-0.04em] drop-shadow-sm">
                                            {featuredEvent.nombre}
                                        </h1>
                                        <p className="text-gray-400 text-lg md:text-xl max-w-xl mx-auto lg:mx-0">
                                            {activeEvent
                                                ? "La batalla por el impacto ha comenzado. Apoya proyectos, escala posiciones y desbloquea recompensas exclusivas."
                                                : "Prepárate para el próximo gran desafío. Inscribe tu proyecto ahora y gana visibilidad antes del lanzamiento oficial."}
                                        </p>
                                    </div>

                                    {/* Stats Grid inside Hero */}
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 py-4">
                                        <div className="flex flex-col items-center lg:items-start p-4 rounded-2xl bg-white/5 border border-white/5 backdrop-blur-sm">
                                            <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Recaudado</p>
                                            <p className="text-2xl md:text-3xl font-black text-[#f27f0d]">€{Number(eventStats.total_recaudado).toLocaleString()}</p>
                                        </div>
                                        <div className="flex flex-col items-center lg:items-start p-4 rounded-2xl bg-white/5 border border-white/5 backdrop-blur-sm">
                                            <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Proyectos</p>
                                            <p className="text-2xl md:text-3xl font-black text-white">{eventStats.total_proyectos}</p>
                                        </div>
                                        <div className="hidden md:flex flex-col items-center lg:items-start p-4 rounded-2xl bg-white/5 border border-white/5 backdrop-blur-sm">
                                            <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Donantes</p>
                                            <p className="text-2xl md:text-3xl font-black text-white">{eventStats.total_donantes}</p>
                                        </div>
                                    </div>

                                    {/* Countdown */}
                                    <div className="flex flex-col gap-3">
                                        <p className="text-xs font-black tracking-[0.2em] text-gray-500 uppercase flex items-center gap-2 justify-center lg:justify-start">
                                            <span className="material-symbols-outlined text-sm">schedule</span>
                                            {timeLeft.isUpcoming ? "Tiempo para el Inicio" : "Tiempo Restante"}
                                        </p>
                                        <div className="flex justify-center lg:justify-start gap-4">
                                            {[
                                                { val: timeLeft.days, label: 'DÍAS' },
                                                { val: timeLeft.hours, label: 'HRS' },
                                                { val: timeLeft.minutes, label: 'MINS' },
                                                { val: timeLeft.seconds, label: 'SEGS', pulse: true }
                                            ].map((item, i) => (
                                                <div key={i} className="flex flex-col items-center gap-1.5">
                                                    <div className="flex h-16 w-16 md:h-18 md:w-18 items-center justify-center rounded-2xl bg-white/10 dark:bg-black/20 border border-white/10 backdrop-blur-xl">
                                                        <p className={`text-2xl md:text-3xl font-black ${item.pulse ? 'text-[#f27f0d] animate-pulse' : 'text-white'}`}>
                                                            {String(item.val).padStart(2, '0')}
                                                        </p>
                                                    </div>
                                                    <p className="text-[10px] font-black tracking-widest text-gray-500">{item.label}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Enroll Project Button (If authenticated) */}
                                    {user && (
                                        <div className="flex justify-center lg:justify-start mt-4">
                                            <button 
                                                onClick={() => openEnrollModal(featuredEvent)}
                                                className="px-8 py-4 bg-white text-[#f27f0d] rounded-2xl font-black hover:scale-105 transition-transform flex items-center gap-2 border-2 border-transparent hover:border-white/50 shadow-xl shadow-white/5">
                                                <span className="material-symbols-outlined">add_circle</span>
                                                INSCRIBIR MI PROYECTO
                                            </button>
                                        </div>
                                    )}
                                </>
                            ) : (
                                <div className="space-y-6">
                                    <h1 className="text-white text-5xl md:text-7xl font-black tracking-tight">Sin eventos activos</h1>
                                    <p className="text-gray-400 text-xl max-w-lg mx-auto lg:mx-0">Pero no te preocupes, el próximo gran desafío está a la vuelta de la esquina. ¡Prepárate!</p>
                                    <div className="flex justify-center lg:justify-start">
                                        <Link to="/proyectos" className="px-8 py-4 bg-[#f27f0d] rounded-2xl text-white font-black hover:scale-105 transition-transform">EXPLORAR PROYECTOS</Link>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Right: How it works cards (Modern) */}
                        <div className="w-full lg:w-[450px] space-y-4">
                            <div className="p-6 rounded-3xl bg-white/5 border border-white/5 backdrop-blur-md hover:bg-white/10 transition-colors group">
                                <div className="flex gap-4">
                                    <div className="size-12 rounded-2xl bg-[#f27f0d]/20 flex items-center justify-center text-[#f27f0d] group-hover:scale-110 transition-transform">
                                        <span className="material-symbols-outlined font-black">rocket_launch</span>
                                    </div>
                                    <div>
                                        <h4 className="text-white font-bold text-lg">Incentivo Ganador</h4>
                                        <p className="text-gray-400 text-sm mt-1">El ganador obtiene visibilidad global y eliminación de comisiones por 1 mes.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="p-6 rounded-3xl bg-white/5 border border-white/5 backdrop-blur-md hover:bg-white/10 transition-colors group delay-75">
                                <div className="flex gap-4">
                                    <div className="size-12 rounded-2xl bg-blue-500/20 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                                        <span className="material-symbols-outlined font-black">groups</span>
                                    </div>
                                    <div>
                                        <h4 className="text-white font-bold text-lg">Comunidad Activa</h4>
                                        <p className="text-gray-400 text-sm mt-1">Más de 2,340 personas ya han votado en proyectos este mes.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Podium Section (Top 3) */}
                {activeEvent && leaderboard.length > 0 && (
                    <section className="mb-20">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-black mb-2 tracking-tight">Líderes de la Competición</h2>
                            <p className="text-gray-500">Los proyectos que están marcando el ritmo en este momento.</p>
                        </div>
                        <div className="flex flex-col md:flex-row items-end justify-center gap-6 md:gap-4 lg:gap-8">
                            {/* 2nd Place */}
                            {leaderboard[1] && (
                                <div className="w-full md:w-1/3 order-2 md:order-1 group">
                                    <div className="relative p-6 rounded-3xl bg-white dark:bg-[#2a221b] border border-[#f4ede7] dark:border-[#3a2d22] shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-500">
                                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 size-12 rounded-full bg-slate-300 flex items-center justify-center font-black text-slate-600 border-4 border-[#fcfaf8] dark:border-[#1c140d] shadow-lg">2</div>
                                        <div className="flex flex-col items-center gap-4 pt-4">
                                            <div className="relative">
                                                <img src={leaderboard[1].imagen_portada ? "/" + leaderboard[1].imagen_portada : "/default-project.jpg"} className="size-24 rounded-2xl object-cover border-2 border-slate-200" alt="2nd" />
                                                <div className="absolute -bottom-2 -right-2 size-8 rounded-lg bg-slate-300 flex items-center justify-center text-slate-700 shadow-sm">
                                                    <span className="material-symbols-outlined text-sm">military_tech</span>
                                                </div>
                                            </div>
                                            <div className="text-center">
                                                <h3 className="font-bold text-lg line-clamp-1">{leaderboard[1].titulo}</h3>
                                                <p className="text-sm text-gray-500">€{Number(leaderboard[1].cantidad_recaudada).toLocaleString()}</p>
                                            </div>
                                            <Link to={`/proyectos/${leaderboard[1].id}`} className="w-full py-2.5 rounded-xl bg-slate-100 dark:bg-white/5 font-bold text-sm text-center hover:bg-slate-200 transition-colors">Ver Proyecto</Link>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* 1st Place */}
                            {leaderboard[0] && (
                                <div className="w-full md:w-[38%] order-1 md:order-2 z-10 scale-105 group">
                                    <div className="relative p-8 rounded-[2.5rem] bg-gradient-to-b from-white to-orange-50/50 dark:from-[#3a2d22] dark:to-[#2a221b] border-2 border-orange-500/50 shadow-2xl shadow-orange-500/20 hover:-translate-y-3 transition-all duration-500">
                                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 size-16 rounded-full bg-orange-500 flex items-center justify-center font-black text-white border-4 border-[#fcfaf8] dark:border-[#1c140d] shadow-xl">
                                            <span className="material-symbols-outlined text-3xl">emoji_events</span>
                                        </div>
                                        <div className="flex flex-col items-center gap-6 pt-6">
                                            <div className="relative">
                                                <div className="absolute inset-0 bg-orange-500/20 blur-2xl rounded-full scale-110 animate-pulse"></div>
                                                <img src={leaderboard[0].imagen_portada ? "/" + leaderboard[0].imagen_portada : "/default-project.jpg"} className="relative size-32 rounded-[2rem] object-cover border-4 border-orange-500/30" alt="1st" />
                                            </div>
                                            <div className="text-center">
                                                <h3 className="font-black text-2xl lg:text-3xl line-clamp-1 text-[#1c140d] dark:text-white">{leaderboard[0].titulo}</h3>
                                                <div className="mt-2 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/10 text-orange-600 font-black text-lg">
                                                    €{Number(leaderboard[0].cantidad_recaudada).toLocaleString()}
                                                </div>
                                            </div>
                                            <Link to={`/proyectos/${leaderboard[0].id}`} className="w-full py-4 rounded-2xl bg-orange-500 text-white font-black text-center shadow-lg shadow-orange-500/30 hover:bg-orange-600 hover:shadow-orange-600/40 transition-all">Impulsar Líder</Link>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* 3rd Place */}
                            {leaderboard[2] && (
                                <div className="w-full md:w-1/3 order-3 group">
                                    <div className="relative p-6 rounded-3xl bg-white dark:bg-[#2a221b] border border-[#f4ede7] dark:border-[#3a2d22] shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-500">
                                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 size-12 rounded-full bg-orange-200 flex items-center justify-center font-black text-orange-800 border-4 border-[#fcfaf8] dark:border-[#1c140d] shadow-lg">3</div>
                                        <div className="flex flex-col items-center gap-4 pt-4">
                                            <div className="relative">
                                                <img src={leaderboard[2].imagen_portada ? "/" + leaderboard[2].imagen_portada : "/default-project.jpg"} className="size-24 rounded-2xl object-cover border-2 border-orange-100" alt="3rd" />
                                                <div className="absolute -bottom-2 -right-2 size-8 rounded-lg bg-orange-100 flex items-center justify-center text-orange-700 shadow-sm">
                                                    <span className="material-symbols-outlined text-sm">auto_awesome</span>
                                                </div>
                                            </div>
                                            <div className="text-center">
                                                <h3 className="font-bold text-lg line-clamp-1">{leaderboard[2].titulo}</h3>
                                                <p className="text-sm text-gray-500">€{Number(leaderboard[2].cantidad_recaudada).toLocaleString()}</p>
                                            </div>
                                            <Link to={`/proyectos/${leaderboard[2].id}`} className="w-full py-2.5 rounded-xl bg-orange-50/50 dark:bg-white/5 font-bold text-sm text-center hover:bg-orange-100 transition-colors">Ver Proyecto</Link>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </section>
                )}

                {/* Upcoming Events Section (Mini Slider) */}
                <section className="mb-20">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-2xl font-black tracking-tight">Calendario de Eventos</h2>
                        <button className="text-sm font-bold text-[#f27f0d] hover:underline">Ver todo</button>
                    </div>
                    <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
                        {upcomingEvents.length > 0 ? upcomingEvents.map((event) => (
                            <div key={event.id} className="min-w-[300px] md:min-w-[350px] rounded-3xl bg-white dark:bg-[#2a221b] border border-[#f4ede7] dark:border-[#3a2d22] overflow-hidden flex flex-col hover:border-orange-500/50 hover:shadow-lg transition-all group">
                                <div className="h-40 bg-gray-100 dark:bg-gray-800 relative overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                                    <div className="absolute top-4 left-4 size-14 rounded-2xl bg-white/90 dark:bg-black/80 backdrop-blur shadow-sm p-1.5 flex flex-col items-center justify-center border border-white/20">
                                        <span className="text-lg font-black leading-none">{event.fechaInicio ? new Date(event.fechaInicio).toLocaleDateString('es-ES', { day: '2-digit' }) : '--'}</span>
                                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">{event.fechaInicio ? new Date(event.fechaInicio).toLocaleDateString('es-ES', { month: 'short' }) : '--'}</span>
                                    </div>
                                </div>
                                <div className="p-6 flex flex-col gap-4 flex-1">
                                    <div>
                                        <h3 className="font-black text-xl leading-tight group-hover:text-orange-500 transition-colors">{event.nombre}</h3>
                                        <p className="text-sm text-gray-500 mt-2 line-clamp-2">Un nuevo desafío para la comunidad.</p>
                                    </div>
                                    <div className="mt-auto pt-4 flex items-center justify-between border-t border-[#f4ede7] dark:border-[#3a2d22]">
                                        <div className="flex items-center gap-2">
                                            <span className="material-symbols-outlined text-lg text-gray-400 font-black">group</span>
                                            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">{event.cantidadMaxParticipantes || 'Open'} SLOTS</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => handleNotify(event.nombre)}
                                                className="p-2 rounded-xl bg-gray-100 dark:bg-white/5 text-gray-400 hover:text-orange-500 transition-all"
                                                title="Notificarme">
                                                <span className="material-symbols-outlined text-xl">notifications</span>
                                            </button>
                                            <button
                                                onClick={() => openEnrollModal(event)}
                                                className="px-4 py-2 rounded-xl bg-[#f27f0d] text-white hover:bg-[#f27f0d]/90 font-bold text-xs transition-all shadow-md shadow-orange-500/10">
                                                INSCRIBIR PROYECTO
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )) : (
                            <div className="w-full py-12 text-center rounded-3xl bg-gray-50 dark:bg-white/5 border border-dashed border-gray-300">
                                <p className="text-gray-500 font-medium">Buscando nuevos horizontes. ¡Vuelve pronto!</p>
                            </div>
                        )}
                    </div>
                </section>

                {/* Main Content Grid */}
                <div id="leaderboard" className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-20">
                    {/* Live Leaderboard (Col-span-2) */}
                    <div className="lg:col-span-2 flex flex-col gap-8">
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pb-6 border-b border-[#f4ede7] dark:border-[#3a2d22]">
                            <div>
                                <h2 className="text-3xl font-black flex items-center gap-3 tracking-tight">
                                    <span className="relative flex h-4 w-4">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-4 w-4 bg-green-500"></span>
                                    </span>
                                    Clasificación en Vivo
                                </h2>
                                <p className="text-gray-500 mt-2 font-medium">Actualización automática cada 30s</p>
                            </div>
                            <div className="flex gap-4">
                                <select
                                    value={selectedCategory}
                                    onChange={(e) => setSelectedCategory(e.target.value)}
                                    className="bg-white dark:bg-[#2a221b] border border-[#f4ede7] dark:border-[#3a2d22] text-sm font-bold rounded-2xl focus:ring-orange-500 focus:border-orange-500 block px-6 py-3 shadow-sm appearance-none cursor-pointer">
                                    <option>Todas las Categorías</option>
                                    {categories.map(cat => (
                                        <option key={cat.id} value={cat.nombre}>{cat.nombre}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Premium Table */}
                        <div className="overflow-hidden rounded-[2rem] border border-[#f4ede7] dark:border-[#3a2d22] bg-white dark:bg-[#2a221b] shadow-sm">
                            <table className="w-full text-sm text-left border-collapse">
                                <thead className="text-[10px] text-gray-400 uppercase bg-gray-50/50 dark:bg-black/20 font-black tracking-widest border-b border-[#f4ede7] dark:border-[#3a2d22]">
                                    <tr>
                                        <th className="px-8 py-5 w-20 text-center" scope="col">RANK</th>
                                        <th className="px-6 py-5" scope="col">PROYECTO</th>
                                        <th className="px-6 py-5 hidden md:table-cell" scope="col">CREADOR</th>
                                        <th className="px-6 py-5 text-right" scope="col">RECAUDACIÓN</th>
                                        <th className="px-8 py-5 text-right" scope="col">ACCIÓN</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[#f4ede7] dark:divide-[#3a2d22]">
                                    {leaderboard.length > 0 ? leaderboard.map((project, index) => (
                                        <tr key={project.id} className="group hover:bg-[#f27f0d]/5 transition-all duration-300">
                                            <td className="px-8 py-6 text-center">
                                                <div className={`size-10 rounded-xl mx-auto flex items-center justify-center font-black text-lg ${index === 0 ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20' :
                                                        index === 1 ? 'bg-slate-200 text-slate-600' :
                                                            index === 2 ? 'bg-orange-100 text-orange-700' : 'text-gray-400'
                                                    }`}>
                                                    {index + 1}
                                                </div>
                                            </td>
                                            <td className="px-6 py-6">
                                                <div className="flex items-center gap-4">
                                                    <div className="relative shrink-0">
                                                        <img
                                                            className="w-14 h-14 rounded-2xl object-cover shadow-sm group-hover:scale-105 transition-transform"
                                                            alt={project.titulo}
                                                            src={project.imagen_portada ? "/" + project.imagen_portada : "https://via.placeholder.com/100"}
                                                        />
                                                        {index < 3 && <div className="absolute -top-1 -right-1 size-5 rounded-full bg-orange-500 border-2 border-white dark:border-[#2a221b] flex items-center justify-center"><span className="material-symbols-outlined text-[10px] text-white font-black">star</span></div>}
                                                    </div>
                                                    <span className="font-black text-base lg:text-lg text-[#1c140d] dark:text-white line-clamp-1">{project.titulo}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-6 hidden md:table-cell">
                                                <div className="flex items-center gap-3">
                                                    <img className="size-8 rounded-full border border-gray-200" src={`https://ui-avatars.com/api/?name=${project.user?.nombreUsuario || 'U'}&background=random&color=fff`} alt="Av" />
                                                    <span className="text-sm font-bold text-gray-500">@{project.user?.nombreUsuario || 'Anon'}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-6 text-right">
                                                <div className="flex flex-col items-end">
                                                    <span className="font-black text-lg text-[#1c140d] dark:text-white">€{Number(project.cantidad_recaudada).toLocaleString()}</span>
                                                    <div className="flex items-center gap-1 text-[10px] text-green-500 font-bold uppercase tracking-wider">
                                                        <span className="material-symbols-outlined text-[12px]">trending_up</span>
                                                        Subiendo
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6 text-right">
                                                <div className="flex justify-end gap-3">
                                                    <Link to={`/proyectos/${project.id}`} className="size-10 rounded-xl bg-gray-50 dark:bg-white/5 flex items-center justify-center text-gray-400 hover:bg-orange-500 hover:text-white transition-all"><span className="material-symbols-outlined font-black">visibility</span></Link>
                                                    <button onClick={() => handleFollow(project.id)} className="size-10 rounded-xl bg-gray-50 dark:bg-white/5 flex items-center justify-center text-gray-400 hover:bg-red-500 hover:text-white transition-all"><span className="material-symbols-outlined font-black">favorite</span></button>
                                                </div>
                                            </td>
                                        </tr>
                                    )) : (
                                        <tr>
                                            <td colSpan="5" className="px-8 py-20 text-center">
                                                <div className="flex flex-col items-center gap-4">
                                                    <span className="material-symbols-outlined text-6xl text-gray-200 animate-pulse">search</span>
                                                    <p className="text-gray-400 font-bold">{loading ? "Sincronizando clasificación..." : "No hay proyectos en esta categoría aún."}</p>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Sidebar: Premium Components */}
                    <div className="flex flex-col gap-10">
                        {/* Dynamic User Impact Card */}
                        <div className="rounded-[2.5rem] bg-gradient-to-br from-orange-600 to-orange-400 text-white p-8 shadow-2xl shadow-orange-500/30 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full blur-3xl -mr-10 -mt-10 group-hover:scale-150 transition-transform duration-700"></div>
                            <h3 className="font-black text-xl mb-6 relative z-10 flex items-center gap-2">
                                <span className="material-symbols-outlined">analytics</span>
                                Tu Impacto
                            </h3>
                            <div className="grid grid-cols-2 gap-4 mb-8 relative z-10">
                                <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm border border-white/10">
                                    <p className="text-[10px] text-orange-100 font-black uppercase tracking-widest">Aportado</p>
                                    <p className="text-2xl font-black mt-1">€{Number(userImpact.total_aportado).toLocaleString()}</p>
                                </div>
                                <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm border border-white/10">
                                    <p className="text-[10px] text-orange-100 font-black uppercase tracking-widest">Apoyados</p>
                                    <p className="text-2xl font-black mt-1">{userImpact.proyectos_apoyados}</p>
                                </div>
                            </div>
                            <div className="relative z-10 p-4 rounded-2xl bg-black/10 border border-white/10">
                                <p className="text-xs font-bold text-orange-50 flex items-center gap-2">
                                    <span className="material-symbols-outlined text-sm">info</span>
                                    {userImpact.proyectos_seguidos > 0
                                        ? `Sigues a ${userImpact.proyectos_seguidos} proyectos en este evento.`
                                        : "Aún no sigues proyectos en este evento."}
                                </p>
                            </div>
                        </div>

                        {/* Recent Activity / Milestones */}
                        <div className="p-8 rounded-[2rem] bg-white dark:bg-[#2a221b] border border-[#f4ede7] dark:border-[#3a2d22]">
                            <h3 className="font-black text-xl mb-6 flex items-center gap-2">
                                <span className="material-symbols-outlined text-orange-500">history_edu</span>
                                Hitos del Evento
                            </h3>
                            <div className="space-y-6">
                                {[
                                    { icon: 'trending_up', color: 'text-green-500', bg: 'bg-green-100', text: '5 Proyectos han superado los 1,000€ hoy.', time: 'Hace 2h' },
                                    { icon: 'add_task', color: 'text-blue-500', bg: 'bg-blue-100', text: 'Nueva categoría "Sostenibilidad" añadida.', time: 'Hace 5h' },
                                    { icon: 'ads_click', color: 'text-orange-500', bg: 'bg-orange-100', text: '+400 nuevos votantes registrados.', time: 'Hace 1d' }
                                ].map((item, i) => (
                                    <div key={i} className="flex gap-4 items-start">
                                        <div className={`mt-1 size-8 shrink-0 rounded-lg ${item.bg} flex items-center justify-center font-black ${item.color}`}>
                                            <span className="material-symbols-outlined text-lg">{item.icon}</span>
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-[#1c140d] dark:text-gray-200 leading-snug">{item.text}</p>
                                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-tighter mt-1">{item.time}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* FAQ & Terms Section */}
                <section className="mt-20 py-20 border-t border-[#f4ede7] dark:border-[#3a2d22]">
                    <div className="max-w-4xl mx-auto text-center mb-16">
                        <h2 className="text-4xl font-black mb-4 tracking-tight">Preguntas Frecuentes</h2>
                        <p className="text-gray-500 font-medium">Todo lo que necesitas saber sobre los eventos de RiseTogether.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                        {[
                            { q: "¿Cómo participo como creador?", a: "Debes tener un proyecto activo y cumplir con los requisitos mínimos de financiamiento inicial." },
                            { q: "¿Qué determina el ganador?", a: "La combinación de fondos recaudados durante el evento y el crecimiento en el número de nuevos mecenas." },
                            { q: "¿Cuándo se entregan los premios?", a: "En un plazo máximo de 7 días tras la finalización del evento y verificación de los datos de pago." },
                            { q: "¿Hay comisiones especiales?", a: "Sí, todos los participantes disfrutan de una tasa reducida, y el ganador queda exento por 30 días." }
                        ].map((item, i) => (
                            <div key={i} className="p-8 rounded-3xl bg-white dark:bg-[#2a221b] border border-[#f4ede7] dark:border-[#3a2d22] hover:border-orange-500/30 transition-all group">
                                <h4 className="font-black text-lg mb-3 flex items-center gap-3">
                                    <span className="size-6 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center text-xs font-black">{i + 1}</span>
                                    {item.q}
                                </h4>
                                <p className="text-gray-500 text-sm leading-relaxed font-medium">{item.a}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Rewards & Badges Section */}
                <section>
                    <h2 className="text-2xl font-bold mb-6">Premios para Ganadores</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="group rounded-xl p-6 bg-white dark:bg-[#2a221b] border border-[#f4ede7] dark:border-[#3a2d22] hover:border-[#f27f0d] transition-all">
                            <div className="w-12 h-12 rounded-full bg-orange-100 dark:bg-orange-900/20 flex items-center justify-center mb-4 text-[#f27f0d] group-hover:scale-110 transition-transform">
                                <span className="material-symbols-outlined">stars</span>
                            </div>
                            <h3 className="font-bold text-lg mb-2">Portada por 48h</h3>
                            <p className="text-sm text-gray-500">Visibilidad máxima en la página principal.</p>
                        </div>
                        <div className="group rounded-xl p-6 bg-white dark:bg-[#2a221b] border border-[#f4ede7] dark:border-[#3a2d22] hover:border-[#f27f0d] transition-all">
                            <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center mb-4 text-blue-500 group-hover:scale-110 transition-transform">
                                <span className="material-symbols-outlined">military_tech</span>
                            </div>
                            <h3 className="font-bold text-lg mb-2">Insignia Elite</h3>
                            <p className="text-sm text-gray-500">Un distintivo único para tu perfil de creador.</p>
                        </div>
                        <div className="group rounded-xl p-6 bg-white dark:bg-[#2a221b] border border-[#f4ede7] dark:border-[#3a2d22] hover:border-[#f27f0d] transition-all">
                            <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center mb-4 text-purple-500 group-hover:scale-110 transition-transform">
                                <span className="material-symbols-outlined">rocket_launch</span>
                            </div>
                            <h3 className="font-bold text-lg mb-2">Boost de Ranking</h3>
                            <p className="text-sm text-gray-500">Impulso en nuestro algoritmo de búsqueda.</p>
                        </div>
                        <div className="group rounded-xl p-6 bg-white dark:bg-[#2a221b] border border-[#f4ede7] dark:border-[#3a2d22] hover:border-[#f27f0d] transition-all">
                            <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center mb-4 text-green-500 group-hover:scale-110 transition-transform">
                                <span className="material-symbols-outlined">percent</span>
                            </div>
                            <h3 className="font-bold text-lg mb-2">Tarifa 0%</h3>
                            <p className="text-sm text-gray-500">Sin comisiones de plataforma para el ganador.</p>
                        </div>
                    </div>
                </section>
            </main>

            {/* Enroll Modal */}
            {isEnrollModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
                    <div className="bg-white dark:bg-[#1c140d] rounded-3xl p-8 max-w-md w-full shadow-2xl border border-gray-100 dark:border-white/10 animate-fade-in-up">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-2xl font-black">Inscripción Evento</h3>
                            <button onClick={() => setIsEnrollModalOpen(false)} className="text-gray-400 hover:text-gray-600 dark:hover:text-white transition-colors">
                                <span className="material-symbols-outlined text-2xl">close</span>
                            </button>
                        </div>
                        <p className="text-gray-500 mb-6 text-sm">
                            Selecciona uno de tus proyectos para inscribirse en <span className="text-[#f27f0d] font-bold">"{targetEvent?.nombre}"</span>. 
                            Participarás en la competición técnica y optarás a premios exclusivos.
                            {user && <span className="block mt-1 text-[10px] opacity-30">Debug: User ID {user.id} | Proyectos: {userProjects.length}</span>}
                        </p>

                        <div className="mb-6">
                            <label className="block text-sm font-bold mb-2">Selecciona tu proyecto:</label>
                            <select
                                value={selectedProjectId}
                                onChange={(e) => setSelectedProjectId(e.target.value)}
                                className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-sm rounded-xl focus:ring-[#f27f0d] focus:border-[#f27f0d] px-4 py-3 outline-none"
                            >
                                <option value="" disabled>Seleccionar un proyecto</option>
                                {userProjects.map(p => (
                                    <option key={p.id} value={p.id}>{p.titulo}</option>
                                ))}
                            </select>
                        </div>

                        <button
                            onClick={handleInscribir}
                            disabled={isSubmitting || !selectedProjectId}
                            className={`w-full py-4 rounded-xl text-white font-black flex items-center justify-center gap-2 transition-all ${isSubmitting || !selectedProjectId ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#f27f0d] hover:bg-orange-600 shadow-lg shadow-orange-500/30'}`}
                        >
                            {isSubmitting ? (
                                <span className="material-symbols-outlined animate-spin">refresh</span>
                            ) : (
                                <span className="material-symbols-outlined">rocket_launch</span>
                            )}
                            {isSubmitting ? 'Inscribiendo...' : 'Confirmar Inscripción'}
                        </button>
                    </div>
                </div>
            )}

            <FooterPublic />
        </div>
    );

}
