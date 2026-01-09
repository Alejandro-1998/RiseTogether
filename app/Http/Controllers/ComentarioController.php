<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Comentario;

class ComentarioController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
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
        //
    }

    /**
     * Comentarios con más estrellas de los últimos 7 días.
     */
    public function comentariosRelevantes()
    {
         $comentarios = Comentario::with('user')
            ->where('estado', 'aprobado')
            ->where('fechaHora', '>=', now()->subDays(7))
            ->orderBy('estrellas', 'desc')
            ->limit(3)
            ->get();

        return response()->json($comentarios);
    }
}
