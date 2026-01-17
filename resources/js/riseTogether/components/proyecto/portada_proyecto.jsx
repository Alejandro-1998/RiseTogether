import { useMemo, useState } from "react";

export default function PortadaProyecto({ imagenes = [], children }) {
  const imgs = useMemo(() => (imagenes?.length ? imagenes : ["/img/juego.png"]), [imagenes]);
  const [active, setActive] = useState(0);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-4">
      <div className="lg:col-span-2">
        <div
          className="w-full bg-center bg-no-repeat bg-cover flex flex-col justify-end overflow-hidden rounded-3xl min-h-[26rem]"
          style={{ backgroundImage: `url('${imgs[active]}')` }}
        />

        <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 mt-2">
          {imgs.slice(0, 3).map((img, i) => {
            const isActive = i === active;
            return (
              <button
                key={img + i}
                type="button"
                onClick={() => setActive(i)}
                className={[
                  "aspect-video w-full bg-center bg-no-repeat bg-cover rounded-2xl cursor-pointer transition-opacity border-2",
                  isActive ? "border-[#f2780d]" : "border-transparent opacity-70 hover:opacity-100",
                ].join(" ")}
                style={{ backgroundImage: `url('${img}')` }}
                aria-label={`Imagen ${i + 1}`}
              />
            );
          })}
        </div>
      </div>

      {/* Sidebar objetivos */}
      {children}
    </div>
  );
}
