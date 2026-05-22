import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function UsuarioFacturasTab({ usuario, isMe }) {
  const [facturas, setFacturas] = useState([]);
  const [proyectos, setProyectos] = useState([]);
  const [loading, setLoading] = useState(true);

  const [proyectoId, setProyectoId] = useState('');
  const [numeroFactura, setNumeroFactura] = useState('');
  const [cif, setCif] = useState('');
  const [costo, setCosto] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [direccionFiscal, setDireccionFiscal] = useState('');
  const [archivoPdf, setArchivoPdf] = useState(null);

  useEffect(() => {
    fetchData();
  }, [usuario.id]);

  const fetchData = async () => {
    setLoading(true);
    try {
      if (isMe) {
        const resFacturas = await axios.get('/api/facturas');
        setFacturas(resFacturas.data);
      }

      const resProyectos = await axios.get(`/api/proyectos?user_id=${usuario.id}`);
      setProyectos(resProyectos.data);
    } catch (err) {
      console.error(err);
      toast.error('Error al cargar datos de facturas.');
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!archivoPdf) {
      return toast.error("Selecciona un archivo PDF");
    }
    
    const formData = new FormData();
    formData.append('proyecto_id', proyectoId);
    formData.append('numeroFactura', numeroFactura);
    formData.append('cif', cif);
    formData.append('fechaFactura', new Date().toISOString().split('T')[0]);
    formData.append('costo', costo);
    formData.append('descripcion', descripcion);
    formData.append('direccionFiscal', direccionFiscal);
    formData.append('pdf', archivoPdf);

    try {
      const res = await axios.post('/api/facturas', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      toast.success('Factura subida con éxito');
      setFacturas([res.data, ...facturas]);
      
      setNumeroFactura('');
      setCif('');
      setCosto('');
      setDescripcion('');
      setDireccionFiscal('');
      setArchivoPdf(null);
    } catch (err) {
      console.error(err);
      toast.error('Error al subir factura');
    }
  };

  const getEstadoBadge = (estado) => {
    switch(estado) {
      case 'verificada': return <span className="px-2 py-1 bg-green-100 text-green-700 rounded-lg text-xs font-bold">Verificada</span>;
      case 'rechazada': return <span className="px-2 py-1 bg-red-100 text-red-700 rounded-lg text-xs font-bold">Rechazada</span>;
      default: return <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-lg text-xs font-bold">Pendiente</span>;
    }
  };

  if (loading) return <p>Cargando facturas...</p>;

  if (!isMe) {
    return <div className="text-gray-500 bg-white dark:bg-[#2d2d2d] border border-[#e8dace] dark:border-[#374151] p-6 rounded-2xl text-center">Para ver u operar con facturas ajenas, usa el Panel de Administrador.</div>;
  }

  return (
    <div className="space-y-8">
      {/* Formulario de subida */}
      <div className="bg-white dark:bg-[#2d2d2d] border border-[#e8dace] dark:border-[#374151] rounded-2xl p-6 shadow-sm">
        <h3 className="text-lg font-bold mb-4 text-[#1c140d] dark:text-white">Subir Factura</h3>
        <form onSubmit={handleUpload} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Proyecto asociado</label>
            <select required value={proyectoId} onChange={e => setProyectoId(e.target.value)} className="w-full border border-gray-300 dark:border-gray-700 rounded-xl px-4 py-2 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100">
              <option value="">Selecciona un proyecto</option>
              {proyectos.map(p => <option key={p.id} value={p.id}>{p.titulo}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Número de Factura</label>
            <input required type="number" value={numeroFactura} onChange={e => setNumeroFactura(e.target.value)} className="w-full border border-gray-300 dark:border-gray-700 rounded-xl px-4 py-2 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">CIF / NIF</label>
            <input required type="text" minLength="9" maxLength="9" value={cif} onChange={e => setCif(e.target.value)} className="w-full border border-gray-300 dark:border-gray-700 rounded-xl px-4 py-2 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Costo Total (€)</label>
            <input required type="number" step="0.01" value={costo} onChange={e => setCosto(e.target.value)} className="w-full border border-gray-300 dark:border-gray-700 rounded-xl px-4 py-2 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Dirección Fiscal</label>
            <input required type="text" value={direccionFiscal} onChange={e => setDireccionFiscal(e.target.value)} className="w-full border border-gray-300 dark:border-gray-700 rounded-xl px-4 py-2 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Descripción</label>
            <input required type="text" value={descripcion} onChange={e => setDescripcion(e.target.value)} className="w-full border border-gray-300 dark:border-gray-700 rounded-xl px-4 py-2 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Archivo PDF</label>
            <input required type="file" accept="application/pdf" onChange={e => setArchivoPdf(e.target.files[0])} className="w-full border border-gray-300 dark:border-gray-700 rounded-xl px-4 py-2 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 file:border-0 file:bg-[#f2780d] file:text-white file:rounded-md file:px-3 file:py-1 file:mr-3 hover:file:bg-[#d96a0a] transition-all cursor-pointer" />
          </div>
          <div className="md:col-span-2 text-right">
            <button type="submit" className="bg-[#f2780d] text-white px-6 py-2 rounded-xl font-bold hover:bg-[#d96a0a] transition-colors">Subir Factura</button>
          </div>
        </form>
      </div>

      {/* Lista de facturas */}
      <div>
        <h3 className="text-lg font-bold mb-4 text-[#1c140d] dark:text-white">Mis Facturas Subidas</h3>
        {facturas.length === 0 ? (
          <div className="bg-white dark:bg-[#2d2d2d] border border-[#e8dace] dark:border-[#374151] rounded-2xl p-6 text-center text-gray-500">
            Aún no has subido ninguna factura.
          </div>
        ) : (
          <div className="grid gap-4">
            {facturas.map(f => (
              <div key={f.id} className="bg-white dark:bg-[#2d2d2d] border border-[#e8dace] dark:border-[#374151] rounded-2xl p-5 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="flex flex-col">
                  <span className="font-bold text-[#1c140d] dark:text-white">Factura #{f.numeroFactura} - {f.proyecto?.titulo}</span>
                  <span className="text-sm text-gray-500">Subida el {new Date(f.created_at).toLocaleDateString()} | Costo: {Number(f.costo).toLocaleString('es-ES', {minimumFractionDigits: 2})}€</span>
                  <span className="text-sm text-gray-500">Desc: {f.descripcion}</span>
                </div>
                <div className="flex items-center gap-3">
                  {getEstadoBadge(f.estado)}
                  <a href={`/storage/${f.pdf}`} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-[#f2780d] hover:text-[#d96a0a] text-sm font-bold bg-[#f2780d]/10 px-3 py-1.5 rounded-lg transition-colors">
                    <span className="material-symbols-outlined text-[18px]">visibility</span> Ver PDF
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
