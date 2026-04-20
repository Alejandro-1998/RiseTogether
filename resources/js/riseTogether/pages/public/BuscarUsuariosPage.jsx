import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

import HeaderPublic from "../../components/public/header_public";
import FooterPublic from "../../components/public/footer_public";
import PrivateChat from "../../components/chat/PrivateChat";

export default function BuscarUsuariosPage() {
  const { user: currentUser } = useAuth();
  const [query, setQuery] = useState("");
  const [usuarios, setUsuarios] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [chatUser, setChatUser] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);
  
  const navigate = useNavigate();

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  useEffect(() => {
    buscarUsuarios();
  }, []);

  const buscarUsuarios = async (searchQuery = "") => {
    setCargando(true);
    try {
      const res = await axios.get("/api/user/search", { params: { query: searchQuery } });
      setUsuarios(res.data);
    } catch (error) {
      if (error.response?.status === 401) {
        navigate("/login");
      }
      console.error("Error buscando usuarios:", error);
    } finally {
      setCargando(false);
    }
  };

  const handleSearchChange = (e) => {
    setQuery(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      buscarUsuarios(query);
    }
  };

  const executeSearch = () => {
    buscarUsuarios(query);
  };

  const toggleFollowListUser = async (targetUserId) => {
    try {
      const res = await axios.post(`/api/users/${targetUserId}/follow`);
      const isFollowingNow = res.data.is_following;
      
      if (isFollowingNow) {
        showToast("Has empezado a seguir a este usuario");
      }

      setUsuarios(usuarios.map(u => u.id === targetUserId ? { ...u, is_following: isFollowingNow } : u));
    } catch (error) {
      console.error("Error al seguir/dejar de seguir en la lista:", error);
    }
  };

  return (
    <div className="min-h-screen bg-[#fcfaf8] text-[#1c140d] dark:bg-[#120b07] dark:text-white flex flex-col">
      <HeaderPublic />

      <main className="flex-1 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-8 flex flex-col gap-4">
          <h1 className="text-3xl font-black text-[#1c140d] dark:text-white">Comunidad</h1>
          <p className="text-[#6b7280] dark:text-[#9ca3af]">Busca a otros creadores y patrocinadores en RiseTogether.</p>
          
          <div className="flex w-full mt-4 flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">search</span>
              <input 
                type="text" 
                placeholder="Buscar por nombre o usuario..." 
                value={query}
                onChange={handleSearchChange}
                onKeyDown={handleKeyDown}
                className="w-full h-12 pl-12 pr-4 rounded-2xl border border-[#e8dace] dark:border-[#374151] bg-white dark:bg-[#2d2d2d] focus:outline-none focus:ring-2 focus:ring-[#f2780d]/50"
              />
            </div>
            <button 
              onClick={executeSearch}
              className="h-12 px-8 bg-[#f2780d] text-white font-bold rounded-2xl hover:opacity-90 transition-opacity whitespace-nowrap"
            >
              Buscar
            </button>
          </div>
        </div>

        {cargando ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#f2780d]"></div>
          </div>
        ) : usuarios.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {usuarios.map((u) => (
              <div key={u.id} className="flex flex-col gap-4 p-5 bg-white dark:bg-[#2d2d2d] rounded-2xl border border-[#e8dace] dark:border-[#374151] shadow-sm justify-between transition hover:-translate-y-1 hover:shadow-md">
                <div className="flex items-center gap-4">
                  <img src={u.profile_photo_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(u.nombreUsuario)}&color=7F9CF5&background=EBF4FF`} alt={u.nombreUsuario} className="w-14 h-14 rounded-full object-cover border border-gray-100 dark:border-gray-700" />
                  <div className="truncate">
                    <Link to={`/usuario/${u.id}`} className="font-bold text-lg hover:underline truncate block">
                      {u.nombreCompleto || u.nombreUsuario}
                    </Link>
                    <p className="text-sm text-[#f2780d] truncate">@{u.nombreUsuario}</p>
                  </div>
                </div>

                {currentUser && currentUser.id !== u.id && (
                  <div className="flex flex-col gap-2 mt-2">
                    <button 
                      onClick={() => toggleFollowListUser(u.id)}
                      className={`w-full flex items-center justify-center rounded-xl h-10 px-4 text-sm font-bold shadow-sm hover:opacity-90 transition-colors ${
                        u.is_following 
                        ? "bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white" 
                        : "bg-[#f2780d] text-white"
                      }`}
                    >
                      {u.is_following ? "Siguiendo" : "Seguir"}
                    </button>

                    <button 
                      onClick={() => setChatUser(u)}
                      className="w-full text-sm bg-[#f4ede7] hover:bg-[#e8dace] dark:bg-[#1a120d] dark:hover:bg-[#2a2017] text-[#1c140d] dark:text-white px-4 py-2 rounded-xl h-10 transition flex items-center justify-center gap-2 font-bold"
                    >
                      <span className="material-symbols-outlined text-[18px]">chat</span>
                      <span>Iniciar Chat</span>
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-[#e8dace] dark:border-[#374151] bg-white dark:bg-[#2d2d2d] p-12 text-center">
            <span className="material-symbols-outlined text-4xl text-gray-400 mb-4 block">group_off</span>
            <h3 className="text-xl font-bold mb-2">No se encontraron usuarios</h3>
            <p className="text-[#6b7280] dark:text-[#9ca3af]">Prueba a buscar con otro nombre o término distinto.</p>
          </div>
        )}

        {chatUser && (
          <PrivateChat destUser={chatUser} onClose={() => setChatUser(null)} />
        )}

        {/* Notificación Toast */}
        {toastMessage && (
          <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 bg-green-500 text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-3 animate-fade-in-up">
            <span className="material-symbols-outlined">check_circle</span>
            <span className="font-medium text-sm">{toastMessage}</span>
          </div>
        )}

      </main>

      <FooterPublic />
    </div>
  );
}
