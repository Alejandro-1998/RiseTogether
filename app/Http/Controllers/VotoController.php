<?php

namespace App\Http\Controllers;

use App\Models\Voto;
use App\Models\Evento;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Carbon;

class VotoController extends Controller
{
    public function votar(Request $request, $eventoId, $proyectoId)
    {
        $user = Auth::guard('sanctum')->user();
        if (!$user) {
            return response()->json(['message' => 'No autorizado'], 401);
        }

        $evento = Evento::with('finalidad')->findOrFail($eventoId);

        $now = Carbon::now();
        if ($now < $evento->fechaInicio || $now > $evento->fechaFinal) {
            return response()->json(['message' => 'El evento no está activo para votación.'], 400);
        }

        $esVotacion = stripos($evento->finalidad->tipo_finalidad ?? '', 'votacion') !== false;
        if (!$esVotacion) {
            return response()->json(['message' => 'Este evento no admite votos.'], 400);
        }

        $pivot = DB::table('proyectos_eventos')
            ->where('idEvento', $eventoId)
            ->where('idProyecto', $proyectoId)
            ->whereNull('deleted_at')
            ->first();

        if (!$pivot) {
            return response()->json(['message' => 'El proyecto no está inscrito en este evento.'], 404);
        }

        $hasVotedInEvent = Voto::where('idUsuario', $user->id)
            ->whereHas('proyectos', function ($query) use ($eventoId) {
            })
            ->exists();

        $hasVotedInEvent = DB::table('votos')
            ->join('proyectos_eventos', 'votos.idProyectoEvento', '=', 'proyectos_eventos.id')
            ->where('votos.idUsuario', $user->id)
            ->where('proyectos_eventos.idEvento', $eventoId)
            ->whereNull('votos.deleted_at')
            ->exists();

        if ($hasVotedInEvent) {
            return response()->json(['message' => 'Ya has emitido tu único voto en este evento.'], 400);
        }

        Voto::create([
            'idUsuario' => $user->id,
            'idProyectoEvento' => $pivot->id,
            'fechaVoto' => $now,
        ]);

        return response()->json(['message' => '¡Voto registrado exitosamente!']);
    }

    public function miVoto($eventoId)
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
