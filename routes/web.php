<?php

use App\Http\Controllers\LoginController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('publico.home');
})->name('home');

// LOGIN
Route::get('/login', [LoginController::class, "index"])->name('login');

// REGISTRO
Route::get('/registro', [LoginController::class, 'index'])->name('registro');

Route::get('/crear_proyecto', function () {
    return view('privado.crear_proyecto');
})->name('crear_proyecto');

Route::get('/administrador', function () {
    return view('privado.administrador');
})->name('administrador');

Route::get('/proyectos', function () {
    return view('publico.proyectos');
})->name('proyectos');

Route::get('/proyecto', function () {
    return view('publico.proyecto');
})->name('proyecto');