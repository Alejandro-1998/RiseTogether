import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function UsuarioAjustes({ user, onUserUpdate }) {
    const [formData, setFormData] = useState({
        nombreUsuario: '',
        nombreCompleto: '',
        fechaNacimiento: '',
        direccion: '',
        biografia: '',
        numeroCuenta: '',
        current_password: '',
        password: '',
        password_confirmation: ''
    });
    const [successMessage, setSuccessMessage] = useState('');
    const [error, setError] = useState(null);

    useEffect(() => {
        if (user) {
            setFormData({
                nombreUsuario: user.nombreUsuario || '',
                nombreCompleto: user.nombreCompleto || '',
                fechaNacimiento: user.fechaNacimiento || '',
                direccion: user.direccion || '',
                biografia: user.biografia || '',
                numeroCuenta: user.numeroCuenta || '',
                current_password: '',
                password: '',
                password_confirmation: ''
            });
        }
    }, [user]);

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccessMessage('');

        try {
            const response = await axios.put('/api/user/profile', formData);
            if (onUserUpdate) {
                onUserUpdate(response.data.user);
            }
            setSuccessMessage('Perfil actualizado correctamente.');
            // Clear password fields after success/update
            setFormData(prev => ({
                ...prev,
                current_password: '',
                password: '',
                password_confirmation: ''
            }));
            setTimeout(() => setSuccessMessage(''), 3000);
        } catch (err) {
            console.error("Error updating profile:", err);
            if (err.response && err.response.data.errors) {
                const errorMsg = Object.values(err.response.data.errors).flat().join(' ');
                setError(errorMsg);
            } else {
                setError('Error al actualizar el perfil.');
            }
        }
    };

    return (
        <div className="bg-white dark:bg-[#2d2d2d] p-6 rounded-2xl border border-[#e8dace] dark:border-[#374151]">
            <h3 className="text-lg font-bold mb-6 text-gray-900 dark:text-white">Ajustes del Perfil</h3>

            {successMessage && (
                <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
                    {successMessage}
                </div>
            )}
            {error && (
                <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8">
                {/* General Info */}
                <div className="space-y-6">
                    <h4 className="text-md font-semibold text-gray-800 dark:text-gray-200 border-b pb-2">Información General</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Nombre de Usuario</label>
                            <input type="text" name="nombreUsuario" value={formData.nombreUsuario} onChange={handleInputChange}
                                className="w-full rounded-xl border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-[#f2780d] focus:ring focus:ring-[#f2780d] focus:ring-opacity-50" />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Nombre Completo</label>
                            <input type="text" name="nombreCompleto" value={formData.nombreCompleto} onChange={handleInputChange}
                                className="w-full rounded-xl border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-[#f2780d] focus:ring focus:ring-[#f2780d] focus:ring-opacity-50" />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email</label>
                            <input type="email" value={user?.email || ''} disabled
                                className="w-full rounded-xl border-gray-300 bg-gray-100 dark:bg-gray-800 text-gray-500 cursor-not-allowed shadow-sm" />
                            <p className="text-xs text-gray-500 mt-1">El email no se puede cambiar.</p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Fecha de Nacimiento</label>
                            <input type="date" name="fechaNacimiento" value={formData.fechaNacimiento} onChange={handleInputChange}
                                className="w-full rounded-xl border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-[#f2780d] focus:ring focus:ring-[#f2780d] focus:ring-opacity-50" />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Dirección</label>
                        <input type="text" name="direccion" value={formData.direccion} onChange={handleInputChange}
                            className="w-full rounded-xl border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-[#f2780d] focus:ring focus:ring-[#f2780d] focus:ring-opacity-50" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Biografía</label>
                        <textarea name="biografia" rows="4" value={formData.biografia} onChange={handleInputChange}
                            className="w-full rounded-xl border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-[#f2780d] focus:ring focus:ring-[#f2780d] focus:ring-opacity-50"></textarea>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Número de Cuenta</label>
                        <input type="text" name="numeroCuenta" value={formData.numeroCuenta} onChange={handleInputChange} placeholder="IBAN o Número de cuenta"
                            className="w-full rounded-xl border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-[#f2780d] focus:ring focus:ring-[#f2780d] focus:ring-opacity-50" />
                    </div>
                </div>

                {/* Password Change */}
                <div className="space-y-6 pt-4">
                    <h4 className="text-md font-semibold text-gray-800 dark:text-gray-200 border-b pb-2">Cambiar Contraseña</h4>
                    <p className="text-sm text-gray-500">Deja estos campos vacíos si no quieres cambiar tu contraseña.</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Contraseña Actual</label>
                            <input type="password" name="current_password" value={formData.current_password} onChange={handleInputChange}
                                className="w-full rounded-xl border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-[#f2780d] focus:ring focus:ring-[#f2780d] focus:ring-opacity-50" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Nueva Contraseña</label>
                            <input type="password" name="password" value={formData.password} onChange={handleInputChange}
                                className="w-full rounded-xl border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-[#f2780d] focus:ring focus:ring-[#f2780d] focus:ring-opacity-50" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Confirmar Nueva Contraseña</label>
                            <input type="password" name="password_confirmation" value={formData.password_confirmation} onChange={handleInputChange}
                                className="w-full rounded-xl border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-[#f2780d] focus:ring focus:ring-[#f2780d] focus:ring-opacity-50" />
                        </div>
                    </div>
                </div>

                <div className="flex justify-end pt-4">
                    <button type="submit" className="bg-[#f2780d] text-white font-bold py-2 px-6 rounded-2xl hover:opacity-90 transition shadow-sm">
                        Guardar Cambios
                    </button>
                </div>
            </form>
        </div>
    );
}
