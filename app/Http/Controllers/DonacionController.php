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
        Donacion::create([
            'idRecompensa' => '', // Falta modificar
            'idUsuario' => Auth::id(),
            'idProyecto' => '', // Falta modificar
            'fechaCompra' => Carbon::now(),
            'importe' => $request->importe,
            'estadoDonacion' => 'pendiente',
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $donacion = Donacion::where('id', $id)->first();
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
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        Donacion::where('id', $id)->first()->delete();
    }
}