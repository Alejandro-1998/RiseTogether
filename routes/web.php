<?php

use App\Http\Controllers\LoginController;
use Illuminate\Support\Facades\Route;

// HOME
Route::get('/', function () {
    return view('publico.home');
})->name('home');

// LOGIN - REGISTRO
Route::get('/login', [LoginController::class, "index"])->name('login');
Route::get('/registro', [LoginController::class, 'index'])->name('registro');
Route::post('/login', [LoginController::class, "login"]);
Route::post('/registro', [LoginController::class, 'registro']);
Route::post('/logout', [LoginController::class, 'logout'])->name('logout');

// RUTAS PROTEGIDAS SESIÓN INICIADA
Route::middleware('auth')->group(function () {
    Route::get('/crear_proyecto', function () {
        return view('privado.crear_proyecto');
    })->name('crear_proyecto');
    
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