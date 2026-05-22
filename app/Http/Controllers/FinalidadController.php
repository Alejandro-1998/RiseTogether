<?php

namespace App\Http\Controllers;

use App\Models\Finalidad;
use Illuminate\Http\Request;

class FinalidadController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Return all active finalidades
        $finalidades = Finalidad::orderBy('tipoFinalidad', 'asc')->get();
        return response()->json($finalidades);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'tipoFinalidad' => 'required|string|max:255|unique:finalidades,tipoFinalidad'
        ], [
            'tipoFinalidad.required' => 'El nombre de la finalidad es obligatorio.',
            'tipoFinalidad.unique' => 'Ya existe una finalidad con este nombre.',
            'tipoFinalidad.max' => 'El nombre no puede exceder los 255 caracteres.',
        ]);

        $finalidad = Finalidad::create([
            'tipoFinalidad' => $request->tipoFinalidad
        ]);

        return response()->json($finalidad, 201);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $finalidad = Finalidad::findOrFail($id);

        $request->validate([
            'tipoFinalidad' => 'required|string|max:255|unique:finalidades,tipoFinalidad,' . $finalidad->id
        ], [
            'tipoFinalidad.required' => 'El nombre de la finalidad es obligatorio.',
            'tipoFinalidad.unique' => 'Ya existe una finalidad con este nombre.',
            'tipoFinalidad.max' => 'El nombre no puede exceder los 255 caracteres.',
        ]);

        $finalidad->update([
            'tipoFinalidad' => $request->tipoFinalidad
        ]);

        return response()->json($finalidad);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $finalidad = Finalidad::findOrFail($id);
        
        // Comprobar si hay eventos usándola? Soft Delete se encarga de que se quede allí para referencias pasadas
        $finalidad->delete();

        return response()->json(null, 204);
    }
}
