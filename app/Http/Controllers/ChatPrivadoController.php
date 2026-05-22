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

    public function obtenerTotalNoLeidos()
    {
        $userId = Auth::id();
        $total = MensajePrivado::where('id_receptor', $userId)
            ->where('leido', false)
            ->count();
            
        return response()->json(['total' => $total]);
    }

    public function obtenerContactosChat()
    {
        $userId = Auth::id();

        $idUsuariosConMensajes = MensajePrivado::where('id_remitente', $userId)
            ->pluck('id_receptor')
            ->merge(MensajePrivado::where('id_receptor', $userId)->pluck('id_remitente'))
            ->unique();

        $usuariosConMensajes = User::whereIn('id', $idUsuariosConMensajes)->get();

        $seguidos = User::whereHas('seguidores', function($query) use ($userId) {
            $query->where('id_seguidor', $userId);
        })->get();
        
        $seguidores = User::whereHas('seguidos', function($query) use ($userId) {
            $query->where('id_seguido', $userId);
        })->get();

        $contactos = $usuariosConMensajes->merge($seguidos)->merge($seguidores)->unique('id')->values();

        $contactos->map(function ($contacto) use ($userId) {
            $contacto->no_leidos = MensajePrivado::where('id_remitente', $contacto->id)
                ->where('id_receptor', $userId)
                ->where('leido', false)
                ->count();
            return $contacto;
        });

        $contactos = $contactos->sortByDesc('no_leidos')->sortBy('nombreUsuario')->values();

        return response()->json($contactos);
    }
}
