<?php

namespace App\Http\Controllers;

use App\Models\Finalidad;
use Illuminate\Http\Request;

class FinalidadController extends Controller
{
    public function index()
    {
        $finalidades = Finalidad::orderBy('tipo_finalidad', 'asc')->get();
        
        $mapped = $finalidades->map(function ($f) {
            return [
                'id' => $f->id,
                'tipoFinalidad' => $f->tipo_finalidad
            ];
        });
        
        return response()->json($mapped);
    }

    public function store(Request $request)
    {
        $request->validate([
            'tipoFinalidad' => 'required|string|max:255|unique:finalidades,tipo_finalidad'
        ], [
            'tipoFinalidad.required' => 'El nombre de la finalidad es obligatorio.',
            'tipoFinalidad.unique' => 'Ya existe una finalidad con este nombre.',
            'tipoFinalidad.max' => 'El nombre no puede exceder los 255 caracteres.',
        ]);

        $finalidad = Finalidad::create([
            'tipo_finalidad' => $request->tipoFinalidad
        ]);

        return response()->json([
            'id' => $finalidad->id,
            'tipoFinalidad' => $finalidad->tipo_finalidad
        ], 201);
    }

    public function update(Request $request, string $id)
    {
        $finalidad = Finalidad::findOrFail($id);

        $request->validate([
            'tipoFinalidad' => 'required|string|max:255|unique:finalidades,tipo_finalidad,' . $finalidad->id
        ], [
            'tipoFinalidad.required' => 'El nombre de la finalidad es obligatorio.',
            'tipoFinalidad.unique' => 'Ya existe una finalidad con este nombre.',
            'tipoFinalidad.max' => 'El nombre no puede exceder los 255 caracteres.',
        ]);

        $finalidad->update([
            'tipo_finalidad' => $request->tipoFinalidad
        ]);

        return response()->json([
            'id' => $finalidad->id,
            'tipoFinalidad' => $finalidad->tipo_finalidad
        ]);
    }

    public function destroy(string $id)
    {
        $finalidad = Finalidad::findOrFail($id);
        
        $finalidad->delete();

        return response()->json(null, 204);
    }
}
