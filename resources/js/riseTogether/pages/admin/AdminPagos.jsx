import Sidebar from "../../components/admin/sidebar";
import HeaderPublic from "../../components/public/header_public";

export default function AdminPagos() {
    return (
        <div className="min-h-screen flex flex-col bg-[#f8f7f5] dark:bg-[#120b07] text-gray-900 dark:text-white">
            <HeaderPublic />

            <div className="flex flex-1">
                <Sidebar />

                <div className="flex-1 w-full">
                    <main className="p-6">
                        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                            <div>
                                <p className="text-3xl font-bold leading-tight tracking-tight">
                                    Pagos y Facturación
                                </p>
                                <p className="text-gray-600 dark:text-gray-300 mt-1">
                                    Gestión de transacciones y pagos de la plataforma.
                                </p>
                            </div>
                        </div>

                        <div className="p-10 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-2xl flex flex-col items-center justify-center text-center text-gray-500">
                            <span className="material-symbols-outlined text-4xl mb-2">receipt_long</span>
                            <p>Módulo en construcción: Historial de transacciones y facturas.</p>
                        </div>

                    </main>
                </div>
            </div>
        </div>
    );
}
