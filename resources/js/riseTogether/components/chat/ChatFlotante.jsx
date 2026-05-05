import React, { useState, useEffect } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import PanelContactos from "./PanelContactos";
import ConversacionFlotante from "./ConversacionFlotante";

export default function ChatFlotante() {
  const { user, isAuth, isLoading } = useAuth();
  const [estaAbierto, setEstaAbierto] = useState(false);
  const [totalNoLeidos, setTotalNoLeidos] = useState(0);
  const [contactoSeleccionado, setContactoSeleccionado] = useState(null);

  useEffect(() => {
    if (!isAuth) return;

    const obtenerNoLeidos = async () => {
      try {
        const { data } = await axios.get("/api/chat/no-leidos");
        setTotalNoLeidos(data.total);
      } catch (error) {
        console.error("Error al obtener no leídos:", error);
      }
    };

    obtenerNoLeidos();
    const intervalo = setInterval(obtenerNoLeidos, 5000);
    
    // Escuchar eventos para abrir el chat desde otros componentes
    const manejarAperturaChat = (e) => {
      setContactoSeleccionado(e.detail);
      setEstaAbierto(true);
    };
    window.addEventListener('abrirChatFlotante', manejarAperturaChat);

    return () => {
      clearInterval(intervalo);
      window.removeEventListener('abrirChatFlotante', manejarAperturaChat);
    };
  }, [isAuth]);

  if (isLoading || !isAuth) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end pointer-events-none">
      
      {/* Panel Flotante (Contactos o Conversación) */}
      {estaAbierto && (
        <div className="mb-4 bg-white dark:bg-[#2d2d2d] rounded-2xl w-[350px] sm:w-[400px] h-[500px] flex flex-col shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden pointer-events-auto transform transition-all duration-300 origin-bottom-right scale-100">
          {contactoSeleccionado ? (
            <ConversacionFlotante 
              usuarioDestino={contactoSeleccionado} 
              alVolver={() => setContactoSeleccionado(null)} 
              alCerrar={() => setEstaAbierto(false)}
            />
          ) : (
            <PanelContactos 
              alSeleccionarContacto={setContactoSeleccionado} 
              alCerrar={() => setEstaAbierto(false)} 
            />
          )}
        </div>
      )}

      {/* Botón Flotante */}
      <button
        onClick={() => setEstaAbierto(!estaAbierto)}
        className="relative bg-[#f2780d] hover:bg-[#d96a0a] text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-110 pointer-events-auto"
        aria-label="Abrir chat"
      >
        <span className="material-symbols-outlined text-[28px]">
          {estaAbierto ? "close" : "chat"}
        </span>

        {/* Insignia de No Leídos */}
        {totalNoLeidos > 0 && (
          <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
            {totalNoLeidos > 99 ? '99+' : totalNoLeidos}
          </div>
        )}
      </button>
      
    </div>
  );
}
