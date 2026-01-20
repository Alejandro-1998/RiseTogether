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
    public function checkout(Request $request)
    {
        $request->validate([
            'id_proyecto' => 'required|exists:proyectos,id',
            'importe' => 'required|numeric|min:1',
            'id_recompensa' => 'nullable|exists:recompensas,id',
        ]);

        try {
            $proyecto = Proyecto::findOrFail($request->id_proyecto);
            $recompensa = $request->id_recompensa ? Recompensa::find($request->id_recompensa) : null;
            $user = $request->user();

            Stripe::setApiKey(env('STRIPE_SECRET'));

            $lineItems = [[
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

            $userId = $user ? $user->id : Auth::id(); // Fallback

            $session = Session::create([
                'payment_method_types' => ['card'],
                'line_items' => $lineItems,
                'mode' => 'payment',
                'success_url' => route('payment.success') . '?session_id={CHECKOUT_SESSION_ID}&id_proyecto=' . $proyecto->id . '&id_recompensa=' . ($recompensa->id ?? '') . '&id_usuario=' . $userId,
                'cancel_url' => $request->header('Referer') ?? route('home'), // Better cancel URL
            ]);

            return response()->json(['url' => $session->url]);
        } catch (\Exception $e) {
            \Illuminate\Support\Facades\Log::error('Stripe Checkout Error: ' . $e->getMessage());
            return response()->json(['message' => 'Error al iniciar el pago: ' . $e->getMessage()], 500);
        }
    }

    public function success(Request $request)
    {
        $sessionId = $request->get('session_id');
        $projectId = $request->get('id_proyecto');
        $rewardId = $request->get('id_recompensa');
        $userId = $request->get('id_usuario');

        if (!$sessionId || !$projectId) {
            return redirect('/')->with('error', 'Pago no válido.');
        }

        try {
            Stripe::setApiKey(env('STRIPE_SECRET'));
            $session = Session::retrieve($sessionId);

            if ($session->payment_status === 'paid') {
                DB::transaction(function () use ($session, $projectId, $rewardId, $userId) {
                    $monto = $session->amount_total / 100;

                    // Crear Donación
                    $donacion = Donacion::create([
                        'idRecompensa' => $rewardId ?: null,
                        'idUsuario' => $userId,
                        'idProyecto' => $projectId,
                        'fechaCompra' => now(),
                        'importe' => $monto,
                        'estadoDonacion' => 'pagada',
                    ]);

                    // Actualizar Proyecto
                    $proyecto = Proyecto::lockForUpdate()->find($projectId);
                    $proyecto->cantidad_recaudada += $monto;
                    $proyecto->save();
                    
                    // Opcional: Vincular usuario con proyecto si no existe relación
                    // $proyecto->users()->syncWithoutDetaching([$userId]);
                });

                return redirect('/proyecto/' . $projectId . '?payment=success');
            } else {
                 return redirect('/proyecto/' . $projectId . '?payment=failed');
            }

        } catch (\Exception $e) {
            return redirect('/proyecto/' . $projectId . '?payment=error');
        }
    }
}
