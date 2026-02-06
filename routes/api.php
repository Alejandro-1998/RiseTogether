<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\ComentarioController;
use App\Http\Controllers\ProyectoController;
use App\Http\Controllers\CategoriaController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\PaymentController;

/// RUTAS PÚBLICAS DE API ///

// Login y Registro
Route::post('/login', [LoginController::class, 'login']);
Route::post('/registro', [LoginController::class, 'registro']);

// Página de Inicio
Route::get('/proyectos/destacados', [ProyectoController::class, 'proyectosDestacados']);
Route::get('/proyectos/historias-exito', [ProyectoController::class, 'historiasExito']);
Route::get('/comentarios/relevantes', [ComentarioController::class, 'comentariosRelevantes']);
Route::get('/categorias', [CategoriaController::class, 'index']);
Route::get('/about-us', [\App\Http\Controllers\AboutUsController::class, 'index']);
Route::get('/users/{id}', [UserController::class, 'show']); // Perfil público

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
    Route::post('/proyectos/{id}/seguir', [ProyectoController::class, 'seguir']);
    Route::delete('/proyectos/{id}/seguir', [ProyectoController::class, 'dejarDeSeguir']);
    Route::middleware(['auth:sanctum'])->post('/pagos/iniciar', [PaymentController::class, 'iniciarPago']);
    
    // Admin Routes
    Route::middleware(['role:admin'])->group(function () {
        Route::get('/users', [UserController::class, 'index']); // Admin USERS list
        Route::get('/admin/proyectos', [ProyectoController::class, 'indexAdmin']); // Admin PROJECTS list
        Route::get('/admin/stats', [App\Http\Controllers\AdminController::class, 'stats']);
    });

    Route::post('/logout', [LoginController::class, 'logout']);
    Route::post('/comentarios', [ComentarioController::class, 'store']);
});
