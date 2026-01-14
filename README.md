# RiseTogether 🚀
## Plataforma de Crowdfunding - Proyecto Final de Grado (DAW)

![Licencia](https://img.shields.io/badge/licencia-MIT-blue.svg) ![Laravel](https://img.shields.io/badge/backend-Laravel%2010-red) ![React](https://img.shields.io/badge/frontend-React%2018-cyan) ![Tailwind](https://img.shields.io/badge/style-TailwindCSS-38bdf8)

**RiseTogether** es una plataforma web moderna de financiamiento colectivo (crowdfunding) diseñada para conectar a creadores de proyectos innovadores con mecenas dispuestos a apoyar sus ideas.

Este proyecto ha sido desarrollado como **Proyecto de Fin de Grado** para el Ciclo Formativo de Grado Superior en Desarrollo de Aplicaciones Web (DAW).

---

### 📖 Descripción

El objetivo de la aplicación es democratizar el acceso a la financiación. Los usuarios pueden:
- **Crear campañas** detalladas con objetivos económicos, fechas límite y recompensas.
- **Explorar proyectos** mediante filtros de categorías, tendencias o novedades.
- **Apoyar proyectos** (simulación) y ver el progreso en tiempo real.
- **Gestionar su perfil**, ver sus aportaciones y los proyectos creados.

La aplicación cuenta con una interfaz de usuario (UI) moderna y "responsive", diseñada con un enfoque _mobile-first_ y estética premium.

---

### ✨ Funcionalidades Clave

*   **Autenticación y Usuarios**: Sistema completo de login, registro (API RESTful con Laravel Sanctum).
*   **Gestión de Proyectos**:
    *   Creación con previsualización en tiempo real (CRUD completo).
    *   Subida de imágenes y almacenamiento en sistema de archivos local.
    *   Calculo automático de progreso (%) y días restantes.
*   **Exploración**:
    *   Listado de proyectos destacados y "Historias de éxito".
    *   Filtros dinámicos en el frontend.
*   **Interfaz Dinámica**:
    *   Desarrollada como SPA (Single Page Application) parcial o componentes híbridos con React.
    *   Diseño adaptativo (Dark Mode / Light Mode).
    *   Componentes reutilizables (Cards, Headers, Modals).

---

### 🛠️ Stack Tecnológico

**Backend:**
*   **Framework:** Laravel 12 (PHP 8.2+)
*   **Base de Datos:** MySQL
*   **API:** RESTful, autenticación vía Laravel Sanctum

**Frontend:**
*   **Librería:** React 18
*   **Estilos:** Tailwind CSS v3
*   **Build Tool:** Vite
*   **Iconos:** Material Symbols / Heroicons

---

### ⚙️ Instalación y Despliegue Local

Sigue estos pasos para levantar el proyecto en tu entorno local:

#### 1. Clonar el repositorio
```bash
git clone https://github.com/tu-usuario/rise-together.git
cd rise-together
```

#### 2. Instalar dependencias de Backend (PHP)
```bash
composer install
```

#### 3. Instalar dependencias de Frontend (JS)
```bash
npm install
```

#### 4. Configurar el entorno
Duplica el archivo `.env.example` y renómbralo a `.env`. Configura tu conexión a base de datos:
```ini
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=nombre_de_tu_bbdd
DB_USERNAME=root
DB_PASSWORD=
```

#### 5. Generar key y migraciones
```bash
php artisan key:generate
php artisan migrate --seed
```
> *Nota: El flag `--seed` poblará la base de datos con usuarios y proyectos de prueba.*

#### 6. Vincular el Storage (Importante para las imágenes)
```bash
php artisan storage:link
```

#### 7. Ejecutar
Necesitarás dos terminales abiertas:

**Terminal 1 (Servidor Laravel):**
```bash
php artisan serve
```

**Terminal 2 (Compilación de Assets / Vite):**
```bash
npm run dev
```

¡Listo! Abre tu navegador en `http://localhost:8000`.

---

### 📂 Estructura del Proyecto

*   `app/Models`: Modelos Eloquent (Proyecto, User, Categoria...).
*   `app/Http/Controllers`: Lógica de negocio y API.
*   `database/migrations`: Esquema de la base de datos.
*   `resources/js`: Código fuente de React (Componentes, Páginas).
*   `resources/views`: Vistas Blade (Punto de entrada para React).
*   `routes/api.php`: Rutas de la API.

---

### 👨‍💻 Autor

Desarrollado por **Alejandro Caballero Luque, Santiago Cantero Torrents, Rafael de la Fuente López y Juan Bautista Galisteo Marqués**.
Estudiante de Desarrollo de Aplicaciones Web.

---

*Proyecto realizado con fines educativos.*
