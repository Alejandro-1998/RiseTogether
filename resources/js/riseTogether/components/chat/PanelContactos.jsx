import React, { useState, useEffect } from "react";
import axios from "axios";

export default function PanelContactos({ alSeleccionarContacto, alCerrar }) {
  const [contactos, setContactos] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    obtenerContactos();
  }, []);

  const obtenerContactos = async () => {
    try {
      const { data } = await axios.get("/api/chat/contactos");
      setContactos(data);
    } catch (error) {
      console.error("Error al obtener contactos:", error);
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#f9fafb] dark:bg-[#1f1f1f]">
      {/* Cabecera */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1a1a1a]">
        <h3 className="font-bold text-gray-900 dark:text-white text-lg">Chats</h3>
        <button 
          onClick={alCerrar}
          className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white transition-colors"
        >
          <span className="material-symbols-outlined">close</span>
        </button>
      </div>

      {/* Lista de Contactos */}
      <div className="flex-1 overflow-y-auto p-2">
        {cargando ? (
          <div className="flex items-center justify-center h-full">
            <span className="material-symbols-outlined animate-spin text-gray-400">autorenew</span>
          </div>
        ) : contactos.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center px-4">
            <span className="material-symbols-outlined text-4xl text-gray-300 mb-2">person_off</span>
            <p className="text-sm text-gray-500">No tienes contactos para chatear. ¡Sigue a algunos usuarios para empezar!</p>
          </div>
        ) : (
          <div className="space-y-1">
            {contactos.map((contacto) => (
              <button
                key={contacto.id}
                onClick={() => alSeleccionarContacto(contacto)}
                className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <img 
                      src={contacto.profile_photo_url || `https://ui-avatars.com/api/?name=${contacto.nombreUsuario}`} 
                      alt={contacto.nombreUsuario} 
                      className="w-12 h-12 rounded-full object-cover shadow-sm group-hover:shadow-md transition-shadow"
                    />
                  </div>
                  <div className="text-left">
                    <h4 className="font-semibold text-gray-900 dark:text-white text-sm line-clamp-1">
                      {contacto.nombreCompleto || contacto.nombreUsuario}
                    </h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400">@{contacto.nombreUsuario}</p>
                  </div>
                </div>

                {contacto.no_leidos > 0 && (
                  <div className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-sm">
                    {contacto.no_leidos > 99 ? '99+' : contacto.no_leidos}
                  </div>
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
