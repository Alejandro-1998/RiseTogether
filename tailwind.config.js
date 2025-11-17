// Importa el plugin de formularios
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        // Apunta a todos tus archivos Blade
        './resources/views/**/*.blade.php',
        // Apunta a tus archivos JS (por si usas clases de Tailwind en JS)
        './resources/js/**/*.js',
        // Esto es para la paginación de Laravel, es bueno tenerlo
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
    ],

    darkMode: "class", // Habilita el modo oscuro

    theme: {
        extend: {
            // ▼▼ TODA TU CONFIGURACIÓN PERSONALIZADA ▼▼
            colors: {
                primary: "#f2780d",
                "background-light": "#fcfaf8",
                "background-dark": "#1c140d",
                "text-light": "#1c140d",
                "text-dark": "#fcfaf8",
                "subtle-light": "#f4ede7",
                "subtle-dark": "#2a2017",
                "muted-light": "#9c7049",
                "muted-dark": "#a18a7a"
            },
            fontFamily: {
                display: ["Inter", "sans-serif"]
            },
            borderRadius: {
                DEFAULT: "0.5rem",
                lg: "1rem",
                xl: "1.5rem",
                full: "9999px"
            }
            // ▲▲ FIN DE TU CONFIGURACIÓN ▲▲
        },
    },

    plugins: [
        forms // Activa el plugin de formularios
    ],
};