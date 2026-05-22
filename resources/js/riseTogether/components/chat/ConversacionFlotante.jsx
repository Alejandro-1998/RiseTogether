import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";

export default function ConversacionFlotante({ usuarioDestino, alVolver, alCerrar }) {
  const { user } = useAuth();
  const [mensajes, setMensajes] = useState([]);
  const [nuevoMensaje, setNuevoMensaje] = useState("");
  const [cargando, setCargando] = useState(true);
  const finalMensajesRef = useRef(null);

  useEffect(() => {
    obtenerMensajes();
    const intervalo = setInterval(obtenerMensajes, 3000);
    return () => clearInterval(intervalo);
  }, [usuarioDestino.id]);

  const obtenerMensajes = async () => {
    try {
      const { data } = await axios.get(`/api/chat/${usuarioDestino.id}`);
      setMensajes(data);
    } catch (error) {
      console.error("Error al obtener mensajes:", error);
    } finally {
      if (cargando) setCargando(false);
    }
  };

  useEffect(() => {
    finalMensajesRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [mensajes]);

  const enviarMensaje = async (e) => {
    e.preventDefault();
    if (!nuevoMensaje.trim()) return;

    try {
      const { data } = await axios.post(`/api/chat/${usuarioDestino.id}`, { contenido: nuevoMensaje });
      setMensajes([...mensajes, data]);
      setNuevoMensaje("");
    } catch (error) {
      console.error("Error al enviar mensaje:", error);
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#f9fafb] dark:bg-[#1f1f1f]">
      {/* Cabecera */}
      <div className="flex items-center justify-between p-3 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1a1a1a]">
        <div className="flex items-center gap-2">
          <button 
            onClick={alVolver}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white transition-colors p-1"
          >
            <span className="material-symbols-outlined text-lg">arrow_back</span>
          </button>
          <img 
            src={usuarioDestino.profile_photo_url || `https://ui-avatars.com/api/?name=${usuarioDestino.nombreUsuario}`} 
            alt={usuarioDestino.nombreUsuario} 
            className="w-8 h-8 rounded-full object-cover"
          />
          <div className="leading-tight">
            <h4 className="font-bold text-gray-900 dark:text-white text-sm line-clamp-1">
              {usuarioDestino.nombreCompleto || usuarioDestino.nombreUsuario}
            </h4>
            <p className="text-[10px] text-gray-500 dark:text-gray-400 line-clamp-1">@{usuarioDestino.nombreUsuario}</p>
          </div>
        </div>
        <button 
          onClick={alCerrar}
          className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white transition-colors p-1"
        >
          <span className="material-symbols-outlined text-lg">close</span>
        </button>
      </div>

      {/* Lista de Mensajes */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3 bg-[#f9fafb] dark:bg-[#1f1f1f] text-sm custom-scrollbar">
        {cargando ? (
          <div className="flex items-center justify-center h-full">
            <span className="material-symbols-outlined animate-spin text-gray-400">autorenew</span>
          </div>
        ) : mensajes.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center px-4">
            <span className="material-symbols-outlined text-3xl text-gray-300 mb-2">waving_hand</span>
            <p className="text-xs text-gray-500">No hay mensajes todavía. ¡Di hola!</p>
          </div>
        ) : (
          mensajes.map((msg) => {
            const esMio = msg.id_remitente === user?.id;
            return (
              <div key={msg.id} className={`flex ${esMio ? 'justify-end' : 'justify-start'}`}>
                <div 
                  className={`max-w-[85%] rounded-2xl px-3 py-2 ${
                    esMio 
                      ? 'bg-[#f2780d] text-white rounded-br-none shadow-sm' 
                      : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 rounded-bl-none shadow-sm'
                  }`}
                >
                  <p className="wrap-break-word">{msg.contenido}</p>
                </div>
              </div>
            );
          })
        )}
        <div ref={finalMensajesRef} />
      </div>

      {/* Input de Mensaje */}
      <div className="p-3 bg-white dark:bg-[#2d2d2d] border-t border-gray-200 dark:border-gray-700">
        <form onSubmit={enviarMensaje} className="flex gap-2">
          <input
            type="text"
            value={nuevoMensaje}
            onChange={(e) => setNuevoMensaje(e.target.value)}
            placeholder="Escribe un mensaje..."
            autoFocus
            className="flex-1 bg-gray-100 dark:bg-gray-800 text-sm text-gray-900 dark:text-white px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-[#f2780d]/50"
          />
          <button 
            type="submit"
            disabled={!nuevoMensaje.trim()}
            className="bg-[#f2780d] hover:bg-[#d96a0a] disabled:opacity-50 text-white w-9 h-9 shrink-0 rounded-full flex items-center justify-center transition-colors shadow-sm"
          >
            <span className="material-symbols-outlined text-[18px]">send</span>
          </button>
        </form>
      </div>
    </div>
  );
}
