import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

export default function UsuarioAjustes({ user, onUserUpdate }) {
    const formRef = useRef(null);
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
    const [photo, setPhoto] = useState(null);
    const [photoPreview, setPhotoPreview] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const [errors, setErrors] = useState({});

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
            setPhotoPreview(user.profile_photo_url || null);
        }
    }, [user]);

    const handleInputChange = (e) => {
        let { name, value } = e.target;

        if (name === 'numeroCuenta') {
            value = value.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
        }

        setFormData({
            ...formData,
            [name]: value
        });

        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: null
            });
        }
    };

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPhoto(file);
            setPhotoPreview(URL.createObjectURL(file));
        }
    };

    const scrollToTopWithOffset = () => {
        if (formRef.current) {
            const yCoordinate = formRef.current.getBoundingClientRect().top + window.scrollY;
            const yOffset = -150;
            window.scrollTo({ top: yCoordinate + yOffset, behavior: 'smooth' });
        }
    };

    const fieldOrder = [
        'nombreUsuario',
        'nombreCompleto',
        'fechaNacimiento',
        'direccion',
        'biografia',
        'numeroCuenta',
        'current_password',
        'password',
        'password_confirmation',
        'photo'
    ];

    const scrollToFirstError = (currentErrors) => {
        const firstErrorField = fieldOrder.find(field => currentErrors[field]);
        if (firstErrorField) {
            const selector = firstErrorField === 'photo' ? '#photo-section' : `[name="${firstErrorField}"]`;
            const element = document.querySelector(selector);
            if (element) {
                const yCoordinate = element.getBoundingClientRect().top + window.scrollY;
                const yOffset = -200;
                window.scrollTo({ top: yCoordinate + yOffset, behavior: 'smooth' });
                return true;
            }
        }
        return false;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        setSuccessMessage('');

        const data = new FormData();
        data.append('_method', 'PUT'); // Spoof PUT method

        for (const key in formData) {
            if (formData[key] !== null) {
                // Should only append passwords if they are not empty, but controller handles empty logic or validation handles it
                // To avoid sending 'undefined' or 'null' strings
                data.append(key, formData[key] === null ? '' : formData[key]);
            }
        }

        if (photo) {
            data.append('photo', photo);
        }

        try {
            // Send as POST with _method=PUT
            const response = await axios.post('/api/user/profile', data, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            if (onUserUpdate) {
                onUserUpdate(response.data.user);
            }
            setSuccessMessage('Perfil actualizado correctamente.');
            setFormData(prev => ({
                ...prev,
                current_password: '',
                password: '',
                password_confirmation: ''
            }));
            setPhoto(null); // Reset file input
            // Update preview to the returned user URL (in case backend processed it)
            if (response.data.user.profile_photo_url) {
                setPhotoPreview(response.data.user.profile_photo_url);
            }

            setTimeout(() => setSuccessMessage(''), 3000);
            scrollToTopWithOffset();
        } catch (err) {
            console.error("Error updating profile:", err);
            if (err.response && err.response.data.errors) {
                setErrors(err.response.data.errors);
                if (!scrollToFirstError(err.response.data.errors)) {
                    scrollToTopWithOffset();
                }
            } else {
                setSuccessMessage('');
                alert('Error al actualizar el perfil. Por favor inténtalo de nuevo.');
                scrollToTopWithOffset();
            }
        }
    };

    return (
        <div ref={formRef} className="bg-white dark:bg-[#2d2d2d] p-6 rounded-2xl border border-[#e8dace] dark:border-[#374151]">
            <h3 className="text-lg font-bold mb-6 text-gray-900 dark:text-white">Ajustes del Perfil</h3>

            {successMessage && (
                <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
                    {successMessage}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8">
                {/* Photo Upload Section */}
                <div className="flex flex-col items-center justify-center mb-6" id="photo-section">
                    <div className="relative group">
                        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-[#f2780d] bg-gray-100 dark:bg-gray-700">
                            {photoPreview ? (
                                <img src={photoPreview} alt="Profile" className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-gray-400 text-4xl">
                                    <span className="material-symbols-outlined text-6xl">person</span>
                                </div>
                            )}
                        </div>
                        <label htmlFor="photo-upload" className="absolute bottom-0 right-0 w-10 h-10 bg-white dark:bg-gray-800 rounded-full shadow-lg border border-gray-200 dark:border-gray-600 flex items-center justify-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                            <span className="material-symbols-outlined text-[#f2780d] text-lg">photo_camera</span>
                        </label>
                        <input
                            id="photo-upload"
                            type="file"
                            accept="image/*"
                            onChange={handlePhotoChange}
                            className="hidden"
                        />
                    </div>
                    {errors.photo && <p className="text-red-500 text-xs mt-2">{errors.photo}</p>}
                    <p className="text-xs text-gray-500 mt-2">Haz clic en la cámara para subir una foto nueva.</p>
                </div>

                {/* General Info */}
                <div className="space-y-6">
                    <h4 className="text-md font-semibold text-gray-800 dark:text-gray-200 border-b pb-2">Información General</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Nombre de Usuario</label>
                            <input type="text" name="nombreUsuario" value={formData.nombreUsuario} onChange={handleInputChange} maxLength={30}
                                className={`w-full rounded-xl border ${errors.nombreUsuario ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} dark:bg-gray-700 dark:text-white shadow-sm focus:border-[#f2780d] focus:ring focus:ring-[#f2780d] focus:ring-opacity-50 py-3 px-4`} />
                            {errors.nombreUsuario && <p className="text-red-500 text-xs mt-1">{errors.nombreUsuario}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Nombre Completo</label>
                            <input type="text" name="nombreCompleto" value={formData.nombreCompleto} onChange={handleInputChange} maxLength={30}
                                className={`w-full rounded-xl border ${errors.nombreCompleto ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} dark:bg-gray-700 dark:text-white shadow-sm focus:border-[#f2780d] focus:ring focus:ring-[#f2780d] focus:ring-opacity-50 py-3 px-4`} />
                            {errors.nombreCompleto && <p className="text-red-500 text-xs mt-1">{errors.nombreCompleto}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email</label>
                            <input type="email" value={user?.email || ''} disabled
                                className="w-full rounded-xl border-gray-300 bg-gray-100 dark:bg-gray-800 text-gray-500 cursor-not-allowed shadow-sm py-3 px-4" />
                            <p className="text-xs text-gray-500 mt-1">El email no se puede cambiar.</p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Fecha de Nacimiento</label>
                            <input type="date" name="fechaNacimiento" value={formData.fechaNacimiento} onChange={handleInputChange} max={new Date().toISOString().split("T")[0]}
                                className={`w-full rounded-xl border ${errors.fechaNacimiento ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} dark:bg-gray-700 dark:text-white shadow-sm focus:border-[#f2780d] focus:ring focus:ring-[#f2780d] focus:ring-opacity-50 py-3 px-4`} />
                            {errors.fechaNacimiento && <p className="text-red-500 text-xs mt-1">{errors.fechaNacimiento}</p>}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Dirección</label>
                        <input type="text" name="direccion" value={formData.direccion} onChange={handleInputChange}
                            className={`w-full rounded-xl border ${errors.direccion ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} dark:bg-gray-700 dark:text-white shadow-sm focus:border-[#f2780d] focus:ring focus:ring-[#f2780d] focus:ring-opacity-50 py-3 px-4`} />
                        {errors.direccion && <p className="text-red-500 text-xs mt-1">{errors.direccion}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Biografía</label>
                        <textarea name="biografia" rows="4" value={formData.biografia} onChange={handleInputChange}
                            className={`w-full rounded-xl border ${errors.biografia ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} dark:bg-gray-700 dark:text-white shadow-sm focus:border-[#f2780d] focus:ring focus:ring-[#f2780d] focus:ring-opacity-50 py-3 px-4`}></textarea>
                        {errors.biografia && <p className="text-red-500 text-xs mt-1">{errors.biografia}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Número de Cuenta</label>
                        <input type="text" name="numeroCuenta" value={formData.numeroCuenta} onChange={handleInputChange} placeholder="IBAN o Número de cuenta" maxLength={24}
                            className={`w-full rounded-xl border ${errors.numeroCuenta ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} dark:bg-gray-700 dark:text-white shadow-sm focus:border-[#f2780d] focus:ring focus:ring-[#f2780d] focus:ring-opacity-50 py-3 px-4`} />
                        {errors.numeroCuenta && <p className="text-red-500 text-xs mt-1">{errors.numeroCuenta}</p>}
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
                                className={`w-full rounded-xl border ${errors.current_password ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} dark:bg-gray-700 dark:text-white shadow-sm focus:border-[#f2780d] focus:ring focus:ring-[#f2780d] focus:ring-opacity-50 py-3 px-4`} />
                            {errors.current_password && <p className="text-red-500 text-xs mt-1">{errors.current_password}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Nueva Contraseña</label>
                            <input type="password" name="password" value={formData.password} onChange={handleInputChange}
                                className={`w-full rounded-xl border ${errors.password ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} dark:bg-gray-700 dark:text-white shadow-sm focus:border-[#f2780d] focus:ring focus:ring-[#f2780d] focus:ring-opacity-50 py-3 px-4`} />
                            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Confirmar Nueva Contraseña</label>
                            <input type="password" name="password_confirmation" value={formData.password_confirmation} onChange={handleInputChange}
                                className={`w-full rounded-xl border ${errors.password ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} dark:bg-gray-700 dark:text-white shadow-sm focus:border-[#f2780d] focus:ring focus:ring-[#f2780d] focus:ring-opacity-50 py-3 px-4`} />
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
