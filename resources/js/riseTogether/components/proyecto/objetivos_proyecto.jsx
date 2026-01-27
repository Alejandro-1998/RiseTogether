import { useState, useEffect } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";

export default function ObjetivosProyecto({
  porcentaje = 75,
  recaudado = 15000,
  objetivo = 20000,
  mecenas = 842,
  diasRestantes = 12,
  id,
  isFollowing = false,
}) {
  const clamp = (n) => Math.max(0, Math.min(100, Number(n) || 0));
  const pct = clamp(porcentaje);
  const { isAuth } = useAuth();
  const [siguiendo, setSiguiendo] = useState(false);
  const [loadingFollow, setLoadingFollow] = useState(false);

  useEffect(() => {
    const seguidos = JSON.parse(localStorage.getItem("seguidos")) || [];
    setSiguiendo(seguidos.includes(String(id)));
  }, [id]);

  const formatEUR = (n) =>
    (Number(n) || 0).toLocaleString("es-ES", { minimumFractionDigits: 0 }) + " €";

  const handleSeguir = () => {

    setLoadingFollow(true);
    const seguidos = JSON.parse(localStorage.getItem("seguidos")) || [];
    const idStr = String(id);

    let nuevosSeguidos;
    if (seguidos.includes(idStr)) {
      nuevosSeguidos = seguidos.filter(sid => sid !== idStr);
      setSiguiendo(false);
    } else {
      nuevosSeguidos = [...seguidos, idStr];
      setSiguiendo(true);
    }

    localStorage.setItem("seguidos", JSON.stringify(nuevosSeguidos));
    setLoadingFollow(false);
  };

  const handleApoyar = () => {
    const element = document.getElementById("donacionLibre");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
      setTimeout(() => element.focus(), 500);
    }
  };

  return (
    <div className="lg:col-span-1">
      <div className="flex flex-col gap-4 border border-[#f4ede7] dark:border-[#f4ede7]/10 rounded-3xl p-6 shadow-sm">
        <div className="flex flex-col gap-3">
          <div className="rounded-full bg-[#f4ede7] dark:bg-[#f4ede7]/10 h-2.5">
            <div className="h-2.5 rounded-full bg-[#f2780d]" style={{ width: `${pct}%` }} />
          </div>

          <div className="flex flex-col">
            <p className="text-[#f2780d] text-3xl font-bold leading-tight">{formatEUR(recaudado)}</p>
            <p className="text-[#9c7049] dark:text-[#9c7049]/80 text-sm font-normal leading-normal">
              recaudados de un objetivo de {formatEUR(objetivo)}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <p className="text-[#1c140d] dark:text-white tracking-light text-3xl font-bold leading-tight">
              {mecenas}
            </p>
            <p className="text-[#9c7049] dark:text-[#9c7049]/80 text-sm font-normal leading-normal">
              mecenas
            </p>
          </div>

          <div className="flex flex-col gap-1">
            <p className="text-[#1c140d] dark:text-white tracking-light text-3xl font-bold leading-tight">
              {diasRestantes}
            </p>
            <p className="text-[#9c7049] dark:text-[#9c7049]/80 text-sm font-normal leading-normal">
              días restantes
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-2 pt-4">
          <button
            onClick={handleApoyar}
            className="cursor-pointer flex w-full items-center justify-center overflow-hidden rounded-2xl h-12 px-6 bg-[#f2780d] text-white text-base font-bold leading-normal tracking-[0.015em] hover:bg-[#f2780d]/90 transition-colors"
          >
            <span className="truncate">Apoyar este proyecto</span>
          </button>

          <button
            onClick={handleSeguir}
            disabled={loadingFollow}
            className={`cursor-pointer flex w-full items-center justify-center overflow-hidden rounded-2xl h-12 px-6 text-base font-bold leading-normal tracking-[0.015em] transition-colors ${siguiendo
              ? "bg-[#f2780d]/10 text-[#f2780d] border border-[#f2780d]"
              : "bg-[#f4ede7] dark:bg-[#f4ede7]/10 text-[#1c140d] dark:text-white hover:bg-[#f4ede7] dark:hover:bg-[#f4ede7]/20"
              }`}
          >
            <span className="material-symbols-outlined mr-2 text-lg">
              {siguiendo ? "bookmark_added" : "bookmark_add"}
            </span>
            <span className="truncate">{siguiendo ? "Siguiendo" : "Seguir"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
