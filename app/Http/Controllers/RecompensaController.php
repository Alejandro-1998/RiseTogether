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
        Recompensa::create([
            'idProyecto' => '', // Falta modificar
            'nombreRecompensa' => $request->nombreRecompensa,
            'costoRecompensa' => $request->costoRecompensa,
            'descripcionRecompensa' => $request->descripcionRecompensa,
            'tipoEntrega' => $request->tipoEntrega,
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $recompensa = Recompensa::where('id', $id)->first();
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
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        Recompensa::where('id', $id)->first()->delete();
    }
}