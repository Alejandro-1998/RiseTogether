<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\ComentarioController;
use App\Http\Controllers\ProyectoController;

/// RUTAS PÚBLICAS DE API ///

// Login y Registro
Route::post('/login', [LoginController::class, 'login']);
Route::post('/registro', [LoginController::class, 'registro']);

// Página de Inicio
Route::get('/proyectos/destacados', [ProyectoController::class, 'proyectosDestacados']);
Route::get('/comentarios/relevantes', [ComentarioController::class, 'comentariosRelevantes']);

// Proyectos
Route::get('/proyectos', [ProyectoController::class, 'index']);

/// RUTAS PROTEGIDAS DE API ///

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    Route::post('/logout', [LoginController::class, 'logout']);
    Route::post('/proyectos', [ProyectoController::class, 'store']);
});