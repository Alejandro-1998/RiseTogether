<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Evento;
use App\Models\Proyecto;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class EventoController extends Controller
{
    public function index()
    {
        $this->checkAndAssignWinners();
        $eventos = Evento::with('finalidad')->get();
        return response()->json($eventos);
    }

    public function cleanDummyEvents()
    {
        $deleted = Evento::whereIn('id', [2, 3, 4])
                         ->orWhere('nombre', 'like', '%Ut eos%')
                         ->orWhere('nombre', 'like', '%Iure nihil%')
                         ->orWhere('nombre', 'like', '%Dolor%')
                         ->delete();
                         
        return response()->json(['message' => "Se eliminaron $deleted eventos de prueba."]);
    }

    public function active()
    {
        $this->checkAndAssignWinners();
        $now = Carbon::now();
        $evento = Evento::where('fechaInicio', '<=', $now)
            ->where('fechaFinal', '>=', $now)
            ->first();

        return response()->json($evento);
    }

    public function upcoming()
    {
        $this->checkAndAssignWinners();
        $now = Carbon::now();
        $eventos = Evento::where('fechaInicio', '>', $now)
            ->orderBy('fechaInicio', 'asc')
            ->take(3)
            ->get();

        return response()->json($eventos);
    }

    public function leaderboard(Request $request, $id)
    {
        $this->checkAndAssignWinners();
        $evento = Evento::with('finalidad')->findOrFail($id);
        $esVotacion = stripos($evento->finalidad->tipo_finalidad ?? '', 'votacion') !== false;
        
        $query = $evento->proyectos()->with(['user', 'categoria']);

        if ($request->has('categoria') && $request->categoria != 'Todas las Categorías') {
            $query->whereHas('categoria', function($q) use ($request) {
                $q->where('nombre', $request->categoria);
            });
        }

        $projects = $query->get()->map(function($proyecto) use ($esVotacion) {
            $isFollowing = false;
            /** @var \App\Models\User|null $user */
            $user = Auth::guard('sanctum')->user();
            if ($user) {
                $isFollowing = $user->proyectos()->where('idProyecto', $proyecto->id)->exists();
            }
            $proyecto->setAttribute('is_following', $isFollowing);
            $proyecto->setAttribute('es_votacion', $esVotacion);

            if ($esVotacion && $proyecto->pivot) {
                $votosCount = DB::table('votos')
                    ->where('idProyectoEvento', $proyecto->pivot->id)
                    ->whereNull('deleted_at')
                    ->count();
                $proyecto->setAttribute('votos_count', $votosCount);
            }

            return $proyecto;
        });
        
        if ($esVotacion) {
            $projects = $projects->sortByDesc('votos_count')->values();
        } else {
            $projects = $projects->sortByDesc('cantidad_recaudada')->values();
        }

        return response()->json($projects);
    }

    public function stats($id)
    {
        $evento = Evento::with('finalidad')->findOrFail($id);
        $proyectos = $evento->proyectos();
        $esVotacion = stripos($evento->finalidad->tipo_finalidad ?? '', 'votacion') !== false;
        
        if ($esVotacion) {
            $totalVotos = DB::table('votos')
                ->join('proyectos_eventos', 'votos.idProyectoEvento', '=', 'proyectos_eventos.id')
                ->where('proyectos_eventos.idEvento', $id)
                ->whereNull('votos.deleted_at')
                ->count();
                
            $stats = [
                'total_votos' => $totalVotos,
                'total_proyectos' => $proyectos->count(),
                'es_votacion' => true,
            ];
        } else {
            $stats = [
                'total_recaudado' => $proyectos->sum('cantidad_recaudada'),
                'total_proyectos' => $proyectos->count(),
                'total_donantes' => \App\Models\Donacion::whereIn('idProyecto', $proyectos->pluck('proyectos.id'))->distinct('idUsuario')->count(),
                'es_votacion' => false,
            ];
        }

        return response()->json($stats);
    }

    public function actividadReciente($id)
    {
        $evento = Evento::findOrFail($id);
        $proyectosIds = $evento->proyectos()->pluck('proyectos.id');

        $actividades = collect();

        $inscripciones = DB::table('proyectos_eventos')
            ->join('proyectos', 'proyectos_eventos.idProyecto', '=', 'proyectos.id')
            ->where('proyectos_eventos.idEvento', $id)
            ->select('proyectos.titulo', 'proyectos_eventos.created_at')
            ->orderBy('proyectos_eventos.created_at', 'desc')
            ->take(5)
            ->get();

        foreach ($inscripciones as $ins) {
            $actividades->push([
                'texto' => 'El proyecto «' . $ins->titulo . '» se ha inscrito en el evento.',
                'fecha' => $ins->created_at,
                'icon' => 'add_circle',
                'color' => 'text-blue-500',
                'bg' => 'bg-blue-100'
            ]);
        }

        $donaciones = \App\Models\Donacion::with(['users', 'proyectos'])
            ->whereIn('idProyecto', $proyectosIds)
            ->where('estadoDonacion', 'pagada')
            ->orderBy('created_at', 'desc')
            ->take(5)
            ->get();

        foreach ($donaciones as $d) {
            $userNombre = $d->users ? $d->users->nombreUsuario : 'Alguien';
            $proyectoTitulo = $d->proyectos ? $d->proyectos->titulo : 'un proyecto';
            $actividades->push([
                'texto' => '@' . $userNombre . ' ha apoyado el proyecto «' . $proyectoTitulo . '» con ' . number_format($d->importe) . '€.',
                'fecha' => $d->fechaCompra ? \Carbon\Carbon::parse($d->fechaCompra) : $d->created_at,
                'icon' => 'favorite',
                'color' => 'text-red-500',
                'bg' => 'bg-red-100'
            ]);
        }

        $seguimientos = DB::table('users_proyectos')
            ->join('proyectos', 'users_proyectos.idProyecto', '=', 'proyectos.id')
            ->join('users', 'users_proyectos.idUsuario', '=', 'users.id')
            ->join('proyectos_eventos', 'proyectos.id', '=', 'proyectos_eventos.idProyecto')
            ->where('proyectos_eventos.idEvento', $id)
            ->select('users.nombreUsuario', 'proyectos.titulo', 'users_proyectos.created_at')
            ->orderBy('users_proyectos.created_at', 'desc')
            ->take(5)
            ->get();

        foreach ($seguimientos as $seg) {
            $actividades->push([
                'texto' => '@' . $seg->nombreUsuario . ' ha empezado a seguir el proyecto «' . $seg->titulo . '»',
                'fecha' => $seg->created_at,
                'icon' => 'bookmark',
                'color' => 'text-green-500',
                'bg' => 'bg-green-100'
            ]);
        }

        $actividades = $actividades->sortByDesc(function ($act) {
            return Carbon::parse($act['fecha']);
        })->take(5)->values();

        $actividades->transform(function ($item) {
            $item['time'] = \Carbon\Carbon::parse($item['fecha'])->locale('es')->diffForHumans();
            return $item;
        });

        return response()->json($actividades);
    }

    public function userImpact($id)
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();
        if (!$user) {
            return response()->json([
                'proyectos_seguidos_count' => 0,
                'proyectos_seguidos' => [],
                'total_aportado' => 0,
                'proyectos_apoyados' => 0
            ]);
        }

        $evento = Evento::findOrFail($id);
        $proyectosIds = $evento->proyectos()->pluck('proyectos.id');

        $proyectosSeguidosList = $user->proyectos()->whereIn('idProyecto', $proyectosIds)->get(['proyectos.id', 'proyectos.titulo', 'proyectos.slug']);
        
        $donaciones = $user->donaciones()->whereIn('idProyecto', $proyectosIds)->where('estadoDonacion', 'pagada');
        $totalAportado = $donaciones->sum('importe');
        $proyectosApoyados = $donaciones->distinct('idProyecto')->count('idProyecto');

        return response()->json([
            'proyectos_seguidos_count' => count($proyectosSeguidosList),
            'proyectos_seguidos' => $proyectosSeguidosList,
            'total_aportado' => $totalAportado,
            'proyectos_apoyados' => $proyectosApoyados
        ]);
    }

    public function inscribirProject(Request $request, $id)
    {
        $request->validate([
            'proyecto_id' => 'required|exists:proyectos,id',
        ]);

        $evento = Evento::findOrFail($id);
        
        $now = Carbon::now();
        if ($evento->fechaFinal < $now) {
            return response()->json(['message' => 'El evento ya ha finalizado.'], 400);
        }

        $proyecto = Proyecto::where('id', $request->proyecto_id)
                            ->where('user_id', Auth::id())
                            ->first();
                            
        if (!$proyecto) {
            return response()->json(['message' => 'No tienes permisos para inscribir este proyecto.'], 403);
        }

        if (!$evento->proyectos()->where('idProyecto', $proyecto->id)->exists()) {
            
            $alreadyInEvent = DB::table('proyectos_eventos')
                ->join('eventos', 'proyectos_eventos.idEvento', '=', 'eventos.id')
                ->where('proyectos_eventos.idProyecto', $proyecto->id)
                ->where('eventos.fechaFinal', '>=', $now)
                ->whereNull('eventos.deleted_at')
                ->exists();

            if ($alreadyInEvent) {
                return response()->json(['message' => 'Este proyecto ya está inscrito en otro evento activo o próximo.'], 400);
            }

            $evento->proyectos()->attach($proyecto->id);
            return response()->json(['message' => 'Proyecto inscrito exitosamente.']);
        }

        return response()->json(['message' => 'El proyecto ya estaba inscrito en este evento.'], 400);
    }

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
            'idFinalidad.required' => 'Debes seleccionar una finalidad.',
            'idFinalidad.exists' => 'La finalidad seleccionada no es válida.',
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

    public function show(string $id)
    {
        $evento = Evento::findOrFail($id);
        return response()->json($evento);
    }

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
            'idFinalidad.required' => 'Debes seleccionar una finalidad.',
            'idFinalidad.exists' => 'La finalidad seleccionada no es válida.',
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

    public function destroy(string $id)
    {
        $evento = Evento::findOrFail($id);
        $evento->delete();

        return response()->json(null, 204);
    }

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

    private function checkAndAssignWinners()
    {
        $now = Carbon::now();
        
        $endedEvents = Evento::with('finalidad')->where('fechaFinal', '<', $now)->get();
        
        foreach ($endedEvents as $evento) {
            $hasWinner = $evento->proyectos()->where('ganadorEvento', true)->exists();
            
            if (!$hasWinner) {
                $esVotacion = stripos($evento->finalidad->tipo_finalidad ?? '', 'votacion') !== false;
                
                if ($esVotacion) {
                    $winnerId = DB::table('votos')
                        ->join('proyectos_eventos', 'votos.idProyectoEvento', '=', 'proyectos_eventos.id')
                        ->where('proyectos_eventos.idEvento', $evento->id)
                        ->whereNull('votos.deleted_at')
                        ->select('proyectos_eventos.idProyecto', DB::raw('count(*) as total_votos'))
                        ->groupBy('proyectos_eventos.idProyecto')
                        ->orderByDesc('total_votos')
                        ->first();
                        
                    $winner = $winnerId ? Proyecto::find($winnerId->idProyecto) : null;
                    
                    if ($winner) {
                        $winner->ganadorEvento = true;
                        $winner->save();
                        Log::info("Evento ID {$evento->id} ({$evento->nombre}) finalizado. Ganador por votos: Proyecto ID {$winner->id} ({$winner->titulo}) con {$winnerId->total_votos} votos.");
                    }
                } else {
                    $winner = $evento->proyectos()
                        ->orderBy('cantidad_recaudada', 'desc')
                        ->first();
                    
                    if ($winner) {
                        $winner->ganadorEvento = true;
                        $winner->save();
                        
                        Log::info("Evento ID {$evento->id} ({$evento->nombre}) finalizado. Ganador por recaudación: Proyecto ID {$winner->id} ({$winner->titulo}) con {$winner->cantidad_recaudada}€.");
                    }
                }
            }
        }
    }
}