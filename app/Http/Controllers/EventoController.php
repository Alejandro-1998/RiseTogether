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
        $eventos = Evento::all();
        return response()->json($eventos);
    }

    /**
     * Clean dummy events with latin text
     */
    public function cleanDummyEvents()
    {
        // Delete events whose names contain latin identifiers or specific dummy data
        $deleted = Evento::whereIn('id', [2, 3, 4])
                         ->orWhere('nombre', 'like', '%Ut eos%')
                         ->orWhere('nombre', 'like', '%Iure nihil%')
                         ->orWhere('nombre', 'like', '%Dolor%')
                         ->delete();
                         
        return response()->json(['message' => "Se eliminaron $deleted eventos de prueba."]);
    }

    /**
     * Get the currently active event.
     */
    public function active()
    {
        $now = Carbon::now();
        $evento = Evento::where('fechaInicio', '<=', $now)
            ->where('fechaFinal', '>=', $now)
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
     * Inscribe a project to a specific event
     */
    public function inscribirProject(Request $request, $id)
    {
        $request->validate([
            'proyecto_id' => 'required|exists:proyectos,id',
        ]);

        $evento = Evento::findOrFail($id);
        
        // Verify event hasn't finished yet (Allow Pre-registration)
        $now = Carbon::now();
        if ($evento->fechaFinal < $now) {
            return response()->json(['message' => 'El evento ya ha finalizado.'], 400);
        }

        // Verify project belongs to user
        $proyecto = Proyecto::where('id', $request->proyecto_id)
                            ->where('user_id', Auth::id())
                            ->first();
                            
        if (!$proyecto) {
            return response()->json(['message' => 'No tienes permisos para inscribir este proyecto.'], 403);
        }

        // Attach safely
        if (!$evento->proyectos()->where('idProyecto', $proyecto->id)->exists()) {
            
            // CHECK: A project can ONLY be in ONE active or upcoming event at a time.
            $alreadyInEvent = \DB::table('proyectos_eventos')
                ->join('eventos', 'proyectos_eventos.idEvento', '=', 'eventos.id')
                ->where('proyectos_eventos.idProyecto', $proyecto->id)
                ->where('eventos.fechaFinal', '>=', $now)
                ->whereNull('eventos.deleted_at')
                ->exists();

            if ($alreadyInEvent) {
                return response()->json(['message' => 'Este proyecto ya está inscrito en otro evento activo o próximo.'], 400);
            }

            // Depending on relationship, we might need to use attach
            $evento->proyectos()->attach($proyecto->id);
            return response()->json(['message' => 'Proyecto inscrito exitosamente.']);
        }

        return response()->json(['message' => 'El proyecto ya estaba inscrito en este evento.'], 400);
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
        ], [
            'nombre.required' => 'El nombre del evento es obligatorio.',
            'fechaInicio.required' => 'La fecha de inicio es obligatoria.',
            'fechaFinal.required' => 'La fecha de fin es obligatoria.',
            'fechaFinal.after' => 'La fecha de fin debe ser posterior a la de inicio.',
            'cantidadMaxParticipantes.integer' => 'La cantidad de participantes debe ser un número entero.',
        ]);

        $evento = Evento::create([
            'nombre' => $request->nombre,
            'fechaInicio' => $request->fechaInicio,
            'fechaFinal' => $request->fechaFinal,
            'cantidadMaxParticipantes' => $request->cantidadMaxParticipantes,
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
        ], [
            'nombre.required' => 'El nombre del evento es obligatorio.',
            'fechaInicio.required' => 'La fecha de inicio es obligatoria.',
            'fechaFinal.required' => 'La fecha de fin es obligatoria.',
            'fechaFinal.after' => 'La fecha de fin debe ser posterior a la de inicio.',
            'cantidadMaxParticipantes.integer' => 'La cantidad de participantes debe ser un número entero.',
        ]);

        $evento->update([
            'nombre' => $request->nombre,
            'fechaInicio' => $request->fechaInicio,
            'fechaFinal' => $request->fechaFinal,
            'cantidadMaxParticipantes' => $request->cantidadMaxParticipantes,
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

    /**
     * Obtener proyectos del usuario autenticado para inscripción.
     */
    public function misProyectos(Request $request)
    {
        /** @var \App\Models\User $user */
        $user = $request->user();
        if (!$user) {
            \Illuminate\Support\Facades\Log::warning("misProyectos called without user session.");
            return response()->json([], 401);
        }

        $proyectos = $user->proyectosCreados()->get()->values();
        
        \Illuminate\Support\Facades\Log::info("User ID {$user->id} fetching its projects. Found: " . count($proyectos));

        return response()->json($proyectos);
    }
}