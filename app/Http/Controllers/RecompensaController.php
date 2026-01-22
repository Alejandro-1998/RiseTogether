<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Recompensa;

class RecompensaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $recompensas = Recompensa::all();
        return response()->json($recompensas);
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
            'idProyecto' => 'required|exists:proyectos,id',
            'nombreRecompensa' => 'required|string|max:255',
            'costoRecompensa' => 'required|numeric|min:0',
            'descripcionRecompensa' => 'required|string|min:10',
            'tipoEntrega' => 'required|in:digital,fisica,mixta,desbloqueo',
        ], [
            'idProyecto.required' => 'El proyecto es obligatorio.',
            'idProyecto.exists' => 'El proyecto seleccionado no existe.',
            'nombreRecompensa.required' => 'El título de la recompensa es obligatorio.',
            'costoRecompensa.required' => 'El costo es obligatorio.',
            'costoRecompensa.numeric' => 'El costo debe ser un número válido.',
            'costoRecompensa.min' => 'El costo no puede ser negativo.',
            'descripcionRecompensa.required' => 'La descripción es obligatoria.',
            'descripcionRecompensa.min' => 'La descripción debe tener al menos 10 caracteres.',
            'tipoEntrega.required' => 'El tipo de entrega es obligatorio.',
            'tipoEntrega.in' => 'El tipo de entrega no es válido.',
        ]);

        $recompensa = Recompensa::create([
            'idProyecto' => $request->idProyecto,
            'nombreRecompensa' => $request->nombreRecompensa,
            'costoRecompensa' => $request->costoRecompensa,
            'descripcionRecompensa' => $request->descripcionRecompensa,
            'tipoEntrega' => $request->tipoEntrega,
        ]);

        return response()->json($recompensa, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $recompensa = Recompensa::findOrFail($id);
        return response()->json($recompensa);
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
        $recompensa = Recompensa::findOrFail($id);

        $request->validate([
            'nombreRecompensa' => 'required|string|max:255',
            'costoRecompensa' => 'required|numeric|min:0',
            'descripcionRecompensa' => 'required|string|min:10',
            'tipoEntrega' => 'required|in:digital,fisica,mixta,desbloqueo',
        ], [
            'nombreRecompensa.required' => 'El título de la recompensa es obligatorio.',
            'costoRecompensa.required' => 'El costo es obligatorio.',
            'costoRecompensa.numeric' => 'El costo debe ser un número válido.',
            'costoRecompensa.min' => 'El costo no puede ser negativo.',
            'descripcionRecompensa.required' => 'La descripción es obligatoria.',
            'descripcionRecompensa.min' => 'La descripción debe tener al menos 10 caracteres.',
            'tipoEntrega.required' => 'El tipo de entrega es obligatorio.',
            'tipoEntrega.in' => 'El tipo de entrega no es válido.',
        ]);

        $recompensa->update($request->only([
            'nombreRecompensa',
            'costoRecompensa',
            'descripcionRecompensa',
            'tipoEntrega'
        ]));

        return response()->json($recompensa);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $recompensa = Recompensa::findOrFail($id);
        $recompensa->delete();

        return response()->json(null, 204);
    }
}