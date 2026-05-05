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

        // Obtener IDs de usuarios con los que se ha intercambiado mensajes
        $idUsuariosConMensajes = MensajePrivado::where('id_remitente', $userId)
            ->pluck('id_receptor')
            ->merge(MensajePrivado::where('id_receptor', $userId)->pluck('id_remitente'))
            ->unique();

        $usuariosConMensajes = User::whereIn('id', $idUsuariosConMensajes)->get();

        // Obtener también los seguidos/seguidores para poder iniciar chat
        $seguidos = User::whereHas('seguidores', function($query) use ($userId) {
            $query->where('id_seguidor', $userId);
        })->get();
        
        $seguidores = User::whereHas('seguidos', function($query) use ($userId) {
            $query->where('id_seguido', $userId);
        })->get();

        // Combinar todos y eliminar duplicados
        $contactos = $usuariosConMensajes->merge($seguidos)->merge($seguidores)->unique('id')->values();

        // Añadir el recuento de no leídos para cada contacto
        $contactos->map(function ($contacto) use ($userId) {
            $contacto->no_leidos = MensajePrivado::where('id_remitente', $contacto->id)
                ->where('id_receptor', $userId)
                ->where('leido', false)
                ->count();
            return $contacto;
        });

        // Ordenar por número de no leídos (descendente) y luego por nombre
        $contactos = $contactos->sortByDesc('no_leidos')->sortBy('nombreUsuario')->values();

        return response()->json($contactos);
    }
}
