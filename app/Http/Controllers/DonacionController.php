<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use App\Models\Donacion;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class DonacionController extends Controller
{
    public function index()
    {
        $donaciones = Donacion::all();
        return response()->json($donaciones);
    }

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

    public function show(string $id)
    {
        $donacion = Donacion::findOrFail($id);
        return response()->json($donacion);
    }

    public function update(Request $request, string $id)
    {
        $donacion = Donacion::findOrFail($id);

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

    public function destroy(string $id)
    {
        $donacion = Donacion::findOrFail($id);
        $donacion->delete();

        return response()->json(null, 204);
    }
}