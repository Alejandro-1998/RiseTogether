<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use App\Models\Donacion;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class DonacionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $donaciones = Donacion::all();
        return response()->json($donaciones);
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
            'idRecompensa' => 'nullable|exists:recompensas,id',
            'importe' => 'required|numeric|min:1',
        ], [
            'idProyecto.required' => 'El proyecto es obligatorio.',
            'idProyecto.exists' => 'El proyecto seleccionado no existe.',
            'idRecompensa.exists' => 'La recompensa seleccionada no existe.',
            'importe.required' => 'El importe de la donación es obligatorio.',
            'importe.numeric' => 'El importe debe ser un número válido.',
            'importe.min' => 'El importe mínimo es de :min euro.',
        ]);

        $donacion = Donacion::create([
            'idRecompensa' => $request->idRecompensa,
            'idUsuario' => Auth::id(),
            'idProyecto' => $request->idProyecto,
            'fechaCompra' => Carbon::now(),
            'importe' => $request->importe,
            'estadoDonacion' => 'pendiente',
        ]);

        return response()->json($donacion, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $donacion = Donacion::findOrFail($id);
        return response()->json($donacion);
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
        $donacion = Donacion::findOrFail($id);

        // Solo permitir editar si está pendiente (regla de negocio lógica)
        if ($donacion->estadoDonacion !== 'pendiente') {
             return response()->json(['message' => 'No se puede editar una donación procesada.'], 403);
        }

        $request->validate([
            'importe' => 'required|numeric|min:1',
        ], [
            'importe.required' => 'El importe de la donación es obligatorio.',
            'importe.numeric' => 'El importe debe ser un número válido.',
            'importe.min' => 'El importe mínimo es de :min euro.',
        ]);

        $donacion->update($request->only(['importe']));

        return response()->json($donacion);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $donacion = Donacion::findOrFail($id);
        $donacion->delete();

        return response()->json(null, 204);
    }
}