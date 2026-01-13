import { useEffect, useMemo, useState } from "react";
import HeaderPublic from "../../components/public/header_public";
import FooterPublic from "../../components/public/footer_public";
import ProyectoCard from "../../components/proyecto/proyecto_card";


export default function ProyectosPage() {
  const [filtro, setFiltro] = useState("casi"); // tendencia | novedades | casi
  const [orden, setOrden] = useState("financiados"); // financiados | recientes | ...
  const [proyectos, setProyectos] = useState([]);
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    let mounted = true;

    const cargar = async () => {
      try {
        // Si no tienes endpoint todavía, esto fallará y usamos fallback.
        const res = await fetch("/api/proyectos", {
          headers: { Accept: "application/json" },
          credentials: "same-origin",
        });

        if (!res.ok) throw new Error("No endpoint /api/proyectos");

        const data = await res.json();
        if (!mounted) return;

        // Soporta {data: []} o [] directamente
        const lista = Array.isArray(data) ? data : data?.data ?? [];
        setProyectos(lista);
      } catch (e) {
        // Fallback para que se vea la página sin back
        if (!mounted) return;
        setProyectos([
          {
            id: 1,
            titulo: "Proyecto demo 1",
            resumen: "Esto es una tarjeta de ejemplo hasta conectar con Laravel.",
            categoria: { nombre: "General" },
            imagen_portada: null,
            cantidad_recaudada: 1200,
            porcentaje_financiado: 24,
            fecha_limite: new Date(Date.now() + 1000 * 60 * 60 * 24 * 15),
          },
          {
            id: 2,
            titulo: "Proyecto demo 2",
            resumen: "Grid responsive igual que en Blade (1/2/3/4 columnas).",
            categoria: { nombre: "Arte" },
            imagen_portada: null,
            cantidad_recaudada: 9800,
            porcentaje_financiado: 80,
            fecha_limite: new Date(Date.now() + 1000 * 60 * 60 * 24 * 35),
          },
        ]);
      } finally {
        if (!mounted) return;
        setLoading(false);
      }
    };

    cargar();
    return () => {
      mounted = false;
    };
  }, []);

  // Si quieres filtrar/ordenar en frontend (temporal)
  const proyectosFiltrados = useMemo(() => {
    let arr = [...proyectos];

    // Filtros de ejemplo (hasta que el back los haga)
    if (filtro === "novedades") {
      // si tuvieras created_at aquí ordenarías por fecha
      // lo dejamos tal cual
    } else if (filtro === "tendencia") {
      // podrías ordenar por visitas/likes si existieran
    } else if (filtro === "casi") {
      arr.sort((a, b) => (b.porcentaje_financiado ?? 0) - (a.porcentaje_financiado ?? 0));
    }

    // Orden (placeholder)
    if (orden === "financiados") {
      arr.sort((a, b) => (b.cantidad_recaudada ?? 0) - (a.cantidad_recaudada ?? 0));
    }

    return arr;
  }, [proyectos, filtro, orden]);

  const btnBase =
    "flex h-9 shrink-0 items-center justify-center rounded-lg px-4 text-sm font-bold transition-colors";
  const btnOn =
    "bg-[#f2780d] text-white dark:text-[#F3F4F6]";
  const btnOff =
    "bg-[#f2780d]/10 text-[#f2780d] hover:bg-[#f2780d]/20 dark:bg-[#f2780d]/20 dark:hover:bg-[#f2780d]/30";

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

            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              {/* filtros */}
              <div className="flex gap-2 flex-wrap">
                <button
                  type="button"
                  onClick={() => setFiltro("tendencia")}
                  className={`${btnBase} ${filtro === "tendencia" ? btnOn : btnOff}`}
                >
                  Tendencia
                </button>

                <button
                  type="button"
                  onClick={() => setFiltro("novedades")}
                  className={`${btnBase} ${filtro === "novedades" ? btnOn : btnOff}`}
                >
                  Novedades
                </button>

                <button
                  type="button"
                  onClick={() => setFiltro("casi")}
                  className={`${btnBase} ${filtro === "casi" ? btnOn : btnOff}`}
                >
                  A un paso de hacerse realidad
                </button>
              </div>

              {/* ordenar */}
              <button
                type="button"
                onClick={() =>
                  setOrden((o) => (o === "financiados" ? "financiados" : "financiados"))
                }
                className="flex h-9 shrink-0 items-center justify-center gap-2 rounded-lg px-4 text-sm font-bold bg-[#f2780d]/10 text-[#f2780d] hover:bg-[#f2780d]/20 dark:bg-[#f2780d]/20 dark:hover:bg-[#f2780d]/30 transition-colors"
              >
                <span>Ordenar por: Los más financiados</span>
                <span className="material-symbols-outlined text-base">expand_more</span>
              </button>
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
              <div className="col-span-full rounded-2xl border border-[#f4ede7] dark:border-[#2a2017] bg-white dark:bg-[#1a120d] p-6">
                <p className="font-bold">No hay proyectos para mostrar.</p>
                <p className="mt-1 text-sm text-[#9c7049] dark:text-[#9CA3AF]">
                  Prueba con otro filtro o vuelve más tarde.
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