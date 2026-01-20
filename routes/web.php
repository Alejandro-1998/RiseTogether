<?php

use Illuminate\Support\Facades\Route;


use App\Http\Controllers\PaymentController;

/// RUTAS DE PAGO ///
Route::get('/pagos/confirmar', [PaymentController::class, 'confirmarPago'])->name('pagos.confirmar');

/// RUTA PRINCIPAL A REACT ///
Route::get('/{any?}', function () {
    return view('riseTogether');
})->where('any', '.*')->name('home');