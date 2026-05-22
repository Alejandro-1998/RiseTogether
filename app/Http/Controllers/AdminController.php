<?php

namespace App\Http\Controllers;

use App\Models\Proyecto;
use App\Models\User;
use Illuminate\Http\Request;
use App\Models\Evento;
use Carbon\Carbon;

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

        $ingresos = Proyecto::sum('cantidad_recaudada');

        return response()->json([
            'proyectos_activos' => $proyectosActivos,
            'proyectos_pendientes' => $proyectosPendientes,
            'usuarios' => $usuarios,
            'ingresos' => $ingresos
        ]);
    }

    public function actividadReciente(Request $request)
    {
        $limit = $request->query('limit', 10);
        $actividades = collect();

        $proyectos = Proyecto::orderBy('created_at', 'desc')->take(10)->get();
        foreach ($proyectos as $p) {
            $actividades->push([
                'tipo' => 'proyecto',
                'texto' => 'Nuevo proyecto creado: ' . $p->titulo,
                'fecha' => $p->created_at,
                'icon' => 'rocket_launch',
                'color' => 'orange'
            ]);
        }

        $usuarios = User::orderBy('created_at', 'desc')->take(10)->get();
        foreach ($usuarios as $u) {
            $actividades->push([
                'tipo' => 'usuario',
                'texto' => 'Nuevo usuario registrado: ' . ($u->nombreUsuario ?? $u->nombreCompleto),
                'fecha' => $u->created_at,
                'icon' => 'person',
                'color' => 'blue'
            ]);
        }

        $eventos = Evento::orderBy('created_at', 'desc')->take(10)->get();
        foreach ($eventos as $e) {
            $actividades->push([
                'tipo' => 'evento',
                'texto' => 'Nuevo evento creado: ' . $e->nombre,
                'fecha' => $e->created_at,
                'icon' => 'event',
                'color' => 'green'
            ]);
        }

        $actividades = $actividades->sortByDesc('fecha')->take($limit)->values();

        $actividades->transform(function ($item) {
            $item['tiempo'] = Carbon::parse($item['fecha'])->locale('es')->diffForHumans();
            return $item;
        });

        return response()->json($actividades);
    }
}
