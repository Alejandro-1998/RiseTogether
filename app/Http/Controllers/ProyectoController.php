<?php

namespace App\Http\Controllers;

use App\Models\Categoria;
use App\Models\Proyecto;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Auth;

class ProyectoController extends Controller
{
    /**
     * Obtiene todos los proyectos.
     */
    public function index()
    {
        $proyectos = Proyecto::all();
        return view('publico.proyectos', compact('proyectos'));
    }

    /**
     * Muestra el formulario.
     */
    public function create()
    {
        $categorias = Categoria::all();
        return view('privado.crear_proyecto', compact('categorias'));
    }

    /**
     * Guarda el proyecto en la BBDD.
     */
    public function store(Request $request)
    {
        $request->validate([
            'titulo' => 'required|max:255|unique:proyectos,titulo',
            'resumen' => 'required|max:255',
            'categoria_id' => 'required|exists:categorias,id',
            'imagen_portada' => 'required|image|max:2048',
            'objetivo_financiacion' => 'required|numeric|min:1',
            'duracion_dias' => 'required|integer|min:1|max:90',
            'descripcion' => 'required',
        ], [
            'titulo.required' => 'El proyecto necesita un nombre.',
            'categoria_id.required' => 'Elige una categoría.',
            'imagen_portada.required' => 'La imagen es obligatoria para atraer mecenas.',
        ]);

        $rutaImagen = null;
        if ($request->hasFile('imagen_portada')) {
            $rutaImagen = $request->file('imagen_portada')->store('proyectos', 'public');
        }

        $dias = (int) $request->duracion_dias; 
        $fechaLimite = now()->addDays($dias);

        Proyecto::create([
            'user_id' => Auth::id(),
            'categoria_id' => $request->categoria_id,
            'titulo' => $request->titulo,
            'slug' => Str::slug($request->titulo),
            'resumen' => $request->resumen,
            'descripcion' => $request->descripcion,
            'imagen_portada' => $rutaImagen,
            'video_url' => $request->video_url,
            'objetivo_financiacion' => $request->objetivo_financiacion,
            'fecha_limite' => $fechaLimite,
            'estado' => 'borrador',
            'cantidad_recaudada' => 0,
        ]);

        return redirect()->route('home')->with('success', '¡Proyecto creado con éxito!');
    }

    /**
     * Obtiene un único proyecto.
     */
    public function show(string $id)
    {
        $proyecto = Proyecto::where('id', $id)->first();
        return view('publico.proyecto', compact('proyecto'));
    }

    /**
     * Muestra el formulario de edición.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Actualiza un proyecto.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Elimina un proyecto
     */
    public function destroy(string $id)
    {
        Proyecto::where('id', $id)->first()->delete();
    }
}