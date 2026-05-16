<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\ComentarioController;
use App\Http\Controllers\ProyectoController;
use App\Http\Controllers\CategoriaController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\EventoController;
use App\Http\Controllers\SeguidorController;
use App\Http\Controllers\FacturaController;

/// RUTAS PÚBLICAS DE API ///

// Login y Registro
Route::post('/login', [LoginController::class, 'login']);
Route::post('/registro', [LoginController::class, 'registro']);

// Página de Inicio
Route::get('/proyectos/destacados', [ProyectoController::class, 'proyectosDestacados']);
Route::get('/proyectos/historias-exito', [ProyectoController::class, 'historiasExito']);
Route::get('/comentarios/relevantes', [ComentarioController::class, 'comentariosRelevantes']);
Route::get('/categorias', [CategoriaController::class, 'index']);
Route::get('/eventos', [EventoController::class, 'index']);
Route::get('/clean-events', [EventoController::class, 'cleanDummyEvents']);
Route::get('/eventos/active', [EventoController::class, 'active']);
Route::get('/eventos/upcoming', [EventoController::class, 'upcoming']);
Route::get('/eventos/{id}/leaderboard', [EventoController::class, 'leaderboard']);
Route::get('/eventos/{id}/stats', [EventoController::class, 'stats']);
Route::get('/eventos/{id}/user-impact', [EventoController::class, 'userImpact'])->middleware('auth:sanctum');
Route::get('/about-us', [\App\Http\Controllers\AboutUsController::class, 'index']);
Route::get('/user/search', [UserController::class, 'search']); // Buscar usuarios
Route::get('/users/{id}', [UserController::class, 'show']); // Perfil público
Route::get('/user/{id}/seguidores', [SeguidorController::class, 'getSeguidores']);
Route::get('/user/{id}/seguidos', [SeguidorController::class, 'getSeguidos']);
Route::get('/user/{id}/actividad', [UserController::class, 'actividadReciente']);

// Proyectos
Route::get('/proyectos', [ProyectoController::class, 'index']);
Route::get('/proyectos/{id}', [ProyectoController::class, 'show']);
Route::get('/proyectos/{id}/comentarios', [ComentarioController::class, 'getProjectComments']);

/// RUTAS PROTEGIDAS DE API ///

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    Route::get('/user/profile', [UserController::class, 'show']);
    Route::put('/user/profile', [UserController::class, 'update']);
    Route::put('/users/{id}', [UserController::class, 'updateAdmin']);
    Route::delete('/users/{id}', [UserController::class, 'destroy']);
    Route::post('/proyectos', [ProyectoController::class, 'store']);
    Route::put('/proyectos/{id}', [ProyectoController::class, 'update']);
    Route::post('/proyectos/{id}/seguir', [ProyectoController::class, 'seguir']);
    Route::delete('/proyectos/{id}/seguir', [ProyectoController::class, 'dejarDeSeguir']);
    Route::get('/proyectos/{id}/donaciones', [ProyectoController::class, 'donaciones']);
    
    Route::post('/recompensas', [\App\Http\Controllers\RecompensaController::class, 'store']);
    Route::post('/proyectos/{id}/faqs', [\App\Http\Controllers\FaqController::class, 'store']);
    
    Route::post('/users/{id}/follow', [SeguidorController::class, 'alternarSeguir']);
    Route::get('/users/{id}/check-follow', [SeguidorController::class, 'verificarSeguimiento']);
    Route::middleware(['auth:sanctum'])->post('/pagos/iniciar', [PaymentController::class, 'iniciarPago']);
    
    // Eventos (Public Authed)
    Route::post('/eventos/{id}/inscribir', [EventoController::class, 'inscribirProject']);
    Route::get('/user/mis-proyectos', [EventoController::class, 'misProyectos']);
    
    // Chat Privado
    Route::get('/chat/no-leidos', [\App\Http\Controllers\ChatPrivadoController::class, 'obtenerTotalNoLeidos']);
    Route::get('/chat/contactos', [\App\Http\Controllers\ChatPrivadoController::class, 'obtenerContactosChat']);
    Route::get('/chat/{userId}', [\App\Http\Controllers\ChatPrivadoController::class, 'getMensajes']);
    Route::post('/chat/{userId}', [\App\Http\Controllers\ChatPrivadoController::class, 'sendMensaje']);

    // Facturas
    Route::get('/facturas', [FacturaController::class, 'indexUser']);
    Route::post('/facturas', [FacturaController::class, 'store']);

    // Admin Routes
    Route::middleware(['role:admin'])->group(function () {
        Route::get('/users', [UserController::class, 'index']); // Admin USERS list
        Route::get('/admin/proyectos', [ProyectoController::class, 'indexAdmin']); // Admin PROJECTS list
        Route::put('/admin/proyectos/{id}/estado', [ProyectoController::class, 'updateEstado']); // Admin UPDATE PROJECT STATE
        Route::get('/admin/stats', [App\Http\Controllers\AdminController::class, 'stats']);
        Route::get('/admin/actividad', [App\Http\Controllers\AdminController::class, 'actividadReciente']);
        Route::get('/admin/facturas', [FacturaController::class, 'indexAdmin']);
        Route::put('/admin/facturas/{id}/estado', [FacturaController::class, 'updateEstado']);
        
        // Comentarios Admin
        Route::get('/admin/comentarios/pendientes', [ComentarioController::class, 'pendientesAdmin']);
        Route::put('/admin/comentarios/{id}/estado', [ComentarioController::class, 'updateEstadoAdmin']);

        // Categorias CRUD
        Route::post('/categorias', [CategoriaController::class, 'store']);
        Route::put('/categorias/{id}', [CategoriaController::class, 'update']);
        Route::delete('/categorias/{id}', [CategoriaController::class, 'destroy']);

        // Eventos CRUD
        Route::post('/eventos', [App\Http\Controllers\EventoController::class, 'store']);
        Route::put('/eventos/{id}', [App\Http\Controllers\EventoController::class, 'update']);
        Route::delete('/eventos/{id}', [App\Http\Controllers\EventoController::class, 'destroy']);
    });

    Route::post('/logout', [LoginController::class, 'logout']);
    Route::post('/comentarios', [ComentarioController::class, 'store']);
    Route::post('/comentarios/{id}/like', [ComentarioController::class, 'toggleLike']);

    // Updates
    Route::post('/proyectos/{id}/actualizaciones', [\App\Http\Controllers\ActualizacionController::class, 'store']);
});

// Updates (Public)
Route::get('/proyectos/{id}/actualizaciones', [\App\Http\Controllers\ActualizacionController::class, 'index']);
Route::get('/actualizaciones/{id}', [\App\Http\Controllers\ActualizacionController::class, 'show']);
