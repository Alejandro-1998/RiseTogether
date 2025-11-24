<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('publico.home');
})->name('home');

Route::get('/login', function () {
    return view('publico.login');
})->name('login');

Route::get('/registro', function () {
    return view('publico.registro');
})->name('registro');

Route::get('/administrador', function () {
    return view('privado.administrador');
})->name('administrador');

Route::get('/proyectos', function () {
    return view('publico.proyectos');
})->name('proyectos');

Route::get('/proyecto', function () {
    return view('publico.proyecto');
})->name('proyecto');

Route::get('/usuario', function () {
    return view('publico.usuario');
})->name('usuario');