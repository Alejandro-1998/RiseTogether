<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    // Apunta a 'resources/views/publico/home.blade.php'
    return view('publico.home');
});
