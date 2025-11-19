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