import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function DonacionesAdminTab({ proyectoId }) {
  const [donaciones, setDonaciones] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let montado = true;

    const fetchDonaciones = async () => {
      try {
        const res = await axios.get(`/api/proyectos/${proyectoId}/donaciones`);
        if (montado) {
          setDonaciones(res.data);
        }
      } catch (err) {
        if (montado) {
          setError(err.response?.data?.message || 'Error al cargar las donaciones.');
        }
      } finally {
        if (montado) {
          setCargando(false);
        }
      }
    };

    fetchDonaciones();
    return () => { montado = false; };
  }, [proyectoId]);

  if (cargando) {
    return <div className="text-center py-10 text-[#9c7049]">Cargando lista de mecenas...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-500 font-bold">{error}</div>;
  }

  const formatEUR = (n) =>
    (Number(n) || 0).toLocaleString("es-ES", { minimumFractionDigits: 2 }) + " €";

  return (
    <div className="bg-white dark:bg-[#1a120d] rounded-3xl border border-[#f4ede7] dark:border-[#f4ede7]/10 p-6 sm:p-8">
      <h3 className="text-xl font-bold text-[#1c140d] dark:text-white mb-6 border-b border-[#f4ede7] dark:border-[#3a2c20] pb-4">
        Lista de Donaciones y Mecenas
      </h3>

      {donaciones.length === 0 ? (
        <div className="text-center py-8 text-[#9c7049]">
          Todavía no hay donaciones para este proyecto.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#f4ede7] dark:border-[#3a2c20] text-[#9c7049] dark:text-[#9c7049]/80 text-sm">
                <th className="pb-3 font-medium px-4">Usuario</th>
                <th className="pb-3 font-medium px-4">Importe</th>
                <th className="pb-3 font-medium px-4">Recompensa</th>
                <th className="pb-3 font-medium px-4">Fecha</th>
              </tr>
            </thead>
            <tbody className="text-[#1c140d] dark:text-gray-300">
              {donaciones.map((donacion) => (
                <tr key={donacion.id} className="border-b border-[#f4ede7] dark:border-[#3a2c20] hover:bg-[#fcfaf8] dark:hover:bg-[#120b07] transition-colors">
                  <td className="py-4 px-4 font-bold">
                    {donacion.users ? donacion.users.nombreUsuario || donacion.users.email : 'Usuario Anónimo'}
                  </td>
                  <td className="py-4 px-4 font-bold text-[#f2780d]">
                    {formatEUR(donacion.importe)}
                  </td>
                  <td className="py-4 px-4">
                    {donacion.recompensas ? (
                      <span className="inline-block px-2 py-1 bg-[#f4ede7] dark:bg-[#3a2c20] rounded text-sm">
                        {donacion.recompensas.nombreRecompensa}
                      </span>
                    ) : (
                      <span className="text-sm italic text-[#9c7049]">Donación Libre</span>
                    )}
                  </td>
                  <td className="py-4 px-4 text-sm text-[#9c7049]">
                    {new Date(donacion.fechaCompra).toLocaleDateString('es-ES', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
