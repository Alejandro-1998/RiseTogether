<?php

use Illuminate\Support\Facades\Route;


use App\Http\Controllers\PaymentController;

/// RUTAS DE PAGO ///
Route::get('/payment/success', [PaymentController::class, 'success'])->name('payment.success');

/// RUTA PRINCIPAL A REACT ///
Route::get('/{any?}', function () {
    return view('riseTogether');
})->where('any', '.*')->name('home');