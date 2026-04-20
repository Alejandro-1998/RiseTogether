<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\MensajePrivado;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class ChatPrivadoController extends Controller
{
    public function getMensajes($userId)
    {
        $currentUserId = Auth::id();

        $mensajes = MensajePrivado::where(function ($query) use ($currentUserId, $userId) {
            $query->where('id_remitente', $currentUserId)
                  ->where('id_receptor', $userId);
        })->orWhere(function ($query) use ($currentUserId, $userId) {
            $query->where('id_remitente', $userId)
                  ->where('id_receptor', $currentUserId);
        })->orderBy('created_at', 'asc')->get();

        // Marcar como leído
        MensajePrivado::where('id_remitente', $userId)
            ->where('id_receptor', $currentUserId)
            ->where('leido', false)
            ->update(['leido' => true]);

        return response()->json($mensajes);
    }

    public function sendMensaje(Request $request, $userId)
    {
        $request->validate([
            'contenido' => 'required|string|max:1000'
        ]);

        $mensaje = MensajePrivado::create([
            'id_remitente' => Auth::id(),
            'id_receptor' => $userId,
            'contenido' => $request->contenido,
            'leido' => false
        ]);

        return response()->json($mensaje, 201);
    }
}
