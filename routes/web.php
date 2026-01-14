<?php

use Illuminate\Support\Facades\Route;

/// RUTA PRINCIPAL A REACT ///
Route::get('/{any?}', function () {
    return view('riseTogether');
})->where('any', '.*')->name('home');