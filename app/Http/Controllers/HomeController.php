<?php

namespace App\Http\Controllers;

use App\Models\Proyecto;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    public function index()
    {
        // Obtener proyectos publicados, con su categoría para evitar consultas N+1
        $proyectos = Proyecto::with('categoria')
                        ->where('estado', 'borrador',)
                        ->latest()
                        ->take(3)
                        ->get();

        return view('publico.home', compact('proyectos'));
    }
}