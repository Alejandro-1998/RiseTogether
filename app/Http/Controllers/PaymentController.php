<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Stripe\Stripe;
use Stripe\Checkout\Session;
use App\Models\Proyecto;
use App\Models\Recompensa;
use App\Models\Donacion;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class PaymentController extends Controller
{
    public function iniciarPago(Request $request)
    {
        $request->validate([
            'id_proyecto' => 'required|exists:proyectos,id',
            'importe' => 'required|numeric|min:1',
            'id_recompensa' => 'nullable|exists:recompensas,id',
        ]);

        try {
            $proyecto = Proyecto::findOrFail($request->id_proyecto);
            $recompensa = $request->id_recompensa ? Recompensa::find($request->id_recompensa) : null;
            $usuario = $request->user();

            Stripe::setApiKey(env('STRIPE_SECRET'));

            $itemsLinea = [[
                'price_data' => [
                    'currency' => 'eur',
                    'product_data' => [
                        'name' => 'Apoyo al proyecto: ' . $proyecto->titulo,
                        'description' => $recompensa ? 'Recompensa: ' . $recompensa->nombreRecompensa : 'Donación libre',
                    ],
                    'unit_amount' => (int) ($request->importe * 100), 
                ],
                'quantity' => 1,
            ]];

            $idUsuario = $usuario ? $usuario->id : Auth::id();

            $sesion = Session::create([
                'payment_method_types' => ['card'],
                'line_items' => $itemsLinea,
                'mode' => 'payment',
                'success_url' => route('pagos.confirmar') . '?session_id={CHECKOUT_SESSION_ID}&id_proyecto=' . $proyecto->id . '&id_recompensa=' . ($recompensa->id ?? '') . '&id_usuario=' . $idUsuario,
                'cancel_url' => $request->header('Referer') ?? route('home'),
            ]);

            return response()->json(['url' => $sesion->url]);
        } catch (\Exception $e) {
            \Illuminate\Support\Facades\Log::error('Error en Stripe Checkout: ' . $e->getMessage());
            return response()->json(['message' => 'Error al iniciar el pago: ' . $e->getMessage()], 500);
        }
    }

    public function confirmarPago(Request $request)
    {
        $idSesion = $request->get('session_id');
        $idProyecto = $request->get('id_proyecto');
        $idRecompensa = $request->get('id_recompensa');
        $idUsuario = $request->get('id_usuario');

        if (!$idSesion || !$idProyecto) {
            return redirect('/')->with('error', 'Pago no válido.');
        }

        try {
            Stripe::setApiKey(env('STRIPE_SECRET'));
            $sesion = Session::retrieve($idSesion);

            if ($sesion->payment_status === 'paid') {
                DB::transaction(function () use ($sesion, $idProyecto, $idRecompensa, $idUsuario) {
                    $monto = $sesion->amount_total / 100;

                    // Crear Donación
                    $donacion = Donacion::create([
                        'idRecompensa' => $idRecompensa ?: null,
                        'idUsuario' => $idUsuario,
                        'idProyecto' => $idProyecto,
                        'fechaCompra' => now(),
                        'importe' => $monto,
                        'estadoDonacion' => 'pagada',
                    ]);

                    // Actualizar Proyecto
                    $proyecto = Proyecto::lockForUpdate()->find($idProyecto);
                    $proyecto->cantidad_recaudada += $monto;
                    $proyecto->save();
                });

                return redirect('/proyecto/' . $idProyecto . '?pago=exito');
            } else {
                 return redirect('/proyecto/' . $idProyecto . '?pago=fallido');
            }

        } catch (\Exception $e) {
            return redirect('/proyecto/' . $idProyecto . '?pago=error');
        }
    }
}
