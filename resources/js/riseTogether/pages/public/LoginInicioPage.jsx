import HeaderAuth from "../../components/public/header_auth";
import FormularioLoginInicio from "../../components/login/formulario_loginInicio";
import VideoLoginInicio from "../../components/login/video_loginInicio";

export default function LoginInicioPage() {
  return (
    <div className="min-h-screen bg-[#fcfaf8] text-[#1c140d] dark:bg-[#1c140d] dark:text-[#fcfaf8]">

      {/* Header especial SOLO para login/registro */}
      <HeaderAuth />

      <main className="px-6 py-16">
        <section className="relative isolate">

          {/* Fondo clarito detrás (el “blur” del Blade) */}
          <div className="pointer-events-none absolute inset-0 -z-10">
            <div className="mx-auto h-96 max-w-6xl rounded-[2.5rem] bg-[#f4ede7]/70 dark:bg-[#2a2017]/50" />
          </div>

          {/* Tarjeta blanca con el formulario + vídeo */}
          <div className="mx-auto grid max-w-6xl overflow-hidden rounded-2xl border border-[#f4ede7] bg-white shadow-sm dark:border-[#2a2017] dark:bg-[#2a2017] md:grid-cols-2">
            <FormularioLoginInicio />
            <VideoLoginInicio />
          </div>

        </section>
      </main>
    </div>
  );
}
