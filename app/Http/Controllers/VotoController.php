<?php

namespace App\Http\Controllers;

use App\Models\Voto;
use App\Models\Evento;
use App\Models\Proyecto;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Carbon;

class VotoController extends Controller
{
    /**
     * Cast a vote for a project in an event.
     */
    public function votar(Request $request, $eventoId, $proyectoId)
    {
        $user = Auth::guard('sanctum')->user();
        if (!$user) {
            return response()->json(['message' => 'No autorizado'], 401);
        }

        $evento = Evento::with('finalidad')->findOrFail($eventoId);

        // Check if event is active
        $now = Carbon::now();
        if ($now < $evento->fechaInicio || $now > $evento->fechaFinal) {
            return response()->json(['message' => 'El evento no está activo para votación.'], 400);
        }

        // Check if event is a voting event
        $esVotacion = stripos($evento->finalidad->tipo_finalidad ?? '', 'votacion') !== false;
        if (!$esVotacion) {
            return response()->json(['message' => 'Este evento no admite votos.'], 400);
        }

        // Find the pivot record idProyectoEvento
        $pivot = DB::table('proyectos_eventos')
            ->where('idEvento', $eventoId)
            ->where('idProyecto', $proyectoId)
            ->whereNull('deleted_at')
            ->first();

        if (!$pivot) {
            return response()->json(['message' => 'El proyecto no está inscrito en este evento.'], 404);
        }

        // Check if user has already voted in THIS event (any project)
        // We join `votos` with `proyectos_eventos` to filter by `idEvento`
        $hasVotedInEvent = Voto::where('idUsuario', $user->id)
            ->whereHas('proyectos', function ($query) use ($eventoId) {
                // El modelo Voto tiene relación belongsToMany('proyectos_eventos', ...) pero es más fácil por DB directa
            })
            ->exists();

        // Better way to check with DB directly
        $hasVotedInEvent = DB::table('votos')
            ->join('proyectos_eventos', 'votos.idProyectoEvento', '=', 'proyectos_eventos.id')
            ->where('votos.idUsuario', $user->id)
            ->where('proyectos_eventos.idEvento', $eventoId)
            ->whereNull('votos.deleted_at')
            ->exists();

        if ($hasVotedInEvent) {
            return response()->json(['message' => 'Ya has emitido tu único voto en este evento.'], 400);
        }

        // Register the vote
        Voto::create([
            'idUsuario' => $user->id,
            'idProyectoEvento' => $pivot->id,
            'fechaVoto' => $now,
        ]);

        return response()->json(['message' => '¡Voto registrado exitosamente!']);
    }

    /**
     * Get the project the user has voted for in this event.
     */
    public function miVoto(Request $request, $eventoId)
    {
        $user = Auth::guard('sanctum')->user();
        if (!$user) {
            return response()->json(null);
        }

        $voto = DB::table('votos')
            ->join('proyectos_eventos', 'votos.idProyectoEvento', '=', 'proyectos_eventos.id')
            ->where('votos.idUsuario', $user->id)
            ->where('proyectos_eventos.idEvento', $eventoId)
            ->whereNull('votos.deleted_at')
            ->select('proyectos_eventos.idProyecto')
            ->first();

        if ($voto) {
            return response()->json(['voted_project_id' => $voto->idProyecto]);
        }

        return response()->json(null);
    }
}
