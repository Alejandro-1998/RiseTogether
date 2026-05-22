import React, { useState, useRef } from 'react';
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
  const [editingRewardId, setEditingRewardId] = useState(null);
  const titleInputRef = useRef(null);

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
      
      if (editingRewardId) {
        await axios.put(`/api/recompensas/${editingRewardId}`, payload);
        premiumToast.success('Recompensa actualizada correctamente');
      } else {
        await axios.post('/api/recompensas', payload);
        premiumToast.success('Recompensa creada correctamente');
      }
      
      if (onUpdate) {
        const updatedProjectRes = await axios.get(`/api/proyectos/${proyecto.id}`);
        onUpdate(updatedProjectRes.data);
      }
      
      setEditingRewardId(null);
      setRewardData({
        nombreRecompensa: '',
        costoRecompensa: '',
        descripcionRecompensa: '',
        tipoEntrega: 'fisica',
      });
    } catch (error) {
      console.error('Error saving reward:', error);
      premiumToast.error(error.response?.data?.message || 'Error al guardar la recompensa');
    } finally {
      setIsAddingReward(false);
    }
  };

  const handleEditReward = (reward) => {
    setEditingRewardId(reward.id);
    setRewardData({
      nombreRecompensa: reward.nombreRecompensa,
      costoRecompensa: reward.costoRecompensa,
      descripcionRecompensa: reward.descripcionRecompensa,
      tipoEntrega: reward.tipoEntrega,
    });
    
    setTimeout(() => {
      if (titleInputRef.current) {
        titleInputRef.current.focus();
        titleInputRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 100);
  };

  const handleBlockReward = async (rewardId) => {
    try {
      await axios.delete(`/api/recompensas/${rewardId}`);
      premiumToast.success('Recompensa bloqueada correctamente');
      if (onUpdate) {
        const updatedProjectRes = await axios.get(`/api/proyectos/${proyecto.id}`);
        onUpdate(updatedProjectRes.data);
      }
      if (editingRewardId === rewardId) {
        setEditingRewardId(null);
        setRewardData({
          nombreRecompensa: '',
          costoRecompensa: '',
          descripcionRecompensa: '',
          tipoEntrega: 'fisica',
        });
      }
    } catch (error) {
      console.error('Error blocking reward:', error);
      premiumToast.error(error.response?.data?.message || 'Error al bloquear la recompensa');
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

      {/* Gestión de Recompensas Existentes */}
      {proyecto.recompensas && proyecto.recompensas.length > 0 && (
        <section className="bg-white dark:bg-[#1a120d] rounded-3xl border border-[#f4ede7] dark:border-[#f4ede7]/10 p-6 sm:p-8">
          <h3 className="text-xl font-bold text-[#1c140d] dark:text-white mb-6 border-b border-[#f4ede7] dark:border-[#3a2c20] pb-4">
            Tus Recompensas
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {proyecto.recompensas.map((rec) => (
              <div key={rec.id} className={`border rounded-2xl p-4 flex flex-col justify-between ${rec.deleted_at ? 'opacity-60 grayscale border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50' : 'border-[#e6dbd1] dark:border-[#3a2c20]'}`}>
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-bold text-[#1c140d] dark:text-white text-lg">
                      {rec.nombreRecompensa}
                      {rec.deleted_at && <span className="ml-2 text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full inline-block align-middle">Bloqueada</span>}
                    </h4>
                    <span className="bg-[#f2780d]/10 text-[#f2780d] px-2 py-1 rounded text-sm font-bold">
                      {rec.costoRecompensa}€
                    </span>
                  </div>
                  <p className="text-sm text-[#6b7280] dark:text-[#9ca3af] line-clamp-2 mb-2">
                    {rec.descripcionRecompensa}
                  </p>
                  <p className="text-xs text-[#9c7049] uppercase font-bold mb-4">
                    Entrega: {rec.tipoEntrega}
                  </p>
                </div>
                {!rec.deleted_at ? (
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => handleEditReward(rec)}
                      className="flex-1 px-3 py-2 bg-[#f4ede7] dark:bg-[#3a2c20] text-[#1c140d] dark:text-white rounded-xl text-sm font-bold hover:bg-[#e6dbd1] dark:hover:bg-[#4a3c30] transition-colors"
                    >
                      Editar
                    </button>
                    <button
                      type="button"
                      onClick={() => handleBlockReward(rec.id)}
                      className="flex-1 px-3 py-2 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-xl text-sm font-bold hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors"
                    >
                      Bloquear
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={async () => {
                        try {
                          await axios.put(`/api/recompensas/${rec.id}/restore`);
                          premiumToast.success('Recompensa desbloqueada correctamente');
                          if (onUpdate) {
                            const updatedProjectRes = await axios.get(`/api/proyectos/${proyecto.id}`);
                            onUpdate(updatedProjectRes.data);
                          }
                        } catch (error) {
                          console.error('Error restoring reward:', error);
                          premiumToast.error(error.response?.data?.message || 'Error al desbloquear la recompensa');
                        }
                      }}
                      className="flex-1 px-3 py-2 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-xl text-sm font-bold hover:bg-green-200 dark:hover:bg-green-900/50 transition-colors"
                    >
                      Desbloquear
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Crear / Editar Recompensa */}
      <section className="bg-white dark:bg-[#1a120d] rounded-3xl border border-[#f4ede7] dark:border-[#f4ede7]/10 p-6 sm:p-8">
        <div className="flex justify-between items-center mb-6 border-b border-[#f4ede7] dark:border-[#3a2c20] pb-4">
          <h3 className="text-xl font-bold text-[#1c140d] dark:text-white">
            {editingRewardId ? 'Editar Recompensa' : 'Crear Nueva Recompensa'}
          </h3>
          {editingRewardId && (
            <button
              onClick={() => {
                setEditingRewardId(null);
                setRewardData({
                  nombreRecompensa: '',
                  costoRecompensa: '',
                  descripcionRecompensa: '',
                  tipoEntrega: 'fisica',
                });
              }}
              className="text-sm text-[#f2780d] font-bold hover:underline"
            >
              Cancelar Edición
            </button>
          )}
        </div>
        <form onSubmit={handleRewardSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-[#1c140d] dark:text-gray-300 mb-2">
                Título de la Recompensa
              </label>
              <input
                ref={titleInputRef}
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
              {isAddingReward ? 'Guardando...' : (editingRewardId ? 'Guardar Cambios' : 'Crear Recompensa')}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
