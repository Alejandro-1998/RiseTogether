export default function VideoRegistro() {
    return (
        <div className="relative hidden overflow-hidden bg-[#f4ede7] dark:bg-[#2a2017] lg:block">
            <div className="absolute inset-0">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 h-full w-full object-cover"
                >
                    <source src="/media/reunion.mp4" type="video/mp4" />
                    Tu navegador no soporta el vídeo.
                </video>
                <div className="absolute inset-0 bg-black/30" />
            </div>

            <div className="relative flex h-full flex-col items-center justify-center px-10 text-center text-white">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#f4a261]/40">
                    <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                        <path
                            d="M20 21a8 8 0 0 0-16 0"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                        />
                        <path
                            d="M12 13a4 4 0 1 0-4-4 4 4 0 0 0 4 4Z"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                        />
                    </svg>
                </div>

                <h2 className="text-3xl font-extrabold">Únete, crea, crece</h2>
                <p className="mt-3 max-w-md text-sm text-white/90">
                    Crea tu cuenta y forma parte de la comunidad para apoyar proyectos o
                    lanzar el tuyo con Rise Together.
                </p>
            </div>
        </div>
    );
}