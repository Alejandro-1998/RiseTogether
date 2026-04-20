<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Evento;
use App\Models\Proyecto;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;

class EventoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $eventos = Evento::with('finalidades')->get();
        return response()->json($eventos);
    }

    /**
     * Get the currently active event.
     */
    public function active()
    {
        $now = Carbon::now();
        $evento = Evento::where('fechaInicio', '<=', $now)
            ->where('fechaFinal', '>=', $now)
            ->with('finalidades')
            ->first();

        return response()->json($evento);
    }

    /**
     * Get upcoming events.
     */
    public function upcoming()
    {
        $now = Carbon::now();
        $eventos = Evento::where('fechaInicio', '>', $now)
            ->with('finalidades')
            ->orderBy('fechaInicio', 'asc')
            ->take(3)
            ->get();

        return response()->json($eventos);
    }

    /**
     * Get the leaderboard for a specific event.
     */
    public function leaderboard(Request $request, $id)
    {
        $evento = Evento::findOrFail($id);
        
        $query = $evento->proyectos()->with(['user', 'categoria']);

        // Filtrar por categoría si se proporciona
        if ($request->has('categoria') && $request->categoria != 'Todas las Categorías') {
            $query->whereHas('categoria', function($q) use ($request) {
                $q->where('nombre', $request->categoria);
            });
        }

        $projects = $query->get()->map(function($proyecto) {
            return $proyecto;
        })->sortByDesc('cantidad_recaudada')->values();

        return response()->json($projects);
    }

    /**
     * Get global stats for a specific event.
     */
    public function stats($id)
    {
        $evento = Evento::findOrFail($id);
        $proyectos = $evento->proyectos();
        
        $stats = [
            'total_recaudado' => $proyectos->sum('cantidad_recaudada'),
            'total_proyectos' => $proyectos->count(),
            'total_donantes' => \App\Models\Donacion::whereIn('idProyecto', $proyectos->pluck('proyectos.id'))->distinct('idUsuario')->count(),
        ];

        return response()->json($stats);
    }

    /**
     * Get the impact of the authenticated user in a specific event.
     */
    public function userImpact($id)
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();
        if (!$user) {
            return response()->json([
                'proyectos_seguidos' => 0,
                'total_aportado' => 0,
                'proyectos_apoyados' => 0
            ]);
        }

        $evento = Evento::findOrFail($id);
        $proyectosIds = $evento->proyectos()->pluck('proyectos.id');

        $proyectosSeguidos = $user->proyectos()->whereIn('idProyecto', $proyectosIds)->count();
        
        $donaciones = $user->donaciones()->whereIn('idProyecto', $proyectosIds);
        $totalAportado = $donaciones->sum('cantidadDonada');
        $proyectosApoyados = $donaciones->distinct('idProyecto')->count();

        return response()->json([
            'proyectos_seguidos' => $proyectosSeguidos,
            'total_aportado' => $totalAportado,
            'proyectos_apoyados' => $proyectosApoyados
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'nombre' => 'required|string|max:255',
            'fechaInicio' => 'required|date',
            'fechaFinal' => 'required|date|after:fechaInicio',
            'cantidadMaxParticipantes' => 'nullable|integer|min:1',
            'idFinalidad' => 'required|exists:finalidades,id',
        ], [
            'nombre.required' => 'El nombre del evento es obligatorio.',
            'fechaInicio.required' => 'La fecha de inicio es obligatoria.',
            'fechaFinal.required' => 'La fecha de fin es obligatoria.',
            'fechaFinal.after' => 'La fecha de fin debe ser posterior a la de inicio.',
            'cantidadMaxParticipantes.integer' => 'La cantidad de participantes debe ser un número entero.',
            'idFinalidad.required' => 'La finalidad es obligatoria.',
            'idFinalidad.exists' => 'La finalidad seleccionada no existe.',
        ]);

        $evento = Evento::create([
            'nombre' => $request->nombre,
            'fechaInicio' => $request->fechaInicio,
            'fechaFinal' => $request->fechaFinal,
            'cantidadMaxParticipantes' => $request->cantidadMaxParticipantes,
            'idFinalidad' => $request->idFinalidad,
        ]);

        return response()->json($evento, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $evento = Evento::findOrFail($id);
        return response()->json($evento);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $evento = Evento::findOrFail($id);

        $request->validate([
            'nombre' => 'required|string|max:255',
            'fechaInicio' => 'required|date',
            'fechaFinal' => 'required|date|after:fechaInicio',
            'cantidadMaxParticipantes' => 'nullable|integer|min:1',
            'idFinalidad' => 'required|exists:finalidades,id',
        ], [
            'nombre.required' => 'El nombre del evento es obligatorio.',
            'fechaInicio.required' => 'La fecha de inicio es obligatoria.',
            'fechaFinal.required' => 'La fecha de fin es obligatoria.',
            'fechaFinal.after' => 'La fecha de fin debe ser posterior a la de inicio.',
            'cantidadMaxParticipantes.integer' => 'La cantidad de participantes debe ser un número entero.',
            'idFinalidad.required' => 'La finalidad es obligatoria.',
            'idFinalidad.exists' => 'La finalidad seleccionada no existe.',
        ]);

        $evento->update([
            'nombre' => $request->nombre,
            'fechaInicio' => $request->fechaInicio,
            'fechaFinal' => $request->fechaFinal,
            'cantidadMaxParticipantes' => $request->cantidadMaxParticipantes,
            'idFinalidad' => $request->idFinalidad,
        ]);

        return response()->json($evento);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $evento = Evento::findOrFail($id);
        $evento->delete();

        return response()->json(null, 204);
    }
}