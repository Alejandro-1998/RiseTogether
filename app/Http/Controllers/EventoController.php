<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Evento;

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