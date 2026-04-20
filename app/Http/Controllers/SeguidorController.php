<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class SeguidorController extends Controller
{
    public function alternarSeguir($id)
    {
        $userToFollow = User::findOrFail($id);
        /** @var \App\Models\User $currentUser */
        $currentUser = Auth::user();

        if ($currentUser->id === $userToFollow->id) {
            return response()->json(['message' => 'No puedes seguirte a ti mismo.'], 400);
        }

        if ($currentUser->seguidos()->where('users.id', $id)->exists()) {
            $currentUser->seguidos()->detach($id);
            return response()->json(['message' => 'Dejaste de seguir a este usuario.', 'siguiendo' => false]);
        } else {
            $currentUser->seguidos()->attach($id);
            return response()->json(['message' => 'Ahora sigues a este usuario.', 'siguiendo' => true]);
        }
    }

    public function getSeguidores($id)
    {
        $user = User::findOrFail($id);
        $seguidores = $user->seguidores()->get();
        
        $seguidosIds = [];
        $authUser = Auth::user();
        if ($authUser instanceof \App\Models\User) {
            $seguidosIds = $authUser->seguidos()->pluck('users.id')->toArray();
        }
        
        $seguidores->transform(function ($u) use ($seguidosIds) {
            $u->siguiendo = in_array($u->id, $seguidosIds);
            return $u;
        });
        
        return response()->json($seguidores);
    }

    public function getSeguidos($id)
    {
        $user = User::findOrFail($id);
        $seguidos = $user->seguidos()->get();
        
        $seguidosIds = [];
        $authUser = Auth::user();
        if ($authUser instanceof \App\Models\User) {
            $seguidosIds = $authUser->seguidos()->pluck('users.id')->toArray();
        }
        
        $seguidos->transform(function ($u) use ($seguidosIds) {
            $u->siguiendo = in_array($u->id, $seguidosIds);
            return $u;
        });
        
        return response()->json($seguidos);
    }

    public function verificarSeguimiento($id)
    {
        /** @var \App\Models\User $currentUser */
        $currentUser = Auth::user();
        $estaSiguiendo = $currentUser->seguidos()->where('users.id', $id)->exists();
        return response()->json(['siguiendo' => $estaSiguiendo]);
    }
}
