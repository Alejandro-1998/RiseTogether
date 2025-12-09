<?php

use App\Http\Controllers\HomeController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\ProyectoController;

// HOME
Route::get('/', [HomeController::class, "index"])->name('home');

// LOGIN - REGISTRO
Route::get('/login', [LoginController::class, "index"])->name('login');
Route::get('/registro', [LoginController::class, 'index'])->name('registro');
Route::post('/login', [LoginController::class, "login"]);
Route::post('/registro', [LoginController::class, 'registro']);
Route::post('/logout', [LoginController::class, 'logout'])->name('logout');

// RUTAS PROTEGIDAS SESIÓN INICIADA
Route::middleware('auth')->group(function () {
    Route::get('/crear-proyecto', [ProyectoController::class, 'create'])->name('proyectos.create');
    Route::post('/crear-proyecto', [ProyectoController::class, 'store'])->name('proyectos.store');
    
    Route::get('/administrador', function () {
        return view('privado.administrador');
    })->name('administrador');
});

// RUTAS PÚBLICAS
Route::get('/proyectos', function () {
    return view('publico.proyectos');
})->name('proyectos');

Route::get('/proyecto', function () {
    return view('publico.proyecto');
})->name('proyecto');

Route::get('/usuario', function () {
    return view('publico.usuario');
})->name('usuario');