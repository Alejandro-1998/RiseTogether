import { useMemo, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';
import toast from 'react-hot-toast';
import useAuth from "../../hooks/useAuth";
import HeaderPublic from "../../components/public/header_public";
import RecompensaItem from "../../components/proyecto/recompensa_item";
import ProyectoCard from "../../components/cards/ProyectoCard";

export default function CrearProyectoPage() {
    const { isAuth, isLoading, user } = useAuth();
    const navigate = useNavigate();
    const { id } = useParams();
    const isEdit = Boolean(id);
    
    useEffect(() => {
        if (!isLoading && !isAuth) {
            navigate("/login");
        }
    }, [isAuth, isLoading, navigate]);

    const [categoriasdB, setCategoriasdB] = useState([]);
    const [form, setForm] = useState({
        titulo: "",
        categoria: "",
        objetivo: 20000,
        fecha_limite: "",
        imagen_portada: null,
        descripcion: "",
    });

    useEffect(() => {
        axios.get('/api/categorias')
            .then(res => {
                setCategoriasdB(res.data);
                if (res.data.length > 0 && !isEdit) {
                    setForm(f => ({ ...f, categoria: res.data[0].id }));
                }
            })
            .catch(err => console.error(err));
    }, [isEdit]);

    useEffect(() => {
        if (isEdit && id) {
            axios.get(`/api/proyectos/${id}`)
                .then(res => {
                    const p = res.data;
                    setForm({
                        titulo: p.titulo || "",
                        categoria: p.categoria_id || "",
                        objetivo: p.objetivo_financiacion || 0,
                        fecha_limite: p.fecha_limite ? p.fecha_limite.substring(0, 10) : "",
                        imagen_portada: p.imagen_portada || null,
                        descripcion: p.descripcion || "",
                    });
                    
                    if (p.recompensas && p.recompensas.length > 0) {
                        setRecompensas(p.recompensas.map(r => ({
                            id: r.id,
                            cantidad: Number(r.costoRecompensa),
                            titulo: r.nombreRecompensa,
                            descripcion: r.descripcionRecompensa || "",
                            dbId: r.id
                        })));
                    }
                })
                .catch(err => {
                    console.error("Error fetching project:", err);
                    toast.error("No se pudo cargar la información del proyecto.");
                });
        }
    }, [id, isEdit]);

    const [formFile, setFormFile] = useState(null);

    const [recompensas, setRecompensas] = useState([
        { id: crypto.randomUUID(), cantidad: 10, titulo: "Aportación de apoyo", descripcion: "" },
    ]);

    const previewProyecto = useMemo(() => {
        const catObj = categoriasdB.find(c => c.id == form.categoria);
        return {
            titulo: form.titulo || "Tu título aparecerá aquí",
            descripcion: form.descripcion || "La descripción de tu proyecto aparecerá aquí.",
            categoria: { nombre: catObj ? catObj.nombre : "General" },
            imagen_portada: form.imagen_portada,
            cantidad_recaudada: 0,
            porcentaje_financiado: 0,
            fecha_limite: form.fecha_limite ? new Date(form.fecha_limite) : null,
        };
    }, [form, categoriasdB]);

    const onChange = (e) => {
        const { name, value } = e.target;
        setForm((p) => ({ ...p, [name]: value }));
    };

    const onImage = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setFormFile(file);
        const url = URL.createObjectURL(file);
        setForm((p) => ({ ...p, imagen_portada: url }));
    };

    const addRecompensa = () => {
        setRecompensas((prev) => [
            ...prev,
            { id: crypto.randomUUID(), cantidad: 10, titulo: "", descripcion: "" },
        ]);
    };

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

    const submit = (type) => async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('titulo', form.titulo);
        formData.append('categoria_id', form.categoria);
        formData.append('objetivo_financiacion', form.objetivo);
        formData.append('fecha_limite', form.fecha_limite);
        formData.append('descripcion', form.descripcion);
        formData.append('estado', type === 'publish' ? 'publicado' : 'borrador');

        if (isEdit) {
            formData.append('_method', 'PUT');
        }

        if (formFile) {
            formData.append('imagen_portada', formFile);
        }

        formData.append('recompensas', JSON.stringify(recompensas));

        const url = isEdit ? `/api/proyectos/${id}` : '/api/proyectos';

        try {
            const response = await axios.post(url, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response.status === 201 || response.status === 200) {
                premiumToast.success(isEdit
                    ? "Proyecto actualizado correctamente."
                    : (type === "draft"
                        ? "Borrador guardado correctamente."
                        : "Proyecto creado correctamente a la espera de revisión"));
                
                const redirectPath = user?.rol === 'admin' || user?.roles_list?.includes('admin')
                    ? '/administrador/proyectos'
                    : '/proyectos';

                setTimeout(() => {
                    window.location.href = redirectPath;
                }, 1500);
            }
        } catch (error) {
            console.error("Error saving project:", error);
            const message = error.response?.data?.message || "Hubo un error al guardar el proyecto. Revisa los datos.";
            premiumToast.error(message);
        }
    };

    if (isLoading) {
        return <div className="min-h-screen bg-[#fcfaf8] flex items-center justify-center">Cargando...</div>;
    }

    if (!isAuth) {
        return null;
    }

    return (
        <div className="min-h-screen bg-[#fcfaf8] text-[#1c140d] dark:bg-[#120b07] dark:text-white">
            <HeaderPublic />

            <main className="mx-auto w-full max-w-7xl px-4 sm:px-8 md:px-10 py-10">
                <div className="flex flex-wrap justify-between gap-3 mb-10">
                    <div className="min-w-70">
                        <p className="text-3xl md:text-4xl font-black tracking-tight">
                            {isEdit ? "Editar proyecto" : "Crear proyecto"}
                        </p>
                        <p className="mt-2 text-[#9c7049] dark:text-[#9c7049]/80">
                            Completa los datos y previsualiza cómo se verá tu campaña.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* COLUMNA IZQUIERDA: FORMULARIO */}
                    <div className="lg:col-span-8 space-y-8">

                        {/* BLOQUE 1: DATOS BÁSICOS */}
                        <section className="rounded-3xl border border-[#f4ede7] dark:border-[#2a2017] bg-white dark:bg-[#1a120d] p-6 shadow-sm">
                            <h3 className="text-xl font-bold">Datos básicos</h3>
                            <p className="mt-1 text-sm text-[#9c7049] dark:text-[#9c7049]/80">
                                Lo que verá la gente en la tarjeta y en la portada del proyecto.
                            </p>

                            <div className="mt-6 grid grid-cols-1 gap-4">
                                <div>
                                    <label className="text-sm font-semibold">Título</label>
                                    <input
                                        name="titulo"
                                        value={form.titulo}
                                        onChange={onChange}
                                        placeholder="Ej: Leyendas de Aetheria"
                                        className="mt-2 w-full rounded-2xl border border-[#ead8ce] dark:border-[#3a2d24] bg-[#fffaf7] dark:bg-[#120b07] px-4 py-3 text-sm outline-none focus:border-[#f2780d]"
                                    />
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-sm font-semibold">Categoría</label>
                                        <select
                                            name="categoria"
                                            value={form.categoria}
                                            onChange={onChange}
                                            className="mt-2 w-full rounded-2xl border border-[#ead8ce] dark:border-[#3a2d24] bg-[#fffaf7] dark:bg-[#120b07] px-4 py-3 text-sm outline-none focus:border-[#f2780d]"
                                        >
                                            {categoriasdB.map(cat => (
                                                <option key={cat.id} value={cat.id}>{cat.nombre}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label className="text-sm font-semibold">Fecha límite</label>
                                        <input
                                            type="date"
                                            name="fecha_limite"
                                            value={form.fecha_limite}
                                            onChange={onChange}
                                            className="mt-2 w-full rounded-2xl border border-[#ead8ce] dark:border-[#3a2d24] bg-[#fffaf7] dark:bg-[#120b07] px-4 py-3 text-sm outline-none focus:border-[#f2780d]"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-sm font-semibold">Objetivo (€)</label>
                                        <input
                                            type="number"
                                            name="objetivo"
                                            value={form.objetivo}
                                            onChange={onChange}
                                            className="mt-2 w-full rounded-2xl border border-[#ead8ce] dark:border-[#3a2d24] bg-[#fffaf7] dark:bg-[#120b07] px-4 py-3 text-sm outline-none focus:border-[#f2780d]"
                                        />
                                    </div>

                                    <div>
                                        <label className="text-sm font-semibold">Imagen de portada</label>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={onImage}
                                            className="mt-2 w-full rounded-2xl border border-[#ead8ce] dark:border-[#3a2d24] bg-[#fffaf7] dark:bg-[#120b07] px-4 py-3 text-sm outline-none"
                                        />
                                    </div>
                                </div>
                            </div>
                        </section>
                        {/* BLOQUE 2: HISTORIA DEL PROYECTO */}
                        <section className="rounded-3xl border border-[#f4ede7] dark:border-[#2a2017] bg-white dark:bg-[#1a120d] p-6 shadow-sm">
                            <h3 className="text-xl font-bold">Descripción del proyecto</h3>
                            <p className="mt-1 text-sm text-[#9c7049] dark:text-[#9c7049]/80">
                                Describe el proyecto, objetivos, por qué es importante, etc.
                            </p>

                            <textarea
                                name="descripcion"
                                value={form.descripcion}
                                onChange={onChange}
                                rows={8}
                                placeholder="Describe el proyecto..."
                                className="mt-6 w-full rounded-2xl border border-[#ead8ce] dark:border-[#3a2d24] bg-[#fffaf7] dark:bg-[#120b07] px-4 py-3 text-sm outline-none focus:border-[#f2780d]"
                            />
                        </section>

                        {/* BLOQUE 3: RECOMPENSAS */}
                        <section className="rounded-3xl border border-[#f4ede7] dark:border-[#2a2017] bg-white dark:bg-[#1a120d] p-6 shadow-sm">
                            <div className="flex items-center justify-between gap-4">
                                <div>
                                    <h3 className="text-xl font-bold">Recompensas</h3>
                                    <p className="mt-1 text-sm text-[#9c7049] dark:text-[#9c7049]/80">
                                        Define qué obtendrán tus mecenas.
                                    </p>
                                </div>

                                <button
                                    type="button"
                                    onClick={addRecompensa}
                                    className="rounded-2xl h-11 px-5 bg-[#f2780d]/15 text-[#f2780d] font-bold text-sm hover:bg-[#f2780d]/25 transition"
                                >
                                    + Añadir
                                </button>
                            </div>

                            <div className="mt-6 grid grid-cols-1 gap-4">
                                {recompensas.map((r, idx) => (
                                    <RecompensaItem
                                        key={r.id}
                                        value={r}
                                        index={idx}
                                        onChange={(next) =>
                                            setRecompensas((prev) => prev.map((x) => (x.id === r.id ? next : x)))
                                        }
                                        onRemove={() =>
                                            setRecompensas((prev) => prev.filter((x) => x.id !== r.id))
                                        }
                                    />
                                ))}
                            </div>
                        </section>

                        {/* ACCIONES MOBILE */}
                        <div className="flex lg:hidden flex-col sm:flex-row gap-3">
                            <button
                                onClick={submit("publish")}
                                className="flex-1 rounded-2xl h-12 px-6 bg-[#f2780d] text-white font-bold hover:bg-[#f2780d]/90 transition"
                            >
                                {isEdit ? "Guardar cambios" : "Publicar proyecto"}
                            </button>
                        </div>

                    </div>

                    {/* COLUMNA DERECHA: PREVIEW + ACCIONES */}
                    <div className="lg:col-span-4">
                        <div className="sticky top-6 space-y-6">
                            <div className="rounded-3xl border border-[#f4ede7] dark:border-[#2a2017] bg-white dark:bg-[#1a120d] p-6 shadow-sm">
                                <h3 className="text-xl font-bold mb-4">Vista previa</h3>
                                <ProyectoCard proyecto={previewProyecto} preview />
                                <p className="mt-4 text-xs text-center text-[#9c7049]">
                                    Así es como se verá tu proyecto en el listado.
                                </p>
                            </div>

                            {/* ACCIONES DESKTOP */}
                            <div className="hidden lg:flex flex-col gap-3">
                                <button
                                    onClick={submit("publish")}
                                    className="w-full rounded-2xl h-12 px-6 bg-[#f2780d] text-white font-bold hover:bg-[#f2780d]/90 transition"
                                >
                                    {isEdit ? "Guardar cambios" : "Publicar proyecto"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

            </main>
        </div>
    );
}