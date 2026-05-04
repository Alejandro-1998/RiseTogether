import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function FaqTab({ proyectoId, isOwner, initialFaqs = [], onFaqAdded }) {
  const [faqs, setFaqs] = useState(initialFaqs);
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    pregunta: '',
    respuesta: '',
  });

  const premiumToast = {
    success: (msg) => toast.success(msg, {
        style: { borderRadius: '16px', background: '#1c140d', color: '#fff', border: '1px solid rgba(242, 127, 13, 0.2)', padding: '16px', fontWeight: 'bold' },
        iconTheme: { primary: '#f27f0d', secondary: '#fff' },
    }),
    error: (msg) => toast.error(msg, {
        style: { borderRadius: '16px', background: '#1c140d', color: '#fff', border: '1px solid rgba(239, 68, 68, 0.2)', padding: '16px', fontWeight: 'bold' },
    }),
  };

  const toggleAccordion = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await axios.post(`/api/proyectos/${proyectoId}/faqs`, formData);
      premiumToast.success('Pregunta añadida correctamente');
      
      const newFaq = res.data;
      const updatedFaqs = [...faqs, newFaq];
      setFaqs(updatedFaqs);
      setFormData({ pregunta: '', respuesta: '' });
      
      if (onFaqAdded) {
        onFaqAdded(updatedFaqs);
      }
    } catch (error) {
      console.error('Error adding FAQ:', error);
      premiumToast.error(error.response?.data?.message || 'Error al añadir la pregunta');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Formulario para añadir FAQ (solo para el creador) */}
      {isOwner && (
        <section className="bg-white dark:bg-[#1a120d] rounded-3xl border border-[#f4ede7] dark:border-[#f4ede7]/10 p-6 sm:p-8">
          <h3 className="text-xl font-bold text-[#1c140d] dark:text-white mb-6 border-b border-[#f4ede7] dark:border-[#3a2c20] pb-4">
            Añadir Pregunta Frecuente
          </h3>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-[#1c140d] dark:text-gray-300 mb-2">
                Pregunta
              </label>
              <input
                type="text"
                value={formData.pregunta}
                onChange={(e) => setFormData({ ...formData, pregunta: e.target.value })}
                required
                maxLength={500}
                placeholder="Ej. ¿Hacen envíos internacionales?"
                className="w-full rounded-xl border border-[#e6dbd1] dark:border-[#3a2c20] bg-transparent px-4 py-3 text-[#1c140d] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#f2780d]"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-[#1c140d] dark:text-gray-300 mb-2">
                Respuesta
              </label>
              <textarea
                value={formData.respuesta}
                onChange={(e) => setFormData({ ...formData, respuesta: e.target.value })}
                required
                rows={4}
                placeholder="Ej. Sí, enviamos a todo el mundo con un costo adicional."
                className="w-full rounded-xl border border-[#e6dbd1] dark:border-[#3a2c20] bg-transparent px-4 py-3 text-[#1c140d] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#f2780d]"
              ></textarea>
            </div>
            <div className="flex justify-end pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-3 bg-[#f2780d] hover:bg-[#d96600] text-white font-bold rounded-xl transition-colors disabled:opacity-50"
              >
                {isSubmitting ? 'Añadiendo...' : 'Añadir Pregunta'}
              </button>
            </div>
          </form>
        </section>
      )}

      {/* Lista de FAQs tipo acordeón */}
      <section className="not-prose">
        {faqs.length > 0 ? (
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={faq.id} 
                className="rounded-2xl border border-[#f4ede7] dark:border-[#3a2c20] bg-white dark:bg-[#1a120d] overflow-hidden transition-all duration-200"
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(index)}
                  className="w-full flex items-center justify-between p-5 sm:p-6 text-left focus:outline-none"
                >
                  <span className="font-bold text-lg text-[#1c140d] dark:text-white pr-4">
                    {faq.pregunta}
                  </span>
                  <span className={`material-symbols-outlined text-[#f2780d] transition-transform duration-300 ${expandedIndex === index ? 'rotate-180' : ''}`}>
                    expand_more
                  </span>
                </button>
                
                {/* Contenido desplegable */}
                <div 
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    expandedIndex === index ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="p-5 sm:p-6 pt-0 text-[#5e4e42] dark:text-[#a18a7a] whitespace-pre-wrap border-t border-[#f4ede7] dark:border-[#3a2c20] mt-2">
                    {faq.respuesta}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-[#f4ede7] dark:border-[#f4ede7]/10 p-8 text-center bg-white dark:bg-[#1a120d]">
            <p className="font-bold text-lg text-[#1c140d] dark:text-white">FAQ</p>
            <p className="text-sm text-[#9c7049] dark:text-[#9c7049]/80 mt-2">
              El creador no ha publicado preguntas frecuentes todavía.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
