import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './resources/views/**/*.blade.php',
        './resources/js/**/*.js',
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
    ],

    darkMode: "class",

    theme: {
        extend: {
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
        },
    },

    plugins: [
        forms
    ],
};