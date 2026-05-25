import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import Sidebar from "../../components/admin/sidebar";
import HeaderPublic from "../../components/public/header_public";

export default function AdminPagos() {
    const [facturas, setFacturas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    useEffect(() => {
        fetchFacturas();
    }, []);

    const fetchFacturas = async () => {
        setLoading(true);
        try {
            const res = await axios.get('/api/admin/facturas');
            setFacturas(res.data);
        } catch (error) {
            console.error("Error al obtener facturas:", error);
            toast.error("Error al cargar las facturas");
        } finally {
            setLoading(false);
        }
    };

    const updateEstado = async (id, nuevoEstado) => {
        try {
            const res = await axios.put(`/api/admin/facturas/${id}/estado`, { estado: nuevoEstado });
            toast.success(`Factura marcada como ${nuevoEstado}`);
            setFacturas(facturas.map(f => f.id === id ? res.data.factura : f));
        } catch (error) {
            console.error(error);
            toast.error("Error al actualizar estado");
        }
    };

    const getEstadoBadge = (estado) => {
        switch(estado) {
            case 'verificada': return <span className="px-3 py-1 bg-green-100 text-green-700 rounded-lg text-xs font-bold">Verificada</span>;
            case 'rechazada': return <span className="px-3 py-1 bg-red-100 text-red-700 rounded-lg text-xs font-bold">Rechazada</span>;
            default: return <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-lg text-xs font-bold">Pendiente</span>;
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-[#f8f7f5] dark:bg-[#120b07] text-gray-900 dark:text-white">
            <HeaderPublic />
            <div className="flex flex-1 flex-col lg:flex-row">
                <Sidebar mobileOpen={sidebarOpen} setMobileOpen={setSidebarOpen} />
                <div className="flex-1 w-full">
                    <main className="p-6 max-w-7xl mx-auto">
                        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                            <div className="flex items-center gap-3">
                                <button 
                                    className="lg:hidden p-2 bg-white dark:bg-[#1a120d] rounded-lg shadow-sm border border-[#e8dace] dark:border-[#374151]"
                                    onClick={() => setSidebarOpen(true)}
                                >
                                    <span className="material-symbols-outlined">menu</span>
                                </button>
                                <div>
                                    <p className="text-2xl md:text-3xl font-bold leading-tight tracking-tight">Pagos y Facturación</p>
                                    <p className="text-gray-600 dark:text-gray-300 mt-1">Verificación de facturas de los usuarios.</p>
                                </div>
                            </div>
                        </div>

                        {loading ? (
                            <p>Cargando facturas...</p>
                        ) : facturas.length === 0 ? (
                            <div className="p-10 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-2xl flex flex-col items-center justify-center text-center text-gray-500">
                                <span className="material-symbols-outlined text-4xl mb-2">receipt_long</span>
                                <p>No hay facturas subidas todavía.</p>
                            </div>
                        ) : (
                            <div className="bg-white dark:bg-[#1e1e1e] rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden">
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left border-collapse">
                                        <thead>
                                            <tr className="bg-gray-50 dark:bg-[#2d2d2d] border-b border-gray-200 dark:border-gray-800">
                                                <th className="p-4 font-bold text-sm text-gray-500 dark:text-gray-400">Usuario</th>
                                                <th className="p-4 font-bold text-sm text-gray-500 dark:text-gray-400">Proyecto</th>
                                                <th className="p-4 font-bold text-sm text-gray-500 dark:text-gray-400">Importe</th>
                                                <th className="p-4 font-bold text-sm text-gray-500 dark:text-gray-400">Estado</th>
                                                <th className="p-4 font-bold text-sm text-gray-500 dark:text-gray-400 text-right">Acciones</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {facturas.map(f => (
                                                <tr key={f.id} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-[#2a2a2a] transition-colors">
                                                    <td className="p-4">
                                                        <div className="font-bold">{f.user?.nombreUsuario}</div>
                                                        <div className="text-xs text-gray-500">{f.cif}</div>
                                                    </td>
                                                    <td className="p-4">
                                                        <div className="font-medium truncate max-w-50" title={f.proyecto?.titulo}>{f.proyecto?.titulo || 'Proyecto eliminado'}</div>
                                                        <div className="text-xs text-gray-500">Nº {f.numeroFactura} - {new Date(f.fechaFactura).toLocaleDateString()}</div>
                                                    </td>
                                                    <td className="p-4 font-bold">{f.costo}€</td>
                                                    <td className="p-4">{getEstadoBadge(f.estado)}</td>
                                                    <td className="p-4 text-right flex items-center justify-end gap-2">
                                                        <a href={`/storage/${f.pdf}`} target="_blank" rel="noreferrer" className="rounded-xl px-4 py-2 text-sm bg-[#f2780d]/10 text-[#f2780d] font-bold hover:bg-[#f2780d]/20 flex items-center justify-center" title="Ver PDF">
                                                            <span className="material-symbols-outlined text-[16px] mr-1">visibility</span> Ver
                                                        </a>
                                                        {f.estado === 'pendiente' && (
                                                            <>
                                                                <button onClick={() => updateEstado(f.id, 'verificada')} className="rounded-xl px-4 py-2 text-sm bg-green-600 text-white font-bold hover:bg-green-700 transition-colors" title="Aprobar">
                                                                    Aprobar
                                                                </button>
                                                                <button onClick={() => updateEstado(f.id, 'rechazada')} className="rounded-xl px-4 py-2 text-sm bg-red-600/10 text-red-600 border border-red-600/20 font-bold hover:bg-red-600 hover:text-white transition-colors" title="Rechazar">
                                                                    Rechazar
                                                                </button>
                                                            </>
                                                        )}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
}
