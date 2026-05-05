<?php

namespace App\Http\Controllers;

use App\Models\Proyecto;
use App\Models\User;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    public function stats()
    {
        $proyectosActivos = Proyecto::where('estado', 'publicado')
            ->whereDate('fecha_limite', '>', now())
            ->count();

        $proyectosPendientes = Proyecto::where('estado', 'revision')
            ->count();

        $usuarios = User::count();

        // Suma total recaudada de todos los proyectos
        $ingresos = Proyecto::sum('cantidad_recaudada');

        return response()->json([
            'proyectos_activos' => $proyectosActivos,
            'proyectos_pendientes' => $proyectosPendientes,
            'usuarios' => $usuarios,
            'ingresos' => $ingresos
        ]);
    }

    public function pendingProjects()
    {
        // Obtener proyectos en estado de revisión con su creador y categoría
        $proyectos = Proyecto::with(['user', 'categoria'])
            ->where('estado', 'revision')
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json($proyectos);
    }
}
