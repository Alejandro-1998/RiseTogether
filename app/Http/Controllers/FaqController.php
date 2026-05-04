<?php

namespace App\Http\Controllers;

use App\Models\Faq;
use App\Models\Proyecto;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class FaqController extends Controller
{
    public function store(Request $request, $id)
    {
        $proyecto = Proyecto::findOrFail($id);

        if ($proyecto->user_id !== Auth::id()) {
            return response()->json(['message' => 'No tienes permiso para añadir preguntas a este proyecto.'], 403);
        }

        $request->validate([
            'pregunta' => 'required|string|max:500',
            'respuesta' => 'required|string',
        ], [
            'pregunta.required' => 'La pregunta es obligatoria.',
            'pregunta.max' => 'La pregunta no puede exceder los 500 caracteres.',
            'respuesta.required' => 'La respuesta es obligatoria.',
        ]);

        $faq = Faq::create([
            'proyecto_id' => $proyecto->id,
            'pregunta' => $request->pregunta,
            'respuesta' => $request->respuesta,
        ]);

        return response()->json($faq, 201);
    }
}
