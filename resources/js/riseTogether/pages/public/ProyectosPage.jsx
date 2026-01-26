import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import HeaderPublic from "../../components/public/header_public";
import FooterPublic from "../../components/public/footer_public";
import ProyectoCard from "../../components/cards/ProyectoCard";


export default function ProyectosPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoriaIdParam = searchParams.get("categoria");

  const [filtro, setFiltro] = useState("novedades");
  const [orden, setOrden] = useState("financiados");
  const [proyectos, setProyectos] = useState([]);
  const [loading, setLoading] = useState(true);

  // Advanced Filters State
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(categoriaIdParam || "");
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch Categories on Mount
  useEffect(() => {
    let mounted = true;
    import("axios").then((axios) => {
      axios.default.get("/api/categorias")
        .then((res) => {
          if (mounted) setCategories(res.data);
        })
        .catch((err) => console.error("Error fetching categories:", err));
    });
    return () => { mounted = false; };
  }, []);

  // Sync state if URL param changes externally (e.g. from header)
  useEffect(() => {
    if (categoriaIdParam && categoriaIdParam !== selectedCategory) {
      setSelectedCategory(categoriaIdParam);
    }
  }, [categoriaIdParam]);

  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  // Debounce Search Term
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Fetch Proyectos
  useEffect(() => {
    let mounted = true;

    const cargar = async () => {
      setLoading(true);
      try {
        let url = "/api/proyectos";
        const params = new URLSearchParams();

        if (selectedCategory) {
          params.append("categoria_id", selectedCategory);
        }
        if (debouncedSearchTerm) {
          params.append("titulo", debouncedSearchTerm);
        }

        if (params.toString()) {
          url += `?${params.toString()}`;
        }

        const res = await fetch(url, {
          headers: { Accept: "application/json" },
          credentials: "same-origin",
          cache: "no-store",
        });

        if (!res.ok) throw new Error("No endpoint /api/proyectos");

        const data = await res.json();
        if (!mounted) return;

        const lista = Array.isArray(data) ? data : data?.data ?? [];
        setProyectos(lista);
      } catch (e) {
        console.error("Error fetching projects", e);
        if (!mounted) return;
        setProyectos([]);
      } finally {
        if (!mounted) return;
        setLoading(false);
      }
    };

    cargar();

    return () => {
      mounted = false;
    };
  }, [selectedCategory, debouncedSearchTerm]);

  // Update URL params when filters change (UX)
  useEffect(() => {
    const newParams = new URLSearchParams(searchParams);
    if (selectedCategory) {
      newParams.set("categoria", selectedCategory);
    } else {
      newParams.delete("categoria");
    }
    setSearchParams(newParams);
  }, [selectedCategory, setSearchParams]);


  const [showSort, setShowSort] = useState(false);

  // Si quieres filtrar/ordenar en frontend (temporal)
  const proyectosFiltrados = useMemo(() => {
    let arr = [...proyectos];

    // 1. Filtros Rápidos (Priority)
    if (filtro === "novedades") {
      arr.sort((a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0));
    } else if (filtro === "tendencia") {
      arr.sort((a, b) => (Number(!!b.ganadorEvento) - Number(!!a.ganadorEvento)));
    } else if (filtro === "casi") {
      arr.sort((a, b) => (b.porcentaje_financiado ?? 0) - (a.porcentaje_financiado ?? 0));
    } else {
      // 2. Orden Dropdown (Solo si no hay filtro rápido)
      switch (orden) {
        case "recaudado_desc":
          arr.sort((a, b) => (b.cantidad_recaudada ?? 0) - (a.cantidad_recaudada ?? 0));
          break;
        case "recaudado_asc":
          arr.sort((a, b) => (a.cantidad_recaudada ?? 0) - (b.cantidad_recaudada ?? 0));
          break;
        default: // 'financiados' fallback
          arr.sort((a, b) => (b.cantidad_recaudada ?? 0) - (a.cantidad_recaudada ?? 0));
      }
    }

    return arr;
  }, [proyectos, filtro, orden]);

  const btnBase =
    "flex h-9 shrink-0 items-center justify-center rounded-lg px-4 text-sm font-bold transition-colors";
  const btnOn =
    "bg-[#f2780d] text-white dark:text-[#F3F4F6]";
  const btnOff =
    "bg-[#f2780d]/10 text-[#f2780d] hover:bg-[#f2780d]/20 dark:bg-[#f2780d]/20 dark:hover:bg-[#f2780d]/30";

  const sortOptions = {
    "financiados": "Más financiados",
    "recaudado_desc": "Más financiados",
    "recaudado_asc": "Menos financiados",
  };

  return (
    <div className="min-h-screen bg-[#fcfaf8] text-[#1c140d] dark:bg-[#120b07] dark:text-white">
      <HeaderPublic />

      <div className="px-4 sm:px-6 lg:px-8 flex flex-1 justify-center py-5">
        <div className="flex flex-col w-full max-w-7xl flex-1">
          {/* HERO + FILTROS */}
          <section className="flex flex-col gap-4 p-4">
            <div className="flex flex-col gap-2">
              <h1 className="text-4xl font-black leading-tight tracking-[-0.033em] text-[#1c140d] dark:text-[#F3F4F6]">
                Descubre proyectos inspiradores
              </h1>
              <p className="text-base font-normal leading-normal text-[#9c7049] dark:text-[#9CA3AF]">
                Encuentra y financia la próxima generación de ideas creativas e innovadoras.
              </p>
            </div>

            {/* SEARCH & FILTERS BAR */}
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between py-2">
              <div className="relative w-full md:w-1/3 group">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#9c7049] group-focus-within:text-[#f2780d] transition-colors">search</span>
                <input
                  type="text"
                  placeholder="Buscar por nombre..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-2xl border border-[#e8dace] dark:border-[#374151] bg-white dark:bg-[#2d2d2d] text-sm text-[#1c140d] dark:text-white placeholder-[#9c7049]/70 focus:border-[#f2780d] focus:ring-2 focus:ring-[#f2780d]/20 outline-none transition-all shadow-sm group-hover:border-[#f2780d]/50"
                />
              </div>

              <div className="relative w-full md:w-1/3">
                <div className="relative">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full pl-4 pr-10 py-3 rounded-2xl border border-[#e8dace] dark:border-[#374151] bg-white dark:bg-[#2d2d2d] text-sm text-[#1c140d] dark:text-white appearance-none focus:border-[#f2780d] focus:ring-2 focus:ring-[#f2780d]/20 outline-none transition-all shadow-sm hover:border-[#f2780d]/50 cursor-pointer"
                  >
                    <option value="">Todas las categorías</option>
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.nombre}</option>
                    ))}
                  </select>
                  <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-[#f2780d] pointer-events-none">
                    filter_list
                  </span>
                </div>
              </div>
            </div>


            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              {/* FILTROS (Frontend Quick Sorts) */}
              <div className="flex gap-2 flex-wrap">
                <button
                  type="button"
                  onClick={() => setFiltro("novedades")}
                  className={`${btnBase} ${filtro === "novedades" ? btnOn : btnOff}`}
                >
                  Novedades
                </button>

                <button
                  type="button"
                  onClick={() => setFiltro("tendencia")}
                  className={`${btnBase} ${filtro === "tendencia" ? btnOn : btnOff}`}
                >
                  Destacados
                </button>

                <button
                  type="button"
                  onClick={() => setFiltro("casi")}
                  className={`${btnBase} ${filtro === "casi" ? btnOn : btnOff}`}
                >
                  A un paso de hacerse realidad
                </button>
              </div>

              {/* ORDENAR (Dropdown) */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowSort(!showSort)}
                  className={`flex h-9 shrink-0 items-center justify-center gap-2 rounded-lg px-4 text-sm font-bold transition-colors ${!filtro && orden !== "financiados"
                    ? "bg-[#f2780d] text-white"
                    : "bg-[#f2780d]/10 text-[#f2780d] hover:bg-[#f2780d]/20 dark:bg-[#f2780d]/20 dark:hover:bg-[#f2780d]/30"
                    }`}
                >
                  <span>
                    {(!filtro && orden !== "financiados" && sortOptions[orden])
                      ? `Orden: ${sortOptions[orden]}`
                      : "Ordenar por"}
                  </span>
                  <span className="material-symbols-outlined text-base">
                    {showSort ? 'expand_less' : 'expand_more'}
                  </span>
                </button>

                {showSort && (
                  <div className="absolute right-0 top-full mt-2 w-56 rounded-xl border border-[#e8dace] dark:border-[#374151] bg-white dark:bg-[#2d2d2d] shadow-lg z-20 overflow-hidden flex flex-col">
                    {[
                      { key: 'recaudado_desc', label: 'Más financiados' },
                      { key: 'recaudado_asc', label: 'Menos financiados' },
                    ].map((opt) => (
                      <button
                        key={opt.key}
                        onClick={() => {
                          setOrden(opt.key);
                          setFiltro(""); // Desactiva Novedades/Tendencias/Casi
                          setShowSort(false);
                        }}
                        className={`px-4 py-3 text-left text-sm hover:bg-[#f2780d]/10 dark:hover:bg-[#f2780d]/20 transition-colors ${orden === opt.key && !filtro
                          ? "text-[#f2780d] font-bold bg-[#f2780d]/5"
                          : "text-[#1c140d] dark:text-white"
                          }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

            </div>
          </section>

          {/* GRID */}
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-4">
            {loading ? (
              <>
                {Array.from({ length: 8 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-[320px] rounded-xl bg-[#f4ede7]/70 dark:bg-[#2a2017]/50 animate-pulse"
                  />
                ))}
              </>
            ) : proyectosFiltrados.length ? (
              proyectosFiltrados.map((p) => (
                <ProyectoCard key={p.id ?? p.titulo} proyecto={p} />
              ))
            ) : (
              <div className="col-span-full rounded-2xl border border-[#f4ede7] dark:border-[#2a2017] bg-white dark:bg-[#1a120d] p-6 text-center">
                <p className="font-bold text-lg">No hay proyectos para mostrar.</p>
                <p className="mt-1 text-sm text-[#9c7049] dark:text-[#9CA3AF]">
                  Intenta cambiar los filtros de búsqueda.
                </p>
              </div>
            )}
          </section>

          {/* PAGINACIÓN (placeholder) */}
          <div className="p-4">
            <div className="flex items-center justify-center gap-2 text-sm text-[#9c7049] dark:text-[#9CA3AF]">
              <button className="rounded-lg px-3 py-2 bg-[#f2780d]/10 text-[#f2780d] hover:bg-[#f2780d]/20">
                Anterior
              </button>
              <span>Página 1</span>
              <button className="rounded-lg px-3 py-2 bg-[#f2780d]/10 text-[#f2780d] hover:bg-[#f2780d]/20">
                Siguiente
              </button>
            </div>
          </div>
        </div>
      </div>

      <FooterPublic />
    </div>
  );
}