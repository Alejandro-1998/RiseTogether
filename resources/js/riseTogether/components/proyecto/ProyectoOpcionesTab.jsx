import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function ProyectoOpcionesTab({ proyecto, onUpdate }) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [formData, setFormData] = useState({
    titulo: proyecto.titulo,
    descripcion: proyecto.descripcion,
  });

  const [rewardData, setRewardData] = useState({
    nombreRecompensa: '',
    costoRecompensa: '',
    descripcionRecompensa: '',
    tipoEntrega: 'fisica',
  });
  const [isAddingReward, setIsAddingReward] = useState(false);

  const premiumToast = {
    success: (msg) => toast.success(msg, {
        style: { borderRadius: '16px', background: '#1c140d', color: '#fff', border: '1px solid rgba(242, 127, 13, 0.2)', padding: '16px', fontWeight: 'bold' },
        iconTheme: { primary: '#f27f0d', secondary: '#fff' },
    }),
    error: (msg) => toast.error(msg, {
        style: { borderRadius: '16px', background: '#1c140d', color: '#fff', border: '1px solid rgba(239, 68, 68, 0.2)', padding: '16px', fontWeight: 'bold' },
    }),
  };

  const handleProjectUpdate = async (e) => {
    e.preventDefault();
    setIsUpdating(true);
    try {
      const res = await axios.put(`/api/proyectos/${proyecto.id}`, formData);
      premiumToast.success('Proyecto actualizado correctamente');
      if (onUpdate) {
        onUpdate(res.data);
      }
    } catch (error) {
      console.error('Error updating project:', error);
      premiumToast.error(error.response?.data?.message || 'Error al actualizar el proyecto');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleRewardSubmit = async (e) => {
    e.preventDefault();
    setIsAddingReward(true);
    try {
      const payload = {
        idProyecto: proyecto.id,
        ...rewardData
      };
      const res = await axios.post('/api/recompensas', payload);
      premiumToast.success('Recompensa creada correctamente');
      
      // Update local state or notify parent to reload
      if (onUpdate) {
        // We just fetch the updated project to get the new rewards list easily
        const updatedProjectRes = await axios.get(`/api/proyectos/${proyecto.id}`);
        onUpdate(updatedProjectRes.data);
      }
      
      setRewardData({
        nombreRecompensa: '',
        costoRecompensa: '',
        descripcionRecompensa: '',
        tipoEntrega: 'fisica',
      });
    } catch (error) {
      console.error('Error creating reward:', error);
      premiumToast.error(error.response?.data?.message || 'Error al crear la recompensa');
    } finally {
      setIsAddingReward(false);
    }
  };

  return (
    <div className="space-y-12">
      {/* Información básica */}
      <section className="bg-white dark:bg-[#1a120d] rounded-3xl border border-[#f4ede7] dark:border-[#f4ede7]/10 p-6 sm:p-8">
        <h3 className="text-xl font-bold text-[#1c140d] dark:text-white mb-6 border-b border-[#f4ede7] dark:border-[#3a2c20] pb-4">
          Información Básica
        </h3>
        <form onSubmit={handleProjectUpdate} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-[#1c140d] dark:text-gray-300 mb-2">
              Título del Proyecto
            </label>
            <input
              type="text"
              value={formData.titulo}
              onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
              required
              className="w-full rounded-xl border border-[#e6dbd1] dark:border-[#3a2c20] bg-transparent px-4 py-3 text-[#1c140d] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#f2780d]"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-[#1c140d] dark:text-gray-300 mb-2">
              Descripción
            </label>
            <textarea
              value={formData.descripcion}
              onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
              required
              rows={8}
              className="w-full rounded-xl border border-[#e6dbd1] dark:border-[#3a2c20] bg-transparent px-4 py-3 text-[#1c140d] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#f2780d]"
            ></textarea>
          </div>
          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={isUpdating}
              className="px-6 py-3 bg-[#f2780d] hover:bg-[#d96600] text-white font-bold rounded-xl transition-colors disabled:opacity-50"
            >
              {isUpdating ? 'Guardando...' : 'Guardar Cambios'}
            </button>
          </div>
        </form>
      </section>

      {/* Crear Nueva Recompensa */}
      <section className="bg-white dark:bg-[#1a120d] rounded-3xl border border-[#f4ede7] dark:border-[#f4ede7]/10 p-6 sm:p-8">
        <h3 className="text-xl font-bold text-[#1c140d] dark:text-white mb-6 border-b border-[#f4ede7] dark:border-[#3a2c20] pb-4">
          Crear Nueva Recompensa
        </h3>
        <form onSubmit={handleRewardSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-[#1c140d] dark:text-gray-300 mb-2">
                Título de la Recompensa
              </label>
              <input
                type="text"
                value={rewardData.nombreRecompensa}
                onChange={(e) => setRewardData({ ...rewardData, nombreRecompensa: e.target.value })}
                required
                className="w-full rounded-xl border border-[#e6dbd1] dark:border-[#3a2c20] bg-transparent px-4 py-3 text-[#1c140d] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#f2780d]"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-[#1c140d] dark:text-gray-300 mb-2">
                Costo / Aportación (€)
              </label>
              <input
                type="number"
                min="1"
                step="0.01"
                value={rewardData.costoRecompensa}
                onChange={(e) => setRewardData({ ...rewardData, costoRecompensa: e.target.value })}
                required
                className="w-full rounded-xl border border-[#e6dbd1] dark:border-[#3a2c20] bg-transparent px-4 py-3 text-[#1c140d] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#f2780d]"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-bold text-[#1c140d] dark:text-gray-300 mb-2">
              Tipo de Entrega
            </label>
            <select
              value={rewardData.tipoEntrega}
              onChange={(e) => setRewardData({ ...rewardData, tipoEntrega: e.target.value })}
              className="w-full rounded-xl border border-[#e6dbd1] dark:border-[#3a2c20] bg-transparent px-4 py-3 text-[#1c140d] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#f2780d]"
            >
              <option value="fisica">Física</option>
              <option value="digital">Digital</option>
              <option value="mixta">Mixta</option>
              <option value="desbloqueo">Desbloqueo</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-bold text-[#1c140d] dark:text-gray-300 mb-2">
              Descripción de lo que incluye
            </label>
            <textarea
              value={rewardData.descripcionRecompensa}
              onChange={(e) => setRewardData({ ...rewardData, descripcionRecompensa: e.target.value })}
              required
              rows={4}
              minLength={10}
              className="w-full rounded-xl border border-[#e6dbd1] dark:border-[#3a2c20] bg-transparent px-4 py-3 text-[#1c140d] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#f2780d]"
            ></textarea>
          </div>
          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={isAddingReward}
              className="px-6 py-3 bg-[#1c140d] dark:bg-white text-white dark:text-[#1c140d] hover:opacity-90 font-bold rounded-xl transition-colors disabled:opacity-50"
            >
              {isAddingReward ? 'Creando...' : 'Crear Recompensa'}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
