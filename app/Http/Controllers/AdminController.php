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

        $proyectosPendientes = Proyecto::whereIn('estado', ['pendiente', 'revision'])
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
}
