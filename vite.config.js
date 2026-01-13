import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react'; // 1. Importar el plugin

export default defineConfig({
    server: {
        host: '127.0.0.1',   // fuerza IPv4 (evita ::1)
        port: 3000,          // cambia el puerto (por si 5173 está bloqueado)
        strictPort: true,
    },
    plugins: [
        laravel({
            // 2. Asegúrate de que la ruta al index.js sea la correcta
            input: ['resources/css/app.css', 'resources/js/riseTogether/index.jsx'],
            refresh: true,
        }),
        react(), // 3. Activar el plugin de React
    ],
});