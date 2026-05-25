import { useState } from "react";
import Sidebar from "../../components/admin/sidebar";
import HeaderPublic from "../../components/public/header_public";

export default function AdminConfiguracion() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    return (
        <div className="min-h-screen flex flex-col bg-[#f8f7f5] dark:bg-[#120b07] text-gray-900 dark:text-white">
            <HeaderPublic />

            <div className="flex flex-1 flex-col xl:flex-row">
                <Sidebar mobileOpen={sidebarOpen} setMobileOpen={setSidebarOpen} />

                <div className="flex-1 w-full">
                    <main className="p-6">
                        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                            <div className="flex items-center gap-3">
                                <button 
                                    className="xl:hidden p-2 bg-white dark:bg-[#1a120d] rounded-lg shadow-sm border border-[#e8dace] dark:border-[#374151]"
                                    onClick={() => setSidebarOpen(true)}
                                >
                                    <span className="material-symbols-outlined">menu</span>
                                </button>
                                <div>
                                    <p className="text-2xl md:text-3xl font-bold leading-tight tracking-tight">
                                        Configuración del Sistema
                                    </p>
                                    <p className="text-gray-600 dark:text-gray-300 mt-1">
                                        Ajustes generales de la plataforma.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="p-10 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-2xl flex flex-col items-center justify-center text-center text-gray-500">
                            <span className="material-symbols-outlined text-4xl mb-2">settings</span>
                            <p>Módulo en construcción: Variables de entorno, permisos globales, etc.</p>
                        </div>

                    </main>
                </div>
            </div>
        </div>
    );
}
