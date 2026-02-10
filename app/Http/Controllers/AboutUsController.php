<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AboutUsController extends Controller
{
    public function index()
    {
        // Obtener usuario con rol admin
        $team = \App\Models\User::role('admin')->get()->map(function ($user) {
            return [
                'id' => $user->id,
                'name' => $user->nombreCompleto ?? $user->nombreUsuario,
                'roleLabel' => 'Administrador',
                'avatarUrl' => $user->profile_photo_url,
            ];
        });

        // Obtener contenidos del sitio
        $contents = \App\Models\SiteContent::where('group', 'about_us')
            ->get()
            ->pluck('value', 'key');

        return response()->json([
            'team' => $team,
            'content' => $contents,
        ]);
    }
}
