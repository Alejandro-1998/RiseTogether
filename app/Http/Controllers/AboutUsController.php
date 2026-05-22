<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\SiteContent;

class AboutUsController extends Controller
{
    public function index()
    {
        $team = User::role('admin')->get()->map(function ($user) {
            return [
                'id' => $user->id,
                'name' => $user->nombreCompleto ?? $user->nombreUsuario,
                'roleLabel' => 'Administrador',
                'avatarUrl' => $user->profile_photo_url,
            ];
        });

        $contents = SiteContent::where('group', 'about_us')
            ->get()
            ->pluck('value', 'key');

        return response()->json([
            'team' => $team,
            'content' => $contents,
        ]);
    }
}
